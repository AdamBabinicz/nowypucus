import { useEffect, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, title, children, onClose }: ModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Tło przyciemniające z płynnym fade-in w CSS */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Okno modalne z animacją CSS scale + fade bez biblioteki Framer Motion */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col z-10 transition-all duration-200 transform scale-100 opacity-100 animate-in fade-in zoom-in-95"
      >
        <div className="p-6 flex justify-between items-start border-b border-gray-200 dark:border-gray-700">
          <h2
            id="modal-title"
            className="font-heading text-2xl font-semibold text-foreground dark:text-white"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-md"
            aria-label={t("common.close", "Zamknij")}
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow p-6">{children}</div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-700 text-foreground dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 py-2 px-6 rounded-lg font-medium transition-colors"
          >
            {t("common.close", "Zamknij")}
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
