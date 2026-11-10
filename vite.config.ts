import { fileURLToPath } from "url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * FIX PSI (audyt 10.11.2026): „Prośby o zablokowanie renderowania" (300 ms)
 * oraz „Ogranicz nieużywany kod CSS" (15 KiB).
 *
 * Zamiast preloadować zewnętrzny arkusz (każdy <link rel="stylesheet">
 * i tak blokuje render), CAŁY krytyczny CSS z builda jest wstrzykiwany
 * jako <style> na początek <head>, a tag <link rel="stylesheet">
 * wskazujący ten plik jest usuwany z HTML. Efekt: zero żądań CSS,
 * zero blokowania renderu, zero „nieużywanego CSS".
 */
function inlineCriticalCss(): Plugin {
  return {
    name: "inline-critical-css",
    apply: "build",
    transformIndexHtml(html, ctx) {
      const bundle = ctx.bundle;
      if (!bundle) return html;
      const cssFile = Object.keys(bundle).find((file) => file.endsWith(".css"));
      if (!cssFile) return html;
      const asset = bundle[cssFile];
      const source = asset && "source" in asset ? asset.source : "";
      const cssText =
        typeof source === "string"
          ? source
          : new TextDecoder().decode(source as Uint8Array);
      // Usuń <link rel="stylesheet" ... href="/assets/style-xxx.css">,
      // bo treść tego pliku jest już w <style> poniżej.
      const escaped = cssFile.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const linkRe = new RegExp(
        `\\s*<link[^>]*href="/${escaped}"[^>]*>`,
        "g",
      );
      return {
        html: html.replace(linkRe, ""),
        tags: [
          {
            tag: "style",
            children: cssText,
            injectTo: "head-prepend",
          },
        ],
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCriticalCss()],
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
