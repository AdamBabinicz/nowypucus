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
} from "@/config/slugs";

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
      defaultLang,
    );
    langUsedInUrl = defaultLang;
  } else if (
    slugPathToDetermineCanonicalKey === "" &&
    pathSegments[0] === langUsedInUrl &&
    pathSegments.length === 1
  ) {
    slugPathToDetermineCanonicalKey = getLocalizedSlug(
      PAGE_KEYS.HOME,
      langUsedInUrl,
    );
  }

  const canonicalKeyCurrentPage: PageKey =
    getCanonicalKeyFromSlug(slugPathToDetermineCanonicalKey, langUsedInUrl) ||
    PAGE_KEYS.HOME;

  const currentLocalizedPath = getLocalizedPath(
    canonicalKeyCurrentPage,
    langUsedInUrl,
  );
  const canonicalUrl = `${baseUrl}${currentLocalizedPath.split("#")[0]}`;

  const socialLinksHrefs = [
    "https://www.facebook.com/super.pucus",
    "https://www.instagram.com/mariuszkucharski7",
    "https://m.me/super.pucus",
    "https://twitter.com/Mariusz04417578",
    "https://pl.pinterest.com/praniedywanow03",
    "https://www.youtube.com/@SuperPucus",
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
    email: "mariuszek1989poczta@wp.pl",
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
    inLanguage: langUsedInUrl,
  };

  const getBreadcrumbList = (): BreadcrumbListSchema | null => {
    const currentLangForBreadcrumbs = langUsedInUrl;
    const currentLangHomePath = getLocalizedPath(
      PAGE_KEYS.HOME,
      currentLangForBreadcrumbs,
    );
    const pathForBreadcrumbs = locationPath.split("#")[0];

    const itemList: BreadcrumbItem[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbs.home"),
        item: `${baseUrl}${currentLangHomePath.split("#")[0]}`,
      },
    ];

    const isCurrentLangHomePage = pathForBreadcrumbs === currentLangHomePath;

    if (!isCurrentLangHomePage) {
      const pathSegmentsForBreadcrumbs = pathForBreadcrumbs
        .substring(1)
        .split("/")
        .filter(Boolean);

      let segmentsToIterate = pathSegmentsForBreadcrumbs;
      let builtPathForItems = "";

      if (supportedLngs.includes(segmentsToIterate[0] as SupportedLanguage)) {
        builtPathForItems = `/${segmentsToIterate[0]}`;
        segmentsToIterate = segmentsToIterate.slice(1);
      } else {
        builtPathForItems = getLocalizedPath(
          PAGE_KEYS.HOME,
          defaultLang,
        ).endsWith("/")
          ? getLocalizedPath(PAGE_KEYS.HOME, defaultLang).slice(0, -1)
          : getLocalizedPath(PAGE_KEYS.HOME, defaultLang);
      }

      segmentsToIterate.forEach((segmentSlug) => {
        builtPathForItems = `${builtPathForItems}/${segmentSlug}`;

        const breadcrumbKey = `breadcrumbs.${segmentSlug}`;
        const segmentBreadcrumbName = t(
          breadcrumbKey,
          segmentSlug.replace(/-/g, " "),
        );

        itemList.push({
          "@type": "ListItem",
          position: itemList.length + 1,
          name: segmentBreadcrumbName,
          item: `${baseUrl}${builtPathForItems.split("#")[0]}`,
        });
      });
    }

    if (itemList.length <= 1 && isCurrentLangHomePage) return null;
    if (itemList.length === 0) return null;

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
      />,
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
