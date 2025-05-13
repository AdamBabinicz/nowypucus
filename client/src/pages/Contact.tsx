import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";
import ContactForm from "@/components/ContactForm";
import qrCode from "@assets/qr.png";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-16">

  return (
    <>
      <Helmet>
        <title>{t("meta.contactTitle")}</title>
        <meta name="description" content={t("meta.contactDescription")} />
        <meta property="og:title" content={t("meta.contactTitle")} />
        <meta property="og:description" content={t("meta.contactDescription")} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Super Pucuś",
            "image": "https://pranie-dywanow.j.pl/logo.png",
            "telephone": "+48531890827",
            "email": "kontakt@super-pucus.pl",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Radom",
              "addressRegion": "mazowieckie",
              "addressCountry": "PL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 51.4027,
              "longitude": 21.1470
            },
            "url": "https://pranie-dywanow.j.pl",
            "sameAs": [
              "https://facebook.com/super.pucus",
              "https://instagram.com/super.pucus",
              "https://m.me/super.pucus"
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "20:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "16:00"
              }
            ],
            "priceRange": "$$"
          }
        `}</script>
      </Helmet>>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-800 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("contactPage.title")}
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
            {t("contactPage.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                  {t("contactPage.getInTouch")} <span className="text-primary dark:text-primary-400">Super Pucuś</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {t("contactPage.questions")}
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
                  <div className="flex items-center space-x-6">
                    <img src={qrCode} alt="Kod QR do Messengera" className="w-40 h-40" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{t("contactPage.scanQR")}</p>
                      <a 
                        href="https://m.me/super.pucus" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <BsMessenger className="w-5 h-5 mr-2" />
                        {t("contactPage.messengerLink")}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-heading font-semibold text-lg text-gray-800 dark:text-white mb-3">{t("contactPage.socialMediaTitle")}</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://facebook.com/super.pucus" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/super.pucus" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6">
                <h2 className="font-heading text-2xl font-semibold mb-6 text-gray-800 dark:text-white">{t("contactPage.contactFormTitle")}</h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {t("contactPage.locationTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("contactPage.locationDesc")}
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-700 p-2 rounded-xl shadow-md">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe 
                title="Google Map of Radom area"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80516.83460266948!2d21.069282324513106!3d51.40279257232701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4718f5e71e8cdf95%3A0x302c17a6e0bbbd90!2sRadom!5e0!3m2!1sen!2spl!4v1655895512345!5m2!1sen!2spl"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
              {t("contactPage.faqTitle")}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t("contactPage.faq1Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq1Answer")}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t("contactPage.faq2Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq2Answer")}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t("contactPage.faq3Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq3Answer")}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {t("contactPage.faq4Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq4Answer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
