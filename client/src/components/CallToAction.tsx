import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { FiPhone, FiMail } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";

interface CallToActionProps {
  variant?: "primary" | "secondary";
}

const CallToAction = ({ variant = "primary" }: CallToActionProps) => {
  const { t } = useTranslation();

  const bgColor = variant === "primary" 
    ? "bg-primary-600 dark:bg-primary-800" 
    : "bg-accent-600 dark:bg-accent-700";

  return (
    <section className={`py-16 ${bgColor} text-white`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          {t('cta.subtitle')} <strong>{t('cta.freeQuote')}</strong>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="tel:+48531890827" 
            className="inline-flex items-center justify-center bg-white text-gray-800 dark:text-primary-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <FiPhone className="w-5 h-5 mr-2" />
            {t('cta.call')}: +48 531 890 827
          </a>
          <a 
            href="https://m.me/super.pucus" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <BsMessenger className="w-5 h-5 mr-2" />
            {t('cta.messenger')}
          </a>
          <Link 
            href="/kontakt" 
            className="inline-flex items-center justify-center bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-accent-700 transition-colors duration-300"
          >
            <FiMail className="w-5 h-5 mr-2" />
            {t('cta.contactForm')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
