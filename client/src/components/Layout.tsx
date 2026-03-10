import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!location.includes("#")) {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
    </>
  );
};

export default Layout;
