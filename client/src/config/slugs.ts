export const PAGE_KEYS = {
  HOME: "home",
  OFFER: "offer",
  ABOUT: "about",
  PORTFOLIO: "portfolio",
  EQUIPMENT: "equipment",
  CONTACT: "contact",
  TERMS: "terms",
  PRIVACY: "privacy",
  HASH_CARPETS: "hash_carpets",
  HASH_FLOORING: "hash_flooring",
  HASH_UPHOLSTERY: "hash_upholstery",
  HASH_PAVERS_TILES: "hash_pavers_tiles",
  HASH_PAVER_CLEANING: "hash_paver_cleaning", // Dla usługi "Mycie kostki" w Oferta, jeśli linkujesz do sekcji
  HASH_TILE_CLEANING: "hash_tile_cleaning", // Dla usługi "Mycie płytek" w Oferta
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];

const slugsConfig = {
  pl: {
    [PAGE_KEYS.HOME]: "",
    [PAGE_KEYS.OFFER]: "oferta",
    [PAGE_KEYS.ABOUT]: "o-firmie",
    [PAGE_KEYS.PORTFOLIO]: "realizacje",
    [PAGE_KEYS.EQUIPMENT]: "sprzet",
    [PAGE_KEYS.CONTACT]: "kontakt",
    [PAGE_KEYS.TERMS]: "regulamin",
    [PAGE_KEYS.PRIVACY]: "polityka-prywatnosci",
    [PAGE_KEYS.HASH_CARPETS]: "dywany",
    [PAGE_KEYS.HASH_FLOORING]: "wykladziny",
    [PAGE_KEYS.HASH_UPHOLSTERY]: "meble",
    [PAGE_KEYS.HASH_PAVERS_TILES]: "kostka-plytki",
    [PAGE_KEYS.HASH_PAVER_CLEANING]: "kostka",
    [PAGE_KEYS.HASH_TILE_CLEANING]: "plytki",
  },
  en: {
    [PAGE_KEYS.HOME]: "home",
    [PAGE_KEYS.OFFER]: "services",
    [PAGE_KEYS.ABOUT]: "about-us",
    [PAGE_KEYS.PORTFOLIO]: "portfolio",
    [PAGE_KEYS.EQUIPMENT]: "equipment",
    [PAGE_KEYS.CONTACT]: "contact",
    [PAGE_KEYS.TERMS]: "terms-of-service",
    [PAGE_KEYS.PRIVACY]: "privacy-policy",
    [PAGE_KEYS.HASH_CARPETS]: "carpets",
    [PAGE_KEYS.HASH_FLOORING]: "flooring",
    [PAGE_KEYS.HASH_UPHOLSTERY]: "furniture",
    [PAGE_KEYS.HASH_PAVERS_TILES]: "pavers-tiles",
    [PAGE_KEYS.HASH_PAVER_CLEANING]: "pavers",
    [PAGE_KEYS.HASH_TILE_CLEANING]: "tiles",
  },
};

type SupportedLanguage = keyof typeof slugsConfig;

export const defaultLang: SupportedLanguage = "pl";
export const supportedLngs: SupportedLanguage[] = ["pl", "en"];

export const getLocalizedSlug = (pageKey: PageKey, lang: string): string => {
  const languageKey = lang as SupportedLanguage;
  if (
    slugsConfig[languageKey] &&
    slugsConfig[languageKey][pageKey] !== undefined
  ) {
    return slugsConfig[languageKey][pageKey];
  }
  if (
    slugsConfig[defaultLang] &&
    slugsConfig[defaultLang][pageKey] !== undefined
  ) {
    return slugsConfig[defaultLang][pageKey];
  }
  return pageKey === PAGE_KEYS.HOME ? "" : pageKey;
};

export function getLocalizedPath(key: PageKey, lang: string): string {
  const slug = getLocalizedSlug(key, lang);
  const currentLang = lang as SupportedLanguage;
  if (key === PAGE_KEYS.HOME && currentLang === defaultLang) return "/";
  if (key === PAGE_KEYS.HOME && currentLang !== defaultLang)
    return slug ? `/${slug}` : `/${currentLang}`;
  return slug ? `/${slug}` : key === PAGE_KEYS.HOME ? "/" : `/${key}`;
}

export function getCanonicalKeyFromSlug(
  slugToFind: string,
  lang: string
): PageKey | undefined {
  const currentLang = lang as SupportedLanguage;
  if (slugToFind === "" && currentLang === defaultLang) {
    return PAGE_KEYS.HOME;
  }
  for (const key in slugsConfig[currentLang]) {
    if (slugsConfig[currentLang][key as PageKey] === slugToFind) {
      return key as PageKey;
    }
  }
  if (currentLang !== defaultLang) {
    for (const key in slugsConfig[defaultLang]) {
      if (slugsConfig[defaultLang][key as PageKey] === slugToFind) {
        return key as PageKey;
      }
    }
  }
  if (Object.values(PAGE_KEYS).includes(slugToFind as PageKey))
    return slugToFind as PageKey;
  return undefined;
}
