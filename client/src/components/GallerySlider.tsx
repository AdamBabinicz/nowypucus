import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize } from "react-icons/fi";
import { useTranslation } from "react-i18next";
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

/**
 * FIX PageSpeed mobile (CLS 0,49 / "Wymuszone przeformatowanie" 49 ms):
 *
 * 1. USUNIĘTE sztywne `h-[400px]` i `h-[808px]`.
 *    Slider miał zaszyte na sztywno wysokości (400 px na obraz, 808 px na
 *    kontener), które nie odpowiadały proporcjom zdjęć (596×480, 900×675 itd.).
 *    Na wąskim ekranie obraz `object-cover` był przycinany w losowy sposób,
 *    a `mode="popLayout"` + `position: absolute` powodowały przeliczenia
 *    layoutu przy każdej zmianie slajdu (wymuszone przeformatowanie).
 *
 * 2. Każdy obraz siedzi teraz w ramce `.media-frame` z `aspect-ratio`,
 *    więc wysokość jest zarezerwowana PRZED wczytaniem pliku → CLS = 0.
 *
 * 3. `mode="wait"` zamiast `"popLayout"` – brak dwóch absolutnie
 *    pozycjonowanych warstw jednocześnie (mniej pracy dla wątku głównego).
 *
 * 4. Atrybuty `width`/`height` = realne proporcje (4:3) – dodatkowa
 *    rezerwacja miejsca i lepszy wybór wariantu przy `srcset`.
 *
 * 5. Autoplay wstrzymany, gdy karta jest w tle albo slider jest poza
 *    widokiem (IntersectionObserver) – koniec z odliczaniem w tle.
 */
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 300 : -300,
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
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const GallerySlider = ({ images, title }: GallerySliderProps) => {
  const { t } = useTranslation();
  const [[page, direction], setPage] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const autoplayIntervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(false);

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

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) return;
    if (document.hidden || !isVisibleRef.current) return;
    if (totalPairs <= 1) return;

    autoplayIntervalRef.current = window.setInterval(() => {
      setPage(([currentPage]) => [currentPage + 1, 1]);
    }, 5000);
  }, [totalPairs]);

  const resetAutoplay = useCallback(() => {
    stopAutoplay();
    startAutoplay();
  }, [startAutoplay, stopAutoplay]);

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

  useEffect(() => {
    resetAutoplay();
    return () => stopAutoplay();
  }, [totalPairs, resetAutoplay, stopAutoplay]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [startAutoplay, stopAutoplay]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
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
          {t("realizacjePage.noImages", "No images to display.")}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-4">
      <h3 className="font-heading text-xl font-semibold mb-4 text-foreground dark:text-white">
        {title}
      </h3>

      <div ref={containerRef} className="relative w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
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
            className="relative w-full space-y-2 cursor-grab active:cursor-grabbing"
          >
            {groupedImages[imageIndex] &&
              groupedImages[imageIndex].map((image) => (
                <div key={image.id} className="relative">
                  {/* aspect-[4/3] rezerwuje wysokość PRZED wczytaniem obrazu */}
                  <div className="media-frame aspect-[4/3] w-full rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="w-full h-full rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className={`absolute bottom-0 left-0 ${
                        image.type === "before" ? "bg-red-950" : "bg-green-950"
                      } text-white py-1 px-4 rounded-tr-lg font-medium z-10`}
                    >
                      {image.type === "before"
                        ? t("common.before", "BEFORE").toUpperCase()
                        : t("common.after", "AFTER").toUpperCase()}
                    </div>
                    <button
                      onClick={() => openModal(image)}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:opacity-0"
                      aria-label={t("common.expandImage", "Expand image")}
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
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t("common.prevImage", "Previous image")}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t("common.nextImage", "Next image")}
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
                  className={`
                    min-w-[44px] min-h-[44px]
                    flex items-center justify-center
                    rounded-full
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-700
                    transition-all
                  `}
                  aria-label={t("common.goToSlide", "Go to slide {{number}}", {
                    number: idx + 1,
                  })}
                >
                  <span
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
              ? t("common.beforeCleaning", "Before cleaning")
              : t("common.afterCleaning", "After cleaning")
          }`}
          onClose={closeModal}
        >
          <div className="flex justify-center">
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              width={1200}
              height={900}
              className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GallerySlider;
