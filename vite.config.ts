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
  // Bezpieczne odchudzanie z logów developerskich
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // Zostawiamy false, aby kod na produkcji był lżejszy i bezpieczniejszy
    sourcemap: false,
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
