// components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:flex lg:items-center lg:gap-10">
        {/* Texto */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            Potencia y Calidad para tu Negocio
          </h1>
          <p className="text-lg text-yellow-100">
            Herramientas y maquinaria industrial de alto rendimiento, listas
            para impulsar tu productividad. Encuentra equipos de marcas líderes.
          </p>
          <div className="flex gap-4">
            <Link
              href="/productos"
              className="bg-white text-yellow-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-100 transition"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contacto"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-yellow-700 transition"
            >
              Contáctanos
            </Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="https://via.placeholder.com/800x500.png?text=Maquinaria+Industrial"
            alt="Maquinaria Industrial"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
