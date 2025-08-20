"use client";
import { useState } from "react";

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulación de envío
    setTimeout(() => {
      console.log("Datos enviados (simulación):", form);
      setStatus("success");
      setForm({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>

      {status === "success" && (
        <p className="text-green-600 mb-4">¡Mensaje enviado correctamente (simulación)!</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
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
        <button type="submit" className="btn-primary w-full" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </div>
  );
}
