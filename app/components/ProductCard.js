"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ _id, id, title, price, category, image, product }) {
  const [toast, setToast] = useState({ show: false, message: "", isError: false });

  const productId = _id || id || product?._id || product?.id;

  const getOptimizedImageUrl = (url) => {
    if (!url) return "/placeholder.jpg";
    if (url.includes("images.unsplash.com")) {
      const cleanUrl = url.split("?")[0];
      return `${cleanUrl}?auto=format&fit=crop&w=600&q=75`;
    }
    if (url.includes("images.pexels.com")) {
      const cleanUrl = url.split("?")[0];
      return `${cleanUrl}?auto=compress&cs=tinysrgb&w=600`;
    }
    return url;
  };

  const showNotification = (message, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => {
      setToast({ show: false, message: "", isError: false });
    }, 3000);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || localStorage.getItem("user");

    if (!token) {
      showNotification("Please log in to add items to your cart.", true);
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    const existingItemIndex = existingCart.findIndex(
      (item) => (productId && item.id === productId) || item.title === title
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: productId || title,
        title,
        price,
        category,
        image,
        quantity: 1,
        size: "M",
        color: "Standard",
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    showNotification("Item added to cart successfully!", false);
  };

  return (
    <div className="group relative flex flex-col">
      {toast.show && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-2xl text-xs font-semibold tracking-wide transition-all duration-300 border flex items-center gap-2 ${
            toast.isError
              ? "bg-red-950 text-red-200 border-red-800"
              : "bg-neutral-900 text-white border-neutral-700"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${toast.isError ? "bg-red-500" : "bg-amber-400"}`} />
          {toast.message}
        </div>
      )}

      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-none mb-4">
        <img
          src={getOptimizedImageUrl(image)}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-4 right-4 translate-y-0 opacity-100 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 space-y-2">
          <button
            onClick={handleAddToCart}
            className="w-full block text-center bg-neutral-900 text-white text-xs uppercase font-semibold tracking-wider py-3 shadow-md hover:bg-amber-800 transition-colors cursor-pointer"
          >
            Add To Cart
          </button>

          <Link
            href={`/shop/${productId}`}
            className="w-full block text-center bg-white text-neutral-900 text-xs uppercase font-semibold tracking-wider py-2 shadow-md hover:bg-neutral-200 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            {category}
          </p>
          <h3 className="text-sm font-medium text-neutral-900 group-hover:text-amber-800 transition-colors">
            <Link href={`/shop/${productId}`}>{title}</Link>
          </h3>
        </div>
        <p className="text-sm font-semibold text-neutral-900">${price}</p>
      </div>
    </div>
  );
}