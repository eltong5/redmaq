"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
}

type Filtros = {
  categoria: string;
  marca: string;
  precio: [number, number];
};

export default function ProductosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filtros, setFiltros] = useState<Filtros>({
    categoria: searchParams.get("categoria") || "",
    marca: searchParams.get("marca") || "",
    precio: [
      Number(searchParams.get("min") || 0),
      Number(searchParams.get("max") || 5000000),
    ],
  });

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const updateURL = useCallback(
    (f: Filtros) => {
      const params = new URLSearchParams();
      if (f.categoria) params.append("categoria", f.categoria);
      if (f.precio[0]) params.append("min", f.precio[0].toString());
      if (f.precio[1]) params.append("max", f.precio[1].toString());
      if (f.marca) params.append("marca", f.marca);

      router.replace(`/productos?${params.toString()}`);
    },
    [router]
  );

  const fetchProductos = async (f: Filtros) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (f.categoria) params.append("categoria", f.categoria);
      if (f.precio[0]) params.append("min", f.precio[0].toString());
      if (f.precio[1]) params.append("max", f.precio[1].toString());
      if (f.marca) params.append("marca", f.marca);

      const res = await fetch(`/api/productos?${params.toString()}`);
      const data = await res.json();
      setProductos(data.productos || []);
    } catch (error) {
      console.error(error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos(filtros);
    updateURL(filtros);
  }, [filtros, updateURL]);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <Sidebar onFilterChange={setFiltros} filtros={filtros} />

      <section className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-6 mt-6 md:mt-10">
          Catálogo de Productos
        </h1>

        {loading ? (
          <p>Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p>No hay productos que coincidan con los filtros.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <ProductCard key={producto.id} {...producto} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
