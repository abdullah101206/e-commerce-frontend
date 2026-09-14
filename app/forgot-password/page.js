"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("`${process.env.NEXT_PUBLIC_API_BASE_URL}`/api/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 border border-neutral-200 shadow-sm text-center">
        <div>
          <span className="font-serif text-2xl font-bold tracking-wider">AURA.</span>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-neutral-900 mt-2">Reset Password</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Enter your email and we'll send you instructions to reset your password.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 p-3 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {submitted ? (
          <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-3">
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Instructions Sent</p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              If an account exists for <span className="font-medium text-neutral-900">{email}</span>, you will receive password reset details shortly.
            </p>
            <Link href="/login" className="inline-block text-xs font-bold uppercase tracking-widest text-neutral-900 underline pt-2">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
          Remembered your password?{" "}
          <Link href="/login" className="font-semibold text-neutral-900 underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}