import React from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { FiPhone, FiMail } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";
import { getLocalizedPath, PAGE_KEYS } from "@/config/slugs";

interface CallToActionProps {
  variant?: "primary" | "secondary";
}

const CallToAction = ({ variant = "primary" }: CallToActionProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  const trackPhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = e.currentTarget.href;

    let callbackFired = false;

    const executeCall = () => {
      if (!callbackFired) {
        callbackFired = true;
        window.location.href = url;
      }
    };

    setTimeout(executeCall, 500);

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "phone_click", {
        event_category: "contact",
        event_label: "phone_number",
      });
      (window as any).gtag("event", "conversion", {
        send_to: "AW-11057616603/eSomCMHMt4McENut15gp",
        event_callback: executeCall,
      });
    } else {
      executeCall();
    }
  };

  let sectionBgClass = "";
  let sectionFgClass = "";
  let sideButtonStaticBorderTextColorClass = "";
  let sideButtonHoverBgClass = "";
  let sideButtonHoverTextColorClass = "";
  let messengerButtonHoverBorderColorClass = "";
  let messengerButtonHoverTextColorClass = "";

  if (variant === "primary") {
    sectionBgClass =
      "bg-[hsl(var(--cta-primary-background-light))] dark:bg-[hsl(var(--cta-primary-background-dark))]";
    sectionFgClass =
      "text-[hsl(var(--cta-primary-foreground-light))] dark:text-[hsl(var(--cta-primary-foreground-dark))]";

    sideButtonStaticBorderTextColorClass =
      "border-[hsl(var(--cta-primary-foreground-light))] text-[hsl(var(--cta-primary-foreground-light))] dark:border-[hsl(var(--cta-primary-foreground-dark))] dark:text-[hsl(var(--cta-primary-foreground-dark))]";
    sideButtonHoverBgClass =
      "hover:bg-[hsl(var(--cta-primary-foreground-light))] dark:hover:bg-[hsl(var(--cta-primary-foreground-dark))]";
    sideButtonHoverTextColorClass =
      "hover:text-[hsl(var(--cta-primary-background-light))] dark:hover:text-[hsl(var(--cta-primary-background-dark))]";

    messengerButtonHoverBorderColorClass =
      "hover:border-[hsl(var(--cta-primary-foreground-light))] dark:hover:border-[hsl(var(--cta-primary-foreground-dark))]";
    messengerButtonHoverTextColorClass =
      "hover:text-[hsl(var(--cta-primary-foreground-light))] dark:hover:text-[hsl(var(--cta-primary-foreground-dark))]";
  } else {
    sectionBgClass =
      "bg-[hsl(var(--cta-secondary-background-light))] dark:bg-[hsl(var(--cta-secondary-background-dark))]";
    sectionFgClass =
      "text-[hsl(var(--cta-secondary-foreground-light))] dark:text-[hsl(var(--cta-secondary-foreground-dark))]";

    sideButtonStaticBorderTextColorClass =
      "border-[hsl(var(--cta-secondary-foreground-light))] text-[hsl(var(--cta-secondary-foreground-light))] dark:border-[hsl(var(--cta-secondary-foreground-dark))] dark:text-[hsl(var(--cta-secondary-foreground-dark))]";
    sideButtonHoverBgClass =
      "hover:bg-[hsl(var(--cta-secondary-foreground-light))] dark:hover:bg-[hsl(var(--cta-secondary-foreground-dark))]";
    sideButtonHoverTextColorClass =
      "hover:text-[hsl(var(--cta-secondary-background-light))] dark:hover:text-[hsl(var(--cta-secondary-background-dark))]";

    messengerButtonHoverBorderColorClass =
      "hover:border-[hsl(var(--cta-secondary-foreground-light))] dark:hover:border-[hsl(var(--cta-secondary-foreground-dark))]";
    messengerButtonHoverTextColorClass =
      "hover:text-[hsl(var(--cta-secondary-foreground-light))] dark:hover:text-[hsl(var(--cta-secondary-foreground-dark))]";
  }

  const finalSectionClasses = `py-16 ${sectionBgClass} ${sectionFgClass}`;

  const sideButtonBaseClasses =
    "inline-flex items-center justify-center font-semibold px-3 py-2 rounded-md transition-colors duration-300 border-2 bg-transparent";
  const finalSideButtonClasses = `${sideButtonBaseClasses} ${sideButtonStaticBorderTextColorClass} ${sideButtonHoverBgClass} ${sideButtonHoverTextColorClass}`;

  const messengerButtonBaseClasses =
    "inline-flex items-center justify-center font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 border-2 border-transparent";

  const messengerButtonStaticClasses =
    "bg-[hsl(var(--marine-h)_var(--marine-s)_65%)] text-[hsl(var(--marine-h)_30%_15%)]";
  const finalMessengerButtonClasses = `${messengerButtonBaseClasses} ${messengerButtonStaticClasses} hover:bg-transparent ${messengerButtonHoverBorderColorClass} ${messengerButtonHoverTextColorClass}`;

  return (
    <section className={finalSectionClasses}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-limelight text-3xl md:text-4xl font-bold mb-6">
          {t("cta.title")}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          {t("cta.subtitle")} <strong>{t("cta.freeQuote")}</strong>
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4">
          <a
            href="tel:+48531890827"
            onClick={trackPhoneClick}
            className={finalSideButtonClasses}
          >
            <FiPhone className="w-5 h-5 mr-2" />
            {t("cta.call")}: +48 531 890 827
          </a>
          <a
            href="https://m.me/super.pucus"
            target="_blank"
            rel="noopener noreferrer"
            className={finalMessengerButtonClasses}
          >
            <BsMessenger className="w-5 h-5 mr-2" />
            {t("cta.messenger")}
          </a>
          <Link
            href={getLocalizedPath(PAGE_KEYS.CONTACT, currentLang)}
            className={finalSideButtonClasses}
          >
            <FiMail className="w-5 h-5 mr-2" />
            {t("cta.contactForm")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
