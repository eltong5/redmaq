// app/api/contacto/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // necesario para APIs en Vercel

function sanitize(input: string) {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

export async function POST(req: Request) {
  try {
    const { nombre, empresa, email, telefono, mensaje } = await req.json();

    // Validaciones básicas
    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Sanitizar inputs
    const cleanNombre = sanitize(nombre);
    const cleanEmpresa = sanitize(empresa || "");
    const cleanEmail = sanitize(email);
    const cleanTelefono = sanitize(telefono || "");
    const cleanMensaje = sanitize(mensaje);

    // Simulación de envío (sin nodemailer)
    await new Promise((res) => setTimeout(res, 1000));

    console.log("Mensaje simulado enviado:", { cleanNombre, cleanEmpresa, cleanEmail, cleanTelefono, cleanMensaje });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error en POST /api/contacto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
