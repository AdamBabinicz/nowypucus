import { useTheme } from "@/context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface ThemeToggleProps {
  onThemeToggle?: () => void;
}

const ThemeToggle = ({ onThemeToggle }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const handleToggleTheme = () => {
    toggleTheme();
    if (onThemeToggle) {
      onThemeToggle();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="p-1 rounded-full text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      aria-label={
        theme === "dark"
          ? t("common.switch_light_mode", "Przełącz na tryb jasny")
          : t("common.switch_dark_mode", "Przełącz na tryb ciemny")
      }
    >
      <div className="transition-transform duration-200 hover:rotate-12 active:scale-90 flex items-center justify-center">
        {theme === "dark" ? (
          <FiSun className="w-6 h-6 text-amber-400" />
        ) : (
          <FiMoon className="w-6 h-6 text-slate-700" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
