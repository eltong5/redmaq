/** @type {import('tailwindcss').Config} */
module.exports = {
  // Aquí le decimos a Tailwind en qué archivos buscar clases
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Archivos dentro de /app
    "./pages/**/*.{js,ts,jsx,tsx}", // Archivos dentro de /pages (por si acaso)
    "./components/**/*.{js,ts,jsx,tsx}", // Archivos dentro de /components
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos opcionales
        amarillo: "#facc15",
        grisOscuro: "#1f2937",
      },
    },
  },
  plugins: [],
};
