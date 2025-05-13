import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import logoPath from "@assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<{[key: string]: boolean}>({});

const toggleDropdown = (section?: string) => {
  if (section) {
    setIsDropdownOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  } else {
    setIsDropdownOpen(prev => ({
      ...prev,
      portfolio: !prev.portfolio
    }));
  }
};
  const [location] = useLocation();
  const { t } = useTranslation();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const mobileNavVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoPath} alt="Super Pucuś Logo" className="h-12 w-auto" />
            <span className="ml-2 text-lg font-heading font-semibold text-primary dark:text-sky-400">
              Super Pucuś
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/" 
                  className={`font-medium ${location === '/' ? 'text-primary dark:text-primary-400' : 'text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400'} transition-colors`}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/oferta" 
                  className={`font-medium ${location === '/oferta' ? 'text-primary dark:text-primary-400' : 'text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400'} transition-colors`}
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/o-firmie" 
                  className={`font-medium ${location === '/o-firmie' ? 'text-primary dark:text-primary-400' : 'text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400'} transition-colors`}
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li className="relative">
                <button 
                  onClick={() => toggleDropdown('portfolio')}
                  className={`font-medium ${location.startsWith('/realizacje') ? 'text-primary dark:text-primary-400' : 'text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400'} transition-colors flex items-center w-full justify-between`}
                >
                  {t('nav.portfolio')}
                  <svg 
                    className={`w-4 h-4 ml-1 transform transition-transform ${isDropdownOpen['portfolio'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className={`lg:absolute left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-md shadow-lg py-1 z-10 ${isDropdownOpen['portfolio'] ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
                  <Link href="/realizacje#dywany" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800">
                    {t('portfolio.carpets')}
                  </Link>
                  <Link href="/realizacje#wykladziny" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800">
                    {t('portfolio.flooring')}
                  </Link>
                  <Link href="/realizacje#meble" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800">
                    {t('portfolio.furniture')}
                  </Link>
                  <Link href="/realizacje#kostka-plytki" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800">
                    {t('portfolio.pavers')}
                  </Link>
                </div>
              </li>
              <li>
                <Link 
                  href="/sprzet" 
                  className={`font-medium ${location === '/sprzet' ? 'text-primary dark:text-primary-400' : 'text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400'} transition-colors`}
                >
                  {t('nav.equipment')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className={`font-medium ${location === '/kontakt' ? 'text-primary dark:text-primary-400' : 'text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400'} transition-colors`}
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <a 
                  href="https://dywany-pranie.blogspot.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-400 transition-colors"
                >
                  {t('nav.blog')}
                </a>
              </li>
            </ul>

            <a 
              href="tel:+48531890827" 
              className="flex items-center text-accent-600 font-semibold hover:text-accent-700 transition-colors"
            >
              <FiPhone className="w-5 h-5 mr-1" />
              <span><strong>{t('nav.callNow')}</strong> +48 531 890 827</span>
            </a>

            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <ThemeToggle />
              <a 
                href="https://m.me/super.pucus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-600"
                aria-label="Connect on Messenger"
              >
                <BsMessenger className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="lg:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileNavVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden mt-4 pb-2"
            >
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/" 
                    className={`block py-2 ${location === '/' ? 'text-primary dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                  >
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/oferta"
                    className={`block py-2 ${location === '/oferta' ? 'text-primary dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                  >
                    {t('nav.services')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/o-firmie"
                    className={`block py-2 ${location === '/o-firmie' ? 'text-primary dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                  >
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={toggleDropdown}
                    className={`flex justify-between items-center w-full py-2 ${location === '/realizacje' ? 'text-primary dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                  >
                    {t('nav.portfolio')}
                    <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-1 space-y-2"
                      >
                        <Link href="/realizacje#dywany" className="block py-1 text-gray-600 dark:text-gray-300">
                          {t('portfolio.carpets')}
                        </Link>
                        <Link href="/realizacje#wykladziny" className="block py-1 text-gray-600 dark:text-gray-300">
                          {t('portfolio.flooring')}
                        </Link>
                        <Link href="/realizacje#meble" className="block py-1 text-gray-600 dark:text-gray-300">
                          {t('portfolio.furniture')}
                        </Link>
                        <Link href="/realizacje#kostka-plytki" className="block py-1 text-gray-600 dark:text-gray-300">
                          {t('portfolio.pavers')}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <Link 
                    href="/sprzet"
                    className={`block py-2 ${location === '/sprzet' ? 'text-primary dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                  >
                    {t('nav.equipment')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/kontakt"
                    className={`block py-2 ${location === '/kontakt' ? 'text-primary dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                  >
                    {t('nav.contact')}
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://dywany-pranie.blogspot.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block py-2 text-gray-700 dark:text-gray-200"
                  >
                    {t('nav.blog')}
                  </a>
                </li>
                <li className="py-2">
                  <a 
                    href="tel:+48531890827" 
                    className="flex items-center text-accent-600 font-semibold"
                  >
                    <FiPhone className="w-5 h-5 mr-2" />
                    <span><strong>{t('nav.callNow')}</strong> +48 531 890 827</span>
                  </a>
                </li>
                <li className="py-2 flex items-center space-x-3">
                  <LanguageSelector onLanguageChange={() => setIsOpen(false)} />
                  <ThemeToggle onThemeToggle={() => setIsOpen(false)} />
                  <a 
                    href="https://m.me/super.pucus" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="Connect on Messenger"
                  >
                    <BsMessenger className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
