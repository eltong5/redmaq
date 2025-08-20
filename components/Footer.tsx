// components/Footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Columna 1: Logo y descripción */}
        <div>
          <img
            src="/images/logo.jpg"
            alt="Redmaq Logo"
            className="w-14 h-14 object-contain mb-4"
          />
          <p className="text-sm leading-relaxed">
            Redmaq Colombia ofrece soluciones integrales en maquinaria pesada y
            herramientas industriales para impulsar tu productividad.
          </p>
        </div>

        {/* Columna 2: Enlaces útiles */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-yellow-500 transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/productos"
                className="hover:text-yellow-500 transition"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="hover:text-yellow-500 transition"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Bogotá, Colombia</li>
            <li>📞 +57 300 123 4567</li>
            <li>✉️ contacto@redmaq.com</li>
          </ul>
        </div>

        {/* Columna 4: Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Síguenos
          </h4>
          <div className="flex gap-4">
            <a href="#" target="_blank" className="hover:text-yellow-500">
              <Facebook size={20} />
            </a>
            <a href="#" target="_blank" className="hover:text-yellow-500">
              <Instagram size={20} />
            </a>
            <a href="#" target="_blank" className="hover:text-yellow-500">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Redmaq Colombia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
