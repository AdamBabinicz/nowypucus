import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import {
  PAGE_KEYS,
  getLocalizedPath,
  getCanonicalKeyFromSlug,
  PageKey,
  defaultLang,
  supportedLngs,
  getLocalizedSlug,
} from "@/config/slugs";

type SupportedLanguage = (typeof supportedLngs)[number];

export const SchemaOrg = () => {
  const { t, i18n } = useTranslation();
  const [locationPath] = useLocation();
  const langFromI18n = i18n.language.split("-")[0];
  const currentLang: SupportedLanguage = supportedLngs.includes(
    langFromI18n as SupportedLanguage
  )
    ? (langFromI18n as SupportedLanguage)
    : defaultLang;

  const baseUrl = "https://pranie-dywanow.j.pl";

  let canonicalUrlPath = locationPath;
  const pathOnly = locationPath.split("#")[0];
  const pathSegmentsForCanonical = pathOnly.substring(1).split("/");
  const firstSegmentCanonical = pathSegmentsForCanonical[0];

  if (
    supportedLngs.includes(firstSegmentCanonical as SupportedLanguage) &&
    firstSegmentCanonical !== defaultLang
  ) {
    const langInUrl = firstSegmentCanonical as SupportedLanguage;
    const slugWithoutLang =
      pathSegmentsForCanonical.slice(1).join("/") ||
      getLocalizedSlug(PAGE_KEYS.HOME, langInUrl);
    const canonicalKey =
      getCanonicalKeyFromSlug(slugWithoutLang, langInUrl) || PAGE_KEYS.HOME;
    canonicalUrlPath = getLocalizedPath(canonicalKey, defaultLang);
  } else if (
    firstSegmentCanonical === getLocalizedSlug(PAGE_KEYS.HOME, currentLang) &&
    currentLang !== defaultLang &&
    pathSegmentsForCanonical.length === 1
  ) {
    canonicalUrlPath = getLocalizedPath(PAGE_KEYS.HOME, defaultLang);
  }

  if (
    pathOnly === getLocalizedPath(PAGE_KEYS.HOME, defaultLang) ||
    pathOnly === "/"
  ) {
    canonicalUrlPath = getLocalizedPath(PAGE_KEYS.HOME, defaultLang);
  }
  const canonicalUrl = `${baseUrl}${canonicalUrlPath.split("#")[0]}`; // Usuwamy hash z canonical

  const socialLinksHrefs = [
    "https://www.facebook.com/super.pucus",
    "https://www.instagram.com/mariuszkucharski7",
    "https://m.me/super.pucus",
    "https://twitter.com/Mariusz04417578",
    "https://pl.pinterest.com/praniedywanow03",
    "https://www.youtube.com/channel/UCKRWZoyA4cWXHANrQmwZiyw",
    "https://maps.app.goo.gl/htxu5uJDo4ZiFsKo6",
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": baseUrl,
    name: t("schema.serviceName"),
    description: t("schema.serviceDescription"),
    address: {
      "@type": "PostalAddress",
      streetAddress: t("schema.streetAddress"),
      addressLocality: t("schema.locality"),
      postalCode: t("schema.postalCode"),
      addressCountry: t("schema.country"),
    },
    telephone: "+48531890827",
    email: "mariusz1989poczta@wp.pl",
    url: baseUrl,
    image: `${baseUrl}/images/logo-og.avif`,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    sameAs: socialLinksHrefs,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("schema.websiteName"),
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: t("schema.searchActionTarget"),
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: currentLang,
  };

  const getBreadcrumbList = () => {
    const homePath = getLocalizedPath(PAGE_KEYS.HOME, currentLang);
    const pathWithoutHash = locationPath.split("#")[0];

    if (
      pathWithoutHash === homePath ||
      (pathWithoutHash === "/" &&
        homePath === getLocalizedPath(PAGE_KEYS.HOME, defaultLang))
    ) {
      if (pathWithoutHash !== "/" || currentLang !== defaultLang) {
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: t(
                `breadcrumbs.${getLocalizedSlug(PAGE_KEYS.HOME, currentLang)}`,
                t("nav.home")
              ),
              item: `${baseUrl}${pathWithoutHash}`,
            },
          ],
        };
      }
      return null;
    }

    const correctedItemList: any[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: t(
          `breadcrumbs.${getLocalizedSlug(PAGE_KEYS.HOME, currentLang)}`,
          t("nav.home")
        ),
        item: `${baseUrl}${homePath}`,
      },
    ];

    let currentBuiltPathForBreadcrumbs = homePath;
    const pathSegments = pathWithoutHash
      .substring(1)
      .split("/")
      .filter(Boolean);

    let segmentsToIterate = pathSegments;
    const homeSlugForCurrentLang = getLocalizedSlug(
      PAGE_KEYS.HOME,
      currentLang
    );

    if (
      currentLang !== defaultLang &&
      pathSegments.length > 0 &&
      pathSegments[0] === homeSlugForCurrentLang
    ) {
      segmentsToIterate = pathSegments.slice(1);
    } else if (currentLang === defaultLang && homePath === "/") {
      currentBuiltPathForBreadcrumbs = "";
    }

    segmentsToIterate.forEach((segment) => {
      if (currentBuiltPathForBreadcrumbs === "/" && segment === "") return;
      currentBuiltPathForBreadcrumbs =
        currentBuiltPathForBreadcrumbs === "/"
          ? `/${segment}`
          : `${currentBuiltPathForBreadcrumbs}/${segment}`;

      const canonicalKey = getCanonicalKeyFromSlug(segment, currentLang);
      const breadcrumbNameKey = `breadcrumbs.${segment}`;
      const navNameKey = canonicalKey
        ? `nav.${String(canonicalKey).toLowerCase()}`
        : segment;

      correctedItemList.push({
        "@type": "ListItem",
        position: correctedItemList.length + 1,
        name: t(
          breadcrumbNameKey,
          t(
            navNameKey,
            segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
          )
        ),
        item: `${baseUrl}${currentBuiltPathForBreadcrumbs}`,
      });
    });

    if (correctedItemList.length <= 1) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: correctedItemList,
    };
  };

  const breadcrumbSchema = getBreadcrumbList();
  const alternateLinks: JSX.Element[] = [];

  let slugForCanonicalKeyDetermination = locationPath
    .substring(1)
    .split("#")[0];
  const homeSlugForCurrentLangForAlternates = getLocalizedSlug(
    PAGE_KEYS.HOME,
    currentLang
  );

  if (locationPath === "/") {
    // Jesteśmy na "/", więc klucz kanoniczny to HOME
  } else if (
    slugForCanonicalKeyDetermination === homeSlugForCurrentLangForAlternates &&
    currentLang !== defaultLang
  ) {
    // Jesteśmy na stronie głównej języka innego niż domyślny (np. /home dla en), slug to "home"
    // klucz kanoniczny to HOME
  } else if (
    currentLang !== defaultLang &&
    homeSlugForCurrentLangForAlternates &&
    slugForCanonicalKeyDetermination.startsWith(
      homeSlugForCurrentLangForAlternates + "/"
    )
  ) {
    // Jesteśmy na podstronie języka innego niż domyślny (np. /home/services), usuwamy /home
    slugForCanonicalKeyDetermination =
      slugForCanonicalKeyDetermination.substring(
        homeSlugForCurrentLangForAlternates.length + 1
      );
  }
  // Jeśli po tych operacjach slugForCanonicalKeyDetermination jest pusty, to znaczy, że to strona główna
  if (slugForCanonicalKeyDetermination === "") {
    slugForCanonicalKeyDetermination = getLocalizedSlug(
      PAGE_KEYS.HOME,
      currentLang
    ); // Użyj slugu home dla bieżącego języka
  }

  const canonicalKeyCurrentPage =
    getCanonicalKeyFromSlug(slugForCanonicalKeyDetermination, currentLang) ||
    PAGE_KEYS.HOME;

  supportedLngs.forEach((lng) => {
    const targetLang = lng as SupportedLanguage; // Asercja typu
    const alternatePath = getLocalizedPath(canonicalKeyCurrentPage, targetLang);
    alternateLinks.push(
      <link
        key={targetLang}
        rel="alternate"
        hrefLang={targetLang}
        href={`${baseUrl}${alternatePath}`}
      />
    );
  });

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      {alternateLinks}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${getLocalizedPath(PAGE_KEYS.HOME, defaultLang)}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema &&
        breadcrumbSchema.itemListElement &&
        breadcrumbSchema.itemListElement.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}
    </Helmet>
  );
};
