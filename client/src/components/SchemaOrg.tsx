import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import {
  PAGE_KEYS,
  getLocalizedPath,
  getCanonicalKeyFromSlug,
  defaultLang,
  supportedLngs,
  getLocalizedSlug,
  SupportedLanguage,
  PageKey,
} from "@/config/slugs"; // Dodaj PageKey, jeśli nie ma

// Definicje typów dla breadcrumbs
interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbItem[];
}

export const SchemaOrg = () => {
  const { t, i18n } = useTranslation();
  const [locationPath] = useLocation();
  // const currentUiLang = i18n.language.split("-")[0] as SupportedLanguage; // Język UI

  const baseUrl = "https://pranie-dywanow.j.pl";

  const pathOnly = locationPath.split("#")[0];
  const pathSegments = pathOnly.substring(1).split("/");

  let langUsedInUrl: SupportedLanguage = defaultLang;
  let slugPathToDetermineCanonicalKey: string;

  if (
    pathSegments.length > 0 &&
    supportedLngs.includes(pathSegments[0] as SupportedLanguage)
  ) {
    langUsedInUrl = pathSegments[0] as SupportedLanguage;
    slugPathToDetermineCanonicalKey = pathSegments.slice(1).join("/");
  } else {
    slugPathToDetermineCanonicalKey = pathSegments.join("/");
  }

  if (slugPathToDetermineCanonicalKey === "" && pathOnly === "/") {
    slugPathToDetermineCanonicalKey = getLocalizedSlug(
      PAGE_KEYS.HOME,
      defaultLang
    );
    langUsedInUrl = defaultLang;
  } else if (
    slugPathToDetermineCanonicalKey === "" &&
    pathSegments[0] === langUsedInUrl &&
    pathSegments.length === 1
  ) {
    slugPathToDetermineCanonicalKey = getLocalizedSlug(
      PAGE_KEYS.HOME,
      langUsedInUrl
    );
  }

  const canonicalKeyCurrentPage: PageKey =
    getCanonicalKeyFromSlug(slugPathToDetermineCanonicalKey, langUsedInUrl) ||
    PAGE_KEYS.HOME;

  const currentLocalizedPath = getLocalizedPath(
    canonicalKeyCurrentPage,
    langUsedInUrl
  );
  const canonicalUrl = `${baseUrl}${currentLocalizedPath.split("#")[0]}`;

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
        urlTemplate: `${baseUrl}/${
          langUsedInUrl === defaultLang ? "" : langUsedInUrl + "/"
        }search?q={search_term_string}`.replace(
          "{search_term_string}",
          "{search_term_string}"
        ),
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: langUsedInUrl,
  };

  const getBreadcrumbList = (): BreadcrumbListSchema | null => {
    const currentLangForBreadcrumbs = langUsedInUrl;
    const currentLangHomePath = getLocalizedPath(
      PAGE_KEYS.HOME,
      currentLangForBreadcrumbs
    );
    const pathForBreadcrumbs = locationPath.split("#")[0];

    const homeBreadcrumbNameKey = `breadcrumbs.${String(
      PAGE_KEYS.HOME
    ).toLowerCase()}`;
    const navHomeNameKey = `nav.home`;
    let firstBreadcrumbName = i18n.exists(homeBreadcrumbNameKey)
      ? t(homeBreadcrumbNameKey)
      : t(navHomeNameKey);

    const itemList: BreadcrumbItem[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: firstBreadcrumbName,
        item: `${baseUrl}${currentLangHomePath.split("#")[0]}`,
      },
    ];

    const isDefaultLangHomePage =
      pathForBreadcrumbs === getLocalizedPath(PAGE_KEYS.HOME, defaultLang) &&
      currentLangForBreadcrumbs === defaultLang;
    const isCurrentLangHomePage = pathForBreadcrumbs === currentLangHomePath;

    if (isDefaultLangHomePage) {
      if (itemList.length === 1) return null; // Nie pokazuj dla PL strony głównej jeśli tylko 1 element
    }
    // Dla strony głównej w innym języku niż domyślny (np. /en),
    // możesz chcieć zostawić breadcrumb "Home"
    // Jeśli nie chcesz, odkomentuj poniższy blok:
    /*
    else if (isCurrentLangHomePage && currentLangForBreadcrumbs !== defaultLang) {
        if (itemList.length === 1) return null;
    }
    */

    if (!isCurrentLangHomePage) {
      // Tylko jeśli nie jesteśmy na stronie głównej bieżącego języka
      const pathSegmentsForBreadcrumbs = pathForBreadcrumbs
        .substring(1)
        .split("/")
        .filter(Boolean);

      let segmentsToIterate = pathSegmentsForBreadcrumbs;
      let builtPathForItems = ""; // Zaczynamy od pustego, bo prefix językowy jest częścią segmentów

      // Określ, czy pierwszy segment to język i ustaw poprawnie builtPathForItems
      if (supportedLngs.includes(segmentsToIterate[0] as SupportedLanguage)) {
        builtPathForItems = `/${segmentsToIterate[0]}`;
        segmentsToIterate = segmentsToIterate.slice(1); // Usuń język z segmentów do iteracji
      } else {
        // Jeśli nie ma prefixu językowego, zakładamy język domyślny
        // a ścieżka zaczyna się od slasha (dla strony głównej już obsłużone)
        // dla podstron w domyślnym języku:
        builtPathForItems = getLocalizedPath(
          PAGE_KEYS.HOME,
          defaultLang
        ).endsWith("/")
          ? getLocalizedPath(PAGE_KEYS.HOME, defaultLang).slice(0, -1)
          : getLocalizedPath(PAGE_KEYS.HOME, defaultLang);
      }

      segmentsToIterate.forEach((segmentSlug) => {
        builtPathForItems = `${builtPathForItems}/${segmentSlug}`;

        const canonicalKey = getCanonicalKeyFromSlug(
          segmentSlug,
          currentLangForBreadcrumbs
        );
        const breadcrumbNameKeyForSegment = canonicalKey
          ? `breadcrumbs.${String(canonicalKey).toLowerCase()}`
          : `breadcrumbs.${segmentSlug}`;
        const navNameKeyForSegment = canonicalKey
          ? `nav.${String(canonicalKey).toLowerCase()}`
          : null;
        const fallbackSegmentName = segmentSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        let segmentBreadcrumbName;
        if (i18n.exists(breadcrumbNameKeyForSegment)) {
          segmentBreadcrumbName = t(breadcrumbNameKeyForSegment);
        } else if (navNameKeyForSegment && i18n.exists(navNameKeyForSegment)) {
          segmentBreadcrumbName = t(navNameKeyForSegment);
        } else {
          segmentBreadcrumbName = fallbackSegmentName;
        }

        itemList.push({
          "@type": "ListItem",
          position: itemList.length + 1,
          name: segmentBreadcrumbName,
          item: `${baseUrl}${builtPathForItems.split("#")[0]}`,
        });
      });
    }

    if (itemList.length <= 1 && isCurrentLangHomePage) return null; // Jeśli to strona główna (dowolnego języka) i ma tylko 1 element
    if (itemList.length === 0) return null; // Na wszelki wypadek

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: itemList,
    };
  };

  const breadcrumbSchema = getBreadcrumbList();

  const alternateLinks: JSX.Element[] = [];
  supportedLngs.forEach((lng) => {
    const alternatePath = getLocalizedPath(canonicalKeyCurrentPage, lng);
    alternateLinks.push(
      <link
        key={lng}
        rel="alternate"
        hrefLang={lng}
        href={`${baseUrl}${alternatePath.split("#")[0]}`}
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
        href={`${baseUrl}${
          getLocalizedPath(canonicalKeyCurrentPage, defaultLang).split("#")[0]
        }`}
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};
