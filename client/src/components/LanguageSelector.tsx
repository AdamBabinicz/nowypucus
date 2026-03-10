import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  onLanguageChange?: () => void;
}

const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = (lang: "pl" | "en") => {
    changeLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => handleLanguageChange("pl")}
        className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
          language === "pl"
            ? "bg-gray-100 text-gray-700 border border-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
            : "text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
        }`}
        aria-label={t("nav:switch_pl", "Przełącz na język polski")}
      >
        PL
        {language === "pl" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            initial={false}
          />
        )}
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
          language === "en"
            ? "bg-gray-100 text-gray-700 border border-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
            : "text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
        }`}
        aria-label={t("nav:switch_en", "Switch to English")}
      >
        EN
        {language === "en" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            initial={false}
          />
        )}
      </button>
    </div>
  );
};

export default LanguageSelector;
