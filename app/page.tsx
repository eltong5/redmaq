import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
}

async function getProductos(): Promise<Producto[]> {
  try {
    const res = await fetch(`/api/productos`, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al cargar productos");
    const data = await res.json();
    return data.productos || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const productos = await getProductos();

  return (
    <>
      <Hero />

      <section className="p-6">
        <h1 className="text-2xl font-bold mb-6">Catálogo de Productos</h1>

        {productos.length === 0 ? (
          <p className="text-gray-600">
            No hay productos disponibles en este momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <Link
                key={producto.id}
                href={`/productos/${producto.id}`}
                className="block"
              >
                <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white">
                  <div className="w-full h-60 relative bg-gray-100">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-lg mb-1">{producto.nombre}</h2>
                    <p className="text-sm text-gray-500 mb-2">{producto.categoria}</p>
                    <p className="font-semibold text-yellow-700">
                      ${producto.precio.toLocaleString("es-CO")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
