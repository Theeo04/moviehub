import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/chat": {
        target: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000", // Se creeaza un proxy pentru 
                                                    //  a redirecționa cererile către containerul de backend din browser
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Proxying request:", path); // Adaugă loguri
          return path.replace(/^\/chat/, "/chat");
        },
      },
    },
  },
});
