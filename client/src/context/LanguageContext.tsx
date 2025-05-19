import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import i18n from "@/i18n";

type Language = "pl" | "en"; // Dostosuj, jeśli masz więcej języków

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Inicjalizuj na podstawie i18next lub localStorage, potem domyślny
    const savedLang = localStorage.getItem("i18nextLng") as Language | null;
    if (savedLang && (savedLang === "pl" || savedLang === "en")) {
      if (i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang);
      }
      document.documentElement.lang = savedLang;
      return savedLang;
    }
    // Jeśli i18n.language jest już poprawnie ustawiony (pl/en) przez detektor i18next
    if (i18n.language === "pl" || i18n.language === "en") {
      document.documentElement.lang = i18n.language;
      return i18n.language as Language;
    }
    // Fallback
    document.documentElement.lang = "pl";
    i18n.changeLanguage("pl");
    return "pl";
  });

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng === "pl" || lng === "en") {
        setLanguageState(lng as Language);
        document.documentElement.lang = lng;
        // localStorage jest już obsługiwany przez i18next-browser-languagedetector
      }
    };

    i18n.on("languageChanged", handleLanguageChanged);

    // Ustaw atrybut lang przy pierwszym załadowaniu na podstawie stanu
    document.documentElement.lang = language;

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [language]); // Dodano language jako zależność, aby ustawić lang na html przy zmianie

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    // Stan 'language' zostanie zaktualizowany przez listener 'languageChanged'
    // localStorage i document.documentElement.lang również przez listener lub i18next
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t: i18n.t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
