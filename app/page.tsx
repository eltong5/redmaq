// app/page.tsx
// Página principal de Redmaq Colombia
// Muestra un catálogo básico con productos ficticios

export default function Home() {
  // Lista de productos ficticios
  const productos = [
    {
      id: 1,
      nombre: "Taladro Industrial",
      precio: 250000,
      imagen: "https://via.placeholder.com/300x200.png?text=Taladro",
      categoria: "Herramientas Eléctricas",
    },
    {
      id: 2,
      nombre: "Compresor de Aire",
      precio: 1800000,
      imagen: "https://via.placeholder.com/300x200.png?text=Compresor",
      categoria: "Maquinaria Pesada",
    },
    {
      id: 3,
      nombre: "Soldadora MIG",
      precio: 950000,
      imagen: "https://via.placeholder.com/300x200.png?text=Soldadora",
      categoria: "Soldadura",
    },
    {
      id: 4,
      nombre: "Generador Eléctrico",
      precio: 3500000,
      imagen: "https://via.placeholder.com/300x200.png?text=Generador",
      categoria: "Energía",
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Catálogo de Productos</h1>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-1">{producto.nombre}</h2>
              <p className="text-sm text-gray-500 mb-2">{producto.categoria}</p>
              <p className="font-semibold text-yellow-700">
                ${producto.precio.toLocaleString("es-CO")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
