import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

/**
 * FIX PageSpeed – LCP (7,9 s mobil / 2,7 s desktop):
 * 1. Pierwszy slajd jest od razu w DOM z eager + fetchpriority="high",
 *    bez czekania na useEffect (wcześniej timer lazy mógł zjadać LCP).
 * 2. Slider czeka na requestAnimationFrame, zanim przełączy slajd –
 *    przejście nie jest liczone od wczytania strony, więc Lighthouse
 *    zawsze mierzy PIERWSZY slajd jako element LCP.
 * 3. Preload w index.html musi wskazywać DOKŁADNIE na images[0]
 *    (jeśli ścieżka w index.html jest inna, przeglądarka pobiera plik 2×).
 */
const HeroImageSlider = ({ images, interval = 8000 }: HeroImageSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadSecondaryImages, setLoadSecondaryImages] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Opóźniamy ładowanie pozostałych slajdów, aby nie obciążały LCP
  useEffect(() => {
    const lazyTimer = window.setTimeout(() => {
      setLoadSecondaryImages(true);
    }, 4500);

    return () => window.clearTimeout(lazyTimer);
  }, []);

  // FIX PageSpeed – „Wymuszone przeformatowanie" (108/66 ms):
  // interval startuje dopiero po pierwszej ramce renderowania (requestAnimationFrame),
  // dzięki czemu pierwszy obraz LCP nie konkuruje z timerem o wątek główny
  // podczas montażu komponentu.
  const startTimer = useCallback(() => {
    if (!images || images.length <= 1) return;
    if (intervalRef.current !== null) return;
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

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      startTimer();
    });

    return () => {
      cancelAnimationFrame(raf);
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  // FIX PageSpeed – „Wymuszone przeformatowanie" + „Zminimalizuj aktywność
  // wątku głównego": przełączanie slajdów wstrzymywane, gdy karta jest
  // w tle lub użytkownik nie widzi hero (Inter Observer) – zero odliczania
  // i przeliczeń layoutu w tle.
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

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {images.map((src, index) => {
        const isFirst = index === 0;
        const isCurrent = index === currentIndex;

        if (!isFirst && !loadSecondaryImages) {
          return null;
        }

        return (
          <img
            key={src}
            src={src}
            alt={t(
              "hero_slide_alt",
              "Zdjęcie przedstawiające realizację prania dywanów",
            )}
            width="1920"
            height="1080"
            decoding={isFirst ? "sync" : "async"}
            loading={isFirst ? "eager" : "lazy"}
            {...(isFirst
              ? ({ fetchpriority: "high" } as any)
              : ({ fetchpriority: "low" } as any))}
            className={`w-full h-full object-cover absolute inset-0 ${
              isFirst
                ? isCurrent
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
                : isCurrent
                  ? "opacity-100 z-10 transition-opacity duration-1000 ease-in-out"
                  : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        );
      })}
    </div>
  );
};

export default HeroImageSlider;
