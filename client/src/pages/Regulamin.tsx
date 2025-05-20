import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContentContainer from "@/components/ContentContainer";

const Regulamin = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("meta.termsTitle")}</title>
        <meta name="description" content={t("meta.termsDescription")} />
        <meta property="og:title" content={t("meta.termsTitle")} />
        <meta property="og:description" content={t("meta.termsDescription")} />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-primary-800 pt-32 pb-12 md:pt-40 md:pb-20">
        <ContentContainer className="text-center">
          <motion.h2
            className="font-limelight text-3xl md:text-4xl font-bold dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("termsPage.title")}
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
            {t("termsPage.subtitle")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <ContentContainer>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 md:p-10">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h3 className="text-2xl font-bold mb-4">
                  {t("termsPage.section1Title")}
                </h3>
                <p>{t("termsPage.section1Para1")}</p>
                <p>{t("termsPage.section1Para2")}</p>
                <p>{t("termsPage.section1Para3")}</p>
                <h3 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section2Title")}
                </h3>
                <p>{t("termsPage.section2Para1")}</p>
                <ul>
                  <li>{t("termsPage.section2List1")}</li>
                  <li>{t("termsPage.section2List2")}</li>
                  <li>{t("termsPage.section2List3")}</li>
                  <li>{t("termsPage.section2List4")}</li>
                </ul>
                <p>{t("termsPage.section2Para2")}</p>
                <h3 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section3Title")}
                </h3>
                <p>{t("termsPage.section3Para1")}</p>
                <p>{t("termsPage.section3Para2")}</p>
                <p>{t("termsPage.section3Para3")}</p>
                <h3 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section4Title")}
                </h3>
                <p>{t("termsPage.section4Para1")}</p>
                <ul>
                  <li>{t("termsPage.section4List1")}</li>
                  <li>{t("termsPage.section4List2")}</li>
                  <li>{t("termsPage.section4List3")}</li>
                  <li>{t("termsPage.section4List4")}</li>
                </ul>
                <h3 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section5Title")}
                </h3>
                <p>{t("termsPage.section5Para1")}</p>
                <p>{t("termsPage.section5Para2")}</p>
                <p>{t("termsPage.section5Para3")}</p>
                <h3 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section6Title")}
                </h3>
                <p>{t("termsPage.section6Para1")}</p>
                <p>{t("termsPage.section6Para2")}</p>
                <h3 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section7Title")}
                </h3>
                <p>{t("termsPage.section7Para1")}</p>
                <p>{t("termsPage.section7Para2")}</p>
                <ul>
                  <li>{t("termsPage.section7List1")}</li>
                  <li>{t("termsPage.section7List2")}</li>
                  <li>{t("termsPage.section7List3")}</li>
                </ul>
                <p>{t("termsPage.section7Para3")}</p>
                <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                  {t("termsPage.lastUpdate")}: 01.01.2024
                </p>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="py-10 bg-gray-50 dark:bg-slate-800">
        <ContentContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground dark:text-white">
              {t("termsPage.contactTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("termsPage.contactText")}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
              <a
                href="mailto:mariusz1989poczta@wp.pl"
                className="text-primary dark:text-primary-400 hover:underline"
              >
                mariusz1989poczta@wp.pl
              </a>
              <span className="hidden md:inline text-gray-400">|</span>
              <a
                href="tel:+48531890827"
                className="text-primary dark:text-primary-400 hover:underline"
              >
                +48 531 890 827
              </a>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  );
};

export default Regulamin;
