import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import CallToAction from "@/components/CallToAction";
import ContentContainer from "@/components/ContentContainer";

const PolitykaPrywatnosci = () => {
  const { t } = useTranslation();
  const [location] = useLocation();

  const baseUrl = "https://pranie-dywanow.j.pl";
  const canonicalUrl = `${baseUrl}${location}`;
  const plUrl = `${baseUrl}/polityka-prywatnosci`;
  const enUrl = `${baseUrl}/en/privacy-policy`;

  return (
    <>
      <Helmet>
        <title>
          {t("privacy.pageTitle", "Polityka Prywatności")} | SUPER PUCUŚ
        </title>
        <meta
          name="description"
          content={t(
            "privacy.metaDescription",
            "Zapoznaj się z naszą polityką prywatności. Dowiedz się, jak chronimy Twoje dane osobowe.",
          )}
        />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="pl" href={plUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="x-default" href={plUrl} />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-primary-800 pt-32 pb-12 md:pt-40 md:pb-20">
        <ContentContainer className="text-center">
          <motion.h1
            className="font-limelight text-3xl md:text-4xl font-bold dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("privacy.title", "Polityka Prywatności")}
          </motion.h1>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="dark:text-white text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("privacy.subtitle", "Twoje dane są u nas bezpieczne.")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <ContentContainer>
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose dark:prose-invert prose-lg max-w-none"
            >
              <h2>{t("privacy.section1.title", "1. Gromadzenie danych")}</h2>
              <p>
                {t(
                  "privacy.section1.content",
                  "Zbieramy informacje niezbędne do realizacji naszych usług oraz poprawy jakości obsługi.",
                )}
              </p>

              <h2>
                {t("privacy.section2.title", "2. Wykorzystanie informacji")}
              </h2>
              <p>
                {t(
                  "privacy.section2.content",
                  "Używamy zgromadzonych danych wyłącznie do celów związanych z realizacją zamówień oraz komunikacją z klientem.",
                )}
              </p>

              <h2>{t("privacy.section3.title", "3. Ochrona danych")}</h2>
              <p>
                {t(
                  "privacy.section3.content",
                  "Wdrażamy odpowiednie środki bezpieczeństwa, aby chronić Twoje dane przed nieautoryzowanym dostępem.",
                )}
              </p>

              <h2>{t("privacy.section4.title", "4. Twoje prawa")}</h2>
              <ul>
                <li>
                  {t(
                    "privacy.section4.item1",
                    "Prawo dostępu do swoich danych osobowych.",
                  )}
                </li>
                <li>
                  {t(
                    "privacy.section4.item2",
                    "Prawo do sprostowania lub usunięcia danych.",
                  )}
                </li>
                <li>
                  {t(
                    "privacy.section4.item3",
                    "Prawo do ograniczenia przetwarzania.",
                  )}
                </li>
              </ul>

              <h2>{t("privacy.section5.title", "5. Pliki Cookies")}</h2>
              <p>
                {t(
                  "privacy.section5.content",
                  "Nasza strona używa plików cookies w celu analizy ruchu oraz poprawy funkcjonalności witryny.",
                )}
              </p>

              <h2>{t("privacy.section6.title", "6. Kontakt")}</h2>
              <p>
                {t(
                  "privacy.section6.content",
                  "W razie pytań dotyczących polityki prywatności, prosimy o kontakt poprzez formularz na stronie.",
                )}
              </p>

              <p className="text-sm text-gray-500 mt-8">
                {t("privacy.lastUpdated", "Ostatnia aktualizacja")}:{" "}
                {t("privacy.lastUpdatedDate", "16.05.2025")}
              </p>
            </motion.div>
          </div>
        </ContentContainer>
      </section>
      {/* <CallToAction /> */}
    </>
  );
};

export default PolitykaPrywatnosci;
