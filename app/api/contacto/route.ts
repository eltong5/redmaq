// app/api/contacto/route.ts
export const runtime = "nodejs"; // ← importante para Vercel

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configura el transporter de manera segura
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Función para limpiar inputs y evitar HTML/JS malicioso
function sanitize(input: string) {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

export async function POST(req: Request) {
  try {
    const { nombre, empresa, email, telefono, mensaje, token } = await req.json();

    // Validar reCAPTCHA
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json({ error: "reCAPTCHA inválido" }, { status: 400 });
    }

    // Validar campos obligatorios
    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    // Validar formato de email
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

    // Enviar correo
    await transporter.sendMail({
      from: `"${cleanNombre}" <${cleanEmail}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Nuevo mensaje de contacto de ${cleanNombre}`,
      text: `Nombre: ${cleanNombre}
Empresa: ${cleanEmpresa}
Email: ${cleanEmail}
Teléfono: ${cleanTelefono}
Mensaje: ${cleanMensaje}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error en POST /api/contacto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
