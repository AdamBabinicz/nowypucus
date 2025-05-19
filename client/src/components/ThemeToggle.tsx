import { useTheme } from "@/context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  onThemeToggle?: () => void;
}

const ThemeToggle = ({ onThemeToggle }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
    if (onThemeToggle) {
      onThemeToggle();
    }
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="p-1 rounded-full text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? (
            <FiSun className="w-6 h-6" />
          ) : (
            <FiMoon className="w-6 h-6" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
