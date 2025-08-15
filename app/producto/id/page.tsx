"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SuggestedProducts from "@/components/SuggestedProducts";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion?: string;
  especificaciones?: string[];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/productos?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProducto(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al cargar producto:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p className="p-6">Cargando producto...</p>;
  }

  if (!producto) {
    return <p className="p-6 text-red-500">Producto no encontrado.</p>;
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="border rounded-lg overflow-hidden shadow">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Detalles */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
          <p className="text-lg text-gray-500 mb-4">{producto.categoria}</p>
          <p className="text-2xl font-semibold text-yellow-700 mb-6">
            ${producto.precio.toLocaleString("es-CO")}
          </p>

          <p className="text-gray-700 mb-6">
            {producto.descripcion ||
              "Este es un equipo de alto rendimiento diseñado para uso profesional en entornos industriales."}
          </p>

          {producto.especificaciones && producto.especificaciones.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Especificaciones técnicas</h2>
              <ul className="list-disc list-inside text-gray-700">
                {producto.especificaciones.map((esp, idx) => (
                  <li key={idx}>{esp}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="btn-primary w-full md:w-auto">
            Solicitar Cotización
          </button>
        </div>
      </div>

      {/* Productos sugeridos */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Productos sugeridos</h2>
        <SuggestedProducts />
      </div>
    </main>
  );
}
