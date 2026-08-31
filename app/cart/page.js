"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // Sync cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    updateLocalStorage(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const grandTotal = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-neutral-200 pb-6 mb-10">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Your Bag
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
          Shopping Cart ({cartItems.length})
        </h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-neutral-200 gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative aspect-[3/4] w-20 bg-neutral-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Size:{" "}
                      <span className="font-medium text-neutral-800">
                        {item.size || "M"}
                      </span>{" "}
                      | Color:{" "}
                      <span className="font-medium text-neutral-800">
                        {item.color || "Standard"}
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-neutral-900 sm:hidden">
                      ${item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                  <div className="flex items-center border border-neutral-200">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 text-sm font-semibold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 text-sm font-semibold"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm font-bold text-neutral-900 hidden sm:block">
                    ${item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-neutral-400 hover:text-red-700 underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest font-bold text-neutral-900 hover:text-amber-800 underline underline-offset-4"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-neutral-900 border-b border-neutral-200 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Express Delivery</span>
                  <span className="font-semibold text-neutral-900">
                    {shipping === 0 ? "FREE" : `$${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-[10px] text-emerald-700 italic">
                    ✓ You unlocked complimentary express shipping!
                  </p>
                )}
                <div className="border-t border-neutral-200 pt-3 flex justify-between text-sm font-bold text-neutral-900">
                  <span>Total Amount</span>
                  <span>${grandTotal}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-md"
              >
                Proceed To Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-neutral-200 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-neutral-500">
            Looks like you haven't added any luxury pieces yet.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      )}
    </div>
  );
}