import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/index.css";
import "@/i18n";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
