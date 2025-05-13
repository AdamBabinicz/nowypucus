import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import CallToAction from "@/components/CallToAction";
import Link from "@/components/Link";

const Oferta = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Services data
  const services = [
    {
      id: "dywany",
      title: t("services.carpetCleaning"),
      description: t("services.carpetCleaningDesc"),
      features: [
        { id: "c1", text: t("services.carpetFeature1") },
        { id: "c2", text: t("services.carpetFeature2") },
        { id: "c3", text: t("services.carpetFeature3") },
        { id: "c4", text: t("services.carpetFeature4") }
      ],
      image: "/images/dywany/1.avif",
      modalContent: {
        title: t("services.carpetCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{t("modalContent.carpetDesc")}</p>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.process")}</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t("modalContent.carpetProcess1")}</li>
              <li>{t("modalContent.carpetProcess2")}</li>
              <li>{t("modalContent.carpetProcess3")}</li>
              <li>{t("modalContent.carpetProcess4")}</li>
              <li>{t("modalContent.carpetProcess5")}</li>
              <li>{t("modalContent.carpetProcess6")}</li>
            </ol>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.pricing")}</h4>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-4">
              <table className="w-full text-gray-700 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="text-left pb-2">{t("modalContent.service")}</th>
                    <th className="text-right pb-2">{t("modalContent.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.carpetCleaning")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 15 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.floorCleaning")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 12 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.orientalCarpet")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 25 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.stainRemoval")}</td>
                    <td className="text-right py-2">+20% {t("modalContent.toBasePrice")}</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.impregnation")}</td>
                    <td className="text-right py-2">+5 zł/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("modalContent.pricingNote")}</p>
          </div>
        )
      }
    },
    {
      id: "wykladziny",
      title: t("services.floorCleaning"),
      description: t("services.floorCleaningDesc"),
      features: [
        { id: "w1", text: t("services.floorFeature1") },
        { id: "w2", text: t("services.floorFeature2") },
        { id: "w3", text: t("services.floorFeature3") }
      ],
      image: "/images/dywany/42.avif",
      modalContent: {
        title: t("services.floorCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{t("modalContent.floorDesc")}</p>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.process")}</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t("modalContent.floorProcess1")}</li>
              <li>{t("modalContent.floorProcess2")}</li>
              <li>{t("modalContent.floorProcess3")}</li>
              <li>{t("modalContent.floorProcess4")}</li>
              <li>{t("modalContent.floorProcess5")}</li>
            </ol>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.pricing")}</h4>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-4">
              <table className="w-full text-gray-700 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="text-left pb-2">{t("modalContent.service")}</th>
                    <th className="text-right pb-2">{t("modalContent.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.floorCleaning")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 12 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.stainRemoval")}</td>
                    <td className="text-right py-2">+20% {t("modalContent.toBasePrice")}</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.commercialFloor")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 10 zł/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("modalContent.pricingNote")}</p>
          </div>
        )
      }
    },
    {
      id: "meble",
      title: t("services.furnitureCleaning"),
      description: t("services.furnitureCleaningDesc"),
      features: [
        { id: "f1", text: t("services.furnitureFeature1") },
        { id: "f2", text: t("services.furnitureFeature2") },
        { id: "f3", text: t("services.furnitureFeature3") }
      ],
      image: "/images/meble/5.avif",
      modalContent: {
        title: t("services.furnitureCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{t("modalContent.furnitureDesc")}</p>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.process")}</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t("modalContent.furnitureProcess1")}</li>
              <li>{t("modalContent.furnitureProcess2")}</li>
              <li>{t("modalContent.furnitureProcess3")}</li>
              <li>{t("modalContent.furnitureProcess4")}</li>
              <li>{t("modalContent.furnitureProcess5")}</li>
              <li>{t("modalContent.furnitureProcess6")}</li>
            </ol>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.pricing")}</h4>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-4">
              <table className="w-full text-gray-700 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="text-left pb-2">{t("modalContent.service")}</th>
                    <th className="text-right pb-2">{t("modalContent.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.sofa2")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 120 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.sofa3")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 150 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.corner")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 200 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.armchair")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 70 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.chair")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 30 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.mattress1")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 80 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.mattress2")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 140 zł</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("modalContent.pricingNote")}</p>
          </div>
        )
      }
    },
    {
      id: "kostka",
      title: t("services.paverCleaning"),
      description: t("services.paverCleaningDesc"),
      features: [
        { id: "p1", text: t("services.paverFeature1") },
        { id: "p2", text: t("services.paverFeature2") },
        { id: "p3", text: t("services.paverFeature3") }
      ],
      image: "/images/kostka/4.avif",
      modalContent: {
        title: t("services.paverCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{t("modalContent.paverDesc")}</p>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.process")}</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t("modalContent.paverProcess1")}</li>
              <li>{t("modalContent.paverProcess2")}</li>
              <li>{t("modalContent.paverProcess3")}</li>
              <li>{t("modalContent.paverProcess4")}</li>
              <li>{t("modalContent.paverProcess5")}</li>
            </ol>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.pricing")}</h4>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-4">
              <table className="w-full text-gray-700 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="text-left pb-2">{t("modalContent.service")}</th>
                    <th className="text-right pb-2">{t("modalContent.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.paverCleaning")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 10 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.tileCleaning")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 12 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.mossRemoval")}</td>
                    <td className="text-right py-2">+3 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.impregnation")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 8 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.jointFilling")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 5 zł/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("modalContent.pricingNote")}</p>
          </div>
        )
      }
    },
    {
      id: "plytki",
      title: t("services.tileCleaning"),
      description: t("services.tileCleaningDesc"),
      features: [
        { id: "t1", text: t("services.tileFeature1") },
        { id: "t2", text: t("services.tileFeature2") },
        { id: "t3", text: t("services.tileFeature3") }
      ],
      image: "/images/glazura/3.avif",
      modalContent: {
        title: t("services.tileCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{t("modalContent.tileDesc")}</p>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.process")}</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t("modalContent.tileProcess1")}</li>
              <li>{t("modalContent.tileProcess2")}</li>
              <li>{t("modalContent.tileProcess3")}</li>
              <li>{t("modalContent.tileProcess4")}</li>
              <li>{t("modalContent.tileProcess5")}</li>
            </ol>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.pricing")}</h4>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-4">
              <table className="w-full text-gray-700 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="text-left pb-2">{t("modalContent.service")}</th>
                    <th className="text-right pb-2">{t("modalContent.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.tileCleaning")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 12 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.bathrooms")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 150 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.groutCleaning")}</td>
                    <td className="text-right py-2">+2 zł/m²</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.groutSealing")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 5 zł/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("modalContent.pricingNote")}</p>
          </div>
        )
      }
    },
    {
      id: "samochody",
      title: t("services.carCleaning"),
      description: t("services.carCleaningDesc"),
      features: [
        { id: "a1", text: t("services.carFeature1") },
        { id: "a2", text: t("services.carFeature2") },
        { id: "a3", text: t("services.carFeature3") }
      ],
      image: "/images/tools/5.avif",
      modalContent: {
        title: t("services.carCleaning"),
        content: (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{t("modalContent.carDesc")}</p>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.process")}</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t("modalContent.carProcess1")}</li>
              <li>{t("modalContent.carProcess2")}</li>
              <li>{t("modalContent.carProcess3")}</li>
              <li>{t("modalContent.carProcess4")}</li>
              <li>{t("modalContent.carProcess5")}</li>
            </ol>

            <h4 className="font-heading text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">{t("modalContent.pricing")}</h4>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-4">
              <table className="w-full text-gray-700 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="text-left pb-2">{t("modalContent.service")}</th>
                    <th className="text-right pb-2">{t("modalContent.price")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.smallCar")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 150 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.mediumCar")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 200 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.largeCar")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 250 zł</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2">{t("modalContent.seatCleaning")}</td>
                    <td className="text-right py-2">{t("modalContent.from")} 50 zł/seat</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("modalContent.pricingNote")}</p>
          </div>
        )
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("meta.servicesTitle")}</title>
        <meta name="description" content={t("meta.servicesDescription")} />
        <meta property="og:title" content={t("meta.servicesTitle")} />
        <meta property="og:description" content={t("meta.servicesDescription")} />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-800 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("servicesPage.title")}
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
            {t("servicesPage.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800" id="uslugi">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service) => (
              <motion.div 
                key={service.id}
                variants={itemVariants}
                id={service.id}
              >
                <ServiceCard 
                  {...service}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call To Action */}
      <CallToAction variant="secondary" />
    </>
  );
};

export default Oferta;