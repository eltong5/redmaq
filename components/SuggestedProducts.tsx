"use client";

import Link from "next/link";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
}

interface SuggestedProductsProps {
  productos?: Producto[];
}

export default function SuggestedProducts({ productos = [] }: SuggestedProductsProps) {
  if (productos.length === 0) {
    return <p>No hay productos sugeridos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <Link
          key={producto.id}
          href={`/producto/${producto.id}`}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition block"
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{producto.nombre}</h3>
            <p className="text-sm text-gray-500">{producto.categoria}</p>
            <p className="font-semibold text-yellow-700">
              ${producto.precio.toLocaleString("es-CO")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
