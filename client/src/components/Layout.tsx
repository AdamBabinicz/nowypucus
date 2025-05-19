import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
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

  useEffect(() => {
    if (!location.includes("#")) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <SchemaOrg />
      <Navbar />
      <main className="flex-grow" style={{ paddingTop: `${HEADER_OFFSET}px` }}>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
