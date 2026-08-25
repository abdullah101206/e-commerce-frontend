"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.put(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      setCompleted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired reset token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 border border-neutral-200 shadow-sm text-center">
        <div>
          <span className="font-serif text-2xl font-bold tracking-wider">AURA.</span>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-neutral-900 mt-2">New Password</h1>
          <p className="text-xs text-neutral-500 mt-1">Please enter your new password below.</p>
        </div>

        {error && (
          <div className="bg-red-50 p-3 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {completed ? (
          <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-3">
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Password Updated</p>
            <p className="text-xs text-neutral-600">Your password has been successfully reset.</p>
            <Link
              href="/login"
              className="inline-block mt-3 px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Sign In Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}