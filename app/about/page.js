import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-28">
      
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-[0.35em] font-bold text-amber-800">
          Our Identity & Vision
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
          The Crafting of AURA.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
          Established in 2026, AURA was born out of a desire to break away from fast-moving micro-trends. We champion architectural silhouettes, uncompromised raw textiles, and quiet luxury designed to last a lifetime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"
            alt="AURA Design Studio"
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Design Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">
              Form Follows Restraint
            </h2>
          </div>
          
          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            We believe true elegance resides in the subtle details: the rich weight of long-staple organic cotton, the precise architectural drape of a tailored wool jacket, and the longevity of reinforced artisanal seams.
          </p>

          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            Every garment in our catalog is engineered in strict limited batches. This disciplined approach not only eliminates excess environmental waste but preserves the rare exclusivity our clientele expects.
          </p>

          <div className="pt-6 grid grid-cols-2 gap-6 border-t border-neutral-200">
            <div>
              <p className="font-serif text-3xl font-bold text-neutral-900">100%</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Sustainably Sourced</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-neutral-900">Limited</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Production Runs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 border border-neutral-200 p-10 sm:p-16">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Our Standards</span>
          <h2 className="font-serif text-3xl font-bold text-neutral-900">The Four Pillars of AURA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3">
            <span className="text-amber-800 font-serif text-xl font-bold">01.</span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">Material Integrity</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              We source raw fibers exclusively from certified organic mills across Japan, Italy, and France, ensuring zero synthetic blending.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-amber-800 font-serif text-xl font-bold">02.</span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">Structural Tailoring</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Each pattern is cut with a focus on ergonomics and posture, giving wearers an immaculate silhouette without sacrificing comfort.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-amber-800 font-serif text-xl font-bold">03.</span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">Ethical Atelier</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Our partner workshops provide fair living wages, safe conditions, and master craftsmanship traditions handed down generations.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-amber-800 font-serif text-xl font-bold">04.</span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">Lifelong Durability</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Garments built to endure. We use heavy-duty hardware, reinforced stitching, and pre-shrunk fabrics that improve with age.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Artisanal Process
          </span>
          <h2 className="font-serif text-3xl font-bold text-neutral-900">
            Slow Fashion, Intentional Design
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            In an era of instant gratification, we choose patience. From thread selection to final steam press, our garments undergo a 14-point quality inspection before leaving our studio.
          </p>
          <blockquote className="border-l-2 border-amber-800 pl-4 italic text-sm text-neutral-800 font-serif">
            "Clothing should not scream for attention; it should command respect through its sheer perfection of form."
          </blockquote>
        </div>
        <div className="lg:col-span-7 relative aspect-[16/10] bg-neutral-100 overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200"
            alt="Tailoring workshop"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="bg-neutral-950 text-white p-14 sm:p-20 text-center space-y-6 shadow-xl">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-500">Join The Movement</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold">Experience Timeless Elegance</h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
          Explore our latest curated collection designed for everyday distinction, effortless wearability, and enduring style.
        </p>
        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-white text-neutral-950 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Discover The Collection
          </Link>
        </div>
      </div>

    </div>
  );
}