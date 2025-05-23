import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CallToAction from "@/components/CallToAction";
import ContentContainer from "@/components/ContentContainer";

const Sprzet = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const equipment = [
    {
      id: "karcher_puzzi_10_1",
      name: t("equipmentPage.equipment.karcher_puzzi_10_1.name"),
      image: "/images/tools/25.avif",
      description: t("equipmentPage.equipment.karcher_puzzi_10_1.description"),
      features: [
        t("equipmentPage.equipment.karcher_puzzi_10_1.feature1"),
        t("equipmentPage.equipment.karcher_puzzi_10_1.feature2"),
        t("equipmentPage.equipment.karcher_puzzi_10_1.feature3"),
      ],
    },
    {
      id: "viper_lsu375",
      name: t("equipmentPage.equipment.viper_lsu375.name"),
      image: "/images/tools/8.avif",
      description: t("equipmentPage.equipment.viper_lsu375.description"),
      features: [
        t("equipmentPage.equipment.viper_lsu375.feature1"),
        t("equipmentPage.equipment.viper_lsu375.feature2"),
        t("equipmentPage.equipment.viper_lsu375.feature3"),
      ],
    },
    {
      id: "cleansystem_duster",
      name: t("equipmentPage.equipment.cleansystem_duster.name"),
      image: "/images/tools/14.avif",
      description: t("equipmentPage.equipment.cleansystem_duster.description"),
      features: [
        t("equipmentPage.equipment.cleansystem_duster.feature1"),
        t("equipmentPage.equipment.cleansystem_duster.feature2"),
        t("equipmentPage.equipment.cleansystem_duster.feature3"),
      ],
    },
    {
      id: "rimpar_spinner",
      name: t("equipmentPage.equipment.rimpar_spinner.name"),
      image: "/images/tools/5.avif",
      description: t("equipmentPage.equipment.rimpar_spinner.description"),
      features: [
        t("equipmentPage.equipment.rimpar_spinner.feature1"),
        t("equipmentPage.equipment.rimpar_spinner.feature2"),
        t("equipmentPage.equipment.rimpar_spinner.feature3"),
      ],
    },
    {
      id: "viper_ls160",
      name: t("equipmentPage.equipment.viper_ls160.name"),
      image: "/images/tools/9.avif",
      description: t("equipmentPage.equipment.viper_ls160.description"),
      features: [
        t("equipmentPage.equipment.viper_ls160.feature1"),
        t("equipmentPage.equipment.viper_ls160.feature2"),
        t("equipmentPage.equipment.viper_ls160.feature3"),
      ],
    },
    {
      id: "warmtek_op50",
      name: t("equipmentPage.equipment.warmtek_op50.name"),
      image: "/images/tools/18.avif",
      description: t("equipmentPage.equipment.warmtek_op50.description"),
      features: [
        t("equipmentPage.equipment.warmtek_op50.feature1"),
        t("equipmentPage.equipment.warmtek_op50.feature2"),
        t("equipmentPage.equipment.warmtek_op50.feature3"),
      ],
    },
    {
      id: "heaters_fans",
      name: t("equipmentPage.equipment.heaters_fans.name"),
      image: "/images/tools/21.avif",
      description: t("equipmentPage.equipment.heaters_fans.description"),
      features: [
        t("equipmentPage.equipment.heaters_fans.feature1"),
        t("equipmentPage.equipment.heaters_fans.feature2"),
        t("equipmentPage.equipment.heaters_fans.feature3"),
      ],
    },
    {
      id: "carpet_rack",
      name: t("equipmentPage.equipment.carpet_rack.name"),
      image: "/images/tools/23.avif",
      description: t("equipmentPage.equipment.carpet_rack.description"),
      features: [
        t("equipmentPage.equipment.carpet_rack.feature1"),
        t("equipmentPage.equipment.carpet_rack.feature2"),
        t("equipmentPage.equipment.carpet_rack.feature3"),
      ],
    },
    {
      id: "nilfisk_premium200",
      name: t("equipmentPage.equipment.nilfisk_premium200.name"),
      image: "/images/tools/11.avif",
      description: t("equipmentPage.equipment.nilfisk_premium200.description"),
      features: [
        t("equipmentPage.equipment.nilfisk_premium200.feature1"),
        t("equipmentPage.equipment.nilfisk_premium200.feature2"),
        t("equipmentPage.equipment.nilfisk_premium200.feature3"),
      ],
    },
    {
      id: "dacia_transport",
      name: t("equipmentPage.equipment.dacia_transport.name"),
      image: "/images/tools/24.avif",
      description: t("equipmentPage.equipment.dacia_transport.description"),
      features: [
        t("equipmentPage.equipment.dacia_transport.feature1"),
        t("equipmentPage.equipment.dacia_transport.feature2"),
        t("equipmentPage.equipment.dacia_transport.feature3"),
      ],
    },
  ];

  const cleaningProducts = [
    {
      id: "pro1",
      name: t("equipmentPage.equipment.products.product1.name"),
      type: t("equipmentPage.equipment.products.product1.type"),
      usage: t("equipmentPage.equipment.products.product1.usage"),
    },
    {
      id: "pro2",
      name: t("equipmentPage.equipment.products.product2.name"),
      type: t("equipmentPage.equipment.products.product2.type"),
      usage: t("equipmentPage.equipment.products.product2.usage"),
    },
    {
      id: "pro3",
      name: t("equipmentPage.equipment.products.product3.name"),
      type: t("equipmentPage.equipment.products.product3.type"),
      usage: t("equipmentPage.equipment.products.product3.usage"),
    },
    {
      id: "pro4",
      name: t("equipmentPage.equipment.products.product4.name"),
      type: t("equipmentPage.equipment.products.product4.type"),
      usage: t("equipmentPage.equipment.products.product4.usage"),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t("meta.equipmentTitle")}</title>
        <meta name="description" content={t("meta.equipmentDescription")} />
        <meta property="og:title" content={t("meta.equipmentTitle")} />
        <meta
          property="og:description"
          content={t("meta.equipmentDescription")}
        />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-primary-800 pt-32 pb-12 md:pt-40 md:pb-20">
        <ContentContainer className="text-center">
          <motion.h2
            className="font-limelight text-3xl md:text-4xl font-bold dark:text-primary-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("equipmentPage.title")}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="dark:text-primary-foreground/90 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("equipmentPage.subtitle")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="py-16 bg-background dark:bg-background overflow-hidden">
        <ContentContainer>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-limelight text-3xl font-bold mb-6  dark:text-foreground">
              {t("equipmentPage.mainEquipmentTitle")}
            </h2>
            <p className="dark:text-foreground/80">
              {t("equipmentPage.mainEquipmentDesc")}
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {equipment.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-card dark:bg-card rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[480px] object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-card-foreground dark:text-card-foreground">
                    {item.name}
                  </h3>
                  <p className="text-card-foreground/80 dark:text-card-foreground/80 mb-4 flex-grow">
                    {item.description}
                  </p>
                  <h4 className="font-heading font-medium text-card-foreground dark:text-card-foreground mb-2">
                    {t("equipmentPage.keyFeatures")}:
                  </h4>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-card-foreground/80 dark:text-card-foreground/80"
                      >
                        <svg
                          className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-muted dark:bg-muted">
        <ContentContainer>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-limelight text-3xl font-bold text-center mb-12 text-foreground dark:text-foreground">
              {t("equipmentPage.productsTitle")}
            </h2>
            <p className="text-foreground/80 dark:text-foreground/80 text-center mb-8">
              {t("equipmentPage.productsDesc")}
            </p>
            <div className="overflow-x-auto bg-card dark:bg-card rounded-xl shadow-md">
              <table className="min-w-full divide-y divide-border dark:divide-border">
                <thead className="bg-muted/50 dark:bg-muted/50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider"
                    >
                      {t("equipmentPage.productName")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider"
                    >
                      {t("equipmentPage.productType")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider"
                    >
                      {t("equipmentPage.productUsage")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-border">
                  {cleaningProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-card-foreground dark:text-card-foreground">
                        {product.name}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-card-foreground/80 dark:text-card-foreground/80">
                        {product.type}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-card-foreground/80 dark:text-card-foreground/80">
                        {product.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <p className="text-primary dark:text-sky-400 text-sm">
                {t("equipmentPage.productsNote")}
              </p>
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-background dark:bg-background">
        <ContentContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-limelight text-3xl font-bold mb-6 text-foreground dark:text-foreground">
                {t("equipmentPage.approachTitle")}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-foreground/80 dark:text-foreground/80 mb-4">
                  {t("equipmentPage.approachPara1")}
                </p>
                <p className="text-foreground/80 dark:text-foreground/80 mb-4">
                  {t("equipmentPage.approachPara2")}
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start text-foreground/80 dark:text-foreground/80">
                    <svg
                      className="w-5 h-5 text-primary dark:text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{t("equipmentPage.approachPoint1")}</span>
                  </li>
                  <li className="flex items-start text-foreground/80 dark:text-foreground/80">
                    <svg
                      className="w-5 h-5 text-primary dark:text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{t("equipmentPage.approachPoint2")}</span>
                  </li>
                  <li className="flex items-start text-foreground/80 dark:text-foreground/80">
                    <svg
                      className="w-5 h-5 text-primary dark:text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
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
              className="relative h-80 md:h-full min-h-[320px] bg-card dark:bg-card rounded-xl overflow-hidden"
            >
              <img
                src="/images/tools/7.avif"
                alt="Profesjonalny sprzęt do czyszczenia"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </ContentContainer>
      </section>

      <CallToAction />
    </>
  );
};

export default Sprzet;
