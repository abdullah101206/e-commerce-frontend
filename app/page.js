"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

const featuredProducts = [
  { id: "1", title: "Structured Wool Trench Coat", price: 380, category: "Women", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800" },
  { id: "2", title: "Minimalist Italian Linen Shirt", price: 160, category: "Men", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800" },
  { id: "3", title: "Crafted Gold Frame Sunglasses", price: 210, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800" },
  { id: "4", title: "Monochrome Oversized Blazer", price: 320, category: "Women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" },
  { id: "7", title: "Black Dial Automatic Chrono", price: 490, category: "Accessories", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800" },
  { id: "8", title: "Raw Selvage Denim Trousers", price: 145, category: "Men", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All"
    ? featuredProducts
    : featuredProducts.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-32 pb-24 bg-neutral-50/50">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 border-b border-neutral-200 pb-6 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-700">
              Season Directory
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
              Curated Collections
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs uppercase tracking-widest font-bold text-neutral-900 hover:text-amber-700 transition-colors flex items-center gap-2 group"
          >
            Explore Directory
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
   
          <Link
            href="/categories?gender=women"
            className="md:col-span-7 group relative h-[520px] overflow-hidden bg-neutral-900 shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200"
              alt="Women Collection"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                32 Signature Pieces
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
                Womenswear Atelier
              </h3>
              <p className="text-xs text-neutral-300 font-light max-w-md mt-2 leading-relaxed hidden sm:block">
                Architectural silhouettes, silk midi gowns, and tailored wool coats for refined presence.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-white uppercase font-bold tracking-widest group-hover:text-amber-400 transition-colors">
                <span>Shop Womenswear</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          <div className="md:col-span-5 flex flex-col gap-6">
        
            <Link
              href="/categories?gender=men"
              className="group relative h-[247px] overflow-hidden bg-neutral-900 shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000"
                alt="Men Collection"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                  24 Essential Cuts
                </span>
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                  Menswear Line
                </h3>
                <span className="text-[11px] text-neutral-300 uppercase tracking-widest mt-1 group-hover:text-amber-400 transition-colors">
                  Explore Collection →
                </span>
              </div>
            </Link>

            <Link
              href="/categories?gender=men&sub=Watches"
              className="group relative h-[247px] overflow-hidden bg-neutral-900 shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000"
                alt="Accessories"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                  Timepieces & Leather
                </span>
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                  Accessories & Goods
                </h3>
                <span className="text-[11px] text-neutral-300 uppercase tracking-widest mt-1 group-hover:text-amber-400 transition-colors">
                  Explore Collection →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

<section className="relative w-full min-h-[500px] sm:h-[580px] overflow-hidden bg-neutral-950 flex items-center justify-center py-16 sm:py-0">

  <img
    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000"
    alt="Fall Editorial Lookbook"
    className="absolute inset-0 w-full h-full object-cover object-center opacity-40 grayscale group-hover:grayscale-0 hover:scale-105 transition-all duration-1000 ease-out"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/80 sm:bg-gradient-to-r sm:from-neutral-950/90 sm:via-neutral-950/50 sm:to-neutral-950/90" />

  <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center text-white space-y-5 sm:space-y-6">
    
    <div>
      <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-amber-500/30 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-amber-300 rounded-full shadow-lg">
        Fall / Winter '26 Lookbook
      </span>
    </div>

    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15] max-w-2xl mx-auto">
      Quiet Luxury. <br className="hidden sm:inline" />
      <span className="italic font-normal text-amber-100/90">Zero Noise.</span>
    </h2>

    <p className="text-xs sm:text-base text-neutral-300 font-light max-w-xl mx-auto leading-relaxed px-2">
      Uncompromising raw organic textiles shaped into effortless silhouettes. Designed for everyday distinction and lifelong endurance.
    </p>

    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
      <Link
        href="/shop"
        className="w-full sm:w-auto px-8 py-3.5 bg-white text-neutral-950 text-xs font-bold uppercase tracking-widest hover:bg-amber-400 hover:text-black transition-all shadow-xl text-center active:scale-95"
      >
        Shop Lookbook Capsule
      </Link>
      
      <Link
        href="/categories"
        className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900/80 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center active:scale-95"
      >
        Explore Lookbook
      </Link>
    </div>
  </div>
</section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.35em] font-bold text-amber-700">
            Handpicked Articles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Selected Works
          </h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">
            Pure textiles & precision patterns
          </p>
        </div>

        <div className="flex justify-center gap-3 sm:gap-8 border-b border-neutral-200 pb-4">
          {["All", "Men", "Women", "Accessories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs uppercase tracking-widest font-semibold pb-2 transition-all relative ${
                activeTab === tab
                  ? "text-neutral-900 font-bold"
                  : "text-neutral-400 hover:text-neutral-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 animate-fade-in" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-neutral-200 p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-sm">
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200"
              alt="Atelier Craftsmanship"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.35em] text-amber-700 font-bold">
              Our Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Designed with Intent. Crafted to Endure.
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              Founded in 2026, AURA bypasses temporary micro-trends. Every garment is constructed in small, eco-conscious batches using 100% certified long-staple organic fibers.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-block text-xs uppercase tracking-widest font-bold text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors"
              >
                Read Our Story & Craft →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-y border-neutral-200 py-12 bg-white">
          {[
            { badge: "01", title: "Organic Materials", desc: "100% long-staple organic cotton & pure French linen." },
            { badge: "02", title: "Global Express", desc: "Complimentary worldwide courier delivery over $200." },
            { badge: "03", title: "30-Day Returns", desc: "Hassle-free size exchange & returns policy." },
            { badge: "04", title: "Secure Checkout", desc: "256-bit encrypted secure payment processing." },
          ].map((item) => (
            <div key={item.badge} className="space-y-2 p-2">
              <span className="font-mono text-xs text-amber-700 font-bold">{item.badge}.</span>
              <h4 className="font-serif font-bold text-base text-neutral-900">{item.title}</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}