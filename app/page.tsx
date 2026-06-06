"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("lakhwinder.bi@outlook.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Redirecting to dashboard...");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-purple-600 flex flex-col items-center justify-start pt-10 px-4">
      
      {/* Shield Icon */}
      <div className="bg-purple-400 rounded-2xl p-5 mb-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-white text-center mb-1">
        Virtual Staffing Solution
      </h1>
      <p className="text-purple-200 text-sm tracking-widest uppercase mb-8">
        IT Assets Management System
      </p>

      {/* Card */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md shadow-xl">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Message Box */}
          {message && (
            <div className="w-full bg-purple-500 text-white text-center py-3 px-4 rounded-xl text-sm">
              {message}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-purple-200 text-sm mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white bg-opacity-20 text-white placeholder-purple-300 border border-purple-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="admin@company.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-purple-200 text-sm mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white bg-opacity-20 text-white placeholder-purple-300 border border-purple-400 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="/forgot-password" className="text-purple-200 text-sm hover:text-white">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition duration-200 text-lg"
          >
            Sign In as Admin
          </button>
        </form>

        {/* Staff Link */}
        <div className="mt-6 text-center">
          <a href="/staff/login" className="text-purple-200 text-sm hover:text-white">
            Staff Member? Login here
          </a>
        </div>

      </div>
    </div>
  );
}
