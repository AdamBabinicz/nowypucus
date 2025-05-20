import React, { useEffect, useRef } from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import { useTranslation } from "react-i18next";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Oferta from "@/pages/Oferta";
import OFirmie from "@/pages/OFirmie";
import Realizacje from "@/pages/Realizacje";
import Sprzet from "@/pages/Sprzet";
import Contact from "@/pages/Contact";
import Regulamin from "@/pages/Regulamin";
import PolitykaPrywatnosci from "@/pages/PolitykaPrywatnosci";
import {
  PAGE_KEYS,
  getLocalizedPath,
  getCanonicalKeyFromSlug,
  getLocalizedSlug,
  supportedLngs,
  defaultLang,
  SupportedLanguage,
} from "@/config/slugs";

export const HEADER_OFFSET = 70;

export default function App() {
  const { i18n } = useTranslation();
  const [locationPath, setLocation] = useLocation();
  const currentUiLang = i18n.language.split("-")[0] as SupportedLanguage;

  const prevLocationPathRef = useRef(locationPath);
  const prevUiLangRef = useRef(currentUiLang);

  useEffect(() => {
    const pathSegments = locationPath.substring(1).split("/");
    let detectedLangInUrl: SupportedLanguage | undefined = undefined;
    let slugWithoutLang = "";

    if (
      pathSegments.length > 0 &&
      supportedLngs.includes(pathSegments[0] as SupportedLanguage)
    ) {
      detectedLangInUrl = pathSegments[0] as SupportedLanguage;
      slugWithoutLang = pathSegments.slice(1).join("/");
    } else if (locationPath === "/") {
      detectedLangInUrl = defaultLang;
    } else {
      const potentialKey = getCanonicalKeyFromSlug(
        pathSegments.join("/"),
        defaultLang
      );
      if (potentialKey) {
        detectedLangInUrl = defaultLang;
      }
    }

    if (detectedLangInUrl && detectedLangInUrl !== currentUiLang) {
      if (
        locationPath !== prevLocationPathRef.current ||
        detectedLangInUrl !== prevUiLangRef.current
      ) {
        i18n.changeLanguage(detectedLangInUrl);
      }
    }
    prevLocationPathRef.current = locationPath;
  }, [locationPath, i18n, currentUiLang]);

  useEffect(() => {
    if (currentUiLang !== prevUiLangRef.current) {
      const langBeforeThisEffect = prevUiLangRef.current;
      const currentPathWithoutHash = locationPath.split("#")[0];
      const currentHash = locationPath.includes("#")
        ? `#${locationPath.split("#")[1]}`
        : "";

      const pathSegmentsOldLang = currentPathWithoutHash
        .substring(1)
        .split("/");
      let slugFromOldLangUrl = "";
      let oldLangForCanonicalLookup = langBeforeThisEffect;

      if (
        langBeforeThisEffect !== defaultLang &&
        pathSegmentsOldLang.length > 0 &&
        pathSegmentsOldLang[0] === langBeforeThisEffect
      ) {
        slugFromOldLangUrl = pathSegmentsOldLang.slice(1).join("/");
      } else if (langBeforeThisEffect === defaultLang) {
        slugFromOldLangUrl = pathSegmentsOldLang.join("/");
      } else {
        slugFromOldLangUrl = pathSegmentsOldLang.join("/");
        oldLangForCanonicalLookup = defaultLang;
      }

      if (
        currentPathWithoutHash === "/" ||
        (currentPathWithoutHash === `/${langBeforeThisEffect}` &&
          langBeforeThisEffect !== defaultLang)
      ) {
        slugFromOldLangUrl = getLocalizedSlug(
          PAGE_KEYS.HOME,
          langBeforeThisEffect
        );
      }

      let canonicalPageKey =
        getCanonicalKeyFromSlug(
          slugFromOldLangUrl,
          oldLangForCanonicalLookup
        ) || PAGE_KEYS.HOME;

      if (
        (currentPathWithoutHash === "/" &&
          langBeforeThisEffect === defaultLang) ||
        (currentPathWithoutHash === `/${langBeforeThisEffect}` &&
          langBeforeThisEffect !== defaultLang)
      ) {
        canonicalPageKey = PAGE_KEYS.HOME;
      }

      const newLocalizedFullPath = getLocalizedPath(
        canonicalPageKey,
        currentUiLang
      );
      let finalPathWithHash = newLocalizedFullPath;

      if (currentHash) {
        const hashWithoutSymbol = currentHash.substring(1);
        const canonicalHashKey = getCanonicalKeyFromSlug(
          hashWithoutSymbol,
          langBeforeThisEffect
        );
        if (canonicalHashKey) {
          const newLocalizedHashSlug = getLocalizedSlug(
            canonicalHashKey,
            currentUiLang
          );
          finalPathWithHash += `#${newLocalizedHashSlug}`;
        } else {
          finalPathWithHash += currentHash;
        }
      }

      if (finalPathWithHash !== locationPath) {
        setLocation(finalPathWithHash, { replace: true });
        prevLocationPathRef.current = finalPathWithHash;
      }
    }
    prevUiLangRef.current = currentUiLang;
  }, [currentUiLang, locationPath, setLocation, i18n]);

  useEffect(() => {
    const portfolioPathForCurrentLang = getLocalizedPath(
      PAGE_KEYS.PORTFOLIO,
      currentUiLang
    );
    const currentPathSlugOnly = locationPath.split("#")[0];

    if (
      currentPathSlugOnly === portfolioPathForCurrentLang &&
      window.location.hash
    ) {
      return;
    }

    const hash = window.location.hash;
    if (hash) {
      const localizedHashValue = hash.substring(1);
      const canonicalKeyForHash = getCanonicalKeyFromSlug(
        localizedHashValue,
        currentUiLang
      );
      const idToScroll = canonicalKeyForHash || localizedHashValue;

      const attemptScroll = (attempt = 0) => {
        const element = document.getElementById(idToScroll);
        if (element) {
          const yOffset = -HEADER_OFFSET;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else if (attempt < 10) {
          setTimeout(() => attemptScroll(attempt + 1), 150);
        }
      };
      const timer = setTimeout(attemptScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [locationPath, currentUiLang]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <AppRouter />
          <Toaster />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppRouter() {
  return (
    <Switch>
      {supportedLngs.map((lang) => (
        <React.Fragment key={`lang-routes-${lang}`}>
          <Route
            path={getLocalizedPath(PAGE_KEYS.HOME, lang)}
            component={Home}
          />
          <Route
            path={getLocalizedPath(PAGE_KEYS.OFFER, lang)}
            component={Oferta}
          />
          <Route
            path={getLocalizedPath(PAGE_KEYS.ABOUT, lang)}
            component={OFirmie}
          />
          <Route
            path={getLocalizedPath(PAGE_KEYS.PORTFOLIO, lang)}
            component={Realizacje}
          />
          <Route
            path={getLocalizedPath(PAGE_KEYS.EQUIPMENT, lang)}
            component={Sprzet}
          />
          <Route
            path={getLocalizedPath(PAGE_KEYS.CONTACT, lang)}
            component={Contact}
          />
          <Route
            path={getLocalizedPath(PAGE_KEYS.TERMS, lang)}
            component={Regulamin}
          />
          <Route
            path={getLocalizedPath(PAGE_KEYS.PRIVACY, lang)}
            component={PolitykaPrywatnosci}
          />
          {lang !== defaultLang && (
            <Route path={`/${lang}/:rest*`} component={NotFound} />
          )}
        </React.Fragment>
      ))}
      <Route path="/:rest*" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
