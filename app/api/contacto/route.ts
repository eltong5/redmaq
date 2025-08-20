import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const cleanNombre = sanitize(nombre);
    const cleanEmpresa = sanitize(empresa || "");
    const cleanEmail = sanitize(email);
    const cleanTelefono = sanitize(telefono || "");
    const cleanMensaje = sanitize(mensaje);

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
    console.error(err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
