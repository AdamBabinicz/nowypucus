import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CallToAction from "@/components/CallToAction";

const Sprzet = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-16">

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

  // Equipment data
  const equipment = [
    {
      id: "karcher",
      name: "Kärcher Puzzi 10/1",
      image: "/images/tools/1.avif",
      description: t("equipment.karcher.description"),
      features: [
        t("equipment.karcher.feature1"),
        t("equipment.karcher.feature2"),
        t("equipment.karcher.feature3")
      ]
    },
    {
      id: "nilfisk",
      name: "Nilfisk MX7",
      image: "/images/tools/2.avif",
      description: t("equipment.nilfisk.description"),
      features: [
        t("equipment.nilfisk.feature1"),
        t("equipment.nilfisk.feature2"),
        t("equipment.nilfisk.feature3")
      ]
    },
    {
      id: "pressure",
      name: "Karcher Professional HD 9/20-4",
      image: "/images/tools/3.avif",
      description: t("equipment.pressure.description"),
      features: [
        t("equipment.pressure.feature1"),
        t("equipment.pressure.feature2"),
        t("equipment.pressure.feature3")
      ]
    },
    {
      id: "rotary",
      name: "MotorScrubber Drier 400",
      image: "/images/tools/4.avif",
      description: t("equipment.rotary.description"),
      features: [
        t("equipment.rotary.feature1"),
        t("equipment.rotary.feature2"),
        t("equipment.rotary.feature3")
      ]
    }
  ];

  const cleaningProducts = [
    {
      id: "pro1",
      name: t("equipment.products.product1.name"),
      type: t("equipment.products.product1.type"),
      usage: t("equipment.products.product1.usage")
    },
    {
      id: "pro2",
      name: t("equipment.products.product2.name"),
      type: t("equipment.products.product2.type"),
      usage: t("equipment.products.product2.usage")
    },
    {
      id: "pro3",
      name: t("equipment.products.product3.name"),
      type: t("equipment.products.product3.type"),
      usage: t("equipment.products.product3.usage")
    },
    {
      id: "pro4",
      name: t("equipment.products.product4.name"),
      type: t("equipment.products.product4.type"),
      usage: t("equipment.products.product4.usage")
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("meta.equipmentTitle")}</title>
        <meta name="description" content={t("meta.equipmentDescription")} />
        <meta property="og:title" content={t("meta.equipmentTitle")} />
        <meta property="og:description" content={t("meta.equipmentDescription")} />
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
            {t("equipmentPage.title")}
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
            {t("equipmentPage.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Main Equipment Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("equipmentPage.mainEquipmentTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("equipmentPage.mainEquipmentDesc")}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {equipment.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-gray-800 dark:text-white">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                  <h4 className="font-heading font-medium text-gray-800 dark:text-white mb-2">{t("equipmentPage.keyFeatures")}:</h4>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cleaning Products Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              {t("equipmentPage.productsTitle")}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-center mb-8">
              {t("equipmentPage.productsDesc")}
            </p>
            
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-slate-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t("equipmentPage.productName")}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t("equipmentPage.productType")}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t("equipmentPage.productUsage")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {cleaningProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {product.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {product.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {t("equipmentPage.productsNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                {t("equipmentPage.approachTitle")}
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t("equipmentPage.approachPara1")}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t("equipmentPage.approachPara2")}
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{t("equipmentPage.approachPoint1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{t("equipmentPage.approachPoint2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{t("equipmentPage.approachPoint3")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 md:h-full min-h-[320px] bg-gray-200 dark:bg-slate-800 rounded-xl overflow-hidden"
            >
              <img 
                src="/images/team/2.avif" 
                alt="Profesjonalny sprzęt do czyszczenia" 
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <CallToAction />
    </>
  );
};

export default Sprzet;
