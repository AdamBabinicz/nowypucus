import { fileURLToPath } from "url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * FIX PageSpeed: „Próby zablokowania renderowania" (+280/80 ms) oraz
 * „Drzewo zależności sieciowych" (łańcuch HTML -> JS -> CSS, do 248 ms).
 *
 * Vite domyślnie dokleja <link rel="stylesheet"> PO tagu <script type="module">,
 * przez co krytyczny CSS bywa odkrywany późno i opóźnia FCP/LCP.
 * Ten plugin wstrzykuje na SAM POCZĄTEK <head> tag
 * <link rel="preload" as="style" crossorigin fetchpriority="high"> z poprawną, hashowaną
 * nazwą pliku CSS z builda, dzięki czemu CSS startuje równolegle z JS,
 * a nie po nim.
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
              crossorigin: "",
              fetchpriority: "high",
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
    // Zostawiamy false, aby kod na produkcji był lżejszy i bezpieczniejszy
    sourcemap: false,
    // FIX PageSpeed: jeden wspólny plik CSS gwarantuje, że plugin
    // preload-critical-css zawsze znajdzie dokładnie jeden plik do preloadu
    // (i że żaden styl nie dołączy dopiero po JS-ie)
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Wracamy do Twojego w 100% stabilnego ustawienia!
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
