"use client"; // Obligatorio para usar useState y efectos en Next.js App Router

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  // Función que llama a tu API
  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/productos?q=${encodeURIComponent(value)}`);
      if (!res.ok) throw new Error("Error al buscar");
      const data = await res.json();
      setResults(data.map((p: any) => p.nombre)); // Solo el nombre
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  };

  return (
    <header className="bg-yellow-600 text-white p-4 shadow">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <h1 className="text-lg font-bold">Redmaq Colombia</h1>

        {/* Barra de navegación */}
        <nav className="flex items-center space-x-4">
          <a href="/" className="hover:underline">Inicio</a>
          <a href="/productos" className="hover:underline">Productos</a>
          <a href="/contacto" className="hover:underline">Contacto</a>
        </nav>

        {/* Buscador */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />

          {/* Resultados de búsqueda */}
          {results.length > 0 && (
            <ul className="absolute left-0 w-full mt-1 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              {results.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                  onClick={() => {
                    setQuery(item);
                    setResults([]);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
