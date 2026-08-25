"use client";

import { useState, use } from "react";

// Mock Product Database
const PRODUCTS_DATA = {
  "1": {
    id: 1,
    title: "Structured Tailored Blazer",
    price: 280,
    category: "Women",
    description: "Crafted from a premium wool blend with a silk lining, this structured blazer brings quiet luxury to modern workwear and evening tailoring. Cut in a contemporary boxy fit with sharp lapels.",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal Black", "Oatmeal Beige", "Deep Navy"],
    reviews: [
      { id: 1, name: "Sophia R.", rating: 5, date: "August 2026", comment: "The structure and fitting are exceptional. Truly feels like bespoke tailoring." },
      { id: 2, name: "Marcus T.", rating: 5, date: "July 2026", comment: "Bought this for my wife. The wool fabric quality is noticeable from a mile away." }
    ]
  }
};

export default function ProductDetailsPage({ params }) {
  // Unwrap params using React.use() for Next.js App Router compatibility
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  // Default to product 1 if ID not found in mock data
  const product = PRODUCTS_DATA[id] || PRODUCTS_DATA["1"];

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column: Product Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`aspect-[3/4] overflow-hidden border-2 transition-all ${
                  selectedImage === img ? "border-neutral-900 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-2">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-neutral-900 mt-4">${product.price}</p>

            <div className="border-t border-neutral-200 my-6" />

            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && (
              <div className="mt-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-3">
                  Color: <span className="font-normal text-neutral-500">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs border transition-all ${
                        selectedColor === color
                          ? "border-neutral-900 bg-neutral-900 text-white font-medium"
                          : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && (
              <div className="mt-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-3">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs border transition-all ${
                        selectedSize === size
                          ? "border-neutral-900 bg-neutral-900 text-white font-bold"
                          : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center border border-neutral-200 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add To Cart CTA */}
          <div className="pt-6 border-t border-neutral-200 space-y-3">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                added
                  ? "bg-emerald-800 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              {added ? "✓ Added To Cart" : "Add To Bag"}
            </button>
            <p className="text-[11px] text-neutral-400 text-center">
              Complimentary express shipping & 30-day effortless returns.
            </p>
          </div>
        </div>
      </div>

      {/* Inline Reviews Section */}
      <div className="mt-24 border-t border-neutral-200 pt-16">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-neutral-900 mb-8">
          Customer Reviews ({product.reviews.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-neutral-900">{rev.name}</span>
                <span className="text-xs text-neutral-400">{rev.date}</span>
              </div>
              <div className="flex text-amber-500 text-xs">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}