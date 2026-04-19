"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Reset error
    setError("");

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success, redirect to dashboard
      router.push("/user/dashboard");
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-[#0D2440]">
          Full Name
        </label>
        <div className="relative mt-1">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:border-[#2E5E99]"
          />
        </div>
      </div>

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
        <label className="block text-sm font-medium text-[#0D2440]">
          Password
        </label>
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
            placeholder="Create a secure password"
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

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-[#0D2440]">
          Confirm Password
        </label>
        <div className="relative mt-1">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className="w-full border border-slate-300 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:border-[#2E5E99]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2E5E99]"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2 text-sm text-slate-600">
        <input type="checkbox" required className="mt-1 accent-[#2E5E99]" />
        <p>
          I agree to the{" "}
          <span className="text-[#2E5E99] font-medium cursor-pointer hover:underline">
            Terms and Conditions
          </span>{" "}
          and{" "}
          <span className="text-[#2E5E99] font-medium cursor-pointer hover:underline">
            Privacy Policy
          </span>.
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2E5E99] hover:bg-[#244c80] transition text-white font-medium py-3 rounded-lg disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      {/* Already have an account */}
<p className="text-center text-sm text-slate-500 mt-3">
  Already have an account?{" "}
  <a
    href="/auth/user/login"
    className="text-[#2E5E99] font-medium hover:underline"
  >
    Login
  </a>
</p>
    </form>
  );
}