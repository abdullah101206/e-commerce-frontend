"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">
          Client Care
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
          Get in Touch
        </h1>
        <p className="text-xs text-neutral-500">
          Our atelier support team is available Monday through Friday, 9:00 AM - 6:00 PM EST.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-5 space-y-8 bg-neutral-900 text-white p-8 sm:p-10">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">AURA Flagship Studio</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              740 Fifth Avenue, 18th Floor<br />
              New York, NY 10019<br />
              United States
            </p>
          </div>

          <div className="border-t border-neutral-800 pt-6 space-y-4 text-xs text-neutral-300">
            <div>
              <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Email Assistance</p>
              <p className="font-medium text-white mt-0.5">concierge@aurafashion.com</p>
            </div>
            <div>
              <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Direct Phone</p>
              <p className="font-medium text-white mt-0.5">+1 (800) 555-AURA</p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-6">
            <p className="text-xs text-neutral-400 leading-relaxed">
              For order inquiries, please include your Order ID in the subject or message body.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-neutral-200">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <span className="text-3xl text-emerald-800">✓</span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Message Received</h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Thank you for reaching out. One of our dedicated client advisors will respond to your inquiry within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sophia Reynolds"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sophia@example.com"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Order Inquiry / Sizing Help"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we assist you today?"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-md"
              >
                Transmit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}