import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/app/context/CartContext";

export const metadata = {
  title: "Redmaq Colombia",
  description: "Maquinaria pesada y soluciones integrales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#f9fafb] text-gray-900 antialiased">
        <CartProvider>
          <Header />
          <main className="max-w-7xl mx-auto p-6">{children}</main>
          <CartSidebar />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
