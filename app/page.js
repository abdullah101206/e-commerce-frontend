"use client";

import Link from "next/link";
import Hero from "./components/Hero";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "The fabric quality and stitching precision exceed most high-end luxury brands.",
    author: "Elena R.",
    role: "Fashion Director",
  },
  {
    quote: "Minimalist aesthetic done right. The fit and drape are absolute perfection.",
    author: "Marcus V.",
    role: "Architect",
  },
  {
    quote: "Sustainable materials combined with timeless design. Truly exceptional.",
    author: "Sophia L.",
    role: "Verified Buyer",
  },
  {
    quote: "Every single piece feels bespoke. The delivery packaging and details are top-tier.",
    author: "Julian K.",
    role: "Creative Lead",
  },
  {
    quote: "Unbelievable comfort and durability. This is what modern luxury should feel like.",
    author: "Amara C.",
    role: "Stylist",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="space-y-16 sm:space-y-24 md:space-y-32 pb-16 sm:pb-24 bg-neutral-50/50">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 sm:mb-10 border-b border-neutral-200 pb-6 gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-amber-700">
              Season Directory
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
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
            className="md:col-span-7 group relative h-[380px] sm:h-[480px] md:h-[520px] overflow-hidden bg-neutral-900 shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200"
              alt="Women Collection"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-12">
              <span className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                32 Signature Pieces
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
                Womenswear Atelier
              </h3>
              <p className="text-xs text-neutral-300 font-light max-w-md mt-2 leading-relaxed hidden sm:block">
                Architectural silhouettes, silk midi gowns, and tailored wool coats for refined presence.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-xs text-white uppercase font-bold tracking-widest group-hover:text-amber-400 transition-colors">
                <span>Shop Womenswear</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          <div className="md:col-span-5 flex flex-col gap-6">
            <Link
              href="/categories?gender=men"
              className="group relative h-[220px] sm:h-[247px] overflow-hidden bg-neutral-900 shadow-md"
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
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                  Menswear Line
                </h3>
                <span className="text-[11px] text-neutral-300 uppercase tracking-widest mt-1 group-hover:text-amber-400 transition-colors">
                  Explore Collection →
                </span>
              </div>
            </Link>

            <Link
              href="/categories?gender=men&sub=Watches"
              className="group relative h-[220px] sm:h-[247px] overflow-hidden bg-neutral-900 shadow-md"
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
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
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

      <section className="relative w-full min-h-[450px] sm:h-[580px] overflow-hidden bg-neutral-950 flex items-center justify-center py-12 sm:py-0">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000"
          alt="Fall Editorial Lookbook"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 grayscale hover:scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/80 sm:bg-gradient-to-r sm:from-neutral-950/90 sm:via-neutral-950/50 sm:to-neutral-950/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center text-white space-y-4 sm:space-y-6">
          <div>
            <span className="inline-block px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-amber-500/30 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-amber-300 rounded-full shadow-lg">
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

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-neutral-200 p-6 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-sm">
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200"
              alt="Atelier Craftsmanship"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-amber-700 font-bold">
              Our Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
              Designed with Intent. Crafted to Endure.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-y border-neutral-200 py-10 sm:py-12 bg-white">
          {[
            { badge: "01", title: "Organic Materials", desc: "100% long-staple organic cotton & pure French linen." },
            { badge: "02", title: "Global Express", desc: "Complimentary worldwide courier delivery over $200." },
            { badge: "03", title: "30-Day Returns", desc: "Hassle-free size exchange & returns policy." },
            { badge: "04", title: "Secure Checkout", desc: "256-bit encrypted secure payment processing." },
          ].map((item) => (
            <div key={item.badge} className="space-y-2 p-2 text-center sm:text-left">
              <span className="font-mono text-xs text-amber-700 font-bold">{item.badge}.</span>
              <h4 className="font-serif font-bold text-sm sm:text-base text-neutral-900">{item.title}</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-bold text-amber-700">
            Client Perspectives
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">
            Endorsements
          </h2>
        </div>

        <div className="relative bg-white border border-neutral-200 p-6 sm:p-10 md:p-14 shadow-sm text-center">
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-neutral-400 hover:text-neutral-900 transition-colors z-10"
            aria-label="Previous Review"
          >
            <span className="text-xl sm:text-2xl font-serif">←</span>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-neutral-400 hover:text-neutral-900 transition-colors z-10"
            aria-label="Next Review"
          >
            <span className="text-xl sm:text-2xl font-serif">→</span>
          </button>

          <div className="min-h-[140px] sm:min-h-[120px] flex flex-col justify-center items-center px-6 sm:px-12 transition-all duration-500">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 font-light italic max-w-2xl leading-relaxed">
              "{testimonials[current].quote}"
            </p>

            <div className="mt-4 sm:mt-6">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-neutral-900">
                {testimonials[current].author}
              </h4>
              <span className="text-[9px] sm:text-[10px] text-amber-700 uppercase tracking-widest font-mono">
                {testimonials[current].role}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === current ? "w-6 bg-amber-700" : "w-1.5 bg-neutral-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}