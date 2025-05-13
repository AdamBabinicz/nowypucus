import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { BsMessenger, BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 dark:bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Super Pucuś</h3>
            <p className="mb-4 text-gray-300">
              {t('footer.companyDescription')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/super.pucus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <BsFacebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com/super.pucus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <BsInstagram className="w-6 h-6" />
              </a>
              <a 
                href="https://m.me/super.pucus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Messenger"
              >
                <BsMessenger className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="/oferta" className="text-gray-300 hover:text-white transition-colors">{t('nav.services')}</Link></li>
              <li><Link href="/o-firmie" className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/realizacje" className="text-gray-300 hover:text-white transition-colors">{t('nav.portfolio')}</Link></li>
              <li><Link href="/sprzet" className="text-gray-300 hover:text-white transition-colors">{t('nav.equipment')}</Link></li>
              <li><Link href="/kontakt" className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li>
                <a 
                  href="https://dywany-pranie.blogspot.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.blog')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li><Link href="/oferta#dywany" className="text-gray-300 hover:text-white transition-colors">{t('services.carpetCleaning')}</Link></li>
              <li><Link href="/oferta#wykladziny" className="text-gray-300 hover:text-white transition-colors">{t('services.floorCleaning')}</Link></li>
              <li><Link href="/oferta#meble" className="text-gray-300 hover:text-white transition-colors">{t('services.furnitureCleaning')}</Link></li>
              <li><Link href="/oferta#kostka" className="text-gray-300 hover:text-white transition-colors">{t('services.paverCleaning')}</Link></li>
              <li><Link href="/oferta#plytki" className="text-gray-300 hover:text-white transition-colors">{t('services.tileCleaning')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiPhone className="w-5 h-5 mr-2 text-primary-400" />
                <a href="tel:+48531890827" className="text-gray-300 hover:text-white transition-colors">+48 531 890 827</a>
              </li>
              <li className="flex items-center">
                <FiMail className="w-5 h-5 mr-2 text-primary-400" />
                <a href="mailto:kontakt@super-pucus.pl" className="text-gray-300 hover:text-white transition-colors">kontakt@super-pucus.pl</a>
              </li>
              <li className="flex items-center">
                <FiMapPin className="w-5 h-5 mr-2 text-primary-400" />
                <span className="text-gray-300">{t('footer.area')}</span>
              </li>
              <li className="flex items-center">
                <FiClock className="w-5 h-5 mr-2 text-primary-400" />
                <span className="text-gray-300">{t('footer.hours')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-2 sm:mb-0">
            © Super Pucuś {currentYear}. <strong>{t('footer.rights')}</strong>
          </p>
          <div className="flex space-x-4">
            <Link href="/regulamin" className="text-gray-400 text-sm hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link href="/regulamin" className="text-gray-400 text-sm hover:text-white transition-colors">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
