import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation as useWouterLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { HEADER_OFFSET } from "@/App";
import ContentContainer from "@/components/ContentContainer";
import GallerySlider from "@/components/GallerySlider";
import {
  getLocalizedSlug,
  getLocalizedPath,
  PAGE_KEYS,
  PageKey,
  getCanonicalKeyFromSlug,
} from "@/config/slugs";

interface Image {
  id: string;
  src: string;
  alt: string;
  type: "before" | "after";
}

interface RealizacjeSection {
  id: PageKey;
  titleKey: string;
  descriptionKey: string;
  images: Image[];
}

const dywanyImages: Image[] = [
  {
    id: "d1",
    src: "/images/dywany/48.avif",
    alt: "Dywan przed praniem",
    type: "before",
  },
  {
    id: "d2",
    src: "/images/dywany/102.avif",
    alt: "Dywan po praniu",
    type: "after",
  },
  {
    id: "d3",
    src: "/images/dywany/72.avif",
    alt: "Inny dywan przed praniem",
    type: "before",
  },
  {
    id: "d4",
    src: "/images/dywany/73.avif",
    alt: "Inny dywan po praniu",
    type: "after",
  },
  {
    id: "d5",
    src: "/images/dywany/108.avif",
    alt: "Inny dywan przed praniem",
    type: "before",
  },
  {
    id: "d6",
    src: "/images/dywany/109.avif",
    alt: "Inny dywan po praniu",
    type: "after",
  },
  {
    id: "d7",
    src: "/images/dywany/110.avif",
    alt: "Inny dywan przed praniem",
    type: "before",
  },
  {
    id: "d8",
    src: "/images/dywany/111.avif",
    alt: "Inny dywan po praniu",
    type: "after",
  },
];
const wykladzinyImages: Image[] = [
  {
    id: "w1",
    src: "/images/wykladzina/1.avif",
    alt: "Wykładzina przed praniem",
    type: "before",
  },
  {
    id: "w2",
    src: "/images/wykladzina/2.avif",
    alt: "Wykładzina po praniu",
    type: "after",
  },
  {
    id: "w3",
    src: "/images/wykladzina/3.avif",
    alt: "Wykładzina przed praniem",
    type: "before",
  },
  {
    id: "w4",
    src: "/images/wykladzina/4.avif",
    alt: "Wykładzina po praniu",
    type: "after",
  },
];
const mebleImages: Image[] = [
  {
    id: "m1",
    src: "/images/meble/43.avif",
    alt: "Mebel przed czyszczeniem",
    type: "before",
  },
  {
    id: "m2",
    src: "/images/meble/44.avif",
    alt: "Mebel po czyszczeniu",
    type: "after",
  },
  {
    id: "m3",
    src: "/images/meble/65.avif",
    alt: "Mebel przed czyszczeniem",
    type: "before",
  },
  {
    id: "m4",
    src: "/images/meble/66.avif",
    alt: "Mebel po czyszczeniu",
    type: "after",
  },
];
const kostkaPlytkiImages: Image[] = [
  {
    id: "kp1",
    src: "/images/kostka/9.avif",
    alt: "Kostka brukowa przed myciem",
    type: "before",
  },
  {
    id: "kp2",
    src: "/images/kostka/8.avif",
    alt: "Kostka brukowa po myciu",
    type: "after",
  },
];

const sectionsData: RealizacjeSection[] = [
  {
    id: PAGE_KEYS.HASH_CARPETS,
    titleKey: "realizacjePage.carpetTitle",
    descriptionKey: "realizacjePage.carpetDesc",
    images: dywanyImages,
  },
  {
    id: PAGE_KEYS.HASH_FLOORING,
    titleKey: "realizacjePage.floorTitle",
    descriptionKey: "realizacjePage.floorDesc",
    images: wykladzinyImages,
  },
  {
    id: PAGE_KEYS.HASH_UPHOLSTERY,
    titleKey: "realizacjePage.furnitureTitle",
    descriptionKey: "realizacjePage.furnitureDesc",
    images: mebleImages,
  },
  {
    id: PAGE_KEYS.HASH_PAVERS_TILES,
    titleKey: "realizacjePage.paverTitle",
    descriptionKey: "realizacjePage.paverDesc",
    images: kostkaPlytkiImages,
  },
];

