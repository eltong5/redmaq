"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { openCart, cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim() === "") return setResults([]);

    try {
      const res = await fetch(`/api/productos?q=${encodeURIComponent(value)}`);
      if (!res.ok) throw new Error("Error al buscar");
      const data = await res.json();
      setResults(data.map((p: any) => p.nombre));
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-section shadow-md" : "bg-section"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.jpg"
            alt="Redmaq Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-lg md:text-xl font-bold tracking-wide text-text-main">
            Redmaq Colombia
          </h1>
        </div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link
            href="/"
            className="text-text-main hover:text-brand-primary transition"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            className="text-text-main hover:text-brand-primary transition"
          >
            Productos
          </Link>
          <Link
            href="/contacto"
            className="text-text-main hover:text-brand-primary transition"
          >
            Contacto
          </Link>
        </nav>

        {/* Buscador (solo desktop) */}
        <div className="hidden md:block relative w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-text-main placeholder-text-light focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
          />
          {results.length > 0 && (
            <ul className="absolute left-0 w-full mt-1 bg-section text-text-main rounded-lg shadow-lg overflow-hidden z-50">
              {results.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-alt cursor-pointer"
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

        {/* Carrito y menú móvil */}
        <div className="flex items-center gap-4">
          <button onClick={openCart} className="relative">
            <ShoppingCart size={24} className="text-text-main" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-text-main"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-section shadow-lg text-text-main px-6 py-4 space-y-4 animate-slideDown">
          <Link
            href="/"
            className="block hover:text-brand-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            className="block hover:text-brand-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Productos
          </Link>
          <Link
            href="/contacto"
            className="block hover:text-brand-primary transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
}
