export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">Legal Standard</span>
        <h1 className="font-serif text-4xl font-bold text-neutral-900 mt-1">Privacy Policy</h1>
        <p className="text-xs text-neutral-400 mt-2">Last Updated: August 2026</p>
      </div>

      <div className="space-y-8 text-neutral-700 text-sm leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">1. Data Collection</h2>
          <p>
            At AURA, we respect your privacy. We collect personal information solely to fulfill your orders, improve client experience, and manage user accounts. This includes your name, email address, telephone number, and physical shipping address.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">2. Usage of Personal Information</h2>
          <p>
            Your details are processed to complete transactions, deliver ordered garments via our logistics partners, and send transactional emails regarding your order status. We never sell or rent client data to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-neutral-900">3. Security</h2>
          <p>
            We implement industry-standard encryption protocols and secure server environments to safeguard your personal information against unauthorized access, loss, or alteration.
          </p>
        </section>
      </div>
    </div>
  );
}