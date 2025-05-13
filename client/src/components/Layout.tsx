import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import CookieConsent from "./CookieConsent";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handle hash links
  useEffect(() => {
    // If URL has a hash, scroll to it
    if (location.includes("#")) {
      const id = location.split("#")[1];
      const element = document.getElementById(id);
      
      if (element) {
        // Add a slight delay to ensure rendering is complete
        setTimeout(() => {
          const yOffset = -80; // Header offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
      <CookieConsent />
    </>
  );
};

export default Layout;
