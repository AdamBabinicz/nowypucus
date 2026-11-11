import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

/**
 * Zoptymalizowany komponent Hero dla mobile i desktop:
 * - MOBILE (< 768px): Wyłącznie pojedyncze, statyczne zdjęcie LCP. Zero timerów, zero re-renderów.
 * - DESKTOP (>= 768px): Dyskretna rotacja slajdów z bezpiecznym opóźnieniem.
 * - Bezpieczny fetchpriority dla React 18 (brak ostrzeżeń w konsoli).
 */
const HeroImageSlider = ({ images, interval = 8000 }: HeroImageSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Sprawdzamy, czy urządzenie to telefon (domyślnie true dla bezpieczeństwa mobile-first)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    // Na telefonie slider jest BEZWZGLĘDNIE wyłączony - chroni to LCP i baterię
    if (isMobile || !images || images.length <= 1) return;
    if (intervalRef.current !== null) return;
    if (document.hidden) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
  }, [images, interval, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      // Na desktopie startujemy timer dopiero po 5 sekundach
      const delay = window.setTimeout(() => {
        startTimer();
      }, 5000);
      return () => {
        window.clearTimeout(delay);
        stopTimer();
      };
    } else {
      stopTimer();
    }
  }, [isMobile, startTimer, stopTimer]);

  if (!images || images.length === 0) return null;

  const firstImage = images[0];

  // -------------------------------------------------------------
  // WERSJA MOBILNA: 100% statyczny obraz. ZERO JS, ZERO MUTACJI DOM!
  // To daje natychmiastowy, zielony wynik LCP w teście Mobile.
  // -------------------------------------------------------------
  if (isMobile) {
    return (
      <div className="relative w-full h-full bg-slate-900 overflow-hidden">
        <img
          src={firstImage}
          alt={t(
            "hero_slide_alt",
            "Zdjęcie przedstawiające realizację prania dywanów",
          )}
          width={800}
          height={450}
          {...{ fetchpriority: "high" }}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover absolute inset-0 opacity-100 z-10"
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // WERSJA DESKTOP: Elegancki slider dla dużych ekranów
  // -------------------------------------------------------------
  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {images.map((src, index) => {
        const isFirst = index === 0;
        const isCurrent = index === currentIndex;

        const visibilityClass = isFirst
          ? `opacity-100 ${isCurrent ? "z-10" : "z-0"}`
          : `transition-opacity duration-700 ease-in-out ${
              isCurrent
                ? "opacity-100 z-20"
                : "opacity-0 z-0 pointer-events-none"
            }`;

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
            loading={isFirst ? "eager" : "lazy"}
            {...{ fetchpriority: isFirst ? "high" : "low" }}
            decoding={isFirst ? "sync" : "async"}
            className={`w-full h-full object-cover absolute inset-0 ${visibilityClass}`}
          />
        );
      })}
    </div>
  );
};

export default HeroImageSlider;
