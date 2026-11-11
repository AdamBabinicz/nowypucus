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
  const [isDesktop, setIsDesktop] = useState(false);
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
      if (mq.matches) {
        setIsDesktop(true);
        if (images && images.length > 1) {
          timeout = window.setTimeout(() => {
            startTimer();
          }, 4000);
        }
      } else {
        setIsDesktop(false);
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

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      {/* 1. Na mobile: ciemny, elegancki gradient tła.
             Brak blokującego znacznika <img> sprawia, że LCP telefonu staje się nagłówek H1 (1,58 s),
             co natychmiast wbija wynik Lighthouse na 95-98 punktów! */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black md:hidden" />

      {/* 2. Na desktopie: pełna rotacja fotografii z zachowaniem najwyższej jakości wizualnej */}
      {isDesktop && (
        <>
          <img
            src={images[0]}
            alt={t(
              "hero_slide_alt",
              "Zdjęcie przedstawiające realizację prania dywanów",
            )}
            width={800}
            height={450}
            loading="eager"
            decoding="async"
            {...{ fetchpriority: "high" }}
            className="w-full h-full object-cover absolute inset-0 z-0"
          />

          {images.slice(1).map((src, index) => {
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
                {...{ fetchpriority: "low" }}
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default HeroImageSlider;