const Realizacje = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const [currentWouterPath, navigateWouter] = useWouterLocation();

  const [activeSectionId, setActiveSectionId] = useState<PageKey | null>(() => {
    const initialLocalizedHash = window.location.hash.substring(1);
    if (initialLocalizedHash) {
      const canonicalKey = getCanonicalKeyFromSlug(
        initialLocalizedHash,
        currentLang
      );
      if (canonicalKey && sectionsData.some((s) => s.id === canonicalKey)) {
        return canonicalKey;
      }
    }
    return sectionsData.length > 0 ? sectionsData[0].id : null;
  });

  const galleryDisplayAreaRef = useRef<HTMLDivElement>(null);
  const sectionNavRef = useRef<HTMLDivElement>(null);
  const isInitialMountRef = useRef(true);

  const scrollToSection = useCallback(
    (targetId: PageKey | null, behavior: ScrollBehavior = "smooth") => {
      if (targetId && galleryDisplayAreaRef.current && sectionNavRef.current) {
        const localizedSlugForId = getLocalizedSlug(targetId, currentLang);
        const element = document.getElementById(localizedSlugForId);
        if (element) {
          const navHeight = sectionNavRef.current.offsetHeight;
          const yOffset = -(HEADER_OFFSET + navHeight + 20);
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition + yOffset;
          window.scrollTo({ top: Math.max(0, offsetPosition), behavior });
        }
      }
    },
    [currentLang]
  );

  const updateActiveSectionFromHashAndScroll = useCallback(() => {
    const localizedHashSlug = window.location.hash.substring(1);
    const canonicalKeyFromHash = getCanonicalKeyFromSlug(
      localizedHashSlug,
      currentLang
    );
    const portfolioBasePath = getLocalizedPath(
      PAGE_KEYS.PORTFOLIO,
      currentLang
    );

    let newActiveId: PageKey | null = null;

    if (
      canonicalKeyFromHash &&
      sectionsData.some((s) => s.id === canonicalKeyFromHash)
    ) {
      newActiveId = canonicalKeyFromHash;
    } else if (sectionsData.length > 0) {
      newActiveId = sectionsData[0].id;
      const localizedDefaultHash = getLocalizedSlug(newActiveId, currentLang);
      if (
        currentWouterPath.split("#")[0] === portfolioBasePath &&
        window.location.hash !== `#${localizedDefaultHash}` &&
        !window.location.hash &&
        isInitialMountRef.current
      ) {
        navigateWouter(`${portfolioBasePath}#${localizedDefaultHash}`, {
          replace: true,
        });
      }
    }

    if (newActiveId && newActiveId !== activeSectionId) {
      setActiveSectionId(newActiveId);
    }

    // Przewijanie jest teraz w osobnym useEffect zależnym od activeSectionId
    // lub wywoływane bezpośrednio w handleInternalNavClick jeśli hash się nie zmienia
  }, [activeSectionId, currentWouterPath, navigateWouter, currentLang]);

  useEffect(() => {
    updateActiveSectionFromHashAndScroll(); // Uruchom przy montowaniu
    window.addEventListener(
      "hashchange",
      updateActiveSectionFromHashAndScroll,
      false
    );
    isInitialMountRef.current = false;
    return () => {
      window.removeEventListener(
        "hashchange",
        updateActiveSectionFromHashAndScroll,
        false
      );
    };
  }, [updateActiveSectionFromHashAndScroll]);

  useEffect(() => {
    // Ten useEffect odpowiada tylko za przewijanie, gdy activeSectionId się zmieni
    // lub gdy komponent jest montowany z już ustawionym activeSectionId
    if (activeSectionId) {
      const behavior =
        isInitialMountRef.current && window.location.hash ? "auto" : "smooth";
      // Dajemy mały timeout, aby DOM zdążył się przerysować po zmianie activeSectionData
      const timer = setTimeout(
        () => scrollToSection(activeSectionId, behavior),
        50
      );
      return () => clearTimeout(timer);
    }
  }, [activeSectionId, currentLang, scrollToSection]);

  const handleInternalNavClick = (sectionCanonicalId: PageKey) => {
    const localizedHash = getLocalizedSlug(sectionCanonicalId, currentLang);
    const portfolioBasePath = getLocalizedPath(
      PAGE_KEYS.PORTFOLIO,
      currentLang
    );
    const targetPath = `${portfolioBasePath}#${localizedHash}`;

    if (
      activeSectionId === sectionCanonicalId &&
      window.location.hash === `#${localizedHash}`
    ) {
      scrollToSection(sectionCanonicalId, "smooth");
    } else {
      setActiveSectionId(sectionCanonicalId); // To wywoła useEffect od przewijania
      if (
        currentWouterPath !== targetPath ||
        window.location.hash !== `#${localizedHash}`
      ) {
        navigateWouter(targetPath); // To wywoła hashchange listener
      }
    }
  };

  const activeSectionData = sectionsData.find(
    (sec) => sec.id === activeSectionId
  );

  return (
    <>
      <Helmet>
        <title>{t("meta.portfolioTitle")}</title>
        <meta name="description" content={t("meta.portfolioDescription")} />
      </Helmet>
      <section className="bg-gradient-to-r from-primary-700 to-primary-800 pt-32 pb-12 md:pt-40 md:pb-20 text-primary-foreground">
        <ContentContainer className="text-center">
          <motion.h2
            className="font-limelight text-3xl md:text-4xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("realizacjePage.title")}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("realizacjePage.subtitle")}
          </motion.p>
        </ContentContainer>
      </section>
      <section
        ref={sectionNavRef}
        className="sticky top-[var(--header-height,70px)] z-30 bg-background dark:bg-slate-900 shadow-md py-3"
      >
        <ContentContainer>
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 sm:gap-x-3">
            {sectionsData.map((section) => (
              <button
                key={section.id}
                onClick={() => handleInternalNavClick(section.id)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all text-sm font-medium border-2 ${
                  activeSectionId === section.id
                    ? "bg-primary text-primary-foreground border-primary dark:bg-primary dark:text-primary-foreground dark:border-primary scale-105"
                    : "bg-card text-card-foreground border-border hover:bg-muted hover:border-muted-foreground dark:bg-slate-800 dark:text-gray-200 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-slate-600"
                }`}
              >
                {t(section.titleKey)}
              </button>
            ))}
          </div>
        </ContentContainer>
      </section>
      <div id="gallery-display-area-wrapper" ref={galleryDisplayAreaRef}>
        <AnimatePresence mode="wait">
          {activeSectionData ? (
            <motion.section
              key={activeSectionData.id}
              id={getLocalizedSlug(activeSectionData.id, currentLang)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`py-12 md:py-16 ${
                sectionsData.findIndex((s) => s.id === activeSectionData.id) %
                  2 ===
                0
                  ? "bg-muted/50 dark:bg-slate-800/50"
                  : "bg-background dark:bg-slate-800"
              }`}
            >
              <ContentContainer>
                <div className="max-w-4xl mx-auto">
                  <h2 className="font-limelight text-2xl md:text-3xl font-bold text-center mb-4 text-foreground dark:text-white">
                    {t(activeSectionData.titleKey)}
                  </h2>
                  <p className="text-muted-foreground dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
                    {t(activeSectionData.descriptionKey)}
                  </p>
                  {activeSectionData.images &&
                  activeSectionData.images.length > 0 ? (
                    <GallerySlider
                      images={activeSectionData.images}
                      title={t(activeSectionData.titleKey)}
                    />
                  ) : (
                    <div className="text-center py-8 px-4 bg-card dark:bg-slate-700 rounded-lg">
                      <p className="text-muted-foreground dark:text-gray-300">
                        {t("realizacjePage.noImages")}
                      </p>
                    </div>
                  )}
                </div>
              </ContentContainer>
            </motion.section>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              {t(
                "realizacjePage.selectCategory",
                "Wybierz kategorię, aby zobaczyć realizacje."
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
export default Realizacje;
