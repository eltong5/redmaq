import { useState } from "react";
import { Search } from "lucide-react"; // Necesita instalar: npm install lucide-react

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", query); // Aquí conectaremos la búsqueda real después
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

        {/* Buscador estilo Microsoft */}
        <form
          onSubmit={handleSearch}
          className="relative w-full sm:w-72"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-600"
          >
            <Search size={18} />
          </button>
        </form>
      </div>
    </header>
  );
}
