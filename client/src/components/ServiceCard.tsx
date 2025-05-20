import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";
import Modal from "@/components/Modal";

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

const ServiceCard = ({
  id,
  title,
  description,
  features,
  image,
  modalContent,
}: ServiceCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-card dark:bg-card rounded-xl shadow-md overflow-hidden h-full flex flex-col">
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="p-6 flex-grow">
          <h3 className="font-heading text-xl font-semibold mb-2 text-card-foreground">
            {title}
          </h3>
          <p className="text-card-foreground/80 dark:text-card-foreground/70 mb-4">
            {description}
          </p>
          <ul className="space-y-2 mb-6 text-card-foreground/80 dark:text-card-foreground/70">
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
            className="w-full inline-flex items-center justify-center font-semibold px-4 py-2 rounded-md transition-colors duration-300
           border-2 border-[hsl(175,60%,30%)] bg-transparent text-[hsl(175,60%,30%)]
           hover:bg-[hsl(175,60%,30%)] hover:text-[hsl(0,0%,98%)]
           dark:border-[hsl(175,60%,75%)] dark:text-[hsl(175,60%,75%)]
           dark:hover:bg-[hsl(175,60%,75%)] dark:hover:text-[hsl(175,30%,15%)]"
            data-service={id}
          >
            <strong>{t("services.detailsAndPricing")}</strong>
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
