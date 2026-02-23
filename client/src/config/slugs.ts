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
  HASH_PAVER_CLEANING: "hash_paver_cleaning",
  HASH_TILE_CLEANING: "hash_tile_cleaning",
  HASH_DRYING: "hash_drying", // NOWY KLUCZ ZAMIAST SAMOCHODÓW
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
    [PAGE_KEYS.HASH_DRYING]: "dosuszanie", // NOWY SLUG
  },
  en: {
    [PAGE_KEYS.HOME]: "",
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
    [PAGE_KEYS.HASH_DRYING]: "drying", // NOWY SLUG
  },
};

export type SupportedLanguage = keyof typeof slugsConfig;
export const defaultLang: SupportedLanguage = "pl";
export const supportedLngs: readonly SupportedLanguage[] = ["pl", "en"];

export const getLocalizedSlug = (
  pageKey: PageKey,
  langInput: string,
): string => {
  const lang = langInput as SupportedLanguage;
  const slug = slugsConfig[lang]?.[pageKey];

  if (typeof slug === "string") {
    return slug;
  }
  const defaultLangSlug = slugsConfig[defaultLang]?.[pageKey];
  if (typeof defaultLangSlug === "string") {
    return defaultLangSlug;
  }
  return pageKey.toLowerCase();
};

export function getLocalizedPath(key: PageKey, langInput: string): string {
  const lang = langInput as SupportedLanguage;
  const slug = getLocalizedSlug(key, lang);
  const langPrefix = lang === defaultLang ? "" : `/${lang}`;

  if (key === PAGE_KEYS.HOME) {
    return langPrefix || "/";
  }

  if (slug === "") {
    return langPrefix || "/";
  }

  return `${langPrefix}/${slug}`;
}

export function getCanonicalKeyFromSlug(
  slugToFind: string,
  langInput: string,
): PageKey | undefined {
  const lang = langInput as SupportedLanguage;

  if (slugToFind === "") {
    return PAGE_KEYS.HOME;
  }

  for (const pageKey in slugsConfig[lang]) {
    if (Object.prototype.hasOwnProperty.call(slugsConfig[lang], pageKey)) {
      if (slugsConfig[lang][pageKey as PageKey] === slugToFind) {
        return pageKey as PageKey;
      }
    }
  }

  if (lang !== defaultLang) {
    for (const pageKey in slugsConfig[defaultLang]) {
      if (
        Object.prototype.hasOwnProperty.call(slugsConfig[defaultLang], pageKey)
      ) {
        if (slugsConfig[defaultLang][pageKey as PageKey] === slugToFind) {
          return pageKey as PageKey;
        }
      }
    }
  }

  const potentialPageKey = slugToFind.toUpperCase() as PageKey;
  if (Object.values(PAGE_KEYS).includes(potentialPageKey)) {
    for (const l of supportedLngs) {
      if (slugsConfig[l][potentialPageKey] === slugToFind) {
        return potentialPageKey;
      }
    }
  }

  return undefined;
}
