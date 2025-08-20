// app/api/contacto/route.ts
import { NextResponse } from "next/server";

// Stub temporal para evitar usar nodemailer
export async function POST(req: Request) {
  try {
    const { nombre, empresa, email, telefono, mensaje } = await req.json();

    // Validar campos obligatorios
    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Simular envío de correo
    console.log("Simulación de envío de contacto:", { nombre, empresa, email, telefono, mensaje });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error en POST /api/contacto (stub):", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
