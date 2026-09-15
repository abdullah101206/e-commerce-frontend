"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://e-commerce-backend-xi.vercel.app/api/auth/register", formData);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }

      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 border border-neutral-200 shadow-sm">
        <div className="text-center space-y-2">
          <span className="font-serif text-2xl font-bold tracking-wider">AURA.</span>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-neutral-900">Create Account</h1>
          <p className="text-xs text-neutral-500">Join our community for exclusive access and tailor-made services.</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 text-xs border border-red-200 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
              Full Name
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
              Phone Number
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-md disabled:bg-neutral-500"
          >
            {loading ? "Registering..." : "Register Account"}
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-neutral-900 underline underline-offset-4 hover:text-amber-800">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}