"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  const updateCartCount = () => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = savedCart.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0
      );
      setCartCount(totalItems);
    } catch (e) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    router.push("/login");
  };

  const categoryTree = {
    men: [
      { name: "T-Shirts", href: "/categories?gender=men&sub=T-Shirts" },
      { name: "Shirts", href: "/categories?gender=men&sub=Shirts" },
      { name: "Jeans", href: "/categories?gender=men&sub=Jeans" },
      { name: "Shoes", href: "/categories?gender=men&sub=Shoes" },
      { name: "Watches", href: "/categories?gender=men&sub=Watches" },
    ],
    women: [
      { name: "Shoes", href: "/categories?gender=women&sub=Shoes" },
      { name: "Handbags", href: "/categories?gender=women&sub=Handbags" },
      { name: "Watches", href: "/categories?gender=women&sub=Watches" },
      { name: "Jewelry", href: "/categories?gender=women&sub=Jewelry" },
      { name: "Dresses", href: "/categories?gender=women&sub=Dresses" },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-neutral-950 border-b border-neutral-800 ${
        isScrolled ? "py-3 shadow-xl" : "py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-serif text-2xl font-extrabold tracking-widest text-white transition-transform group-hover:scale-105">
            AURA<span className="text-amber-500">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-xs uppercase tracking-widest font-semibold transition-colors py-1 ${
              pathname === "/" ? "text-amber-400 font-bold" : "text-neutral-300 hover:text-white"
            }`}
          >
            Home
          </Link>

          <Link
            href="/shop"
            className={`text-xs uppercase tracking-widest font-semibold transition-colors py-1 ${
              pathname === "/shop" ? "text-amber-400 font-bold" : "text-neutral-300 hover:text-white"
            }`}
          >
            Shop
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href="/categories"
              className={`text-xs uppercase tracking-widest font-semibold transition-colors py-3 flex items-center gap-1 ${
                pathname.startsWith("/categories") ? "text-amber-400 font-bold" : "text-neutral-300 hover:text-white"
              }`}
            >
              Categories
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-amber-400" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-neutral-900 border border-neutral-800 shadow-2xl p-6 grid grid-cols-2 gap-8 animate-fade-in">
                <div>
                  <div className="border-b border-neutral-800 pb-2 mb-3 flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-amber-400 tracking-wider">Men</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Collection</span>
                  </div>
                  <ul className="space-y-2">
                    {categoryTree.men.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          onClick={() => setDropdownOpen(false)}
                          className="text-xs text-neutral-300 hover:text-amber-400 hover:translate-x-1 transition-all block"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="border-b border-neutral-800 pb-2 mb-3 flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-amber-400 tracking-wider">Women</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Collection</span>
                  </div>
                  <ul className="space-y-2">
                    {categoryTree.women.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          onClick={() => setDropdownOpen(false)}
                          className="text-xs text-neutral-300 hover:text-amber-400 hover:translate-x-1 transition-all block"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`text-xs uppercase tracking-widest font-semibold transition-colors py-1 ${
              pathname === "/about" ? "text-amber-400 font-bold" : "text-neutral-300 hover:text-white"
            }`}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className={`text-xs uppercase tracking-widest font-semibold transition-colors py-1 ${
              pathname === "/contact" ? "text-amber-400 font-bold" : "text-neutral-300 hover:text-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <Link href="/shop" aria-label="Search" className="text-neutral-300 hover:text-white transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <Link href="/cart" aria-label="Cart" className="relative text-neutral-300 hover:text-white transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden lg:flex items-center space-x-3 border-l border-neutral-800 pl-5">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/10 cursor-pointer text-red-500 border border-red-500/30 text-xs uppercase tracking-wider font-bold hover:bg-red-600 hover:text-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <span className="text-neutral-700">/</span>
                <Link href="/signup" className="px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "w-4"}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-neutral-950 text-white z-50 p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-5 mb-6">
            <span className="font-serif text-2xl font-bold tracking-wider">AURA.</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-white p-2">
              ✕
            </button>
          </div>

          <nav className="flex flex-col space-y-5">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-light text-neutral-200 hover:text-white">
              Home
            </Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-light text-neutral-200 hover:text-white">
              Shop
            </Link>

            <div>
              <button
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="w-full flex items-center justify-between text-lg font-light text-neutral-200 hover:text-white"
              >
                <span>Categories</span>
                <span className="text-amber-400">{mobileCategoriesOpen ? "-" : "+"}</span>
              </button>

              {mobileCategoriesOpen && (
                <div className="mt-3 pl-4 border-l border-neutral-800 space-y-4 pt-2">
                  <div>
                    <p className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2">Men</p>
                    <div className="flex flex-col space-y-1.5 pl-2">
                      {categoryTree.men.map((m) => (
                        <Link key={m.name} href={m.href} onClick={() => setMobileMenuOpen(false)} className="text-xs text-neutral-400 hover:text-white">
                          • {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2">Women</p>
                    <div className="flex flex-col space-y-1.5 pl-2">
                      {categoryTree.women.map((w) => (
                        <Link key={w.name} href={w.href} onClick={() => setMobileMenuOpen(false)} className="text-xs text-neutral-400 hover:text-white">
                          • {w.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-light text-neutral-200 hover:text-white">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-light text-neutral-200 hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex flex-col gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-center py-3 cursor-pointer bg-red-600 text-white text-xs uppercase tracking-widest font-bold"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 border border-neutral-700 text-white text-xs uppercase tracking-widest font-semibold">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 bg-white text-black text-xs uppercase tracking-widest font-bold">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}