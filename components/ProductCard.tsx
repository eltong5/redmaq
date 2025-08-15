// app/components/ProductCard.tsx
"use client";

import Link from "next/link";

interface ProductCardProps {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
}

export default function ProductCard({ id, nombre, categoria, precio, imagen }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4"
    >
      <img
        src={imagen}
        alt={nombre}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{nombre}</h3>
      <p className="text-sm text-gray-500">{categoria}</p>
      <p className="text-yellow-600 font-bold">${precio.toLocaleString()}</p>
    </Link>
  );
}
