"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    cityZip: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.08);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const grandTotal = subtotal + tax + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setOrderPlaced(true);

    setToast({
      show: true,
      message: "Thank you! Your order has been placed successfully.",
    });

    localStorage.removeItem("cart");

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
     
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 px-6 py-4 bg-emerald-900 text-white border border-emerald-700 rounded-md shadow-2xl text-xs font-semibold tracking-wide animate-bounce">
          ✓ {toast.message}
        </div>
      )}

      {!orderPlaced ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-neutral-200 shadow-sm space-y-8">
            <div className="border-b border-neutral-200 pb-5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-amber-700 font-bold">
                Final Step
              </span>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 mt-1">
                Checkout Details
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  1. Contact Information
                </h3>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alexander Wright"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alexander@example.com"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  2. Delivery Address
                </h3>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-2">
                    Street Address & Apartment / Suite *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    required
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="124 Fashion Boulevard, Suite 4B"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-2">
                    City, State & ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="cityZip"
                    required
                    value={formData.cityZip}
                    onChange={handleChange}
                    placeholder="New York, NY 10001"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  3. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      formData.paymentMethod === "card"
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                        : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="accent-amber-500"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Credit / Debit Card
                      </p>
                      <p
                        className={`text-[10px] ${
                          formData.paymentMethod === "card"
                            ? "text-neutral-300"
                            : "text-neutral-500"
                        }`}
                      >
                        Visa, Mastercard, Amex
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                        : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="accent-amber-500"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Cash on Delivery (COD)
                      </p>
                      <p
                        className={`text-[10px] ${
                          formData.paymentMethod === "cod"
                            ? "text-neutral-300"
                            : "text-neutral-500"
                        }`}
                      >
                        Pay upon doorstep delivery
                      </p>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="p-5 bg-neutral-50 border border-neutral-200 space-y-4 animate-fade-in mt-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        required={formData.paymentMethod === "card"}
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="ALEXANDER WRIGHT"
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-700 mb-1">
                        Card Number (16 Digits) *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        maxLength={19}
                        required={formData.paymentMethod === "card"}
                        value={formData.cardNumber}
                        onChange={(e) => {
                          let value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16);
                          value = value.replace(/(.{4})/g, "$1 ").trim();
                          handleChange({
                            target: { name: "cardNumber", value },
                          });
                        }}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-sm font-mono focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          maxLength={5}
                          required={formData.paymentMethod === "card"}
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            if (value.length > 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2);
                            }
                            handleChange({
                              target: { name: "expiryDate", value },
                            });
                          }}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-md text-sm focus:outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-700 mb-1">
                          CVC / CVV (3 Digits) *
                        </label>
                        <input
                          type="password"
                          name="cvc"
                          maxLength={3}
                          required={formData.paymentMethod === "card"}
                          value={formData.cvc}
                          onChange={handleChange}
                          placeholder="•••"
                          className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-sm font-mono focus:outline-none focus:border-neutral-900"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                <Link
                  href="/cart"
                  className="text-xs text-neutral-500 hover:text-neutral-900 underline font-semibold"
                >
                  ← Return to Cart
                </Link>
                <button
                  type="submit"
                  disabled={cartItems.length === 0}
                  className="px-10 py-4 bg-neutral-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-md active:scale-95 disabled:bg-neutral-400 cursor-pointer"
                >
                  Place Order (${grandTotal})
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 bg-neutral-900 text-white p-6 sm:p-8 border border-neutral-800 space-y-6 sticky top-28">
            <h3 className="font-serif text-xl font-bold border-b border-neutral-800 pb-4">
              Order Summary ({cartItems.length})
            </h3>

            {cartItems.length > 0 ? (
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-xs border-b border-neutral-800/60 pb-3"
                  >
                    <div>
                      <p className="font-bold text-neutral-100">{item.title}</p>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        Size: {item.size || "M"} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono font-semibold">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic">
                No items added to cart yet.
              </p>
            )}

            <div className="space-y-2.5 pt-2 text-xs border-t border-neutral-800">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-200">${subtotal}</span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Estimated Tax (8%)</span>
                <span className="font-mono text-neutral-200">${tax}</span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Express Shipping</span>
                <span className="font-mono text-neutral-200">
                  {shipping === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase text-[10px]">
                      Free
                    </span>
                  ) : (
                    `$${shipping}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-white pt-4 border-t border-neutral-800">
                <span>Total Amount</span>
                <span className="font-mono text-amber-400 text-base">
                  ${grandTotal}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-neutral-400 font-light flex items-center gap-2 border-t border-neutral-800/80">
              <span>256-Bit Encrypted SSL Checkout Guarantee</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-14 border border-neutral-200 shadow-md text-center space-y-6 my-8 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-inner">
            ✓
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Thank You For Your Order
          </h2>

          <p className="text-sm text-neutral-800 font-medium leading-relaxed bg-neutral-50 p-6 border border-neutral-200 rounded-none">
            Your order has been placed successfully. Redirecting you back to the home page...
          </p>

          <p className="text-xs text-neutral-500 font-light">
            A confirmation receipt has been dispatched to{" "}
            <span className="font-semibold text-neutral-900">
              {formData.email}
            </span>
            .
          </p>

          <div className="pt-6 border-t border-neutral-200">
            <Link
              href="/"
              className="inline-block px-10 py-4 bg-neutral-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-md"
            >
              Return To Homepage Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}