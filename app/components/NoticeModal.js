'use client';
import { useState, useEffect } from 'react';

export default function NoticeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center transition-all">
        
        <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest font-bold">
          AURA Atelier
        </span>

        <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mt-1 mb-3">
          Welcome to AURA
        </h3>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed font-light">
          We are delighted to have you here. Explore our latest seasonal collections, timeless designs, and curated styles crafted just for you.
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white font-medium py-3 px-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-md active:scale-[0.98]"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}