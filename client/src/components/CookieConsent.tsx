import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { getLocalizedPath, PAGE_KEYS } from "@/config/slugs";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted") === "true";

    if (!hasAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 w-full bg-gray-800 dark:bg-slate-900 text-white p-4 shadow-lg z-50"
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0 text-sm md:text-base">
              {t(
                "cookies.message",
                "We use cookies to ensure you get the best experience on our website. By continuing to use the site, you agree to the use of cookies.",
              )}
            </p>
            <div className="flex gap-2">
              <button
                onClick={acceptCookies}
                className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {t("cookies.accept", "Accept")}
              </button>
              <Link
                href={getLocalizedPath(PAGE_KEYS.TERMS, currentLang)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {t("cookies.more", "More information")}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
