// app/api/contacto/route.ts
import { NextResponse } from "next/server";

// Simula la API de contacto sin enviar correos
export async function POST(req: Request) {
  try {
    const { nombre, empresa, email, telefono, mensaje, token } = await req.json();

    // Validaciones básicas
    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Aquí podrías hacer logging o guardar en DB si quieres
    console.log("Contacto recibido:", { nombre, empresa, email, telefono, mensaje });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error en POST /api/contacto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
