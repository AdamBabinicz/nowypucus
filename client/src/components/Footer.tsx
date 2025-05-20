import { Link as WouterLink, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import {
  BsMessenger,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
  BsYoutube,
} from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import {
  getLocalizedPath,
  getLocalizedSlug,
  PAGE_KEYS,
  PageKey,
} from "@/config/slugs";

const HEADER_OFFSET = 70;

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const [currentPath, navigate] = useLocation();

  const startYear = 2018;
  const currentYearNumber = new Date().getFullYear();
  let yearDisplay: string;

  if (currentYearNumber === startYear) {
    yearDisplay = startYear.toString();
  } else if (currentYearNumber > startYear) {
    yearDisplay = `${startYear} - ${currentYearNumber}`;
  } else {
    yearDisplay = startYear.toString();
    if (currentYearNumber < startYear) {
      console.warn(
        "Current year is before start year. Displaying start year only.",
        { currentYear: currentYearNumber, startYear }
      );
    }
  }

  const handleLocalizedLinkClick = (pageKey: PageKey, hashKey?: PageKey) => {
    let targetPath = getLocalizedPath(pageKey, currentLang);
    let localizedHashSlug = "";
    if (hashKey) {
      localizedHashSlug = getLocalizedSlug(hashKey, currentLang);
      targetPath += `#${localizedHashSlug}`;
    }

    const currentBasePath = currentPath.split("#")[0];
    const targetBasePath = targetPath.split("#")[0];

    if (currentBasePath !== targetBasePath) {
      navigate(targetPath);
    } else {
      navigate(targetPath, { replace: true });
      if (hashKey && window.location.hash !== `#${localizedHashSlug}`) {
        window.location.hash = localizedHashSlug;
      } else if (hashKey) {
        const elementId = localizedHashSlug;
        const element = document.getElementById(elementId);
        if (element) {
          const yOffset = -HEADER_OFFSET;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          const canonicalElement = document.getElementById(hashKey);
          if (canonicalElement) {
            const yOffset = -HEADER_OFFSET;
            const y =
              canonicalElement.getBoundingClientRect().top +
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
      }
    }
  };

  const serviceLinks = [
    { labelKey: "services.carpetCleaning", hashKey: PAGE_KEYS.HASH_CARPETS },
    { labelKey: "services.floorCleaning", hashKey: PAGE_KEYS.HASH_FLOORING },
    {
      labelKey: "services.furnitureCleaning",
      hashKey: PAGE_KEYS.HASH_UPHOLSTERY,
    },
    {
      labelKey: "services.paverCleaning",
      hashKey: PAGE_KEYS.HASH_PAVER_CLEANING,
    },
    {
      labelKey: "services.tileCleaning",
      hashKey: PAGE_KEYS.HASH_TILE_CLEANING,
    },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/super.pucus",
      icon: BsFacebook,
      ariaLabel: "Facebook",
    },
    {
      href: "https://www.instagram.com/mariuszkucharski7",
      icon: BsInstagram,
      ariaLabel: "Instagram",
    },
    {
      href: "https://m.me/super.pucus",
      icon: BsMessenger,
      ariaLabel: "Messenger",
    },
    {
      href: "https://twitter.com/Mariusz04417578",
      icon: BsTwitter,
      ariaLabel: "Twitter",
    },
    {
      href: "https://pl.pinterest.com/praniedywanow03",
      icon: BsPinterest,
      ariaLabel: "Pinterest",
    },
    {
      href: "https://www.youtube.com/channel/UCKRWZoyA4cWXHANrQmwZiyw",
      icon: BsYoutube,
      ariaLabel: "YouTube",
    },
    {
      href: "https://maps.app.goo.gl/htxu5uJDo4ZiFsKo6",
      icon: FaGoogle,
      ariaLabel: "Google Maps",
    },
  ];

  return (
    <footer className="bg-primary-800 dark:bg-slate-800 text-foreground dark:text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-major-mono text-xl font-semibold mb-4 text-primary dark:text-sky-400">
              SUPER PUCUŚ
            </h3>
            <p className="mb-4 text-foreground dark:text-gray-100">
              {t("footer.companyDescription")}
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                const translatedAriaLabel = t(
                  `footer.social.${link.ariaLabel
                    .toLowerCase()
                    .replace(/\s+/g, "")}`,
                  link.ariaLabel
                );
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                    aria-label={translatedAriaLabel}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-foreground dark:text-white">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.HOME, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.HOME)}
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  {t("nav.home")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.OFFER, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.OFFER)}
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  {t("nav.offer")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.ABOUT, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.ABOUT)}
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  {t("nav.about")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.PORTFOLIO, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.PORTFOLIO)}
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  {t("nav.portfolio")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.EQUIPMENT, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.EQUIPMENT)}
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  {t("nav.equipment")}
                </WouterLink>
              </li>
              <li>
                <WouterLink
                  href={getLocalizedPath(PAGE_KEYS.CONTACT, currentLang)}
                  onClick={() => handleLocalizedLinkClick(PAGE_KEYS.CONTACT)}
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  {t("nav.contact")}
                </WouterLink>
              </li>
              <li>
                <a
                  href="https://dywany-pranie.blogspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  {t("nav.blog")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-foreground dark:text-white">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.hashKey}>
                  <a
                    href={`${getLocalizedPath(
                      PAGE_KEYS.OFFER,
                      currentLang
                    )}#${getLocalizedSlug(link.hashKey, currentLang)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLocalizedLinkClick(PAGE_KEYS.OFFER, link.hashKey);
                    }}
                    className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-foreground dark:text-white">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiPhone className="w-5 h-5 mr-2 text-primary-400" />
                <a
                  href="tel:+48531890827"
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  +48 531 890 827
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="w-5 h-5 mr-2 text-primary-400" />
                <a
                  href="mailto:mariusz1989poczta@wp.pl"
                  className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
                >
                  mariusz1989poczta@wp.pl
                </a>
              </li>
              <li className="flex items-center">
                <FiMapPin className="w-5 h-5 mr-2 text-primary-400" />
                <span className="text-foreground dark:text-gray-100">
                  {t("footer.area")}
                </span>
              </li>
              <li className="flex items-center">
                <FiClock className="w-5 h-5 mr-2 text-primary-400" />
                <span className="text-foreground dark:text-gray-100">
                  {t("footer.hours")}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-foreground dark:text-gray-200 text-center text-sm mb-2 sm:mb-0">
            {yearDisplay}, SUPER PUCUŚ{" "}
            {t("footer.companyType", "Pralnia dywanów")} Radom.
          </p>
          <div className="flex space-x-4">
            <WouterLink
              href={getLocalizedPath(PAGE_KEYS.TERMS, currentLang)}
              onClick={() => handleLocalizedLinkClick(PAGE_KEYS.TERMS)}
              className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
            >
              {t("footer.terms")}
            </WouterLink>
            <WouterLink
              href={getLocalizedPath(PAGE_KEYS.PRIVACY, currentLang)}
              onClick={() => handleLocalizedLinkClick(PAGE_KEYS.PRIVACY)}
              className="text-foreground dark:text-gray-100 hover:text-gray-500 hover:dark:text-gray-300 transition-colors"
            >
              {t("footer.privacy")}
            </WouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
