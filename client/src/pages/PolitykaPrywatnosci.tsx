import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CallToAction from "@/components/CallToAction";
import ContentContainer from "@/components/ContentContainer";

const PolitykaPrywatnosci = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("privacy.pageTitle")} | SUPER PUCUŚ</title>
        <meta name="description" content={t("privacy.metaDescription")} />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-primary-800 pt-32 pb-12 md:pt-40 md:pb-20">
        <ContentContainer className="text-center">
          <motion.h2
            className="font-limelight text-3xl md:text-4xl font-bold dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("privacy.title")}
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
            {t("privacy.subtitle")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-gray-100 dark:bg-gray-800">
        <ContentContainer>
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose dark:prose-invert prose-lg max-w-none"
            >
              <h3>{t("privacy.section1.title")}</h3>
              <p>{t("privacy.section1.content")}</p>
              <h3>{t("privacy.section2.title")}</h3>
              <p>{t("privacy.section2.content")}</p>
              <h3>{t("privacy.section3.title")}</h3>
              <p>{t("privacy.section3.content")}</p>
              <h3>{t("privacy.section4.title")}</h3>
              <ul>
                <li>{t("privacy.section4.item1")}</li>
                <li>{t("privacy.section4.item2")}</li>
                <li>{t("privacy.section4.item3")}</li>
              </ul>
              <h3>{t("privacy.section5.title")}</h3>
              <p>{t("privacy.section5.content")}</p>
              <h3>{t("privacy.section6.title")}</h3>
              <p>{t("privacy.section6.content")}</p>
              <p className="text-sm text-gray-500 mt-8">
                {t("privacy.lastUpdated")}: 16.05.2025
              </p>
            </motion.div>
          </div>
        </ContentContainer>
      </section>
      {/* <CallToAction /> */}
    </>
  );
};

export default PolitykaPrywatnosci;
