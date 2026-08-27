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
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-center transform transition-all">

        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
          Project Under Construction
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
          Welcome! This e-commerce platform is currently under active development. Core features including Backend APIs, Cart management, and Payment Gateway integration are being continuously updated.
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Explore Live Demo
        </button>
      </div>
    </div>
  );
}