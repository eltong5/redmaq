import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  // Lista de productos ficticios
  const productos = [
    {
      id: 1,
      nombre: "Taladro Industrial",
      precio: 250000,
      imagen: "/images/taladro.jpg", // imagen en public/images
      categoria: "Herramientas Eléctricas",
    },
    {
      id: 2,
      nombre: "Compresor de Aire",
      precio: 1800000,
      imagen: "/images/compresor.jpg",
      categoria: "Maquinaria Pesada",
    },
    {
      id: 3,
      nombre: "Soldadora MIG",
      precio: 950000,
      imagen: "/images/soldadora.jpg",
      categoria: "Soldadura",
    },
    {
      id: 4,
      nombre: "Generador Eléctrico",
      precio: 3500000,
      imagen: "/images/generador.jpg",
      categoria: "Energía",
    },
  ];

  return (
    <>
      <Hero />

      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6">Catálogo de Productos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <Link
              key={producto.id}
              href={`/producto/${producto.id}`}
              className="block"
            >
              <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-1">{producto.nombre}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {producto.categoria}
                  </p>
                  <p className="font-semibold text-yellow-700">
                    ${producto.precio.toLocaleString("es-CO")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
