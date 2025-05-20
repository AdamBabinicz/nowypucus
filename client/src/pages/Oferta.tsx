import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import CallToAction from "@/components/CallToAction";
import ContentContainer from "@/components/ContentContainer";
import { getLocalizedSlug, PAGE_KEYS, PageKey } from "@/config/slugs";

const Oferta = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

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

  const services = [
    {
      id: PAGE_KEYS.HASH_CARPETS,
      title: t("services.carpetCleaning"),
      description: t("services.carpetCleaningDesc"),
      features: [
        { id: "c1", text: t("services.carpetFeature1") },
        { id: "c2", text: t("services.carpetFeature2") },
        { id: "c3", text: t("services.carpetFeature3") },
        { id: "c4", text: t("services.carpetFeature4") },
      ],
      image: "/images/dywany/83.avif",
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
      id: PAGE_KEYS.HASH_FLOORING,
      title: t("services.floorCleaning"),
      description: t("services.floorCleaningDesc"),
      features: [
        { id: "w1", text: t("services.floorFeature1") },
        { id: "w2", text: t("services.floorFeature2") },
        { id: "w3", text: t("services.floorFeature3") },
      ],
      image: "/images/dywany/86.avif",
      modalContent: {
        title: t("services.floorCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-foreground dark:text-muted-foreground">
              {t("modalContent.floorDesc")}
            </p>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.floorProcessTitle")}
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-foreground/80 dark:text-muted-foreground">
              <li>{t("modalContent.floorProcess1")}</li>
              <li>{t("modalContent.floorProcess2")}</li>
              <li>{t("modalContent.floorProcess3")}</li>
              <li>{t("modalContent.floorProcess4")}</li>
              <li>{t("modalContent.floorProcess5")}</li>
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
                    <td className="py-2">{t("modalContent.floorCleaning")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 14 zł/m²
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.stainRemoval")}</td>
                    <td className="text-right py-2">
                      +20% {t("modalContent.toBasePrice")}
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">
                      {t("modalContent.commercialFloor")}
                    </td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 10 zł/m²
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
      id: PAGE_KEYS.HASH_UPHOLSTERY,
      title: t("services.furnitureCleaning"),
      description: t("services.furnitureCleaningDesc"),
      features: [
        { id: "f1", text: t("services.furnitureFeature1") },
        { id: "f2", text: t("services.furnitureFeature2") },
        { id: "f3", text: t("services.furnitureFeature3") },
      ],
      image: "/images/meble/5.avif",
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
                      {t("modalContent.from")} 100 zł
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
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.pouf")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} {t("modalContent.poufPrice")}
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.sofaBed")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} {t("modalContent.sofaBedPrice")}
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.couch")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} {t("modalContent.couchPrice")}
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.cushions")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} {t("modalContent.cushionsPrice")}
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.mattress1")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 120 zł
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.mattress2")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 160 zł
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
      id: PAGE_KEYS.HASH_PAVER_CLEANING,
      title: t("services.paverCleaning"),
      description: t("services.paverCleaningDesc"),
      features: [
        { id: "p1", text: t("services.paverFeature1") },
        { id: "p2", text: t("services.paverFeature2") },
      ],
      image: "/images/kostka/4.avif",
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
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.jointFilling")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 5 zł/m²
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
      id: PAGE_KEYS.HASH_TILE_CLEANING,
      title: t("services.tileCleaning"),
      description: t("services.tileCleaningDesc"),
      features: [
        { id: "t1", text: t("services.tileFeature1") },
        { id: "t2", text: t("services.tileFeature2") },
        { id: "t3", text: t("services.tileFeature3") },
      ],
      image: "/images/glazura/2.avif",
      modalContent: {
        title: t("services.tileCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-foreground dark:text-muted-foreground">
              {t("modalContent.tileDesc")}
            </p>
            <h4 className="font-heading text-xl font-semibold text-foreground dark:text-foreground mt-6 mb-2">
              {t("modalContent.tileProcessTitle")}
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-foreground/80 dark:text-muted-foreground">
              <li>{t("modalContent.tileProcess1")}</li>
              <li>{t("modalContent.tileProcess2")}</li>
              <li>{t("modalContent.tileProcess3")}</li>
              <li>{t("modalContent.tileProcess4")}</li>
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
                    <td className="py-2">{t("services.tileCleaning")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 12 zł/m²
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.bathrooms")}</td>
                    <td className="text-right py-2">
                      {t("modalContent.from")} 150 zł
                    </td>
                  </tr>
                  <tr className="border-t border-border dark:border-border">
                    <td className="py-2">{t("modalContent.groutCleaning")}</td>
                    <td className="text-right py-2">+2 zł/m²</td>
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

  return (
    <>
      <Helmet>
        <title>{t("meta.servicesTitle")}</title>
        <meta name="description" content={t("meta.servicesDescription")} />
        <meta property="og:title" content={t("meta.servicesTitle")} />
        <meta
          property="og:description"
          content={t("meta.servicesDescription")}
        />
      </Helmet>

      <section
        className="pt-32 pb-12 md:pt-40 md:pb-20
          bg-gradient-to-r from-primary-700 to-primary-800"
      >
        <ContentContainer className="text-center">
          <motion.h2
            className="font-limelight text-3xl md:text-4xl font-bold dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("servicesPage.title")}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="dark:text-white text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("servicesPage.subtitle")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="py-16 bg-background dark:bg-card" id="uslugi">
        <ContentContainer>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                id={getLocalizedSlug(service.id as PageKey, currentLang)}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </ContentContainer>
      </section>

      <CallToAction />
    </>
  );
};

export default Oferta;
