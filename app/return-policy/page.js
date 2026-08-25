import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">Client Guarantee</span>
        <h1 className="font-serif text-4xl font-bold text-neutral-900 mt-1">Return & Exchange Policy</h1>
        <p className="text-xs text-neutral-400 mt-2">Last Updated: August 2026</p>
      </div>

      <div className="space-y-8 text-neutral-700 text-sm leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">1. 30-Day Hassle-Free Returns</h2>
          <p>
            We offer complimentary returns on domestic orders within 30 days of delivery. Returned items must remain in original, unworn condition with tags attached.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">2. How to Initiate a Return</h2>
          <p>
            1. Package your item securely in the original box.<br />
            2. Contact our concierge team via the <Link href="/contact" className="underline font-medium text-neutral-900">Contact Us</Link> page with your Order ID.<br />
            3. Attach the pre-paid shipping label provided by our team and drop off the package at any carrier location.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">3. Exchanges</h2>
          <p>
            If you require a different size or color variant, please return your original item for a refund and place a new order online for the desired size.
          </p>
        </section>
      </div>
    </div>
  );
}