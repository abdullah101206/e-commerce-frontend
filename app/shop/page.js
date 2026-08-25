"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const ALL_PRODUCTS = [
  // Womenswear
  { id: 1, title: "Structured Tailored Blazer", price: 280, category: "Women", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800" },
  { id: 2, title: "Monochrome Trench Coat", price: 350, category: "Women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" },
  { id: 3, title: "Leather Crossbody Handbag", price: 310, category: "Women", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800" },
  { id: 4, title: "Silk Wrap Evening Gown", price: 420, category: "Women", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800" },
  { id: 5, title: "Pleated Linen Midi Skirt", price: 180, category: "Women", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800" },
  { id: 6, title: "Cashmere Knit Turtleneck", price: 240, category: "Women", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800" },
  { id: 7, title: "High-Waisted Tailored Trousers", price: 190, category: "Women", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800" },
  { id: 8, title: "Floral Silk Summer Dress", price: 295, category: "Women", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800" },
  { id: 9, title: "Oversized Denim Jacket", price: 165, category: "Women", image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=800" },
  { id: 10, title: "Minimalist Leather Heeled Sandals", price: 210, category: "Women", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800" },

  // Menswear
  { id: 11, title: "Minimalist Linen Overshirt", price: 140, category: "Men", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800" },
  { id: 12, title: "Classic Heavyweight Cotton Tee", price: 65, category: "Men", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800" },
  { id: 13, title: "Slim Fit Indigo Jeans", price: 110, category: "Men", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800" },
  { id: 14, title: "Italian Leather Biker Jacket", price: 480, category: "Men", image: "https://images.unsplash.com/photo-1486252311391-ec2195db7e02?q=80&w=800" },
  { id: 15, title: "Wool Blend Tailored Suit", price: 390, category: "Men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800" },
  { id: 16, title: "Relaxed Fit Chino Trousers", price: 125, category: "Men", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800" },
  { id: 17, title: "Organic Merino Wool Cardigan", price: 210, category: "Men", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800" },
  { id: 18, title: "Tailored Oxford Button-Down Shirt", price: 115, category: "Men", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800" },
  { id: 19, title: "Urban Suede Chelsea Boots", price: 275, category: "Men", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800" },
  { id: 20, title: "Sleeveless Minimalist Vest", price: 90, category: "Men", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800" },

  // Accessories
  { id: 21, title: "Gold Rimmed Aviator Sunglasses", price: 195, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800" },
  { id: 22, title: "Minimalist Automatic Watch", price: 420, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800" },
  { id: 23, title: "Full-Grain Leather Wallet", price: 95, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800" },
  { id: 24, title: "Handcrafted Leather Ankle Boots", price: 290, category: "Accessories", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800" },
  { id: 25, title: "Minimalist Silver Cuff Bracelet", price: 130, category: "Accessories", image: "https://images.unsplash.com/photo-1611591475171-881a3ec95286?q=80&w=800" },
  { id: 26, title: "Printed Silk Neck Scarf", price: 85, category: "Accessories", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800" },
  { id: 27, title: "Black Dial Chronograph Watch", price: 460, category: "Accessories", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800" },
  { id: 28, title: "Polarized Square Frame Sunglasses", price: 175, category: "Accessories", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800" },
  { id: 29, title: "Structured Leather Tote Bag", price: 340, category: "Accessories", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800" },
  { id: 30, title: "Artisanal Leather Belt with Brass Buckle", price: 110, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800" },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtering Logic
  let filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting Logic
  if (sortBy === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrice(500);
    setSortBy("default");
  };

  const activeFilterCount = (selectedCategory !== "All" ? 1 : 0) + (maxPrice < 500 ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8 sm:space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 border-b border-neutral-200 pb-6 sm:pb-10">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-amber-700">
          The Full Archive
        </span>
        <h1 className="font-serif text-3xl sm:text-6xl font-bold tracking-tight text-neutral-900">
          Curated Catalog
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-xl mx-auto leading-relaxed">
          Explore our complete lineup of sustainable luxury garments and timeless essential accessories.
        </p>
      </div>

      {/* MOBILE CONTROL BAR */}
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

      {/* DESKTOP + MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Sidebar Filter Panel (Desktop Only) */}
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

          {/* Search Box */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900">
              Search
            </label>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Category Filter List */}
          <div className="space-y-3">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900">
              Category
            </label>
            <div className="flex flex-col gap-1.5">
              {["All", "Men", "Women", "Accessories"].map((cat) => (
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

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900">
                Max Price
              </label>
              <span className="font-mono text-xs font-bold text-neutral-900">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
              <span>$50</span>
              <span>$500</span>
            </div>
          </div>
        </div>

        {/* Right Area: Top Control Bar + Product Grid */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar */}
          <div className="bg-white p-4 border border-neutral-200 flex flex-row justify-between items-center gap-4 text-xs">
            <span className="text-neutral-500 font-light text-[11px] sm:text-xs">
              Showing <strong className="text-neutral-900 font-bold">{filteredProducts.length}</strong> Articles
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
                <option value="default">Featured / Newest</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-neutral-200 space-y-4">
              <p className="font-serif text-2xl text-neutral-800 font-bold">No Products Matched</p>
              <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                No items match your active search or price range. Try clearing your filters to see full catalog.
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

      {/* MOBILE SLIDE-OVER FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white">
          {/* Drawer Header */}
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-900 text-white">
            <h3 className="font-serif text-lg font-bold">Filter Options</h3>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-sm font-bold text-amber-400 px-3 py-1"
            >
              ✕ Close
            </button>
          </div>

          {/* Drawer Content Body */}
          <div className="p-6 overflow-y-auto space-y-8 flex-1">
            {/* Category Option List */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900">
                Select Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["All", "Men", "Women", "Accessories"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-3 px-4 text-xs font-bold uppercase tracking-wider text-center border transition-all ${
                      selectedCategory === cat
                        ? "bg-neutral-900 text-white border-neutral-900 font-bold"
                        : "bg-neutral-50 text-neutral-800 border-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900">
                  Max Price Filter
                </label>
                <span className="font-mono text-sm font-bold text-neutral-900">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200"
              />
              <div className="flex justify-between text-xs text-neutral-400 font-mono">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex gap-4">
            <button
              onClick={resetAllFilters}
              className="w-1/3 py-3.5 border border-neutral-300 text-neutral-900 text-xs font-bold uppercase tracking-widest"
            >
              Reset
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-2/3 py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest"
            >
              Apply ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}