import { useState, useEffect } from "react";
import { Link as WouterLink, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import {
  getLocalizedPath,
  getLocalizedSlug,
  PAGE_KEYS,
  PageKey,
} from "@/config/slugs";
import logoLightPath from "@assets/logo.svg";
import logoDarkPath from "@assets/logo-j.svg";

const HEADER_OFFSET = 70;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPath, navigate] = useLocation();
  const [currentLogo, setCurrentLogo] = useState(logoLightPath);

  useEffect(() => {
    const updateLogoBasedOnTheme = () => {
      if (document.documentElement.classList.contains("dark")) {
        setCurrentLogo(logoDarkPath);
      } else {
        setCurrentLogo(logoLightPath);
      }
    };
    updateLogoBasedOnTheme();
    const observer = new MutationObserver(updateLogoBasedOnTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleDropdown = (section?: string) => {
    const keyToToggle = section || "portfolio";
    setIsDropdownOpen((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        if (key !== keyToToggle) acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean }),
      [keyToToggle]: !prev[keyToToggle],
    }));
  };

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen({});
  }, [currentPath]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsDropdownOpen({});
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLocalizedLinkClick = (pageKey: PageKey, hashKey?: PageKey) => {
    if (isOpen) setIsOpen(false);
    setIsDropdownOpen({});

    let targetPath = getLocalizedPath(pageKey, currentLang);
    let localizedHashSlug = "";
    if (hashKey) {
      localizedHashSlug = getLocalizedSlug(hashKey, currentLang);
      targetPath += `#${localizedHashSlug}`;
    }

    const currentBasePath = currentPath.split("#")[0];
    const targetBasePath = targetPath.split("#")[0];

    if (currentBasePath !== targetBasePath) {
      navigate(targetPath); // Zwykła nawigacja do nowej strony
    } else {
      // Jesteśmy na tej samej stronie bazowej, zmieniamy tylko hash (lub odświeżamy)
      if (hashKey) {
        // Jeśli hash się faktycznie zmienia, ustawienie window.location.hash powinno wystarczyć
        // aby wywołać listener 'hashchange' w komponencie Realizacje
        if (window.location.hash !== `#${localizedHashSlug}`) {
          window.location.hash = localizedHashSlug;
        } else {
          // Hash jest ten sam, ale chcemy przewinąć (np. użytkownik kliknął ten sam link ponownie)
          const elementId = localizedHashSlug;
          const element = document.getElementById(elementId);
          if (element) {
            const yOffset = -HEADER_OFFSET;
            const y =
              element.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      } else if (
        pageKey === PAGE_KEYS.HOME &&
        currentPath === getLocalizedPath(PAGE_KEYS.HOME, currentLang)
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Jeśli nie ma hasha, a jesteśmy na tej samej stronie bazowej,
        // możemy chcieć przewinąć na górę tej strony
        const element = document.getElementById(pageKey); // Zakładając, że główny kontener strony ma ID równy PageKey
        if (element) {
          const yOffset = -HEADER_OFFSET;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" }); // Domyślnie na górę
        }
      }
      // Aktualizacja ścieżki w wouter, aby odzwierciedlała hash (ważne dla historii i odświeżania)
      // Używamy navigate z wouter, aby uniknąć pełnego przeładowania strony.
      if (navigate && currentPath !== targetPath) {
        // navigate może nie być potrzebne jeśli window.location.hash wystarczy
        navigate(targetPath, { replace: true });
      }
    }
  };

  const navLinkClasses = (pageKey: PageKey) => {
    const localizedTarget = getLocalizedPath(pageKey, currentLang);
    const isActive = currentPath.split("#")[0] === localizedTarget;
    return `font-medium ${
      isActive
        ? "text-primary dark:text-primary-400"
        : "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400"
    } transition-colors`;
  };

  const mobileNavLinkClasses = (pageKey: PageKey) => {
    const localizedTarget = getLocalizedPath(pageKey, currentLang);
    const isActive = currentPath.split("#")[0] === localizedTarget;
    return `block py-2.5 font-medium ${
      isActive
        ? "text-primary dark:text-primary-400"
        : "text-gray-700 dark:text-gray-200"
    }`;
  };

  const portfolioDropdownLinks = [
    { labelKey: "portfolio.carpets", hashKey: PAGE_KEYS.HASH_CARPETS },
    { labelKey: "portfolio.flooring", hashKey: PAGE_KEYS.HASH_FLOORING },
    { labelKey: "portfolio.furniture", hashKey: PAGE_KEYS.HASH_UPHOLSTERY },
    { labelKey: "portfolio.pavers", hashKey: PAGE_KEYS.HASH_PAVERS_TILES },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-md">
      <nav className="container mx-auto px-4 h-17.5 flex items-center justify-between">
        <div className="flex items-center">
          <WouterLink
            href={getLocalizedPath(PAGE_KEYS.HOME, currentLang)}
            className="flex items-center cursor-pointer"
            onClick={() => handleLocalizedLinkClick(PAGE_KEYS.HOME)}
          >
            <img
              src={currentLogo}
              alt="SUPER PUCUŚ Logo"
              className="h-7 sm:h-8 w-auto"
            />
            <span className="ml-2 text-lg font-major-mono font-semibold text-primary dark:text-sky-400">
              SUPER PUCUŚ
            </span>
          </WouterLink>
        </div>
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <ul className="flex space-x-4 xl:space-x-5">
            <li>
              <WouterLink
                href={getLocalizedPath(PAGE_KEYS.HOME, currentLang)}
                onClick={() => handleLocalizedLinkClick(PAGE_KEYS.HOME)}
                className={navLinkClasses(PAGE_KEYS.HOME)}
              >
                {t("nav.home")}
              </WouterLink>
            </li>
            <li>
              <WouterLink
                href={getLocalizedPath(PAGE_KEYS.OFFER, currentLang)}
                onClick={() => handleLocalizedLinkClick(PAGE_KEYS.OFFER)}
                className={navLinkClasses(PAGE_KEYS.OFFER)}
              >
                {t("nav.offer")}
              </WouterLink>
            </li>
            <li>
              <WouterLink
                href={getLocalizedPath(PAGE_KEYS.ABOUT, currentLang)}
                onClick={() => handleLocalizedLinkClick(PAGE_KEYS.ABOUT)}
                className={navLinkClasses(PAGE_KEYS.ABOUT)}
              >
                {t("nav.about")}
              </WouterLink>
            </li>
            <li className="relative">
              <button
                onClick={() => toggleDropdown("portfolio")}
                className={`${navLinkClasses(
                  PAGE_KEYS.PORTFOLIO
                )} flex items-center`}
              >
                {t("nav.portfolio")}
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform ${
                    isDropdownOpen["portfolio"] ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <AnimatePresence>
                {isDropdownOpen["portfolio"] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-xl py-1 z-20 ring-1 ring-black ring-opacity-5"
                  >
                    {portfolioDropdownLinks.map((link) => (
                      <a
                        key={link.hashKey}
                        href={`${getLocalizedPath(
                          PAGE_KEYS.PORTFOLIO,
                          currentLang
                        )}#${getLocalizedSlug(link.hashKey, currentLang)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLocalizedLinkClick(
                            PAGE_KEYS.PORTFOLIO,
                            link.hashKey
                          );
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-700"
                      >
                        {t(link.labelKey)}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <WouterLink
                href={getLocalizedPath(PAGE_KEYS.EQUIPMENT, currentLang)}
                onClick={() => handleLocalizedLinkClick(PAGE_KEYS.EQUIPMENT)}
                className={navLinkClasses(PAGE_KEYS.EQUIPMENT)}
              >
                {t("nav.equipment")}
              </WouterLink>
            </li>
            <li>
              <WouterLink
                href={getLocalizedPath(PAGE_KEYS.CONTACT, currentLang)}
                onClick={() => handleLocalizedLinkClick(PAGE_KEYS.CONTACT)}
                className={navLinkClasses(PAGE_KEYS.CONTACT)}
              >
                {t("nav.contact")}
              </WouterLink>
            </li>
            <li>
              <a
                href="https://dywany-pranie.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400 transition-colors"
              >
                {t("nav.blog")}
              </a>
            </li>
          </ul>
          <div className="flex items-center space-x-3">
            <a
              href="tel:+48531890827"
              className="flex items-center font-semibold px-3 py-2 rounded-md transition-colors duration-300 bg-[hsl(var(--marine-h)_var(--marine-s)_65%)] text-[hsl(var(--marine-h)_30%_15%)] border-2 border-transparent hover:bg-transparent hover:text-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))] hover:border-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))] dark:hover:text-[hsl(var(--foreground))] dark:hover:border-[hsl(var(--foreground))]"
            >
              <FiPhone className="w-5 h-5 mr-2" />
              <span className="whitespace-nowrap">
                {t("nav.callNow")} +48 531 890 827
              </span>
            </a>
            <LanguageSelector />
            <ThemeToggle />
            <a
              href="https://m.me/super.pucus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
              aria-label="Connect on Messenger"
            >
              <BsMessenger className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="lg:hidden flex items-center space-x-3">
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-foreground dark:text-gray-200 focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: "auto" },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-slate-900 absolute w-full shadow-lg pb-4 top-[calc(4.375rem-1px)]"
          >
            <ul className="space-y-1 px-4">
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.HOME, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.HOME)}
                  className={mobileNavLinkClasses(PAGE_KEYS.HOME)}
                >
                  {t("nav.home")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.OFFER, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.OFFER)}
                  className={mobileNavLinkClasses(PAGE_KEYS.OFFER)}
                >
                  {t("nav.offer")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.ABOUT, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.ABOUT)}
                  className={mobileNavLinkClasses(PAGE_KEYS.ABOUT)}
                >
                  {t("nav.about")}
                </WouterLink>
              </li>
              <li>
                <button
                  onClick={() => toggleDropdown("portfolio")}
                  className={`flex justify-between items-center w-full py-2.5 font-medium ${mobileNavLinkClasses(
                    PAGE_KEYS.PORTFOLIO
                  )}`}
                >
                  {t("nav.portfolio")}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen["portfolio"] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <AnimatePresence>
                  {isDropdownOpen["portfolio"] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-1 space-y-1"
                    >
                      {portfolioDropdownLinks.map((link) => (
                        <a
                          key={link.hashKey}
                          href={`${getLocalizedPath(
                            PAGE_KEYS.PORTFOLIO,
                            currentLang
                          )}#${getLocalizedSlug(link.hashKey, currentLang)}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLocalizedLinkClick(
                              PAGE_KEYS.PORTFOLIO,
                              link.hashKey
                            );
                          }}
                          className="block py-1.5 text-gray-600 dark:text-gray-300"
                        >
                          {t(link.labelKey)}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.EQUIPMENT, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.EQUIPMENT)}
                  className={mobileNavLinkClasses(PAGE_KEYS.EQUIPMENT)}
                >
                  {t("nav.equipment")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.CONTACT, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.CONTACT)}
                  className={mobileNavLinkClasses(PAGE_KEYS.CONTACT)}
                >
                  {t("nav.contact")}
                </WouterLink>
              </li>
              <li>
                <a
                  href="https://dywany-pranie.blogspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsOpen(false);
                    setIsDropdownOpen({});
                  }}
                  className="block py-2.5 font-medium text-gray-700 dark:text-gray-200"
                >
                  {t("nav.blog")}
                </a>
              </li>
              <li className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="tel:+48531890827"
                  className="flex items-center font-semibold py-2.5 rounded-md transition-colors duration-300 bg-[hsl(var(--marine-h)_var(--marine-s)_65%)] text-[hsl(var(--marine-h)_30%_15%)] border-2 border-transparent hover:bg-transparent hover:text-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))] hover:border-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))] dark:hover:text-[hsl(var(--foreground))] dark:hover:border-[hsl(var(--foreground))]"
                  onClick={() => setIsOpen(false)}
                >
                  <FiPhone className="w-5 h-5 mr-2" />
                  <span>{t("nav.callNow")} +48 531 890 827</span>
                </a>
              </li>
              <li className="py-2 flex items-center">
                <a
                  href="https://m.me/super.pucus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 flex items-center p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
                  aria-label="Connect on Messenger"
                  onClick={() => {
                    setIsOpen(false);
                    setIsDropdownOpen({});
                  }}
                >
                  <BsMessenger className="w-5 h-5 mr-2" /> Messenger
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
