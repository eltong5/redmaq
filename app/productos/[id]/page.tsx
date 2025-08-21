import { notFound } from "next/navigation";
import SuggestedProducts from "@/components/SuggestedProducts";
import AddToCartButton from "@/components/AddToCartButtonClient";
import Image from "next/image";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
  especificaciones: string[];
}

export default async function ProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`/api/productos?id=${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const producto: Producto = data.producto;
  const sugeridos: Producto[] = data.sugeridos || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={600}
          height={400}
          className="object-cover rounded-lg shadow"
        />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
          <p className="text-gray-600 mb-2">{producto.categoria}</p>
          <p className="text-2xl font-semibold text-yellow-700 mb-4">
            ${producto.precio.toLocaleString("es-CO")}
          </p>
          <p className="mb-4">{producto.descripcion}</p>

          <h3 className="font-semibold mb-2">Especificaciones:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-6">
            {producto.especificaciones.map((esp, idx) => (
              <li key={idx}>{esp}</li>
            ))}
          </ul>

          <AddToCartButton producto={producto} />
        </div>
      </div>

      {sugeridos.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <SuggestedProducts productos={sugeridos} />
        </section>
      )}
    </div>
  );
}
