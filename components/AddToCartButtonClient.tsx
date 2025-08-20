// components/AddToCartButtonClient.tsx
"use client";

import { useCart } from "@/app/context/CartContext";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

export default function AddToCartButton({ producto }: { producto: Producto }) {
  const { addToCart, openCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
    openCart();
  };

  return (
    <button
      onClick={handleAdd}
      className="btn-primary w-full md:w-auto mt-4"
    >
      Agregar al carrito
    </button>
  );
}