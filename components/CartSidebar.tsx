"use client";

import { useCart } from "@/app/context/CartContext";

export default function CartSidebar() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    decrementQuantity,
    totalPrice,
    clearCart,
    isOpen,
    closeCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={closeCart}
      ></div>

      {/* Sidebar */}
      <div className="relative w-80 bg-white shadow-xl p-6 overflow-y-auto">
        <button
          onClick={closeCart}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Carrito</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">No hay productos en el carrito.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.nombre}</h3>
                  <p className="text-yellow-700 font-bold">
                    ${item.precio.toLocaleString()}
                  </p>

                  {/* Cantidad */}
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          nombre: item.nombre,
                          precio: item.precio,
                          imagen: item.imagen,
                        })
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="font-bold text-lg">
                Total: ${totalPrice.toLocaleString()}
              </p>
              <button className="btn-primary w-full mt-3">Finalizar compra</button>
              <button
                onClick={clearCart}
                className="mt-2 bg-gray-200 hover:bg-gray-300 rounded p-2 w-full"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
