import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

const HeroImageSlider = ({ images, interval = 5000 }: HeroImageSliderProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={t(
            "hero_slide_alt",
            "Zdjęcie przedstawiające realizację prania dywanów",
          )}
          // Sposób na obejście błędu React i TypeScript - przekazujemy atrybut bezpośrednio do DOM
          {...({ fetchpriority: currentIndex === 0 ? "high" : "low" } as any)}
          decoding="sync"
          width="1920"
          height="1080"
          initial={
            isMounted && currentIndex !== 0 ? { opacity: 0 } : { opacity: 1 }
          }
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full object-cover absolute inset-0"
          loading="eager"
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroImageSlider;
