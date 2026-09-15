"use client";

import { useEffect, useState, use } from "react";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Standard Black");
  const [quantity, setQuantity] = useState(1);

  const [toast, setToast] = useState({ show: false, message: "", isError: false });

  const showNotification = (message, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => {
      setToast({ show: false, message: "", isError: false });
    }, 3000);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://e-commerce-backend-xi.vercel.app/api/products/${productId}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();
        const fetchedProduct = data.product || data;
        setProduct(fetchedProduct);

        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("user");

    if (!token) {
      showNotification("Please log in to add items to your cart.", true);
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === (product._id || product.id) && item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: product._id || product.id,
        title: product.title || product.name,
        price: product.price,
        category: product.category,
        image: product.image || product.images?.[0] || "/placeholder.jpg",
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    showNotification("Item added to cart successfully!", false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-neutral-900 border-t-transparent"></div>
        <p className="mt-4 text-xs font-mono uppercase tracking-widest text-neutral-500">
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-rose-600 font-bold text-sm">
        Product not found or failed to load.
      </div>
    );
  }

  const sizesList =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["S", "M", "L", "XL"];

  const colorsList =
    product.colors && product.colors.length > 0
      ? product.colors
      : ["Standard Black", "Oatmeal Beige", "Deep Navy"];

  const productImage = product.image || product.images?.[0] || "/placeholder.jpg";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16 overflow-x-hidden">
      {toast.show && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-2xl text-xs font-semibold tracking-wide border flex items-center gap-2 ${
            toast.isError
              ? "bg-red-950 text-red-200 border-red-800"
              : "bg-neutral-900 text-white border-neutral-700"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${toast.isError ? "bg-red-500" : "bg-amber-400"}`} />
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full">
        {/* Fixed Mobile & Desktop Image Container */}
        <div className="w-full h-80 sm:h-96 lg:h-auto lg:aspect-[3/4] bg-neutral-100 border border-neutral-200 overflow-hidden lg:sticky lg:top-28">
          <img
            src={productImage}
            alt={product.title || product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-full space-y-6 sm:space-y-8">
          <div className="border-b border-neutral-200 pb-6 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-700 block">
              {product.category || "Luxury Collection"}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 break-words">
              {product.title || product.name}
            </h1>
            <p className="font-mono text-xl sm:text-2xl font-bold text-neutral-900 pt-2">
              ${product.price}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Overview
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Color Finish: <span className="font-normal text-neutral-500">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-2 w-full">
              {colorsList.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 sm:px-4 py-2 text-xs font-medium border transition-colors ${
                    selectedColor === color
                      ? "border-neutral-900 bg-neutral-900 text-white font-bold"
                      : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Select Size
            </h3>
            <div className="flex flex-wrap gap-2 w-full">
              {sizesList.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xs font-mono font-bold border transition-colors ${
                    selectedSize === size
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Quantity
            </h3>
            <div className="flex items-center border border-neutral-300 w-32 justify-between px-3 py-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="text-lg font-bold text-neutral-600 hover:text-neutral-900"
              >
                -
              </button>
              <span className="font-mono text-sm font-bold text-neutral-900">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-lg font-bold text-neutral-600 hover:text-neutral-900"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-neutral-900 text-white text-xs uppercase font-bold tracking-[0.2em] shadow-lg hover:bg-amber-800 active:bg-neutral-950 transition-colors cursor-pointer"
          >
            Add To Cart
          </button>

          <div className="pt-6 border-t border-neutral-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Product Highlights
            </h3>
            <ul className="text-xs text-neutral-600 space-y-2 list-disc list-inside font-light">
              <li>Premium craftsmanship with durable finish</li>
              <li>Engineered for modern daily precision and comfort</li>
              <li>Includes signature AURA luxury presentation box</li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 text-[11px] text-neutral-500 font-medium">
              <div className="p-3 bg-neutral-50 border border-neutral-100 text-center">
                Free Express Shipping
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-100 text-center">
                1-Year Warranty Included
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}