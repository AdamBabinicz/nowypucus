import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FiAward,
  FiClipboard,
  FiSmile,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";
import CallToAction from "@/components/CallToAction";
import ContentContainer from "@/components/ContentContainer";

const OFirmie = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
        stiffness: 50,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>{t("meta.aboutTitle")}</title>
        <meta name="description" content={t("meta.aboutDescription")} />
        <meta property="og:title" content={t("meta.aboutTitle")} />
        <meta property="og:description" content={t("meta.aboutDescription")} />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-primary-800 pt-32 pb-12 md:pt-40 md:pb-20">
        <ContentContainer className="text-center">
          <motion.h2
            className="font-limelight text-3xl md:text-4xl font-bold dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("aboutPage.title")}
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
            {t("aboutPage.subtitle")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="py-16 bg-white dark:bg-gradient-to-r dark:from-[hsl(var(--gradient-primary-h)_var(--gradient-primary-s)_var(--gradient-primary-l-darkened))] dark:to-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l-lightmode-darkened))] overflow-hidden">
        <ContentContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-limelight text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                {t("aboutPage.ourStoryTitle")}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t("aboutPage.ourStoryPara1")}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t("aboutPage.ourStoryPara2")}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">
                    {t("aboutPage.ourStoryPara3")}
                  </strong>
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 md:h-full min-h-[320px] bg-gray-200 dark:bg-transparent rounded-xl overflow-hidden"
            >
              <img
                src="/images/team/5.avif"
                alt="Zespół profesjonalnego czyszczenia"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <ContentContainer>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-limelight text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("aboutPage.missionTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {t("aboutPage.missionStatement")}
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md text-center"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {t("aboutPage.value1Title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("aboutPage.value1Desc")}
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md text-center"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiSmile className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {t("aboutPage.value2Title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("aboutPage.value2Desc")}
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md text-center"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiClipboard className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {t("aboutPage.value3Title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("aboutPage.value3Desc")}
              </p>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <ContentContainer>
          <h2 className="font-limelight text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t("aboutPage.whyChooseUsTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 shadow-md"
            >
              <div className="flex items-start mb-4">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                  <FiUsers className="w-6 h-6 text-primary dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t("aboutPage.advantage1Title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("aboutPage.advantage1Desc")}
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 shadow-md"
            >
              <div className="flex items-start mb-4">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                  <FiTruck className="w-6 h-6 text-primary dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t("aboutPage.advantage2Title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("aboutPage.advantage2Desc")}
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 shadow-md"
            >
              <div className="flex items-start mb-4">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-primary dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t("aboutPage.advantage3Title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("aboutPage.advantage3Desc")}
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 shadow-md"
            >
              <div className="flex items-start mb-4">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                  {/* <svg
                    className="w-6 h-6 text-primary dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg> */}
                  <BsPiggyBank className="w-6 h-6 text-primary dark:text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {t("aboutPage.advantage4Title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("aboutPage.advantage4Desc")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <ContentContainer>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-limelight text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
              {t("aboutPage.certificationTitle")}
            </h2>
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 md:p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
                {t("aboutPage.certificationDesc")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 text-center">
                  <h3 className="font-heading text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {t("aboutPage.cert1Title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {t("aboutPage.cert1Desc")}
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 text-center">
                  <h3 className="font-heading text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {t("aboutPage.cert2Title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {t("aboutPage.cert2Desc")}
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-primary dark:text-sky-400 font-semibold">
                  {t("aboutPage.certificationNote")}
                </p>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      <CallToAction />
    </>
  );
};

export default OFirmie;
