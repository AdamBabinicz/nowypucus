import { fileURLToPath } from "url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * FIX PageSpeed: „Prośby o zablokowanie renderowania" (300 ms mobile / 80 ms
 * desktop) oraz „Drzewo zależności sieciowych" (469 ms).
 *
 * Vite domyślnie dokleja <link rel="stylesheet"> PO tagu <script type="module">,
 * przez co krytyczny CSS jest odkrywany późno i opóźnia FCP/LCP.
 * Ten plugin wstrzykuje na SAM POCZĄTEK <head> tag
 * <link rel="preload" as="style" fetchpriority="high">
 * z poprawną, hashowaną nazwą pliku CSS z builda.
 *
 * POPRAWKA (awaria produkcyjna „credentials mode does not match"):
 * Vite injektuje właściwy arkusz jako
 *   <link rel="stylesheet" crossorigin href="/assets/style-xxx.css">
 * więc preload MUSI mieć dokładnie ten sam atrybut `crossorigin`.
 * Wcześniej preload był bez `crossorigin` → tryby credentials się nie
 * zgadzały → przeglądarka pobierała plik CSS dwa razy i ostrzegała.
 * (Poprzednia „poprawka" usunęła crossorigin — dokładnie odwrotnie.)
 */
function preloadCriticalCss(): Plugin {
  return {
    name: "preload-critical-css",
    apply: "build",
    transformIndexHtml(html, ctx) {
      const bundle = ctx.bundle;
      if (!bundle) return html;
      const cssFile = Object.keys(bundle).find((file) => file.endsWith(".css"));
      if (!cssFile) return html;
      return {
        html,
        tags: [
          {
            tag: "link",
            attrs: {
              rel: "preload",
              href: `/${cssFile}`,
              as: "style",
              fetchpriority: "high",
              // Dopasowuje <link rel="stylesheet" crossorigin> injektowany
              // przez Vite → jeden tryb credentials = jedno pobranie.
              crossorigin: "",
            },
            injectTo: "head-prepend",
          },
        ],
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadCriticalCss()],
  root: path.resolve(__dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  // Bezpieczne odchudzanie z logów developerskich
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    // Jeden wspólny plik CSS – plugin preload-critical-css zawsze znajdzie
    // dokładnie jeden plik do preloadu i żaden styl nie dołączy po JS-ie.
    cssCodeSplit: false,
    // Nowoczesny target = krótszy, szybszy kod (mniej transpilacji).
    target: "es2020",
    reportCompressedSize: false,
    cssMinify: "esbuild",
    rollupOptions: {
      output: {
        /**
         * FIX „Ogranicz nieużywany JavaScript" (50,2 KiB z 147,4 KiB) oraz
         * „Unikaj dużych zadań w wątku głównym": dzielimy vendor na osobne,
         * długo cache'owane chunki zamiast jednego monolitu.
         *
         * FIX AWARII PRODUKCYJNEJ (biała strona, „Cannot read properties of
         * undefined (reading 'createContext')"):
         * react-i18next / i18next MUSZĄ być w TYM SAMYM chunku co react /
         * react-dom. Wcześniej „i18n" był osobnym chunkiem, do którego chunk
         * „react" importował helper interop ESM → cykl importów
         * react ⇄ i18n → nieokreślona kolejność inicjalizacji modułów →
         * React = undefined w momencie wywołania createContext.
         * Reguła: nic, co importuje react (bezpośrednio lub przez łańcuch),
         * nie może trafić do innego chunku niż react.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // CAŁY ekosystem React + i18n w JEDNYM chunku (zależą od siebie).
          if (
            id.includes("/react-dom/") ||
            id.includes("/react/") ||
            id.includes("/scheduler/") ||
            id.includes("/use-sync-external-store/") ||
            id.includes("i18next") || // i18next, react-i18next, i18next-*
            id.includes("/-i18next/") ||
            id.includes("react-i18next")
          ) {
            return "react";
          }
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("react-icons")) return "icons";
          if (id.includes("recharts") || id.includes("/d3-")) return "charts";
          if (id.includes("@tanstack")) return "query";
        },
      },
    },
  },
});
