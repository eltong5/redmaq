"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
}

export default function ProductCard({
  id,
  nombre,
  categoria,
  precio,
  imagen,
}: ProductCardProps) {
  return (
    <Link
      href={`/productos/${id}`}
      className="block bg-section rounded-lg shadow hover:shadow-lg transition p-4"
    >
      {/* Contenedor de imagen */}
      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-md bg-alt">
        <Image
          src={imagen}
          alt={nombre}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
      </div>

      {/* Info del producto */}
      <h3 className="text-lg font-semibold mt-2 text-text-main">{nombre}</h3>
      <p className="text-sm text-text-light">{categoria}</p>
      <p className="text-brand-primary font-bold">
        ${precio.toLocaleString()}
      </p>
    </Link>
  );
}
