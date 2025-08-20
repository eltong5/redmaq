"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 text-white overflow-hidden">
      {/* Overlay para mejorar contraste */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:flex lg:items-center lg:gap-10">
        {/* Texto */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight animate-fadeInUp">
            Potencia y Calidad para tu Negocio
          </h1>
          <p className="text-lg text-yellow-100 animate-fadeInUp delay-150">
            Herramientas y maquinaria industrial de alto rendimiento, listas
            para impulsar tu productividad. Encuentra equipos de marcas líderes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fadeInUp delay-300">
            <Link href="/productos" className="btn-primary rounded-full">
              Ver catálogo
            </Link>
            <Link href="/contacto" className="btn-outline rounded-full">
              Contáctanos
            </Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 animate-fadeInUp delay-500">
          <Image
            src="/images/maquinaria-industrial.jpg"
            alt="Maquinaria Industrial"
            width={600}
            height={400}
            priority
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
