import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

/**
 * Zoptymalizowany HeroImageSlider (LCP & CLS):
 * 1. aspect-[16/9] sm:aspect-auto zapobiega skokowi wysokości (CLS) przed zamontowaniem obrazu.
 * 2. Pierwszy slajd renderowany bez animacji wejściowej (opacity-100 natychmiast) -> natychmiastowy LCP.
 * 3. fetchPriority="high" w standardzie React 19 dla priorytetowego pobrania pierwszego slajdu.
 * 4. Pozostałe slajdy odroczone (lazy) o 4,5s, aby zwolnić łącze i CPU dla LCP oraz FCP.
 */
const HeroImageSlider = ({ images, interval = 8000 }: HeroImageSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadSecondaryImages, setLoadSecondaryImages] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);

  // Pozostałe slajdy ładujemy dopiero po ustabilizowaniu LCP
  useEffect(() => {
    const lazyTimer = window.setTimeout(() => {
      setLoadSecondaryImages(true);
    }, 4500);

    return () => window.clearTimeout(lazyTimer);
  }, []);

  const startTimer = useCallback(() => {
    if (!images || images.length <= 1) return;
    if (intervalRef.current !== null) return;
    if (document.hidden || !isVisibleRef.current) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
  }, [images, interval]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start po pierwszej ramce animacji
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      startTimer();
    });

    return () => {
      cancelAnimationFrame(raf);
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  // Wstrzymanie timera, gdy karta jest nieaktywna
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startTimer, stopTimer]);

  // Pauza, gdy sekcja Hero nie znajduje się w oknie widoku
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startTimer();
        } else {
          stopTimer();
        }
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [startTimer, stopTimer]);

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-slate-900 overflow-hidden aspect-[16/9] sm:aspect-auto"
    >
      {images.map((src, index) => {
        const isFirst = index === 0;
        const isCurrent = index === currentIndex;

        if (!isFirst && !loadSecondaryImages) {
          return null;
        }

        // Pierwszy slajd: widoczny od razu bez opacity transition, by nie opóźniać LCP.
        // Zanikanie slajdu przy zmianie następuje płynnie.
        const visibilityClass = isFirst
          ? isCurrent
            ? "opacity-100 z-10"
            : "opacity-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none"
          : isCurrent
            ? "opacity-100 z-10 transition-opacity duration-700 ease-in-out"
            : "opacity-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none";

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
            decoding="async"
            loading={isFirst ? "eager" : "lazy"}
            fetchPriority={isFirst ? "high" : "low"}
            className={`w-full h-full object-cover absolute inset-0 ${visibilityClass}`}
          />
        );
      })}
    </div>
  );
};

export default HeroImageSlider;
