import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

export const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  images,
  interval = 8000,
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!images || images.length <= 1) return;
    if (timerRef.current === null && !document.hidden) {
      timerRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
    }
  }, [images, interval]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 768px)");
    let timeout: number | null = null;

    const check = () => {
      if (mq.matches && images && images.length > 1) {
        // Na desktopie czekamy 6s przed aktywacją rotatora
        timeout = window.setTimeout(() => {
          setIsLoaded(true);
          startTimer();
        }, 6000);
      } else {
        // Na mobile ładujemy wyłącznie 1 kluczowe zdjęcie bez obciążania pamięci
        setIsLoaded(false);
        stopTimer();
      }
    };

    check();

    const onChange = () => {
      if (timeout) window.clearTimeout(timeout);
      check();
    };

    mq.addEventListener("change", onChange);

    return () => {
      if (timeout) window.clearTimeout(timeout);
      mq.removeEventListener("change", onChange);
      stopTimer();
    };
  }, [images, startTimer, stopTimer]);

  if (!images || images.length === 0) return null;

  const firstImage = images[0];

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/* 1. Statyczny obraz bazowy (LCP) - czysty, natychmiastowy render bez opóźnień animacji */}
      <img
        src={firstImage}
        alt={t(
          "hero_slide_alt",
          "Zdjęcie przedstawiające realizację prania dywanów",
        )}
        width={800}
        height={450}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />

      {/* 2. Kolejne slajdy montowane tylko na desktopie po 6 sekundach */}
      {isLoaded &&
        images.slice(1).map((src, index) => {
          const isActive = index + 1 === currentIndex;
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
                isActive
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
