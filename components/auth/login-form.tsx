"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <-- import router

export default function LoginForm() {
  const router = useRouter(); // <-- initialize router

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO: Replace with your real authentication logic
    console.log("Logging in with:", formData);

    // Simulate successful login
    const loginSuccessful = true;

    if (loginSuccessful) {
      // Redirect user to dashboard
      router.push("/user/dashboard"); // <-- replace with your dashboard route
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#0D2440]">
          Email Address
        </label>
        <div className="relative mt-1">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:border-[#2E5E99]"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-[#0D2440]">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-[#2E5E99] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative mt-1">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-slate-300 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:border-[#2E5E99]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2E5E99]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" className="accent-[#2E5E99]" />
          Remember me
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#2E5E99] hover:bg-[#244c80] transition text-white font-medium py-3 rounded-lg"
      >
        Sign In
      </button>

      {/* Signup Link */}
      <p className="text-center text-sm text-slate-600">
        Don’t have an account?{" "}
        <Link
          href="/auth/user/signup"
          className="text-[#2E5E99] font-medium hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}