import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";
import Modal from "./Modal";

interface Feature {
  id: string;
  text: string;
}

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  features: Feature[];
  image: string;
  modalContent: {
    title: string;
    content: React.ReactNode;
  };
}

const ServiceCard = ({ id, title, description, features, image, modalContent }: ServiceCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-6 flex-grow">
          <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          <ul className="space-y-2 mb-6 text-gray-600 dark:text-gray-300">
            {features.map((feature) => (
              <li key={feature.id} className="flex items-center">
                <FiCheck className="w-5 h-5 mr-2 text-green-500" />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 pb-6 mt-auto">
          <button 
            onClick={openModal}
            className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            data-service={id}
          >
            <strong>{t('services.detailsAndPricing')}</strong>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={modalContent.title}
        onClose={closeModal}
      >
        {modalContent.content}
      </Modal>
    </>
  );
};

export default ServiceCard;
