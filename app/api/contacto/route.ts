// app/api/contacto/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nombre, empresa, email, telefono, mensaje } = await req.json();

    // Solo simulamos el envío
    console.log("Datos recibidos (mock):", { nombre, empresa, email, telefono, mensaje });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error en POST /api/contacto (mock):", err);
    return NextResponse.json({ error: "Error interno del servidor (mock)" }, { status: 500 });
  }
}
