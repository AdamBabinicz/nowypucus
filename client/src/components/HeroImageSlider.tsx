import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

/**
 * Zoptymalizowany HeroImageSlider (LCP & CLS):
 * 1. Usunięto aspect-[16/9] - slider wypełnia dokładnie 100% wysokości i szerokości sekcji Hero.
 * 2. Pierwszy slajd (LCP) ma NA SZTYWNO opacity-100 i ZEROWĄ animację (brak transition-opacity).
 * 3. Kolejne slajdy (1, 2, 3...) nakładają się na wierzch (z-20) z płynnym fadem.
 * 4. Pozostałe slajdy odroczone o 4,5s, aby zwolnić łącze dla natychmiastowego LCP.
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
      className="relative w-full h-full bg-slate-900 overflow-hidden"
    >
      {images.map((src, index) => {
        const isFirst = index === 0;
        const isCurrent = index === currentIndex;

        if (!isFirst && !loadSecondaryImages) {
          return null;
        }

        // ZASADA 0 MS DLA LCP:
        // Slajd 0 ma ZAWSZE opacity-100 i NIGDY transition-opacity.
        // Kolejne slajdy nakładają się na niego na warstwie z-20 z animacją fade.
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
            decoding={isFirst ? "sync" : "async"}
            loading={isFirst ? "eager" : "lazy"}
            {...{ fetchpriority: isFirst ? "high" : "low" }}
            className={`w-full h-full object-cover absolute inset-0 ${visibilityClass}`}
          />
        );
      })}
    </div>
  );
};

export default HeroImageSlider;
