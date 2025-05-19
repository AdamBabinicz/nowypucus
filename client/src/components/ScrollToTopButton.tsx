import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsStars } from "react-icons/bs";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary dark:bg-primary-700 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <BsStars className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
