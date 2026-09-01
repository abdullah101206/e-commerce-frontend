"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        const fetchedList = Array.isArray(data) ? data : data.products || [];

        const filteredNew = fetchedList.filter((item) => item.isNewArrival === true);
        
        setProducts(filteredNew.length > 0 ? filteredNew : fetchedList);
      } catch (error) {
        console.error("New Arrivals Fetching Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const categoriesList = ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (sortBy === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrice(1000);
    setSortBy("default");
  };

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (maxPrice < 1000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8 sm:space-y-12">

      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 border-b border-neutral-200 pb-6 sm:pb-10">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-amber-700">
          Exclusive Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-6xl font-bold tracking-tight text-neutral-900">
          New Arrivals
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-xl mx-auto leading-relaxed">
          Explore our latest sustainable luxury garments and timeless essential items.
        </p>
      </div>

      <div className="lg:hidden space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest active:bg-neutral-800 transition-colors shadow-sm"
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-amber-500 text-neutral-950 rounded-full text-[10px] flex items-center justify-center font-mono font-extrabold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="hidden lg:block lg:col-span-3 bg-white p-6 border border-neutral-200 shadow-sm space-y-8 sticky top-28">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-neutral-900">Filters</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-[10px] font-bold uppercase tracking-widest text-amber-700 hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900">
              Search
            </label>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <div className="space-y-3">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900">
              Category
            </label>
            <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs py-2 px-3 transition-colors ${
                    selectedCategory === cat
                      ? "bg-neutral-900 text-white font-bold"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900">
                Max Price
              </label>
              <span className="font-mono text-xs font-bold text-neutral-900">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white p-4 border border-neutral-200 flex flex-row justify-between items-center gap-4 text-xs">
            <span className="text-neutral-500 font-light text-[11px] sm:text-xs">
              Showing <strong className="text-neutral-900 font-bold">{filteredProducts.length}</strong> Products
            </span>

            <div className="flex items-center gap-2 sm:gap-3">
              <label className="text-neutral-500 uppercase tracking-widest font-semibold text-[10px] hidden sm:inline">
                Sort By:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs font-medium focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="default">Newest First</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white border border-neutral-200">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-900 border-t-transparent"></div>
              <p className="mt-3 text-xs uppercase font-semibold text-neutral-500 tracking-widest">
                Fetching Products...
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-neutral-200 space-y-4">
              <p className="font-serif text-2xl text-neutral-800 font-bold">No Products Matched</p>
              <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                No items match your active filter settings. Try clearing your filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-8 py-3.5 bg-neutral-900 text-white text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}