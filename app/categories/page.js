"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";

const CATEGORY_DATA = {
  men: [
    {
      name: "T-Shirts",
      sizes: ["S", "M", "L", "XL"],
      items: Array.from({ length: 10 }, (_, i) => ({
        id: `5`,
        title: `Men's Classic Heavyweight Tee Vol. ${i + 1}`,
        price: 45 + i * 5,
        category: "Men / T-Shirts",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800",
      })),
    },
    {
      name: "Shirts",
      sizes: ["S", "M", "L", "XL"],
      items: Array.from({ length: 10 }, (_, i) => ({
        id: `2`,
        title: `Tailored Oxford Cotton Shirt ${i + 1}`,
        price: 85 + i * 10,
        category: "Men / Shirts",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800",
      })),
    },
    {
      name: "Jeans",
      sizes: ["30", "32", "34", "36", "38"],
      items: Array.from({ length: 8 }, (_, i) => ({
        id: `8`,
        title: `Raw Denim Slim Fit Jeans ${i + 1}`,
        price: 110 + i * 8,
        category: "Men / Jeans",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800",
      })),
    },
    {
      name: "Shoes",
      sizes: ["37", "38", "39", "40", "41", "42"],
      items: Array.from({ length: 10 }, (_, i) => ({
        id: `m-shs-${i + 1}`,
        title: `Handcrafted Leather Loafers ${i + 1}`,
        price: 180 + i * 15,
        category: "Men / Shoes",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800",
      })),
    },
    {
      name: "Watches",
      sizes: null,
      items: Array.from({ length: 8 }, (_, i) => ({
        id: `7`,
        title: `Minimalist Chronograph Watch ${i + 1}`,
        price: 250 + i * 25,
        category: "Men / Watches",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
      })),
    },
  ],
  women: [
    {
      name: "Shoes",
      sizes: ["37", "38", "39", "40", "41", "42"],
      items: Array.from({ length: 10 }, (_, i) => ({
        id: `w-shs-${i + 1}`,
        title: `Elegance Leather Pumps ${i + 1}`,
        price: 160 + i * 12,
        category: "Women / Shoes",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800",
      })),
    },
    {
      name: "Handbags",
      sizes: null,
      items: Array.from({ length: 8 }, (_, i) => ({
        id: `6`,
        title: `Structured Tote Leather Bag ${i + 1}`,
        price: 220 + i * 20,
        category: "Women / Handbags",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800",
      })),
    },
    {
      name: "Watches",
      sizes: null,
      items: Array.from({ length: 8 }, (_, i) => ({
        id: `7`,
        title: `Rose Gold Petite Watch ${i + 1}`,
        price: 210 + i * 18,
        category: "Women / Watches",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800",
      })),
    },
    {
      name: "Jewelry",
      variants: ["Gold", "Silver", "Rose Gold"],
      items: Array.from({ length: 10 }, (_, i) => ({
        id: `w-jw-${i + 1}`,
        title: `Minimalist Pendant & Chain ${i + 1}`,
        price: 130 + i * 15,
        category: "Women / Jewelry",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      })),
    },
    {
      name: "Dresses",
      sizes: ["S", "M", "L", "XL"],
      items: Array.from({ length: 10 }, (_, i) => ({
        id: `1`,
        title: `Silk Evening Gown & Midi ${i + 1}`,
        price: 240 + i * 20,
        category: "Women / Dresses",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800",
      })),
    },
  ],
};

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialGender = searchParams.get("gender") || "men";
  const initialSub = searchParams.get("sub") || "All";

  const [activeGender, setActiveGender] = useState(initialGender);
  const [activeSubCategory, setActiveSubCategory] = useState(initialSub);

  useEffect(() => {
    const g = searchParams.get("gender");
    const s = searchParams.get("sub");
    if (g) setActiveGender(g);
    if (s) setActiveSubCategory(s);
  }, [searchParams]);

  const currentCategories = CATEGORY_DATA[activeGender] || CATEGORY_DATA["men"];

  const displayedCategories =
    activeSubCategory === "All"
      ? currentCategories
      : currentCategories.filter((c) => c.name.toLowerCase() === activeSubCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">
          Collections Directory
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
          Browse Categories
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex border border-neutral-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => {
              setActiveGender("men");
              setActiveSubCategory("All");
            }}
            className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
              activeGender === "men"
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Men's Collection
          </button>
          <button
            onClick={() => {
              setActiveGender("women");
              setActiveSubCategory("All");
            }}
            className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
              activeGender === "women"
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Women's Collection
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-neutral-200 pb-6">
        <button
          onClick={() => setActiveSubCategory("All")}
          className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
            activeSubCategory === "All"
              ? "border-b-2 border-neutral-900 text-neutral-900 font-bold"
              : "text-neutral-400 hover:text-neutral-900"
          }`}
        >
          All Items
        </button>
        {currentCategories.map((sub) => (
          <button
            key={sub.name}
            onClick={() => setActiveSubCategory(sub.name)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
              activeSubCategory.toLowerCase() === sub.name.toLowerCase()
                ? "border-b-2 border-neutral-900 text-neutral-900 font-bold"
                : "text-neutral-400 hover:text-neutral-900"
            }`}
          >
            {sub.name} ({sub.items.length})
          </button>
        ))}
      </div>

      <div className="space-y-20">
        {displayedCategories.length > 0 ? (
          displayedCategories.map((catGroup) => (
            <section key={catGroup.name} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 pb-4 gap-2">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-neutral-900">
                    {catGroup.name}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Showing {catGroup.items.length} crafted pieces
                  </p>
                </div>

                {catGroup.sizes && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-900">Available Sizes:</span>
                    <div className="flex gap-1.5 font-mono text-[11px]">
                      {catGroup.sizes.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {catGroup.items.map((item) => (
                  <ProductCard key={item.id + Math.random()} {...item} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-16 bg-white border border-neutral-200">
            <p className="font-serif text-xl text-neutral-800">No items found for "{activeSubCategory}"</p>
            <button
              onClick={() => setActiveSubCategory("All")}
              className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase font-bold"
            >
              Show All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Categories...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}