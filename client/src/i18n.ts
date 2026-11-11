import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import plTranslation from "@/translations/pl.json";
import enTranslation from "@/translations/en.json";

// Centralny filtr eliminujący wiszące spójniki (sierotki) na końcach wierszy
const polishOrphansPostProcessor = {
  type: "postProcessor" as const,
  name: "polishOrphans",
  process(value: string) {
    if (typeof value !== "string") return value;
    const regex =
      /(^|[\s(„"'\u00A0])([a-zA-Z]|do|na|od|po|za|ze|we|Do|Na|Od|Po|Za|Ze|We)\s+/g;
    return value.replace(regex, "$1$2\u00A0").replace(regex, "$1$2\u00A0");
  },
};

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
  .use(polishOrphansPostProcessor)
  .init({
    resources,
    fallbackLng: "pl",
    debug: false,
    postProcess: ["polishOrphans"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
