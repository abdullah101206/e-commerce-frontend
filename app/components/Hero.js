"use client";

import { useState, useEffect } from "react";

const HERO_SLIDES = [
  {
    id: 1,
    tag: "Autumn / Winter Collection",
    title: "Elegance Defined by Simplicity.",
    desc: "Discover hand-tailored garments crafted from organic textiles. Designed for timeless comfort and modern sophistication.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000",
  },
  {
    id: 2,
    tag: "Minimalist Outerwear",
    title: "Architectural Cut & Pure Drapery.",
    desc: "Precision tailoring engineered from heavy-weight Italian wool and French linen blends.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000",
  },
  {
    id: 3,
    tag: "Signature Atelier Series",
    title: "Unpretentious Quiet Luxury.",
    desc: "Limited-edition articles created in small batches to preserve exclusivity and reduce waste.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative h-[85vh] min-h-[580px] w-full flex items-center justify-center overflow-hidden bg-neutral-950">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-60 scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6">
        <span className="text-xs uppercase tracking-[0.35em] font-semibold text-amber-300 inline-block">
          {HERO_SLIDES[currentSlide].tag}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] transition-all">
          {HERO_SLIDES[currentSlide].title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
          {HERO_SLIDES[currentSlide].desc}
        </p>
      </div>

      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 z-20 p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 z-20 p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 z-20 flex gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}