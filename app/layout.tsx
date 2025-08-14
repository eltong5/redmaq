import "./globals.css"; // Importa los estilos globales
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Redmaq Colombia",
  description: "Maquinaria pesada y soluciones integrales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="max-w-7xl mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
