import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { FiZap, FiCheckCircle, FiClock, FiDollarSign, FiMapPin, FiThumbsUp, FiPhone, FiMail } from "react-icons/fi";
import ServiceCard from "@/components/ServiceCard";
import GallerySlider from "@/components/GallerySlider";
import CallToAction from "@/components/CallToAction";
import ContactForm from "@/components/ContactForm";
import qrCode from "@assets/qr.png";

const Home = () => {
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

  // Service cards data
  const serviceCards = [
    {
      id: "dywany",
      title: t("services.carpetCleaning"),
      description: t("services.carpetCleaningDesc"),
      features: [
        { id: "c1", text: t("services.carpetFeature1") },
        { id: "c2", text: t("services.carpetFeature2") },
        { id: "c3", text: t("services.carpetFeature3") }
      ],
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      id: "meble",
      title: t("services.furnitureCleaning"),
      description: t("services.furnitureCleaningDesc"),
      features: [
        { id: "f1", text: t("services.furnitureFeature1") },
        { id: "f2", text: t("services.furnitureFeature2") },
        { id: "f3", text: t("services.furnitureFeature3") }
      ],
      image: "https://pixabay.com/get/g4881186e7325c4333727e09c5be1db0be4cdd01b8667566c1ce13ce2451a46d8f114cd72408b33461da3d32957f817448c0b2f8eb357325cf5272c5e34c8de20_1280.jpg",
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
      image: "https://images.unsplash.com/photo-1600566752355-35d678940e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("modalContent.pricingNote")}</p>
          </div>
        )
      }
    }
  ];

  // Define image type
  interface Image {
    id: string;
    src: string;
    alt: string;
    type: "before" | "after";
  }

  // Gallery slider images
  const carpetImages: Image[] = [
    { id: "c1", src: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Przed czyszczeniem", type: "before" },
    { id: "c2", src: "https://pixabay.com/get/g3fc231a668fd0b8aa8df4f8b8b6a878f6c302a07f0df5bfba8abd0c29e21483de578d633605faaa0dd56bba987c09cafc9c4d634c26317e6feb6c16fc232bfde_1280.jpg", alt: "Po czyszczeniu", type: "after" }
  ];

  const furnitureImages: Image[] = [
    { id: "f1", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Przed czyszczeniem", type: "before" },
    { id: "f2", src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Po czyszczeniu", type: "after" }
  ];

  return (
    <>
      <Helmet>
        <title>Super Pucuś - Pranie dywanów, tapicerki meblowej-Radom</title>
        <meta name="description" content="Pranie dywanów, wykładzin, tapicerki meblowej w Radomiu. Mycie kostki, posadzek, tarasów. Profesjonalnie dla domu i biura. Zadzwoń do nas! ☎ +48531890827" />
        <meta property="og:title" content="Super Pucuś - Profesjonalne czyszczenie w Radomiu" />
        <meta property="og:description" content="Pranie dywanów, wykładzin, tapicerki meblowej w Radomiu. Mycie kostki, posadzek, tarasów. Zadzwoń: +48531890827" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1559060177-9a0de628bac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80" 
            alt="Profesjonalne czyszczenie dywanów" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/oferta" className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300">
                {t("hero.seeServices")}
              </Link>
              <Link href="/kontakt" className="inline-block bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-accent-700 transition-colors duration-300">
                {t("hero.getQuote")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t("whyUs.title")} <span className="text-primary dark:text-primary-400">Super Pucuś</span>?
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-14 h-14 flex items-center justify-center mb-4">
                <FiZap className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t("whyUs.feature1.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("whyUs.feature1.description")}</p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-14 h-14 flex items-center justify-center mb-4">
                <FiCheckCircle className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t("whyUs.feature2.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("whyUs.feature2.description")}</p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-14 h-14 flex items-center justify-center mb-4">
                <FiClock className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t("whyUs.feature3.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("whyUs.feature3.description")}</p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-14 h-14 flex items-center justify-center mb-4">
                <FiDollarSign className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t("whyUs.feature4.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("whyUs.feature4.description")}</p>
            </motion.div>
            
            {/* Feature 5 */}
            <motion.div 
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-14 h-14 flex items-center justify-center mb-4">
                <FiMapPin className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t("whyUs.feature5.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("whyUs.feature5.description")}</p>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div 
              className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary-100 dark:bg-primary-900 w-14 h-14 flex items-center justify-center mb-4">
                <FiThumbsUp className="w-8 h-8 text-primary dark:text-primary-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t("whyUs.feature6.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("whyUs.feature6.description")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t("services.title")} <span className="text-primary dark:text-primary-400">{t("services.titleHighlight")}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service) => (
              <ServiceCard 
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                features={service.features}
                image={service.image}
                modalContent={service.modalContent}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/oferta" className="inline-block bg-accent-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-accent-700 transition-colors duration-300">
              {t("services.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 bg-gray-100 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t("gallery.title")} <span className="text-primary dark:text-primary-400">{t("gallery.titleHighlight")}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GallerySlider images={carpetImages} title={t("gallery.carpets")} />
            <GallerySlider images={furnitureImages} title={t("gallery.furniture")} />
          </div>
          
          <div className="text-center">
            <Link href="/realizacje" className="inline-block bg-accent-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-accent-700 transition-colors duration-300">
              {t("gallery.viewMore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <CallToAction />

      {/* Contact Preview Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                {t("contact.getInTouch")} <span className="text-primary dark:text-primary-400">Super Pucuś</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {t("contact.questions")}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                    <FiPhone className="w-6 h-6 text-primary dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-800 dark:text-white mb-1">{t("contact.phone")}</h3>
                    <a href="tel:+48531890827" className="text-primary dark:text-primary-400 font-medium text-lg">+48 531 890 827</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                    <FiMail className="w-6 h-6 text-primary dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-800 dark:text-white mb-1">{t("contact.email")}</h3>
                    <a href="mailto:kontakt@super-pucus.pl" className="text-primary dark:text-primary-400">kontakt@super-pucus.pl</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                    <FiClock className="w-6 h-6 text-primary dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-800 dark:text-white mb-1">{t("contact.hours")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("contact.weekdays")}</p>
                    <p className="text-gray-600 dark:text-gray-300">{t("contact.saturday")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                    <FiMapPin className="w-6 h-6 text-primary dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-gray-800 dark:text-white mb-1">{t("contact.serviceArea")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("contact.areaDescription")}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-heading font-semibold text-lg text-gray-800 dark:text-white mb-3">{t("contact.qrCode")}</h3>
                <img src={qrCode} alt="Kod QR do Messengera" className="w-40 h-40" />
              </div>
            </div>
            
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-6 text-gray-800 dark:text-white">{t("contact.quickForm")}</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
