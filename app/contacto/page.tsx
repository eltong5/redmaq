// app/contacto/page.tsx
"use client";

import { useState } from "react";
import Script from "next/script";

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      // Para versión simulada podemos omitir reCAPTCHA o mantenerlo solo visual
      const token = (window as any).grecaptcha
        ? await (window as any).grecaptcha.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
            { action: "contact" }
          )
        : "simulated_token";

      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar mensaje");

      setStatus("success");
      setForm({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>

      {status === "success" && (
        <p className="text-green-600 mb-4">¡Mensaje enviado correctamente!</p>
      )}
      {status === "error" && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="empresa"
          placeholder="Empresa"
          value={form.empresa}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <textarea
          name="mensaje"
          placeholder="Mensaje *"
          value={form.mensaje}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
          rows={5}
        />
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </div>
  );
}
