import { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const ScrollToTopButton = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    // passive: true zapobiega blokowaniu płynności przewijania na telefonie
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-primary dark:bg-primary-700 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 dark:hover:bg-primary-800 hover:scale-110 active:scale-90 transition-all duration-300 z-50 ${
        isVisible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label={t("common.scroll_to_top", "Przewiń do góry")}
    >
      <BsStars className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
