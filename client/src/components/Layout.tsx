import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { FiPhone } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { SchemaOrg } from "@/components/SchemaOrg";

export const HEADER_OFFSET = 70;

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [location] = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!location.includes("#")) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // --- AKTUALIZACJA: Śledzenie konwersji połączenia telefonicznego ---
  const trackPhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = e.currentTarget.href;

    // Jeśli w index.html zdefiniowano globalną funkcję gtag_report_conversion, używamy jej
    if (typeof (window as any).gtag_report_conversion === "function") {
      e.preventDefault();
      (window as any).gtag_report_conversion(url);
      return;
    }

    // Fallback, jeśli skrypt w index.html jeszcze się nie załadował lub nie istnieje
    e.preventDefault();
    let callbackFired = false;
    const executeCall = () => {
      if (!callbackFired) {
        callbackFired = true;
        window.location.href = url;
      }
    };

    setTimeout(executeCall, 500);

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-11057616603/gfFRKCFJ3ioscENut15gp",
        event_callback: executeCall,
      });
    } else {
      executeCall();
    }
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language, dir: "ltr" }} />
      <SchemaOrg />
      <Navbar />
      <main className="flex-grow" style={{ paddingTop: HEADER_OFFSET }}>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
      <a
        href="tel:+48531890827"
        onClick={trackPhoneClick}
        className="fixed bottom-[96px] right-6 z-50 flex items-center justify-center w-16 h-16 bg-[hsl(175_60%_65%)] text-[hsl(175_30%_15%)] rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] md:hidden hover:scale-110 active:scale-95 transition-transform"
        aria-label={t("contact.phone")}
      >
        <FiPhone className="w-8 h-8" />
      </a>
    </>
  );
};

export default Layout;
