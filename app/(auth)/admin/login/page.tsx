"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 100%)",
      }}
    >
      {/* Shield Icon */}
      <div
        className="rounded-2xl p-5 mb-6 shadow-xl"
        style={{ background: "rgba(109, 40, 217, 0.6)" }}
      >
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0
               0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02
               12.02 0 003 9c0 5.591 3.824 10.29 9
               11.622 5.176-1.332 9-6.03
               9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-white text-center mb-1 drop-shadow-lg">
        Virtual Staffing Solution
      </h1>
      <p
        className="text-xs tracking-widest uppercase mb-8 font-medium"
        style={{ color: "rgba(221, 214, 254, 0.85)" }}
      >
        IT Assets Management System
      </p>

      {/* Login Card */}
      <div
        className="rounded-3xl p-8 w-full max-w-md shadow-2xl"
        style={{
          background: "rgba(109, 40, 217, 0.40)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(167, 139, 250, 0.35)",
        }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-7">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Error Message */}
          {error && (
            <div
              className="w-full text-white text-center py-3 px-4 rounded-xl text-sm font-medium"
              style={{ background: "rgba(239, 68, 68, 0.5)" }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              className="w-full text-white text-center py-3 px-4 rounded-xl text-sm font-medium"
              style={{ background: "rgba(34, 197, 94, 0.5)" }}
            >
              ✅ {success}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              className="block text-sm mb-2 font-semibold"
              style={{ color: "rgba(221, 214, 254, 0.95)" }}
            >
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 font-medium
                         focus:outline-none focus:ring-2 focus:ring-purple-300
                         transition-all duration-200"
              style={{
                background: "rgba(255, 255, 255, 0.93)",
                color: "#1e1b4b",
              }}
              placeholder="admin@company.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm mb-2 font-semibold"
              style={{ color: "rgba(221, 214, 254, 0.95)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 pr-14 font-medium
                           focus:outline-none focus:ring-2 focus:ring-purple-300
                           transition-all duration-200"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(167, 139, 250, 0.5)",
                  color: "white",
                }}
                placeholder="••••••••••••"
                required
              />
              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           rounded-lg p-1.5 transition-all duration-200
                           hover:bg-purple-500/30"
                style={{
                  background: "rgba(109, 40, 217, 0.6)",
                  border: "1px solid rgba(167, 139, 250, 0.4)",
                }}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112
                         19c-4.478 0-8.268-2.943-9.543-7a9.97
                         9.97 0 011.563-3.029m5.858.908a3 3 0
                         114.243 4.243M9.878 9.878l4.242
                         4.242M9.88 9.88l-3.29-3.29m7.532
                         7.532l3.29 3.29M3 3l3.59
                         3.59m0 0A9.953 9.953 0 0112 5c4.478
                         0 8.268 2.943 9.543 7a10.025 10.025
                         0 01-4.132 4.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016
                         0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12
                         5c4.478 0 8.268 2.943 9.542
                         7-1.274 4.057-5.064 7-9.542
                         7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm hover:text-white transition-colors duration-200"
              style={{ color: "rgba(221, 214, 254, 0.75)" }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-bold py-4 rounded-xl text-lg text-white
                       shadow-lg transition-all duration-200
                       hover:opacity-90 hover:scale-[1.02]
                       active:scale-[0.98] disabled:opacity-60
                       disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In as Admin"
            )}
          </button>
        </form>

        {/* Staff Link */}
        <div className="mt-6 text-center">
          <a
            href="/auth/staff/login"
            className="text-sm hover:text-white transition-colors duration-200"
            style={{ color: "rgba(221, 214, 254, 0.7)" }}
          >
            👥 Staff Member? Login here
          </a>
        </div>
      </div>

      {/* Footer */}
      <p
        className="mt-8 text-xs"
        style={{ color: "rgba(221, 214, 254, 0.5)" }}
      >
        Secure • Reliable • Professional Asset Management
      </p>
    </div>
  );
}
