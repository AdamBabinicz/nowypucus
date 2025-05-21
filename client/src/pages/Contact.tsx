import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";
import {
  BsFacebook,
  BsInstagram,
  BsMessenger,
  BsPinterest,
  BsYoutube,
} from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle, FaStar } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import qrCode from "@assets/qr.avif";
import ContentContainer from "@/components/ContentContainer";

const Contact = () => {
  const { t } = useTranslation();

  const googleReviewLink =
    "https://search.google.com/local/writereview?placeid=ChIJ_9Tq7MReGEcRwnvtzQGkWL0";

  const socialLinks = [
    {
      href: "https://www.facebook.com/super.pucus",
      icon: BsFacebook,
      ariaLabelKey: "footer.social.facebook",
      defaultAriaLabel: "Facebook",
      colorClasses:
        "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
    },
    {
      href: "https://www.instagram.com/mariuszkucharski7",
      icon: BsInstagram,
      ariaLabelKey: "footer.social.instagram",
      defaultAriaLabel: "Instagram",
      colorClasses:
        "text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300",
    },
    {
      href: "https://m.me/super.pucus",
      icon: BsMessenger,
      ariaLabelKey: "footer.social.messenger",
      defaultAriaLabel: "Messenger",
      colorClasses:
        "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
    },
    {
      href: "https://twitter.com/Mariusz04417578",
      icon: FaXTwitter,
      ariaLabelKey: "footer.social.twitter",
      defaultAriaLabel: "Twitter",
      colorClasses:
        "text-sky-500 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300",
    },
    {
      href: "https://pl.pinterest.com/praniedywanow03",
      icon: BsPinterest,
      ariaLabelKey: "footer.social.pinterest",
      defaultAriaLabel: "Pinterest",
      colorClasses:
        "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300",
    },
    {
      href: "https://www.youtube.com/channel/UCKRWZoyA4cWXHANrQmwZiyw",
      icon: BsYoutube,
      ariaLabelKey: "footer.social.youtube",
      defaultAriaLabel: "YouTube",
      colorClasses:
        "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300",
    },
    {
      href: "https://maps.app.goo.gl/htxu5uJDo4ZiFsKo6",
      icon: FaGoogle,
      ariaLabelKey: "footer.social.googlemaps",
      defaultAriaLabel: "Google Maps",
      colorClasses:
        "text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t("meta.contactTitle")}</title>
        <meta name="description" content={t("meta.contactDescription")} />
        <meta property="og:title" content={t("meta.contactTitle")} />
        <meta
          property="og:description"
          content={t("meta.contactDescription")}
        />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "SUPER PUCUŚ",
            "image": "https://pranie-dywanow.j.pl/logo.avif",
            "telephone": "+48531890827",
            "email": "mariusz1989poczta@wp.pl",
            "address": {"@type": "PostalAddress", "addressLocality": "Radom", "addressRegion": "mazowieckie", "addressCountry": "PL"},
            "geo": {"@type": "GeoCoordinates", "latitude": 51.4027, "longitude": 21.1470},
            "url": "https://pranie-dywanow.j.pl",
            "sameAs": [
              "https://www.facebook.com/super.pucus",
              "https://www.instagram.com/mariuszkucharski7",
              "https://m.me/super.pucus",
              "https://twitter.com/Mariusz04417578",
              "https://pl.pinterest.com/praniedywanow03",
              "https://www.youtube.com/channel/UCKRWZoyA4cWXHANrQmwZiyw",
              "https://maps.app.goo.gl/htxu5uJDo4ZiFsKo6"
            ],
            "openingHoursSpecification": [
              {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "17:00"},
              {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00"}
            ],
            "priceRange": "PLN"
          }
        `}</script>
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-primary-800 pt-32 pb-12 md:pt-40 md:pb-20">
        <ContentContainer className="text-center">
          <motion.h2
            className="font-limelight text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("contactPage.title")}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-foreground dark:text-white text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("contactPage.subtitle")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="py-16 bg-white dark:bg-gradient-to-r dark:from-[hsl(var(--gradient-primary-h)_var(--gradient-primary-s)_var(--gradient-primary-l-darkened))] dark:to-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l-lightmode-darkened))]">
        <ContentContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-limelight text-3xl font-bold mb-6 text-foreground dark:text-white">
                  {t("contact.getInTouch")}{" "}
                  <span className="text-primary dark:text-primary-400">
                    SUPER PUCUŚ
                  </span>
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
                      <h3 className="font-heading font-semibold text-lg text-foreground dark:text-white mb-1">
                        {t("contact.phone")}
                      </h3>
                      <a
                        href="tel:+48531890827"
                        className="text-primary dark:text-primary-400 font-medium text-lg"
                      >
                        +48 531 890 827
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                      <FiMail className="w-6 h-6 text-primary dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground dark:text-white mb-1">
                        {t("contact.email")}
                      </h3>
                      <a
                        href="mailto:mariusz1989poczta@wp.pl"
                        className="text-primary dark:text-primary-400"
                      >
                        mariusz1989poczta@wp.pl
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                      <FiClock className="w-6 h-6 text-primary dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground dark:text-white mb-1">
                        {t("contact.hours")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t("contact.weekdays")}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t("contact.saturday")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-full p-3 mr-4">
                      <FiMapPin className="w-6 h-6 text-primary dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground dark:text-white mb-1">
                        {t("contact.serviceArea")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t("contact.areaDescription")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-heading font-semibold text-lg text-foreground dark:text-white mb-3">
                    {t("contact.qrCode")}
                  </h3>
                  <div className="flex items-center space-x-6">
                    <img
                      src={qrCode}
                      alt={t(
                        "contactPage.qrAltToReview",
                        "QR code to leave a Google review"
                      )}
                      className="w-40 h-40"
                    />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {t(
                          "contactPage.scanQRToReview",
                          "Scan the QR code with your phone to quickly add a company review on Google."
                        )}
                      </p>
                      <a
                        href={googleReviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-semibold px-4 py-2 rounded-lg transition-colors duration-300
                                 bg-[hsl(var(--marine-h)_var(--marine-s)_65%)] text-[hsl(var(--marine-h)_30%_15%)]
                                 border-2 border-transparent
                                 hover:bg-transparent
                                 hover:text-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))]
                                 hover:border-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))]
                                 dark:hover:text-[hsl(var(--foreground))]
                                 dark:hover:border-[hsl(var(--foreground))]"
                      >
                        <FaStar className="w-5 h-5 mr-2" />
                        {t("contactPage.goToReview", "Go to Reviews")}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-heading font-semibold text-lg text-foreground dark:text-white mb-3">
                    {t("contactPage.socialMediaTitle")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => {
                      const IconComponent = link.icon;
                      const translatedAriaLabel = t(
                        link.ariaLabelKey,
                        link.defaultAriaLabel
                      );
                      return (
                        <a
                          key={link.defaultAriaLabel}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${link.colorClasses} transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700`}
                          aria-label={translatedAriaLabel}
                        >
                          <IconComponent className="w-7 h-7" />
                        </a>
                      );
                    })}
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
                <h2 className="font-heading text-2xl font-semibold mb-6 text-foreground dark:text-white">
                  {t("contactPage.contactFormTitle")}
                </h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <ContentContainer>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-limelight text-2xl font-bold mb-4 text-foreground dark:text-white">
              {t("contactPage.locationTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("contactPage.locationDesc")}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                title="Google Map of Radom area"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.1710010793204!2d21.167129199999998!3d51.39991260000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47185ec4ecead4ff%3A0xbd58a401cded7bc2!2sPralnia%20Super%20Pucu%C5%9B.%20Pranie%20dywan%C3%B3w%20i%20tapicerki%20meblowej.!5e0!3m2!1spl!2spl!4v1709036383720!5m2!1spl!2spl"
                width="100%"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 my-6">
            {t("contactPage.locationDesc1")}
          </p>
        </ContentContainer>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <ContentContainer>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-limelight text-3xl font-bold text-center mb-10 text-foreground dark:text-white">
              {t("contactPage.faqTitle")}
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground dark:text-white">
                  {t("contactPage.faq1Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq1Answer")}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground dark:text-white">
                  {t("contactPage.faq2Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq2Answer")}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground dark:text-white">
                  {t("contactPage.faq3Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq3Answer")}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground dark:text-white">
                  {t("contactPage.faq4Question")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("contactPage.faq4Answer")}
                </p>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  );
};

export default Contact;
