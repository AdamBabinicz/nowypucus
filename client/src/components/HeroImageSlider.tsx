import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

/**
 * Super-zoptymalizowany komponent Hero dla mobile i desktop:
 * 1. ZERO odpytywania geometrii (innerWidth) podczas renderu – eliminuje wymuszony reflow.
 * 2. Pierwszy obraz (LCP) jest ZAWSZE statyczny, natychmiastowy i nigdy nie jest odmontowywany.
 * 3. Kolejne slajdy (na desktopie) montują się dopiero po 6 sekundach od załadowania,
 *    dzięki czemu nie kradną ani 1 KB transferu krytycznemu obrazowi LCP na starcie.
 * 4. Na mobile (< 768px): 100% statyczny obraz, 0 timerów, 0 re-renderów.
 */
const HeroImageSlider = ({ images, interval = 8000 }: HeroImageSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktopActive, setIsDesktopActive] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!images || images.length <= 1) return;
    if (intervalRef.current !== null) return;
    if (document.hidden) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  }, [images, interval]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Aktywacja rotacji slajdów WYŁĄCZNIE na dużych ekranach i dopiero po 6s od startu strony
    let delayTimer: number | null = null;

    const evaluateSlider = () => {
      if (mediaQuery.matches && images && images.length > 1) {
        delayTimer = window.setTimeout(() => {
          setIsDesktopActive(true);
          startTimer();
        }, 6000);
      } else {
        setIsDesktopActive(false);
        stopTimer();
      }
    };

    evaluateSlider();

    const handleChange = () => {
      if (delayTimer) window.clearTimeout(delayTimer);
      evaluateSlider();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      if (delayTimer) window.clearTimeout(delayTimer);
      mediaQuery.removeEventListener("change", handleChange);
      stopTimer();
    };
  }, [images, startTimer, stopTimer]);

  if (!images || images.length === 0) return null;

  const firstImage = images[0];

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/*
        GŁÓWNY OBRAZ LCP:
        Zawsze renderowany od 1. klatki, ma stałą geometrię, zoptymalizowane dekodowanie
        i najwyższy priorytet pobierania. Nigdy nie znika ani nie przeładowuje się.
      */}
      <img
        src={firstImage}
        alt={t(
          "hero_slide_alt",
          "Zdjęcie przedstawiające realizację prania dywanów",
        )}
        width={800}
        height={450}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />

      {/*
        POZOSTAŁE SLAJDY:
        Montowane w DOM TYLKO wtedy, gdy minęło 6 sekund na desktopie.
        Dzięki temu na urządzeniach mobilnych i w krytycznym oknie ładowania (0-5s)
        przeglądarka NIE pobiera ani jednego zbędnego bajtu!
      */}
      {isDesktopActive &&
        images.slice(1).map((src, index) => {
          const slideIndex = index + 1;
          const isCurrent = slideIndex === currentIndex;

          return (
            <img
              key={src}
              src={src}
              alt={t(
                "hero_slide_alt",
                "Zdjęcie przedstawiające realizację prania dywanów",
              )}
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            />
          );
        })}
    </div>
  );
};

export default HeroImageSlider;
