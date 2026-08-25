export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">Legal Standard</span>
        <h1 className="font-serif text-4xl font-bold text-neutral-900 mt-1">Terms & Conditions</h1>
        <p className="text-xs text-neutral-400 mt-2">Effective Date: August 2026</p>
      </div>

      <div className="space-y-8 text-neutral-700 text-sm leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">1. Agreement to Terms</h2>
          <p>
            By accessing or using the AURA e-commerce store, you agree to be bound by these Terms and Conditions. All content, images, patterns, and designs are the intellectual property of AURA Studio Inc.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">2. Product Availability & Pricing</h2>
          <p>
            Prices and stock availability are subject to change without prior notice. We reserve the right to limit order quantities or decline orders that appear suspect or fraudulent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">3. User Conduct</h2>
          <p>
            Users are strictly prohibited from utilizing the website for unauthorized commercial purposes, attempting to breach site security, or submitting false information during checkout.
          </p>
        </section>
      </div>
    </div>
  );
}