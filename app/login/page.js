"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
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
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const userData = res.data;

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userInfo", JSON.stringify(userData));

        if (userData.role === "admin") {
          router.push("/admin"); 
        } else {
          router.push("/");     
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 border border-neutral-200 shadow-sm">
        <div className="text-center space-y-2">
          <span className="font-serif text-2xl font-bold tracking-wider">AURA.</span>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-neutral-900">Welcome Back</h1>
          <p className="text-xs text-neutral-500">Sign in to your account to continue.</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 text-xs border border-red-200 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="admin@admin.com"
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-900">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-neutral-500 hover:text-neutral-900">
                Forgot Password?
              </Link>
            </div>
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-neutral-900 underline underline-offset-4 hover:text-amber-800">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}