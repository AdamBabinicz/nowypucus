import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  // Odchudzamy kod usuwając console.log i debuggery w wersji produkcyjnej
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // WYŁĄCZONE sourcemapy - nie są potrzebne na produkcji, a odchudzają folder i ukrywają Twój kod przed ciekawskimi
    sourcemap: false,
    rollupOptions: {
      output: {
        // ZAAWANSOWANE DZIELENIE KODU (Vendor Splitting)
        manualChunks: (id) => {
          // Jeśli kod pochodzi z folderu node_modules (zewnętrzne biblioteki)
          if (id.includes("node_modules")) {
            // 1. React i React DOM
            if (id.includes("react/") || id.includes("react-dom/")) {
              return "react-vendor";
            }
            // 2. Framer Motion (dość ciężka biblioteka do animacji)
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            // 3. Ikony (pakujemy do osobnego pliku, żeby nie blokowały głównego wątku)
            if (id.includes("lucide-react") || id.includes("react-icons")) {
              return "icons-vendor";
            }
            // 4. Komponenty UI (Radix)
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
            // 5. Formularze i walidacja
            if (id.includes("react-hook-form") || id.includes("zod")) {
              return "forms-vendor";
            }
            // 6. Reszta bibliotek ląduje w ogólnym pliku vendor
            return "vendor";
          }
        },
      },
    },
  },
});
