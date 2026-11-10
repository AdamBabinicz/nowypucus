import { fileURLToPath } from "url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * FIX PSI: Eliminacja żądań blokujących renderowanie (Render-blocking resources).
 * Cały krytyczny CSS z builda jest wstrzykiwany jako <style> w <head>,
 * a zewnętrzny tag <link rel="stylesheet"> jest usuwany z wynikowego HTML.
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

      // Bezpieczne usuwanie tagu <link> ze ścieżką znormalizowaną
      const normalizedCssFile = cssFile.replace(/\\/g, "/");
      const escaped = normalizedCssFile.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const linkRe = new RegExp(
        `\\s*<link[^>]*href=["']?/?${escaped}["']?[^>]*>`,
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
  // Bezpieczne czyszczenie konsoli i debuggerów w kodzie produkcyjnym
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    target: "es2020",
    reportCompressedSize: false,
    cssMinify: "esbuild",
    rollupOptions: {
      output: {
        /**
         * Zoptymalizowany podział paczek (Code Splitting):
         * Normalizacja ścieżek Windows (\ -> /) gwarantuje, że manualChunks
         * działa niezawodnie na maszynach lokalnych z systemem Windows.
         */
        manualChunks(id) {
          // Normalizacja separatorów ścieżek dla systemów Windows i Unix
          const normalizedId = id.replace(/\\/g, "/");
          if (!normalizedId.includes("node_modules")) return;

          // Ekosystem React + i18n + router w jednym chunku bez ryzyka circular dependency
          if (
            normalizedId.includes("/react/") ||
            normalizedId.includes("/react-dom/") ||
            normalizedId.includes("/scheduler/") ||
            normalizedId.includes("/use-sync-external-store/") ||
            normalizedId.includes("i18next") ||
            normalizedId.includes("react-i18next") ||
            normalizedId.includes("/wouter/") ||
            normalizedId.includes("react-helmet-async")
          ) {
            return "react";
          }

          // Odseparowane ciężkie biblioteki ładowane asynchronicznie
          if (normalizedId.includes("framer-motion")) return "motion";
          if (normalizedId.includes("@radix-ui")) return "radix";
          if (normalizedId.includes("react-icons")) return "icons";
          if (
            normalizedId.includes("recharts") ||
            normalizedId.includes("/d3-")
          )
            return "charts";
          if (normalizedId.includes("@tanstack")) return "query";
        },
      },
    },
  },
});
