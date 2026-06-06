"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res  = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/admin-dashboard"), 1500);
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #__next {
          background: #5b21b6 !important;
          min-height: 100vh !important;
        }
      `}</style>

      {/* ── Full Page Background ── */}
      <div
        style={{
          minHeight:      "100vh",
          width:          "100%",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          padding:        "48px 20px",
          background:     "linear-gradient(160deg, #6d28d9 0%, #5b21b6 40%, #4c1d95 100%)",
        }}
      >

        {/* ── Shield Icon Box ── */}
        <div
          style={{
            width:          "80px",
            height:         "80px",
            borderRadius:   "20px",
            background:     "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            marginBottom:   "28px",
            boxShadow:      "0 8px 32px rgba(0,0,0,0.35)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40" height="40"
            fill="none" viewBox="0 0 24 24"
            stroke="white" strokeWidth={2}
          >
            <path
              strokeLinecap="round" strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0
                 0112 2.944a11.955 11.955 0 01-8.618
                 3.04A12.02 12.02 0 003 9c0 5.591 3.824
                 10.29 9 11.622 5.176-1.332 9-6.03
                 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        {/* ── Title ── */}
        <h1
          style={{
            fontSize:    "2.6rem",
            fontWeight:  800,
            color:       "#ffffff",
            textAlign:   "center",
            marginBottom:"10px",
            lineHeight:  1.1,
            fontFamily:  "system-ui, -apple-system, sans-serif",
          }}
        >
          Virtual Staffing Solution
        </h1>

        {/* ── Subtitle ── */}
        <p
          style={{
            fontSize:      "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "rgba(196,181,253,0.85)",
            marginBottom:  "36px",
            fontWeight:    500,
            fontFamily:    "system-ui, -apple-system, sans-serif",
          }}
        >
          IT Assets Management System
        </p>

        {/* ── Card ── */}
        <div
          style={{
            background:           "rgba(255,255,255,0.07)",
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:               "1px solid rgba(255,255,255,0.12)",
            borderRadius:         "20px",
            padding:              "40px 32px",
            width:                "100%",
            maxWidth:             "480px",
            boxShadow:            "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Card Heading */}
          <h2
            style={{
              fontSize:     "1.9rem",
              fontWeight:   700,
              color:        "#ffffff",
              textAlign:    "center",
              marginBottom: "32px",
              fontFamily:   "system-ui, -apple-system, sans-serif",
            }}
          >
            Admin Login
          </h2>

          {/* ── Error Alert ── */}
          {error && (
            <div
              style={{
                background:   "rgba(239,68,68,0.35)",
                border:       "1px solid rgba(239,68,68,0.5)",
                borderRadius: "12px",
                padding:      "12px 16px",
                color:        "#fff",
                fontSize:     "0.875rem",
                fontWeight:   500,
                textAlign:    "center",
                marginBottom: "20px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* ── Success Alert ── */}
          {success && (
            <div
              style={{
                background:   "rgba(34,197,94,0.35)",
                border:       "1px solid rgba(34,197,94,0.5)",
                borderRadius: "12px",
                padding:      "12px 16px",
                color:        "#fff",
                fontSize:     "0.875rem",
                fontWeight:   500,
                textAlign:    "center",
                marginBottom: "20px",
              }}
            >
              ✅ {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display:"flex", flexDirection:"column", gap:"20px" }}
          >

            {/* ── Email ── */}
            <div>
              <label
                style={{
                  display:      "block",
                  fontSize:     "0.95rem",
                  fontWeight:   600,
                  color:        "#ffffff",
                  marginBottom: "10px",
                  fontFamily:   "system-ui, -apple-system, sans-serif",
                }}
              >
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                required
                style={{
                  width:        "100%",
                  padding:      "16px 18px",
                  borderRadius: "14px",
                  border:       "none",
                  background:   "rgba(255,255,255,0.92)",
                  color:        "#1e1b4b",
                  fontSize:     "1rem",
                  fontWeight:   500,
                  outline:      "none",
                  fontFamily:   "system-ui, -apple-system, sans-serif",
                }}
              />
            </div>

            {/* ── Password ── */}
            <div>
              <label
                style={{
                  display:      "block",
                  fontSize:     "0.95rem",
                  fontWeight:   600,
                  color:        "#ffffff",
                  marginBottom: "10px",
                  fontFamily:   "system-ui, -apple-system, sans-serif",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width:        "100%",
                    padding:      "16px 60px 16px 18px",
                    borderRadius: "14px",
                    border:       "1px solid rgba(255,255,255,0.15)",
                    background:   "rgba(255,255,255,0.10)",
                    color:        "#ffffff",
                    fontSize:     "1rem",
                    fontWeight:   500,
                    outline:      "none",
                    fontFamily:   "system-ui, -apple-system, sans-serif",
                  }}
                />

                {/* Eye Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position:        "absolute",
                    right:           "12px",
                    top:             "50%",
                    transform:       "translateY(-50%)",
                    width:           "36px",
                    height:          "36px",
                    borderRadius:    "10px",
                    background:      "rgba(255,255,255,0.15)",
                    border:          "1px solid rgba(255,255,255,0.25)",
                    cursor:          "pointer",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    padding:         0,
                  }}
                >
                  {showPw ? (
                    /* Eye-Off */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20" fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgba(255,255,255,0.85)" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478
                           0-8.268-2.943-9.543-7a9.97 9.97 0
                           011.563-3.029m5.858.908a3 3 0
                           114.243 4.243M9.878 9.878l4.242
                           4.242M9.88 9.88l-3.29-3.29m7.532
                           7.532l3.29 3.29M3 3l3.59 3.59m0
                           0A9.953 9.953 0 0112 5c4.478 0
                           8.268 2.943 9.543 7a10.025 10.025
                           0 01-4.132 4.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    /* Eye-On */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20" fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgba(255,255,255,0.85)" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round"
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

            {/* ── Forgot Password ── */}
            <div style={{ textAlign: "right", marginTop: "-8px" }}>
              <a
                href="/forgot-password"
                style={{
                  fontSize:       "0.9rem",
                  color:          "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontFamily:     "system-ui, -apple-system, sans-serif",
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* ── Sign In Button ── */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width:          "100%",
                padding:        "18px",
                borderRadius:   "14px",
                border:         "none",
                background:     loading
                  ? "rgba(99,102,241,0.5)"
                  : "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                color:          "#ffffff",
                fontSize:       "1.15rem",
                fontWeight:     700,
                cursor:         loading ? "not-allowed" : "pointer",
                boxShadow:      "0 6px 24px rgba(99,102,241,0.55)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "10px",
                opacity:        loading ? 0.7 : 1,
                transition:     "all 0.2s ease",
                fontFamily:     "system-ui, -apple-system, sans-serif",
                letterSpacing:  "0.02em",
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{
                      animation: "spin 1s linear infinite",
                      width: "22px",
                      height: "22px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12" cy="12" r="10"
                      stroke="white" strokeWidth="4"
                    />
                    <path
                      style={{ opacity: 0.75 }}
                      fill="white"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In as Admin"
              )}
            </button>
          </form>

          {/* ── Staff Link ── */}
          <div
            style={{
              textAlign:  "center",
              marginTop:  "28px",
            }}
          >
            <a
              href="/auth/staff/login"
              style={{
                fontSize:       "0.9rem",
                color:          "rgba(255,255,255,0.45)",
                textDecoration: "none",
                fontFamily:     "system-ui, -apple-system, sans-serif",
              }}
            >
              Staff Member? Login here
            </a>
          </div>

        </div>{/* end card */}

        {/* ── Footer ── */}
        <p
          style={{
            marginTop:  "36px",
            fontSize:   "0.75rem",
            color:      "rgba(196,181,253,0.45)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Secure • Reliable • Professional Asset Management
        </p>

      </div>
    </>
  );
}
