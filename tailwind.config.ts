import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#f9fafb", // fondo principal
        section: "#ffffff", // tarjetas, header
        alt: "#f3f4f6", // secciones alternas

        brand: {
          primary: "#eab308", // amarillo principal
          dark: "#ca8a04", // hover/acciones
          accent: "#facc15", // amarillo más claro
        },

        text: {
          main: "#111827", // casi negro
          secondary: "#374151", // gris oscuro
          light: "#6b7280", // gris medio
        },
      },
    },
  },
  plugins: [],
};

export default config;
