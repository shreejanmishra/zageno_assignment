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
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) return "vendor-react";
          if (id.includes("node_modules/react-router-dom/")) return "vendor-router";
          if (id.includes("node_modules/@tanstack/react-query/") || id.includes("node_modules/zustand/") || id.includes("node_modules/axios/")) return "vendor-data";
        },
      },
    },

    cssCodeSplit: true,
  },
});
