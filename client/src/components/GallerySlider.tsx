import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize } from "react-icons/fi";
import Modal from "@/components/Modal";

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

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const GallerySlider = ({ images, title }: GallerySliderProps) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const autoplayIntervalRef = useRef<number | null>(null);

  const groupedImages: Image[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    if (i + 1 < images.length) {
      groupedImages.push([images[i], images[i + 1]]);
    } else {
      groupedImages.push([images[i]]);
    }
  }

  const totalPairs = groupedImages.length;
  const imageIndex = ((page % totalPairs) + totalPairs) % totalPairs;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    resetAutoplay();
  };

  const openModal = (image: Image) => {
    setModalImage(image);
    setIsModalOpen(true);
    stopAutoplay();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetAutoplay();
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    if (totalPairs > 1) {
      autoplayIntervalRef.current = window.setInterval(() => {
        paginate(1);
      }, 5000);
    }
  };

  useEffect(() => {
    resetAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPairs]); // Dodajemy imageIndex i groupedImages jeśli resetAutoplay ma zależeć od ich zmiany, ale w tym przypadku totalPairs wydaje się wystarczające dla logiki auto-odtwarzania

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent, // Zmieniono e na _e, bo nie jest używane
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  if (totalPairs === 0) {
    return (
      <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-4">
        <h3 className="font-heading text-xl font-semibold mb-4 text-foreground dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Brak obrazów do wyświetlenia.
        </p>
      </div>
    );
  }

  const singleImageHeightClass = "h-[400px]";
  const sliderContainerHeightClass = "h-[808px]";

  return (
    <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-4">
      <h3 className="font-heading text-xl font-semibold mb-4 text-foreground dark:text-white">
        {title}
      </h3>

      <div className={`relative ${sliderContainerHeightClass} overflow-hidden`}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full space-y-2 cursor-grab active:cursor-grabbing"
          >
            {groupedImages[imageIndex] &&
              groupedImages[imageIndex].map((image) => (
                <div key={image.id} className="relative">
                  <div className={`relative group ${singleImageHeightClass}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div
                      className={`absolute bottom-0 left-0 ${
                        image.type === "before" ? "bg-red-700" : "bg-green-800"
                      } text-white py-1 px-4 rounded-tr-lg font-medium`}
                    >
                      {image.type === "before" ? "PRZED" : "PO"}
                    </div>
                    <button
                      onClick={() => openModal(image)}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" // Zwiększono padding z p-2 na p-3 i dodano style focus-visible
                      aria-label="Powiększ zdjęcie"
                    >
                      <FiMaximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
        {totalPairs > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" // Zwiększono padding z p-2 na p-3 i dodano style focus-visible
              aria-label="Poprzednie zdjęcie"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" // Zwiększono padding z p-2 na p-3 i dodano style focus-visible
              aria-label="Następne zdjęcie"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {Array.from({ length: totalPairs }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const newDirection = idx > imageIndex ? 1 : -1;
                    setPage([idx, newDirection]);
                    resetAutoplay();
                  }}
                  // Zmienione klasy dla lepszego obszaru dotykowego
                  className={`
                    min-w-[44px] min-h-[44px]
                    flex items-center justify-center
                    rounded-full
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-700
                    transition-all
                  `}
                  aria-label={`Przejdź do slajdu ${idx + 1}`}
                >
                  <span // Wewnętrzny element dla wizualnej kropki
                    className={`
                      block w-3 h-3 rounded-full
                      ${
                        idx === imageIndex
                          ? "bg-white scale-125"
                          : "bg-white bg-opacity-50"
                      }
                      transition-all
                    `}
                  ></span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {modalImage && (
        <Modal
          isOpen={isModalOpen}
          title={`${title} - ${
            modalImage.type === "before"
              ? "Przed czyszczeniem"
              : "Po czyszczeniu"
          }`}
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
