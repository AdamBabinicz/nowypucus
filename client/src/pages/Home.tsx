import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link as WouterLink } from "wouter";
import { motion } from "framer-motion";
import {
  FiZap,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiThumbsUp,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";
import ServiceCard from "@/components/ServiceCard";
import GallerySlider from "@/components/GallerySlider";
import CallToAction from "@/components/CallToAction";
import ContactForm from "@/components/ContactForm";
import qrCode from "@assets/qr.avif";
import ContentContainer from "@/components/ContentContainer";
import HeroImageSlider from "@/components/HeroImageSlider";
import PriceCalculator from "@/components/PriceCalculator";
import { getLocalizedPath, PAGE_KEYS } from "@/config/slugs";

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const googleReviewLink =
    "https://search.google.com/local/writereview?placeid=ChIJ_9Tq7MReGEcRwnvtzQGkWL0";

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const heroSliderImages = [
    "/images/dywany/88.avif",
    "/images/dywany/96.avif",
    "/images/kostka/24.avif",
    "/images/meble/64.avif",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const serviceCards = [
    {
      id: "dywany",
      title: t("services.carpetCleaning"),
      description: t("services.carpetCleaningDesc"),
      features: [
        { id: "c1", text: t("services.carpetFeature1") },
        { id: "c2", text: t("services.carpetFeature2") },
        { id: "c3", text: t("services.carpetFeature3") },
      ],
      image: "/images/dywany/55.avif",
      modalContent: {
        title: t("services.carpetCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-foreground dark:text-muted-foreground">
              {t("modalContent.carpetDesc")}
            </p>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.carpetProcessTitle")}
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-foreground/80 dark:text-muted-foreground">
              <li>{t("modalContent.carpetDetailProcess1")}</li>
              <li>{t("modalContent.carpetDetailProcess2")}</li>
              <li>{t("modalContent.carpetDetailProcess3")}</li>
              <li>{t("modalContent.carpetDetailProcess4")}</li>
              <li>{t("modalContent.carpetDetailProcess5")}</li>
              <li>{t("modalContent.carpetDetailProcess6New")}</li>
              <li>{t("modalContent.carpetDetailProcess7")}</li>
              <li>{t("modalContent.carpetDetailProcess8")}</li>
            </ol>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.pricing")}
            </h4>
            <div className="bg-muted dark:bg-card rounded-lg p-4">
              <table className="w-full text-muted-foreground dark:text-muted-foreground">
                <thead>
                  <tr>
                    <th className="text-left pb-2">
                      {t("modalContent.service")}
                    </th>
                    <th className="text-right pb-2">
                      {t("modalContent.price")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.carpetCleaning")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 25 zł/m²
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.floorCleaning")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 12 zł/m²
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.orientalCarpet")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 25 zł/m²
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.stainRemoval")}</td>
                    <td className="text-right py-2">
                      +20% {t("modalContent.toBasePrice")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/80 mt-2">
              {t("modalContent.pricingNote")}
            </p>
          </div>
        ),
      },
    },
    {
      id: "meble",
      title: t("services.furnitureCleaning"),
      description: t("services.furnitureCleaningDesc"),
      features: [
        { id: "f1", text: t("services.furnitureFeature1") },
        { id: "f2", text: t("services.furnitureFeature2") },
        { id: "f3", text: t("services.furnitureFeature3") },
      ],
      image: "/images/meble/p15.avif",
      modalContent: {
        title: t("services.furnitureCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-foreground dark:text-muted-foreground">
              {t("modalContent.furnitureDesc")}
            </p>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.furnitureProcessTitle")}
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-foreground/80 dark:text-muted-foreground">
              <li>{t("modalContent.furnitureProcess1")}</li>
              <li>{t("modalContent.furnitureProcess2")}</li>
              <li>{t("modalContent.furnitureProcess3")}</li>
              <li>{t("modalContent.furnitureProcess4")}</li>
              <li>{t("modalContent.furnitureProcess5")}</li>
              <li>{t("modalContent.furnitureProcess6")}</li>
            </ol>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.pricing")}
            </h4>
            <div className="bg-muted dark:bg-card rounded-lg p-4">
              <table className="w-full text-muted-foreground dark:text-muted-foreground">
                <thead>
                  <tr>
                    <th className="text-left pb-2">
                      {t("modalContent.service")}
                    </th>
                    <th className="text-right pb-2">
                      {t("modalContent.price")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.sofa2")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 120 zł
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.sofa3")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 150 zł
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.corner")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 200 - 250 zł
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.armchair")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 70 zł
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.chair")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 30 zł
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/80 mt-2">
              {t("modalContent.pricingNote")}
            </p>
          </div>
        ),
      },
    },
    {
      id: "kostka",
      title: t("services.paverCleaning"),
      description: t("services.paverCleaningDesc"),
      features: [
        { id: "p1", text: t("services.paverFeature1") },
        { id: "p2", text: t("services.paverFeature2") },
      ],
      image: "/images/kostka/5.avif",
      modalContent: {
        title: t("services.paverCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-foreground dark:text-muted-foreground">
              {t("modalContent.paverDesc")}
            </p>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.paverProcessTitle")}
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-foreground/80 dark:text-muted-foreground">
              <li>{t("modalContent.paverProcess1")}</li>
              <li>{t("modalContent.paverProcess2")}</li>
              <li>{t("modalContent.paverProcess3")}</li>
              <li>{t("modalContent.paverProcess4")}</li>
            </ol>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.pricing")}
            </h4>
            <div className="bg-muted dark:bg-card rounded-lg p-4">
              <table className="w-full text-muted-foreground dark:text-muted-foreground">
                <thead>
                  <tr>
                    <th className="text-left pb-2">
                      {t("modalContent.service")}
                    </th>
                    <th className="text-right pb-2">
                      {t("modalContent.price")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.paverCleaning")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 10 zł/m²
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("services.tileCleaning")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 12 zł/m²
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.mossRemoval")}</td>
                    <td className="text-right py-2">+3 zł/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/80 mt-2">
              {t("modalContent.pricingNote")}
            </p>
          </div>
        ),
      },
    },
  ];

  interface Image {
    id: string;
    src: string;
    alt: string;
    type: "before" | "after";
  }

  const carpetImages: Image[] = [
    {
      id: "c1",
      src: "/images/dywany/48.avif",
      alt: "Przed czyszczeniem",
      type: "before",
    },
    {
      id: "c2",
      src: "/images/dywany/102.avif",
      alt: "Po czyszczeniu",
      type: "after",
    },
    {
      id: "c3",
      src: "/images/dywany/52.avif",
      alt: "Przed czyszczeniem",
      type: "before",
    },
    {
      id: "c4",
      src: "/images/dywany/53.avif",
      alt: "Po czyszczeniu",
      type: "after",
    },
  ];

  const furnitureImages: Image[] = [
    {
      id: "f1",
      src: "/images/meble/p1.avif",
      alt: "Przed czyszczeniem",
      type: "before",
    },
    {
      id: "f2",
      src: "/images/meble/p2.avif",
      alt: "Po czyszczeniu",
      type: "after",
    },
    {
      id: "f3",
      src: "/images/meble/39.avif",
      alt: "Przed czyszczeniem",
      type: "before",
    },
    {
      id: "f4",
      src: "/images/meble/38.avif",
      alt: "Po czyszczeniu",
      type: "after",
    },
  ];

  const heroTitleFull = t("hero.title");
  const heroTitleBrand = t("hero.titleBrand", "SUPER PUCUŚ");
  const heroTitleSuffixKey = "hero.titleSuffix";
  const heroTitleSuffix = heroTitleFull.includes(heroTitleBrand)
    ? heroTitleFull
        .substring(
          heroTitleFull.indexOf(heroTitleBrand) + heroTitleBrand.length
        )
        .trimStart()
    : t(heroTitleSuffixKey, heroTitleFull);

  return (
    <>
      <Helmet>
        <title>{t("meta.homeTitle")}</title>
        <meta name="description" content={t("meta.homeDescription")} />
        <meta property="og:title" content={t("meta.homeTitle")} />
        <meta property="og:description" content={t("meta.homeDescription")} />
      </Helmet>

      <section className=" py-20 relative text-[hsl(var(--primary-foreground))] bg-[url('/images/3.avif')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 z-0">
          <HeroImageSlider images={heroSliderImages} />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 flex items-center min-h-[calc(85vh)]">
          <ContentContainer className="py-16 lg:py-24">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-left">
                <span className="font-major-mono block text-4xl md:text-5xl lg:text-6xl font-bold">
                  {heroTitleBrand}
                </span>
                {heroTitleSuffix && (
                  <span className="font-limelight block text-2xl md:text-3xl lg:text-4xl mt-1 md:mt-2 opacity-90">
                    {heroTitleSuffix.startsWith("–") ||
                    heroTitleSuffix.startsWith("-")
                      ? heroTitleSuffix
                      : `– ${heroTitleSuffix}`}
                  </span>
                )}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-left opacity-90 font-sans">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.OFFER, currentLang)}
                  className="inline-block text-center font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 bg-[hsl(175_60%_65%)] text-[hsl(175_30%_15%)] border-2 border-transparent hover:bg-transparent hover:text-[hsl(0_0%_98%)] hover:border-[hsl(175_60%_65%)]"
                >
                  {t("hero.seeServices")}
                </WouterLink>
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="inline-flex items-center justify-center font-semibold px-3 py-2 rounded-md transition-colors duration-300 border-2 border-[hsl(175_60%_65%)] bg-transparent text-[hsl(0_0%_98%)] hover:bg-[hsl(190_80%_60%)] hover:text-[hsl(210_25%_15%)] hover:border-[hsl(190_80%_60%)]"
                >
                  {t("hero.getQuote")}
                </button>
              </div>
            </motion.div>
          </ContentContainer>
        </div>
      </section>

      <section className="py-16 bg-muted dark:bg-muted">
        <ContentContainer>
          <h2 className="font-limelight text-3xl font-bold text-center mb-12 text-foreground dark:text-foreground">
            {t("whyUs.title")}{" "}
            <span className="text-primary dark:text-primary">SUPER PUCUŚ</span>?
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="bg-card dark:bg-card rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-14 h-14 flex items-center justify-center mb-4">
                <FiZap className="w-8 h-8 text-primary dark:text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-card-foreground dark:text-card-foreground">
                {t("whyUs.feature1.title")}
              </h3>
              <p className="text-card-foreground/80 dark:text-card-foreground/80 font-sans">
                {t("whyUs.feature1.description")}
              </p>
            </motion.div>
            <motion.div
              className="bg-card dark:bg-card rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-14 h-14 flex items-center justify-center mb-4">
                <FiCheckCircle className="w-8 h-8 text-primary dark:text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-card-foreground dark:text-card-foreground">
                {t("whyUs.feature2.title")}
              </h3>
              <p className="text-card-foreground/80 dark:text-card-foreground/80 font-sans">
                {t("whyUs.feature2.description")}
              </p>
            </motion.div>
            <motion.div
              className="bg-card dark:bg-card rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-14 h-14 flex items-center justify-center mb-4">
                <FiClock className="w-8 h-8 text-primary dark:text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-card-foreground dark:text-card-foreground">
                {t("whyUs.feature3.title")}
              </h3>
              <p className="text-card-foreground/80 dark:text-card-foreground/80 font-sans">
                {t("whyUs.feature3.description")}
              </p>
            </motion.div>
            <motion.div
              className="bg-card dark:bg-card rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-14 h-14 flex items-center justify-center mb-4">
                <BsPiggyBank className="w-8 h-8 text-primary dark:text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-card-foreground dark:text-card-foreground">
                {t("whyUs.feature4.title")}
              </h3>
              <p className="text-card-foreground/80 dark:text-card-foreground/80 font-sans">
                {t("whyUs.feature4.description")}
              </p>
            </motion.div>
            <motion.div
              className="bg-card dark:bg-card rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-14 h-14 flex items-center justify-center mb-4">
                <FiMapPin className="w-8 h-8 text-primary dark:text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-card-foreground dark:text-card-foreground">
                {t("whyUs.feature5.title")}
              </h3>
              <p className="text-card-foreground/80 dark:text-card-foreground/80 font-sans">
                {t("whyUs.feature5.description")}
              </p>
            </motion.div>
            <motion.div
              className="bg-card dark:bg-card rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-14 h-14 flex items-center justify-center mb-4">
                <FiThumbsUp className="w-8 h-8 text-primary dark:text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-card-foreground dark:text-card-foreground">
                {t("whyUs.feature6.title")}
              </h3>
              <p className="text-card-foreground/80 dark:text-card-foreground/80 font-sans">
                {t("whyUs.feature6.description")}
              </p>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-background dark:bg-gradient-to-r dark:from-[hsl(var(--gradient-primary-h)_var(--gradient-primary-s)_var(--gradient-primary-l-darkened))] dark:to-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l-lightmode-darkened))]">
        <ContentContainer>
          <h2 className="font-limelight text-3xl font-bold text-center mb-12 text-foreground dark:text-foreground">
            {t("services.title")}{" "}
            <span className="text-primary dark:text-primary">
              {t("services.titleHighlight")}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <WouterLink
              href={getLocalizedPath(PAGE_KEYS.OFFER, currentLang)}
              className="inline-flex items-center justify-center font-semibold px-3 py-2 rounded-md transition-colors duration-300 border-2 border-marine bg-transparent text-marine hover:bg-marine hover:text-marine-foreground"
            >
              {t("services.viewAll")}
            </WouterLink>
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-muted dark:bg-muted">
        <ContentContainer>
          <h2 className="font-limelight text-3xl font-bold text-center mb-12 text-foreground dark:text-foreground">
            {t("gallery.title")}{" "}
            <span className="text-primary dark:text-primary">
              {t("gallery.titleHighlight")}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GallerySlider images={carpetImages} title={t("gallery.carpets")} />
            <GallerySlider
              images={furnitureImages}
              title={t("gallery.furniture")}
            />
          </div>
          <div className="text-center">
            <WouterLink
              href={getLocalizedPath(PAGE_KEYS.PORTFOLIO, currentLang)}
              className="inline-block font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 border-2 border-marine bg-transparent text-marine hover:bg-marine hover:text-marine-foreground hover:border-marine dark:border-accent dark:bg-transparent dark:text-accent dark:hover:bg-accent dark:hover:text-accent-foreground dark:hover:border-accent"
            >
              {t("gallery.viewMore")}
            </WouterLink>
          </div>
        </ContentContainer>
      </section>

      <CallToAction />

      <section className="py-16 bg-background dark:bg-background">
        <ContentContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-limelight text-3xl font-bold mb-6 text-foreground dark:text-foreground">
                {t("contact.getInTouch")}{" "}
                <span className="text-primary dark:text-primary">
                  SUPER PUCUŚ
                </span>
              </h2>
              <p className="text-foreground/80 dark:text-foreground/80 mb-8 font-sans">
                {t("contact.questions")}
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 rounded-full p-3 mr-4">
                    <FiPhone className="w-6 h-6 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground dark:text-foreground mb-1">
                      {t("contact.phone")}
                    </h3>
                    <a
                      href="tel:+48531890827"
                      className="text-primary dark:text-primary font-medium text-lg"
                    >
                      +48 531 890 827
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 rounded-full p-3 mr-4">
                    <FiMail className="w-6 h-6 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground dark:text-foreground mb-1">
                      {t("contact.email")}
                    </h3>
                    <a
                      href="mailto:mariusz1989poczta@wp.pl"
                      className="text-primary dark:text-primary"
                    >
                      mariusz1989poczta@wp.pl
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 rounded-full p-3 mr-4">
                    <FiClock className="w-6 h-6 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground dark:text-foreground mb-1">
                      {t("contact.hours")}
                    </h3>
                    <p className="text-foreground/80 dark:text-foreground/80 font-sans">
                      {t("contact.weekdays")}
                    </p>
                    <p className="text-foreground/80 dark:text-foreground/80 font-sans">
                      {t("contact.saturday")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 rounded-full p-3 mr-4">
                    <FiMapPin className="w-6 h-6 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground dark:text-foreground mb-1">
                      {t("contact.serviceArea")}
                    </h3>
                    <p className="text-foreground/80 dark:text-foreground/80 font-sans">
                      {t("contact.areaDescription")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-heading font-semibold text-lg text-foreground dark:text-foreground mb-3">
                  {t("contact.qrCode")}
                </h3>
                <a
                  href={googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(
                    "contactPage.qrAltToReview",
                    "QR code to leave a Google review"
                  )}
                >
                  <img
                    src={qrCode}
                    alt={t(
                      "contactPage.qrAltToReview",
                      "QR code to leave a Google review"
                    )}
                    className="w-40 h-40 cursor-pointer transition-opacity hover:opacity-80"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-6 text-foreground dark:text-foreground">
                {t("contact.quickForm")}
              </h3>
              <ContactForm />
            </div>
          </div>
        </ContentContainer>
      </section>

      <PriceCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
};

export default Home;
