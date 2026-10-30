import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

const HeroImageSlider = ({ images, interval = 5000 }: HeroImageSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadSecondaryImages, setLoadSecondaryImages] = useState(false);

  useEffect(() => {
    // Opóźniamy ładowanie pozostałych slajdów (oszczędzamy 200 KB na starcie)
    const lazyTimer = setTimeout(() => {
      setLoadSecondaryImages(true);
    }, 3500);

    return () => clearTimeout(lazyTimer);
  }, []);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {images.map((src, index) => {
        const isFirst = index === 0;
        const isCurrent = index === currentIndex;

        // Jeśli to nie pierwszy slajd i nie minęło jeszcze 3.5s, nie renderujemy go w DOM
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
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
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
