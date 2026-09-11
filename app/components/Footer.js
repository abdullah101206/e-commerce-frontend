import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              AURA<span className="text-amber-600">.</span>
            </span>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Crafting timeless minimalist fashion for the modern era. Sustainable practices, high-end materials, and uncompromising design.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/categories?category=men" className="hover:text-white transition-colors">
                  Men's Apparel
                </Link>
              </li>
              <li>
                <Link href="/categories?category=accessories" className="hover:text-white transition-colors">
                  Accessories & Bags
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Brand Story</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 AURA Fashion Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}