// app/components/Sidebar.tsx
"use client";

import { useState } from "react";

const categorias = [
  "Herramientas Eléctricas",
  "Maquinaria Pesada",
  "Soldadura",
  "Energía",
];

const marcas = ["Bosch", "Makita", "DeWalt", "Redmaq"];

type Filtros = {
  categoria: string;
  marca: string;
  precio: [number, number];
};

export default function Sidebar({
  onFilterChange,
}: {
  onFilterChange: (filtros: Filtros) => void;
}) {
  const [filtros, setFiltros] = useState<Filtros>({
    categoria: "",
    marca: "",
    precio: [0, 5000000],
  });

  const updateFiltros = (newFiltros: Partial<Filtros>) => {
    const updated = { ...filtros, ...newFiltros };
    setFiltros(updated);
    onFilterChange(updated);
  };

  return (
    <aside className="w-64 bg-white rounded-lg shadow p-4 h-fit">
      <h2 className="text-lg font-bold mb-4">Filtros</h2>

      {/* Categorías */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categorías</h3>
        <ul className="space-y-1">
          {categorias.map((c) => (
            <li key={c}>
              <button
                onClick={() =>
                  updateFiltros({ categoria: filtros.categoria === c ? "" : c })
                }
                className={`w-full text-left px-2 py-1 rounded ${
                  filtros.categoria === c
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Marcas */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Marcas</h3>
        <ul className="space-y-1">
          {marcas.map((m) => (
            <li key={m}>
              <button
                onClick={() =>
                  updateFiltros({ marca: filtros.marca === m ? "" : m })
                }
                className={`w-full text-left px-2 py-1 rounded ${
                  filtros.marca === m
                    ? "bg-yellow-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {m}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio */}
      <div>
        <h3 className="font-semibold mb-2">Precio</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Mín"
            value={filtros.precio[0]}
            onChange={(e) =>
              updateFiltros({ precio: [Number(e.target.value), filtros.precio[1]] })
            }
            className="w-1/2 border rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            placeholder="Máx"
            value={filtros.precio[1]}
            onChange={(e) =>
              updateFiltros({ precio: [filtros.precio[0], Number(e.target.value)] })
            }
            className="w-1/2 border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
    </aside>
  );
}
