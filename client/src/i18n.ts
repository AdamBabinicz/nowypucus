import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import plTranslation from "@/translations/pl.json";
import enTranslation from "@/translations/en.json";

const resources = {
  pl: {
    translation: plTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pl",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
