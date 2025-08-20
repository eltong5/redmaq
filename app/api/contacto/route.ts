// app/api/contacto/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // importante para Vercel

function sanitize(input: string) {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

export async function POST(req: Request) {
  try {
    const { nombre, empresa, email, telefono, mensaje } = await req.json();

    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    // Sanitizar
    const cleanNombre = sanitize(nombre);
    const cleanEmpresa = sanitize(empresa || "");
    const cleanEmail = sanitize(email);
    const cleanTelefono = sanitize(telefono || "");
    const cleanMensaje = sanitize(mensaje);

    // Simula envío de correo
    console.log("Simulación de contacto:", { cleanNombre, cleanEmpresa, cleanEmail, cleanTelefono, cleanMensaje });
    await new Promise((res) => setTimeout(res, 500));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
