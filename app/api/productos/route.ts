// app/api/productos/route.ts
import { NextResponse } from "next/server";

// Productos ficticios (luego puedes moverlos a una DB)
const productos = [
  {
    id: 1,
    nombre: "Taladro Industrial",
    precio: 250000,
    imagen: "/images/taladro.jpg",
    categoria: "Herramientas Eléctricas",
    descripcion: "Taladro de alto rendimiento para trabajo industrial.",
    especificaciones: ["Potencia: 800W", "Velocidad variable", "Garantía: 1 año"],
  },
  {
    id: 2,
    nombre: "Compresor de Aire",
    precio: 1800000,
    imagen: "/images/compresor.jpg",
    categoria: "Maquinaria Pesada",
    descripcion: "Compresor ideal para uso en talleres y fábricas.",
    especificaciones: ["Capacidad: 50L", "Presión: 150 PSI", "Motor: 2HP"],
  },
  {
    id: 3,
    nombre: "Soldadora MIG",
    precio: 950000,
    imagen: "/images/soldadora.jpg",
    categoria: "Soldadura",
    descripcion: "Soldadora MIG para uso industrial con excelente desempeño.",
    especificaciones: ["Corriente: 200A", "Voltaje: 220V", "Garantía: 2 años"],
  },
  {
    id: 4,
    nombre: "Generador Eléctrico",
    precio: 3500000,
    imagen: "/images/generador.jpg",
    categoria: "Energía",
    descripcion: "Generador de respaldo para equipos industriales.",
    especificaciones: ["Potencia: 5kW", "Motor a gasolina", "Autonomía: 8h"],
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const categoria = searchParams.get("categoria");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  // ✅ Caso 1: pedir un producto por ID
  if (id) {
    const producto = productos.find((p) => p.id === Number(id));

    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Sugeridos: misma categoría, distinto id
    const sugeridos = productos.filter(
      (p) => p.categoria === producto.categoria && p.id !== producto.id
    );

    return NextResponse.json({ producto, sugeridos });
  }

  // ✅ Caso 2: traer todos (con filtros opcionales)
  let filtrados = [...productos];

  if (categoria) {
    filtrados = filtrados.filter((p) => p.categoria === categoria);
  }

  if (min) {
    filtrados = filtrados.filter((p) => p.precio >= Number(min));
  }

  if (max) {
    filtrados = filtrados.filter((p) => p.precio <= Number(max));
  }

  return NextResponse.json({ productos: filtrados });
}
