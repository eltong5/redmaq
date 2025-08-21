// app/components/Sidebar.tsx
"use client";

import { useState, useEffect } from "react";

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
  filtros,
}: {
  onFilterChange: (filtros: Filtros) => void;
  filtros: Filtros;
}) {
  const [localFiltros, setLocalFiltros] = useState<Filtros>(filtros);

  // Mantener sincronizado el estado interno con los props
  useEffect(() => {
    setLocalFiltros(filtros);
  }, [filtros]);

  const updateFiltros = (newFiltros: Partial<Filtros>) => {
    const updated = { ...localFiltros, ...newFiltros };
    setLocalFiltros(updated);
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
                  updateFiltros({
                    categoria: localFiltros.categoria === c ? "" : c,
                  })
                }
                className={`w-full text-left px-2 py-1 rounded ${
                  localFiltros.categoria === c
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
                  updateFiltros({
                    marca: localFiltros.marca === m ? "" : m,
                  })
                }
                className={`w-full text-left px-2 py-1 rounded ${
                  localFiltros.marca === m
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
            value={localFiltros.precio[0]}
            onChange={(e) =>
              updateFiltros({
                precio: [Number(e.target.value), localFiltros.precio[1]],
              })
            }
            className="w-1/2 border rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            placeholder="Máx"
            value={localFiltros.precio[1]}
            onChange={(e) =>
              updateFiltros({
                precio: [localFiltros.precio[0], Number(e.target.value)],
              })
            }
            className="w-1/2 border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
    </aside>
  );
}
