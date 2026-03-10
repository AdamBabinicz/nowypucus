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

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={t(
            "hero_slide_alt",
            "Zdjęcie przedstawiające realizację prania dywanów",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full object-cover absolute inset-0"
          loading="eager"
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroImageSlider;
