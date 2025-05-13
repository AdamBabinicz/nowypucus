import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CallToAction from "@/components/CallToAction";

const PolitykaPrywatnosci = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("privacy.pageTitle")} | Super Pucuś</title>
        <meta name="description" content={t("privacy.metaDescription")} />
      </Helmet>

      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
              {t("privacy.title")}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose dark:prose-invert prose-lg max-w-none"
              >
                <h2>{t("privacy.section1.title")}</h2>
                <p>{t("privacy.section1.content")}</p>

                <h2>{t("privacy.section2.title")}</h2>
                <p>{t("privacy.section2.content")}</p>

                <h2>{t("privacy.section3.title")}</h2>
                <p>{t("privacy.section3.content")}</p>

                <h2>{t("privacy.section4.title")}</h2>
                <ul>
                  <li>{t("privacy.section4.item1")}</li>
                  <li>{t("privacy.section4.item2")}</li>
                  <li>{t("privacy.section4.item3")}</li>
                </ul>

                <h2>{t("privacy.section5.title")}</h2>
                <p>{t("privacy.section5.content")}</p>

                <h2>{t("privacy.section6.title")}</h2>
                <p>{t("privacy.section6.content")}</p>

                <p className="text-sm text-gray-500 mt-8">
                  {t("privacy.lastUpdated")}: 13.05.2023
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
    </>
  );
};

export default PolitykaPrywatnosci;