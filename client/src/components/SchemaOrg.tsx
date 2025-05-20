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
  SupportedLanguage,
} from "@/config/slugs";

export const SchemaOrg = () => {
  const { t, i18n } = useTranslation();
  const [locationPath] = useLocation();
  const langFromI18n = i18n.language.split("-")[0] as SupportedLanguage;
  const currentLang: SupportedLanguage = supportedLngs.includes(langFromI18n)
    ? langFromI18n
    : defaultLang;

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
  if (slugPathToDetermineCanonicalKey === "" || pathOnly === "/") {
    // Obsługa / i /lang/
    slugPathToDetermineCanonicalKey = getLocalizedSlug(
      PAGE_KEYS.HOME,
      langUsedInUrl
    ); // Powinno być ""
  }

  const canonicalKeyCurrentPage =
    getCanonicalKeyFromSlug(slugPathToDetermineCanonicalKey, langUsedInUrl) ||
    PAGE_KEYS.HOME;
  const canonicalUrlPath = getLocalizedPath(
    canonicalKeyCurrentPage,
    defaultLang
  );
  const canonicalUrl = `${baseUrl}${canonicalUrlPath.split("#")[0]}`;

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
        urlTemplate: t("schema.searchActionTarget").replace(
          "{search_term_string}",
          "{search_term_string}"
        ),
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: currentLang,
  };

  const getBreadcrumbList = () => {
    const currentLangHomePath = getLocalizedPath(PAGE_KEYS.HOME, currentLang); // np. / lub /en/
    const pathForBreadcrumbs = locationPath.split("#")[0];

    let firstBreadcrumbName;
    const homeSlugForCurrentLangBreadcrumb = getLocalizedSlug(
      PAGE_KEYS.HOME,
      currentLang
    ); // ""
    const firstBreadcrumbKey = `breadcrumbs.${homeSlugForCurrentLangBreadcrumb}`; // breadcrumbs.

    if (homeSlugForCurrentLangBreadcrumb && i18n.exists(firstBreadcrumbKey)) {
      firstBreadcrumbName = t(firstBreadcrumbKey);
    } else {
      firstBreadcrumbName = t("nav.home");
    }

    const itemList: any[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: firstBreadcrumbName,
        item: `${baseUrl}${currentLangHomePath}`,
      },
    ];

    if (pathForBreadcrumbs === currentLangHomePath) {
      if (
        itemList.length === 1 &&
        currentLang === defaultLang &&
        pathForBreadcrumbs === "/"
      ) {
        return null; // Nie pokazuj breadcrumbs dla samej strony głównej w domyślnym języku
      }
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: itemList,
      };
    }

    const pathSegmentsForBreadcrumbs = pathForBreadcrumbs
      .substring(1)
      .split("/")
      .filter(Boolean);
    let segmentsToIterate = pathSegmentsForBreadcrumbs;

    if (
      currentLang !== defaultLang &&
      segmentsToIterate.length > 0 &&
      segmentsToIterate[0] === currentLang
    ) {
      segmentsToIterate = segmentsToIterate.slice(1); // Usuń prefiks języka z segmentów
    }

    let builtPathForItems = currentLangHomePath;

    segmentsToIterate.filter(Boolean).forEach((segmentSlug) => {
      if (builtPathForItems.endsWith("/") && segmentSlug) {
        builtPathForItems = `${builtPathForItems}${segmentSlug}`;
      } else if (segmentSlug) {
        builtPathForItems = `${builtPathForItems}/${segmentSlug}`;
      }

      const canonicalKey = getCanonicalKeyFromSlug(segmentSlug, currentLang);
      const breadcrumbNameKeyForSegment = `breadcrumbs.${segmentSlug}`;

      const navNameKeyForSegment = canonicalKey
        ? `nav.${String(canonicalKey).toLowerCase()}`
        : segmentSlug;
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
        item: `${baseUrl}${builtPathForItems}`,
      });
    });

    if (itemList.length <= 1) return null;

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
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};
