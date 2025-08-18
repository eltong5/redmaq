import { notFound } from "next/navigation";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion?: string;
  especificaciones: string[];
}

async function getProducto(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/productos?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductoPage({ params }: { params: { id: string } }) {
  const data = await getProducto(params.id);

  if (!data || !data.producto) {
    notFound();
  }

  const producto: Producto = data.producto;
  const sugeridos: Producto[] = data.sugeridos;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Info principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen */}
        <div>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-80 object-cover rounded-lg shadow"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold">{producto.nombre}</h1>
          <p className="text-gray-600">{producto.categoria}</p>
          <p className="text-xl font-semibold text-yellow-700 mt-2">
            ${producto.precio.toLocaleString("es-CO")}
          </p>

          {producto.descripcion && (
            <p className="mt-4 text-gray-700">{producto.descripcion}</p>
          )}

          {producto.especificaciones.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Especificaciones:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {producto.especificaciones.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sugeridos */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Productos sugeridos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sugeridos.map((p) => (
            <a
              key={p.id}
              href={`/productos/${p.id}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition block"
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="font-bold">{p.nombre}</h3>
                <p className="text-sm text-gray-500">{p.categoria}</p>
                <p className="font-semibold text-yellow-700">
                  ${p.precio.toLocaleString("es-CO")}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
