import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GallerySlider from "@/components/GallerySlider";
import CallToAction from "@/components/CallToAction";

const Realizacje = () => {
  const { t } = useTranslation();
  const dywanyRef = useRef<HTMLElement>(null);
  const wykladzinyRef = useRef<HTMLElement>(null);
  const mebleRef = useRef<HTMLElement>(null);
  const kostkaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // If URL has a hash, scroll to the section
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      let element;
      
      switch (id) {
        case 'dywany':
          element = dywanyRef.current;
          break;
        case 'wykladziny':
          element = wykladzinyRef.current;
          break;
        case 'meble':
          element = mebleRef.current;
          break;
        case 'kostka-plytki':
          element = kostkaRef.current;
          break;
        default:
          break;
      }
      
      if (element) {
        setTimeout(() => {
          const yOffset = -80; // Header offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  // Gallery images data
  const carpetImages: Image[] = [
    { id: "c1", src: "/images/dywany/21.avif", alt: "Brudny dywan przed czyszczeniem", type: "before" },
    { id: "c2", src: "/images/dywany/22.avif", alt: "Czysty dywan po praniu", type: "after" },
    { id: "c3", src: "/images/dywany/48.avif", alt: "Dywan z plamami przed czyszczeniem", type: "before" },
    { id: "c4", src: "/images/dywany/49.avif", alt: "Dywan bez plam po czyszczeniu", type: "after" }
  ];

  const floorImages = [
    { id: "f1", src: "/images/dywany/43.avif", alt: "Brudna wykładzina przed czyszczeniem", type: "before" },
    { id: "f2", src: "/images/dywany/45.avif", alt: "Czysta wykładzina po praniu", type: "after" },
    { id: "f3", src: "/images/dywany/52.avif", alt: "Wykładzina z plamami przed czyszczeniem", type: "before" },
    { id: "f4", src: "/images/dywany/53.avif", alt: "Wykładzina bez plam po czyszczeniu", type: "after" }
  ];

  const furnitureImages = [
    { id: "m1", src: "/images/meble/1.avif", alt: "Zabrudzona sofa przed czyszczeniem", type: "before" },
    { id: "m2", src: "/images/meble/2.avif", alt: "Czysta sofa po praniu", type: "after" },
    { id: "m3", src: "/images/meble/3.avif", alt: "Fotel z plamami przed czyszczeniem", type: "before" },
    { id: "m4", src: "/images/meble/4.avif", alt: "Czysty fotel po praniu", type: "after" }
  ];

  const paverImages = [
    { id: "p1", src: "/images/kostka/1.avif", alt: "Brudna kostka przed czyszczeniem", type: "before" },
    { id: "p2", src: "/images/kostka/2.avif", alt: "Czysta kostka po myciu", type: "after" },
    { id: "p3", src: "/images/glazura/1.avif", alt: "Zabrudzone płytki przed myciem", type: "before" },
    { id: "p4", src: "/images/glazura/2.avif", alt: "Czyste płytki po myciu", type: "after" }
  ];

  return (
    <>
      <Helmet>
        <title>{t("meta.portfolioTitle")}</title>
        <meta name="description" content={t("meta.portfolioDescription")} />
        <meta property="og:title" content={t("meta.portfolioTitle")} />
        <meta property="og:description" content={t("meta.portfolioDescription")} />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-800 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("portfolioPage.title")}
          </motion.h1>
          <motion.div
            className="w-20 h-1 bg-white mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-white text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("portfolioPage.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              {t("portfolioPage.introText")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#dywany" className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full transition-colors">
                {t("portfolio.carpets")}
              </a>
              <a href="#wykladziny" className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full transition-colors">
                {t("portfolio.flooring")}
              </a>
              <a href="#meble" className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full transition-colors">
                {t("portfolio.furniture")}
              </a>
              <a href="#kostka-plytki" className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full transition-colors">
                {t("portfolio.pavers")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Carpet Cleaning Portfolio */}
      <section ref={dywanyRef} id="dywany" className="py-12 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              {t("portfolioPage.carpetTitle")}
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t("portfolioPage.carpetDesc")}
              </p>
            </div>
            
            <GallerySlider images={carpetImages} title={t("portfolio.carpets")} />
          </motion.div>
        </div>
      </section>

      {/* Floor Cleaning Portfolio */}
      <section ref={wykladzinyRef} id="wykladziny" className="py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              {t("portfolioPage.floorTitle")}
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t("portfolioPage.floorDesc")}
              </p>
            </div>
            
            <GallerySlider images={floorImages} title={t("portfolio.flooring")} />
          </motion.div>
        </div>
      </section>

      {/* Furniture Cleaning Portfolio */}
      <section ref={mebleRef} id="meble" className="py-12 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              {t("portfolioPage.furnitureTitle")}
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t("portfolioPage.furnitureDesc")}
              </p>
            </div>
            
            <GallerySlider images={furnitureImages} title={t("portfolio.furniture")} />
          </motion.div>
        </div>
      </section>

      {/* Pavement Cleaning Portfolio */}
      <section ref={kostkaRef} id="kostka-plytki" className="py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              {t("portfolioPage.paverTitle")}
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {t("portfolioPage.paverDesc")}
              </p>
            </div>
            
            <GallerySlider images={paverImages} title={t("portfolio.pavers")} />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t("portfolioPage.testimonialTitle")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary dark:text-primary-400 font-bold text-xl">
                    A
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-heading font-semibold text-gray-800 dark:text-white">Anna K.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("portfolioPage.testimonial1Location")}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{t("portfolioPage.testimonial1")}"
              </p>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary dark:text-primary-400 font-bold text-xl">
                    M
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-heading font-semibold text-gray-800 dark:text-white">Marek W.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("portfolioPage.testimonial2Location")}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{t("portfolioPage.testimonial2")}"
              </p>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary dark:text-primary-400 font-bold text-xl">
                    K
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-heading font-semibold text-gray-800 dark:text-white">Katarzyna B.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("portfolioPage.testimonial3Location")}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{t("portfolioPage.testimonial3")}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <CallToAction variant="secondary" />
    </>
  );
};

export default Realizacje;
