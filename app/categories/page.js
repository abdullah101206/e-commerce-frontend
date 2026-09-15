"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";

function CategoriesContent() {
  const searchParams = useSearchParams();
  
  const queryGender = searchParams.get("gender");
  const querySub = searchParams.get("sub") || searchParams.get("category") || searchParams.get("cat") || searchParams.get("subCategory");

  const [activeGender, setActiveGender] = useState(queryGender ? queryGender.toLowerCase() : "men");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchLiveProducts = async () => {
  try {
    setLoading(true);
    const res = await fetch("https://e-commerce-backend-xi.vercel.app/api/products");
    if (!res.ok) throw new Error("Failed to fetch products");
        
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveProducts();
  }, []);

  useEffect(() => {
    const g = searchParams.get("gender");
    const s = searchParams.get("sub") || searchParams.get("category") || searchParams.get("cat") || searchParams.get("subCategory");

    if (g) setActiveGender(g.toLowerCase());
    if (s) setActiveSubCategory(s);
    else setActiveSubCategory("All");
  }, [searchParams]);

  const filteredProducts = products.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    const sub = String(item.subCategory || "").toLowerCase();
    const title = String(item.title || "").toLowerCase();

    const isWomen = cat.includes("women") || sub.includes("women") || title.includes("women") || cat.includes("dresses") || cat.includes("handbag") || cat.includes("jewelry");
    const matchesGender = activeGender === "women" ? isWomen : !isWomen;

    if (!matchesGender) return false;

    if (activeSubCategory === "All") return true;

    const targetSub = activeSubCategory.toLowerCase();
    
    if (targetSub === "t-shirts" || targetSub === "tshirts") {
      return cat.includes("t-shirt") || sub.includes("t-shirt") || title.includes("t-shirt") || cat.includes("tshirt");
    }
    if (targetSub === "shirts") {
      const isTee = cat.includes("t-shirt") || sub.includes("t-shirt") || title.includes("t-shirt") || cat.includes("tshirt");
      if (isTee) return false;
      return cat.includes("shirt") || sub.includes("shirt") || title.includes("shirt");
    }

    return cat.includes(targetSub) || sub.includes(targetSub) || title.includes(targetSub);
  });

  const subCategoriesList = activeGender === "women" 
    ? ["Shoes", "Handbags", "Watches", "Jewelry", "Dresses"] 
    : ["T-Shirts", "Shirts", "Jeans", "Shoes", "Watches"];

  const displayedCategories = activeSubCategory === "All"
    ? subCategoriesList.map((subName) => ({
        name: subName,
        items: filteredProducts.filter((p) => {
          const c = String(p.category || "").toLowerCase();
          const s = String(p.subCategory || "").toLowerCase();
          const t = String(p.title || "").toLowerCase();
          const target = subName.toLowerCase();

          if (target === "t-shirts") {
            return c.includes("t-shirt") || s.includes("t-shirt") || t.includes("t-shirt") || c.includes("tshirt");
          }
          if (target === "shirts") {
            const isTee = c.includes("t-shirt") || s.includes("t-shirt") || t.includes("t-shirt") || c.includes("tshirt");
            if (isTee) return false;
            return c.includes("shirt") || s.includes("shirt") || t.includes("shirt");
          }
          return c.includes(target) || s.includes(target) || t.includes(target);
        })
      })).filter(group => group.items.length > 0)
    : [{
        name: activeSubCategory,
        items: filteredProducts
      }];

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
        {subCategoriesList.map((subName) => (
          <button
            key={subName}
            onClick={() => setActiveSubCategory(subName)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
              activeSubCategory.toLowerCase() === subName.toLowerCase()
                ? "border-b-2 border-neutral-900 text-neutral-900 font-bold"
                : "text-neutral-400 hover:text-neutral-900"
            }`}
          >
            {subName}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-900 border-t-transparent"></div>
          <p className="mt-3 text-xs uppercase font-semibold text-neutral-500 tracking-widest">
            Loading Live Products...
          </p>
        </div>
      ) : (
        <div className="space-y-20">
          {displayedCategories.length > 0 && displayedCategories.some(g => g.items.length > 0) ? (
            displayedCategories.map((catGroup) => (
              catGroup.items.length > 0 && (
                <section key={catGroup.name} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 pb-4 gap-2">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-neutral-900">
                        {catGroup.name}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {catGroup.items.map((item) => (
                      <ProductCard
                        key={item._id || item.id}
                        product={item}
                        id={item._id || item.id}
                        title={item.title || item.name}
                        price={item.price}
                        image={item.image || (item.images && item.images[0])}
                        category={item.category}
                      />
                    ))}
                  </div>
                </section>
              )
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
      )}
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