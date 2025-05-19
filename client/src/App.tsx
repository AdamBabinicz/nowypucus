import React, { useEffect, useRef } from "react";
import {
  Switch,
  Route,
  useLocation,
  Link as WouterLink,
  Redirect,
} from "wouter";
import { useTranslation } from "react-i18next";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Oferta from "@/pages/Oferta";
import OFirmie from "@/pages/OFirmie";
import Realizacje from "@/pages/Realizacje";
import Sprzet from "@/pages/Sprzet";
import Contact from "@/pages/Contact";
import Regulamin from "@/pages/Regulamin";
import PolitykaPrywatnosci from "@/pages/PolitykaPrywatnosci";
import i18nInstance from "@/i18n";
import {
  PAGE_KEYS,
  getLocalizedPath,
  getCanonicalKeyFromSlug,
  getLocalizedSlug,
  PageKey,
  supportedLngs,
  defaultLang,
} from "@/config/slugs";

export const HEADER_OFFSET = 70;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [locationPath, setLocation] = useLocation();
  const currentUiLang = i18n.language.split("-")[0];

  const changeLanguage = (newLang: string) => {
    if (newLang === currentUiLang) return;

    const pathSegments = locationPath.split("#");
    let currentBaseSlug = pathSegments[0].substring(1);
    if (
      locationPath === "/" ||
      (currentUiLang === defaultLang && currentBaseSlug === "")
    ) {
      currentBaseSlug = getLocalizedSlug(PAGE_KEYS.HOME, currentUiLang);
    }

    const currentHash = pathSegments[1] ? `#${pathSegments[1]}` : "";
    const canonicalPageKey =
      getCanonicalKeyFromSlug(currentBaseSlug, currentUiLang) || PAGE_KEYS.HOME;

    let newLocalizedFullPath = getLocalizedPath(canonicalPageKey, newLang);

    if (currentHash) {
      const hashWithoutSymbol = currentHash.substring(1);
      const canonicalHashKey = getCanonicalKeyFromSlug(
        hashWithoutSymbol,
        currentUiLang
      );
      if (canonicalHashKey) {
        const newLocalizedHashSlug = getLocalizedSlug(
          canonicalHashKey,
          newLang
        );
        newLocalizedFullPath += `#${newLocalizedHashSlug}`;
      } else {
        newLocalizedFullPath += currentHash;
      }
    }

    i18n.changeLanguage(newLang).then(() => {
      if (newLocalizedFullPath !== locationPath) {
        setLocation(newLocalizedFullPath, { replace: true });
      }
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        background: "white",
        padding: "5px",
        border: "1px solid black",
      }}
    >
      {supportedLngs.map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          disabled={currentUiLang === lng}
          style={{
            marginRight: "5px",
            fontWeight: currentUiLang === lng ? "bold" : "normal",
          }}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default function App() {
  const { i18n } = useTranslation();
  const [locationPath, setLocation] = useLocation();
  const currentUiLang = i18n.language.split("-")[0];

  const prevLocationPathRef = useRef(locationPath);
  const prevUiLangRef = useRef(currentUiLang);

  useEffect(() => {
    if (
      locationPath !== prevLocationPathRef.current ||
      currentUiLang !== prevUiLangRef.current
    ) {
      const normalizedLocationPath =
        locationPath === "/"
          ? getLocalizedPath(PAGE_KEYS.HOME, defaultLang)
          : locationPath;
      const pathSlug = normalizedLocationPath.substring(1).split("#")[0];
      let detectedLangInUrl: string | undefined = undefined;

      if (
        normalizedLocationPath === getLocalizedPath(PAGE_KEYS.HOME, defaultLang)
      ) {
        detectedLangInUrl = defaultLang;
      } else {
        for (const lng of supportedLngs) {
          if (lng === defaultLang) continue;
          if (
            Object.values(PAGE_KEYS).some(
              (key) =>
                getLocalizedPath(key, lng).split("#")[0] ===
                normalizedLocationPath.split("#")[0]
            )
          ) {
            detectedLangInUrl = lng;
            break;
          }
        }
      }

      if (detectedLangInUrl && detectedLangInUrl !== currentUiLang) {
        if (
          locationPath !== prevLocationPathRef.current ||
          detectedLangInUrl !== prevUiLangRef.current
        ) {
          i18n.changeLanguage(detectedLangInUrl);
        }
      }
    }
    prevLocationPathRef.current = locationPath;
  }, [locationPath, i18n, currentUiLang]);

  useEffect(() => {
    if (currentUiLang !== prevUiLangRef.current) {
      const langBeforeThisEffect = prevUiLangRef.current;

      const pathSegments = locationPath.split("#");
      let baseSlugFromOldLangUrl = pathSegments[0].substring(1);

      if (
        locationPath === "/" ||
        (langBeforeThisEffect === defaultLang && baseSlugFromOldLangUrl === "")
      ) {
        baseSlugFromOldLangUrl = getLocalizedSlug(
          PAGE_KEYS.HOME,
          langBeforeThisEffect
        );
      }

      const currentHash = pathSegments[1] ? `#${pathSegments[1]}` : "";
      const canonicalPageKey =
        getCanonicalKeyFromSlug(baseSlugFromOldLangUrl, langBeforeThisEffect) ||
        PAGE_KEYS.HOME;

      const newLocalizedFullPath = getLocalizedPath(
        canonicalPageKey,
        currentUiLang
      );
      let finalPathWithHash = newLocalizedFullPath;

      if (currentHash) {
        const hashWithoutSymbol = currentHash.substring(1);
        const canonicalHashKey = getCanonicalKeyFromSlug(
          hashWithoutSymbol,
          langBeforeThisEffect
        );
        if (canonicalHashKey) {
          const newLocalizedHashSlug = getLocalizedSlug(
            canonicalHashKey,
            currentUiLang
          );
          finalPathWithHash += `#${newLocalizedHashSlug}`;
        } else {
          finalPathWithHash += currentHash;
        }
      }

      if (finalPathWithHash !== locationPath) {
        setLocation(finalPathWithHash, { replace: true });
        prevLocationPathRef.current = finalPathWithHash;
      }
    }
    prevUiLangRef.current = currentUiLang;
  }, [currentUiLang, locationPath, setLocation, i18n]);

  useEffect(() => {
    const realizacjePathSlug = getLocalizedSlug(
      PAGE_KEYS.PORTFOLIO,
      currentUiLang
    );
    const currentPathSlugOnly = locationPath.substring(1).split("#")[0];

    if (currentPathSlugOnly === realizacjePathSlug && window.location.hash) {
      return;
    }

    const hash = window.location.hash;
    if (hash) {
      const localizedHashValue = hash.substring(1);
      const canonicalKeyForHash = getCanonicalKeyFromSlug(
        localizedHashValue,
        currentUiLang
      );
      const idToScroll = canonicalKeyForHash || localizedHashValue;

      const attemptScroll = (attempt = 0) => {
        const element = document.getElementById(idToScroll);
        if (element) {
          const yOffset = -HEADER_OFFSET;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else if (attempt < 10) {
          setTimeout(() => attemptScroll(attempt + 1), 150);
        }
      };
      const timer = setTimeout(attemptScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [locationPath, currentUiLang]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          {/* <LanguageSwitcher /> */}
          <AppRouter />
          <Toaster />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppRouter() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  const paths = {
    home: getLocalizedPath(PAGE_KEYS.HOME, currentLang),
    offer: getLocalizedPath(PAGE_KEYS.OFFER, currentLang),
    about: getLocalizedPath(PAGE_KEYS.ABOUT, currentLang),
    portfolio: getLocalizedPath(PAGE_KEYS.PORTFOLIO, currentLang),
    equipment: getLocalizedPath(PAGE_KEYS.EQUIPMENT, currentLang),
    contact: getLocalizedPath(PAGE_KEYS.CONTACT, currentLang),
    terms: getLocalizedPath(PAGE_KEYS.TERMS, currentLang),
    privacy: getLocalizedPath(PAGE_KEYS.PRIVACY, currentLang),
  };

  return (
    <Switch>
      <Route path={paths.home} component={Home} />
      <Route path={paths.offer} component={Oferta} />
      <Route path={paths.about} component={OFirmie} />
      <Route path={paths.portfolio} component={Realizacje} />
      <Route path={paths.equipment} component={Sprzet} />
      <Route path={paths.contact} component={Contact} />
      <Route path={paths.terms} component={Regulamin} />
      <Route path={paths.privacy} component={PolitykaPrywatnosci} />

      {supportedLngs
        .filter((lng) => lng !== defaultLang)
        .map((lng) => {
          const langHomePathForNonDefault = getLocalizedPath(
            PAGE_KEYS.HOME,
            lng
          );
          const baseCatchAllPath = langHomePathForNonDefault.endsWith("/")
            ? langHomePathForNonDefault
            : `${langHomePathForNonDefault}/`;
          return (
            <Route
              key={`notfound-${lng}`}
              path={`${baseCatchAllPath}:rest*`}
              component={NotFound}
            />
          );
        })}

      {paths.home !== "/" && (
        <Route path={`${paths.home}/:rest*`} component={NotFound} />
      )}
      <Route component={NotFound} />
    </Switch>
  );
}
