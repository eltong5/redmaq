// app/api/productos/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const id = searchParams.get("id");
  const sugeridos = searchParams.get("sugeridos");

  // ✅ Si busca un producto por ID → también devuelve sugeridos
  if (id) {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) },
    });

    const productosSugeridos = await prisma.producto.findMany({
      take: 4,
      orderBy: { id: "desc" },
      where: { id: { not: Number(id) } }, // no incluir el mismo producto
    });

    return NextResponse.json({
      producto,
      sugeridos: productosSugeridos,
    });
  }

  // Solo sugeridos
  if (sugeridos === "true") {
    const productosSugeridos = await prisma.producto.findMany({
      take: 4,
      orderBy: { id: "desc" },
    });
    return NextResponse.json(productosSugeridos);
  }

  // Búsqueda
  const productos = await prisma.producto.findMany({
    where: {
      nombre: {
        contains: q,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  return NextResponse.json(productos);
}
