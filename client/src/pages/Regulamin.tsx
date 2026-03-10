import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import ContentContainer from "@/components/ContentContainer";

const Regulamin = () => {
  const { t } = useTranslation();
  const [location] = useLocation();

  const baseUrl = "https://pranie-dywanow.j.pl";
  const canonicalUrl = `${baseUrl}${location}`;
  const plUrl = `${baseUrl}/regulamin`;
  const enUrl = `${baseUrl}/en/terms`;

  return (
    <>
      <Helmet>
        <title>{t("meta.termsTitle", "Regulamin | SUPER PUCUŚ")}</title>
        <meta
          name="description"
          content={t(
            "meta.termsDescription",
            "Regulamin świadczenia usług przez firmę SUPER PUCUŚ.",
          )}
        />
        <meta
          property="og:title"
          content={t("meta.termsTitle", "Regulamin | SUPER PUCUŚ")}
        />
        <meta
          property="og:description"
          content={t(
            "meta.termsDescription",
            "Regulamin świadczenia usług przez firmę SUPER PUCUŚ.",
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
            {t("termsPage.title", "Regulamin")}
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
            {t("termsPage.subtitle", "Zasady świadczenia naszych usług")}
          </motion.p>
        </ContentContainer>
      </section>

      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <ContentContainer>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 md:p-10">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">
                  {t("termsPage.section1Title", "1. Postanowienia ogólne")}
                </h2>
                <p>
                  {t(
                    "termsPage.section1Para1",
                    "Regulamin określa zasady świadczenia usług...",
                  )}
                </p>
                <p>
                  {t("termsPage.section1Para2", "Właścicielem serwisu jest...")}
                </p>
                <p>
                  {t(
                    "termsPage.section1Para3",
                    "Zlecenie usługi oznacza akceptację...",
                  )}
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section2Title", "2. Zasady świadczenia usług")}
                </h2>
                <p>
                  {t("termsPage.section2Para1", "Świadczymy usługi z zakresu:")}
                </p>
                <ul>
                  <li>
                    {t("termsPage.section2List1", "Prania ekstrakcyjnego")}
                  </li>
                  <li>
                    {t(
                      "termsPage.section2List2",
                      "Czyszczenia tapicerki meblowej",
                    )}
                  </li>
                  <li>
                    {t(
                      "termsPage.section2List3",
                      "Prania tapicerki samochodowej",
                    )}
                  </li>
                  <li>
                    {t("termsPage.section2List4", "Usuwania trudnych plam")}
                  </li>
                  <li>
                    {t("termsPage.section2List5", "Neutralizacji zapachów")}
                  </li>
                </ul>
                <p>
                  {t(
                    "termsPage.section2Para2",
                    "Terminy ustalane są indywidualnie...",
                  )}
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section3Title", "3. Płatności i wycena")}
                </h2>
                <p>
                  {t(
                    "termsPage.section3Para1",
                    "Wycena usług ma charakter orientacyjny...",
                  )}
                </p>
                <p>
                  {t(
                    "termsPage.section3Para2",
                    "Płatność następuje po wykonaniu usługi...",
                  )}
                </p>
                <p>
                  {t(
                    "termsPage.section3Para3",
                    "Akceptujemy płatności gotówką, blikiem lub przelewem...",
                  )}
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section4Title", "4. Odpowiedzialność")}
                </h2>
                <p>
                  {t(
                    "termsPage.section4Para1",
                    "Nie ponosimy odpowiedzialności za:",
                  )}
                </p>
                <ul>
                  <li>
                    {t("termsPage.section4List1", "Ukryte wady materiału")}
                  </li>
                  <li>
                    {t("termsPage.section4List2", "Trwałe przebarwienia")}
                  </li>
                  <li>
                    {t("termsPage.section4List3", "Pęknięcia i przetarcia")}
                  </li>
                  <li>
                    {t(
                      "termsPage.section4List4",
                      "Uszkodzenia wynikające z wieku tkaniny",
                    )}
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section5Title", "5. Reklamacje")}
                </h2>
                <p>
                  {t(
                    "termsPage.section5Para1",
                    "Klient ma prawo złożyć reklamację...",
                  )}
                </p>
                <p>
                  {t(
                    "termsPage.section5Para2",
                    "Reklamacja zostanie rozpatrzona w ciągu 14 dni...",
                  )}
                </p>
                <p>
                  {t(
                    "termsPage.section5Para3",
                    "Zgłoszenia należy kierować na adres e-mail...",
                  )}
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section6Title", "6. Odstąpienie od umowy")}
                </h2>
                <p>
                  {t(
                    "termsPage.section6Para1",
                    "Klient ma prawo zrezygnować z usługi przed jej rozpoczęciem...",
                  )}
                </p>
                <p>
                  {t(
                    "termsPage.section6Para2",
                    "W przypadku rezygnacji w dniu zlecenia mogą obowiązywać opłaty...",
                  )}
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  {t("termsPage.section7Title", "7. Postanowienia końcowe")}
                </h2>
                <p>
                  {t(
                    "termsPage.section7Para1",
                    "W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy KC...",
                  )}
                </p>
                <p>
                  {t(
                    "termsPage.section7Para2",
                    "Zastrzegamy sobie prawo do zmian w regulaminie...",
                  )}
                </p>
                <ul>
                  <li>
                    {t(
                      "termsPage.section7List1",
                      "Zmiany publikowane są na stronie",
                    )}
                  </li>
                  <li>
                    {t(
                      "termsPage.section7List2",
                      "Wchodzą w życie z dniem publikacji",
                    )}
                  </li>
                  <li>
                    {t(
                      "termsPage.section7List3",
                      "Nie dotyczą zleceń już przyjętych",
                    )}
                  </li>
                </ul>
                <p>
                  {t(
                    "termsPage.section7Para3",
                    "Ewentualne spory będą rozwiązywane polubownie...",
                  )}
                </p>

                <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                  {t("termsPage.lastUpdate", "Ostatnia aktualizacja")}:{" "}
                  {t("termsPage.lastUpdateDate", "01.01.2024")}
                </p>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="py-10 bg-gray-50 dark:bg-slate-800">
        <ContentContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground dark:text-white">
              {t(
                "termsPage.contactTitle",
                "Masz pytania dotyczące regulaminu?",
              )}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t(
                "termsPage.contactText",
                "Skontaktuj się z nami, chętnie odpowiemy na wszystkie Twoje pytania.",
              )}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
              <a
                href="mailto:mariuszek1989poczta@wp.pl"
                className="text-primary dark:text-primary-400 hover:underline"
              >
                mariuszek1989poczta@wp.pl
              </a>
              <span className="hidden md:inline text-gray-400">|</span>
              <a
                href="tel:+48531890827"
                className="text-primary dark:text-primary-400 hover:underline"
              >
                +48 531 890 827
              </a>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  );
};

export default Regulamin;
