"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Force override body background — fixes globals.css conflict
  useEffect(() => {
    const originalBg = document.body.style.background;
    const originalMin = document.body.style.minHeight;
    document.body.style.background =
      "linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 100%)";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.background =
      "linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 100%)";
    return () => {
      document.body.style.background = originalBg;
      document.body.style.minHeight = originalMin;
      document.documentElement.style.background = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/staff-dashboard"), 1500);
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
    <>
      {/* ✅ Full page override style injected directly */}
      <style>{`
        html, body {
          background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 100%) !important;
          min-height: 100vh !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
          background:
            "linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 100%)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
        }}
      >
        {/* ── Shield Icon ── */}
        <div
          style={{
            background: "rgba(109, 40, 217, 0.65)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            border: "1px solid rgba(167, 139, 250, 0.4)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        {/* ── Title ── */}
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "6px",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            letterSpacing: "-0.5px",
          }}
        >
          Virtual Staffing Solution
        </h1>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(221, 214, 254, 0.85)",
            marginBottom: "32px",
            fontWeight: 500,
          }}
        >
          IT Assets Management System
        </p>

        {/* ── Login Card ── */}
        <div
          style={{
            background: "rgba(91, 33, 182, 0.45)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(167, 139, 250, 0.3)",
            borderRadius: "24px",
            padding: "40px 36px",
            width: "100%",
            maxWidth: "440px",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Card Title */}
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            Staff Login
          </h2>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.45)",
                border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              style={{
                background: "rgba(34, 197, 94, 0.45)",
                border: "1px solid rgba(34,197,94,0.4)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              ✅ {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* ── Email Field ── */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "rgba(221, 214, 254, 0.95)",
                  marginBottom: "8px",
                }}
              >
                Staff Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@company.com"
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "none",
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#1e1b4b",
                  fontSize: "1rem",
                  fontWeight: 500,
                  outline: "none",
                  boxSizing: "border-box",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(167, 139, 250, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                }}
              />
            </div>

            {/* ── Password Field ── */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "rgba(221, 214, 254, 0.95)",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 52px 14px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(167, 139, 250, 0.5)",
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 500,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(167, 139, 250, 0.4)";
                    e.target.style.borderColor =
                      "rgba(167, 139, 250, 0.8)";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                    e.target.style.borderColor =
                      "rgba(167, 139, 250, 0.5)";
                  }}
                />
                {/* Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(79, 40, 160, 0.8)",
                    border: "1px solid rgba(167, 139, 250, 0.5)",
                    borderRadius: "8px",
                    padding: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgba(221,214,254,0.9)"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgba(221,214,254,0.9)"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ── Forgot Password ── */}
            <div style={{ textAlign: "right", marginTop: "-8px" }}>
              <a
                href="/forgot-password"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(221, 214, 254, 0.75)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color =
                    "rgba(221, 214, 254, 0.75)";
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* ── Submit Button ── */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                background: loading
                  ? "rgba(99, 102, 241, 0.5)"
                  : "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 20px rgba(99, 102, 241, 0.5)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{
                      animation: "spin 1s linear infinite",
                      width: "20px",
                      height: "20px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      style={{ opacity: 0.75 }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In as Staff"
              )}
            </button>
          </form>

          {/* ── Admin Link ── */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <a
              href="/auth/admin/login"
              style={{
                fontSize: "0.875rem",
                color: "rgba(221, 214, 254, 0.7)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "rgba(221, 214, 254, 0.7)";
              }}
            >
              👨‍💼 Admin? Login here
            </a>
          </div>
        </div>

        {/* ── Footer ── */}
        <p
          style={{
            marginTop: "32px",
            fontSize: "0.75rem",
            color: "rgba(221, 214, 254, 0.5)",
          }}
        >
          Secure • Reliable • Professional Asset Management
        </p>

        {/* ── Spin Animation ── */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}
