"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "How long does shipping take?",
    a: "Standard express delivery typically takes 2-3 business days. Domestic orders over $200 qualify for complimentary express shipping."
  },
  {
    q: "What is your return policy?",
    a: "We accept returns on unworn items with original tags within 30 days of receipt. Returns can be initiated through our Returns Portal."
  },
  {
    q: "How do I know what size to choose?",
    a: "Our product pages feature precise measurement tables. If you are between sizes, we recommend sizing up for a relaxed fit or sizing down for tailored structure."
  },
  {
    q: "Are AURA garments ethically manufactured?",
    a: "Yes. 100% of our textiles are ethically sourced from sustainable suppliers, and all garments are manufactured under fair wage standards."
  },
  {
    q: "Can I modify or cancel my order after placing it?",
    a: "Orders are processed swiftly. If you need to request a change, please contact our support team within 1 hour of placing your order."
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">
          Assistance Directory
        </span>
        <h1 className="font-serif text-4xl font-bold text-neutral-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-neutral-500">
          Everything you need to know about our services, ordering, and garment care.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="border border-neutral-200 bg-white transition-all"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
            >
              <span className="font-serif font-bold text-neutral-900 text-lg">
                {item.q}
              </span>
              <span className="text-neutral-400 text-xl font-mono ml-4">
                {openIdx === idx ? "−" : "+"}
              </span>
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-6 text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100 pt-4">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}