import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize } from "react-icons/fi";
import Modal from "./Modal";

interface Image {
  id: string;
  src: string;
  alt: string;
  type: "before" | "after";
}

interface GallerySliderProps {
  images: Image[];
  title: string;
}

const GallerySlider = ({ images, title }: GallerySliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group images by before/after pairs
  const groupedImages: Image[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    if (i + 1 < images.length) {
      groupedImages.push([images[i], images[i + 1]]);
    } else {
      groupedImages.push([images[i]]);
    }
  }

  const totalPairs = groupedImages.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPairs);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPairs) % totalPairs);
  };

  const openModal = (image: Image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Autoplay functionality
  useEffect(() => {
    if (totalPairs <= 1) return; // Don't autoplay if only one pair or less

    const intervalId = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [totalPairs]);

  return (
    <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-4">
      <h3 className="font-heading text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>
      
      <div className="relative">
        <div
          ref={containerRef}
          className="slider-container rounded-lg overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              {groupedImages[currentIndex].map((image, idx) => (
                <div key={image.id} className="relative">
                  <div className="relative group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div
                      className={`absolute bottom-0 left-0 ${
                        image.type === "before" ? "bg-red-600" : "bg-green-600"
                      } text-white py-1 px-4 rounded-tr-lg font-medium`}
                    >
                      {image.type === "before" ? "PRZED" : "PO"}
                    </div>
                    <button
                      onClick={() => openModal(image)}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Powiększ zdjęcie"
                    >
                      <FiMaximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPairs > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
              aria-label="Poprzednie zdjęcie"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
              aria-label="Następne zdjęcie"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {groupedImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                  aria-label={`Przejdź do slajdu ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {modalImage && (
        <Modal
          isOpen={isModalOpen}
          title={`${title} - ${modalImage.type === "before" ? "Przed" : "Po"} czyszczeniem`}
          onClose={closeModal}
        >
          <div className="flex justify-center">
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GallerySlider;
