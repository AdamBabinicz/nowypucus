import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

/**
 * FIX PageSpeed mobile (LCP 12,5 s, FCP 6,0 s, CLS 0,49):
 *
 * 1. USUNIĘTE `opacity-0` z pierwszego slajdu.
 *    Wcześniej pierwszy obraz miał klasę `opacity-0 transition-opacity
 *    duration-1000`, więc przeglądarka uznawała go za element LCP dopiero
 *    w momencie, gdy JS nadał mu widoczność. Na mobile (Moto G Power,
 *    4× spowolnienie CPU) dawało to LCP 12,5 s mimo `fetchpriority="high"`.
 *    Pierwszy slajd jest teraz widoczny od pierwszego renderu – bez opacity.
 *
 * 2. `decoding="async"` zamiast `sync`.
 *    `sync` blokował dekodowanie 800×450 na wątku głównym tuż przed
 *    namalowaniem pierwszej klatki (FCP 6,0 s).
 *
 * 3. Realne wymiary 800×450 (tyle ma plik) + `object-cover`.
 *    Wcześniej `width="1920" height="1080"` nie odpowiadało plikowi
 *    800×450 → przeglądarka rezerwowała złe proporcje (składowa CLS).
 *
 * 4. Timer startuje po `requestAnimationFrame` i jest wstrzymywany przez
 *    IntersectionObserver + visibilitychange (mniej pracy wątku głównego).
 */
const HeroImageSlider = ({ images, interval = 8000 }: HeroImageSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadSecondaryImages, setLoadSecondaryImages] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);

  // Pozostałe slajdy ładujemy dopiero po ustabilizowaniu LCP.
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

  // Start dopiero po pierwszej ramce – pierwszy obraz nie konkuruje z timerem.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      startTimer();
    });

    return () => {
      cancelAnimationFrame(raf);
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  // Pauza, gdy karta jest w tle.
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

  // Pauza, gdy hero wyjechał z widoku (oszczędza CPU i baterię na mobile).
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

        // Pierwszy slajd: ZERO opacity-0, ZERO transition – widoczny od razu.
        // Kolejne slajdy: przejście opacity jest bezpieczne, bo nie są LCP.
        const visibilityClass = isFirst
          ? isCurrent
            ? "opacity-100 z-10"
            : "opacity-0 z-0 pointer-events-none"
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
            {...(isFirst
              ? ({ fetchpriority: "high" } as any)
              : ({ fetchpriority: "low" } as any))}
            className={`w-full h-full object-cover absolute inset-0 ${visibilityClass}`}
          />
        );
      })}
    </div>
  );
};

export default HeroImageSlider;
