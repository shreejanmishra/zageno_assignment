import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    target: "es2020",
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-data": ["@tanstack/react-query", "zustand", "axios"],
        },
      },
    },

    cssCodeSplit: true,
    minify: "esbuild",
  },
});
