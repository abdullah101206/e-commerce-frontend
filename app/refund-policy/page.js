export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">Client Guarantee</span>
        <h1 className="font-serif text-4xl font-bold text-neutral-900 mt-1">Refund Policy</h1>
        <p className="text-xs text-neutral-400 mt-2">Last Updated: August 2026</p>
      </div>

      <div className="space-y-8 text-neutral-700 text-sm leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">1. Refund Eligibility</h2>
          <p>
            Refunds are issued upon inspection and approval of returned items. To qualify for a full refund, items must be returned unworn, unwashed, and with all original designer tags intact within 30 days of purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">2. Processing Time</h2>
          <p>
            Once your return is received at our facility, please allow 3-5 business days for quality inspection. Approved refunds will be credited back to your original payment method.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">3. Non-Refundable Items</h2>
          <p>
            Final sale archive items, customized garments, and gift cards are not eligible for monetary refunds.
          </p>
        </section>
      </div>
    </div>
  );
}