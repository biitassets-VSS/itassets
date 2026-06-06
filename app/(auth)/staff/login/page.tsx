"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

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
        setTimeout(() => router.push("/staff-dashboard"), 1500);
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ─── all styles as plain objects so Tailwind/CSS cannot interfere ─── */
  const S = {
    page: {
      margin:          0,
      padding:         "40px 16px",
      minHeight:       "100vh",
      width:           "100%",
      display:         "flex",
      flexDirection:   "column" as const,
      alignItems:      "center",
      justifyContent:  "center",
      background:      "linear-gradient(135deg,#4c1d95 0%,#6d28d9 50%,#7c3aed 100%)",
      boxSizing:       "border-box" as const,
    },
    iconBox: {
      background:    "rgba(109,40,217,0.65)",
      borderRadius:  "18px",
      padding:       "20px",
      marginBottom:  "24px",
      boxShadow:     "0 8px 32px rgba(0,0,0,0.35)",
      border:        "1px solid rgba(167,139,250,0.4)",
    },
    h1: {
      fontSize:     "2.4rem",
      fontWeight:   800,
      color:        "#fff",
      textAlign:    "center" as const,
      margin:       "0 0 6px",
      textShadow:   "0 2px 12px rgba(0,0,0,0.3)",
    },
    subtitle: {
      fontSize:      "0.7rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      color:         "rgba(221,214,254,0.85)",
      marginBottom:  "32px",
      fontWeight:    500,
    },
    card: {
      background:           "rgba(91,33,182,0.45)",
      backdropFilter:       "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border:               "1px solid rgba(167,139,250,0.3)",
      borderRadius:         "24px",
      padding:              "40px 36px",
      width:                "100%",
      maxWidth:             "440px",
      boxShadow:            "0 25px 50px rgba(0,0,0,0.4)",
      boxSizing:            "border-box" as const,
    },
    cardTitle: {
      fontSize:     "2rem",
      fontWeight:   700,
      color:        "#fff",
      textAlign:    "center" as const,
      margin:       "0 0 28px",
    },
    label: {
      display:      "block",
      fontSize:     "0.875rem",
      fontWeight:   600,
      color:        "rgba(221,214,254,0.95)",
      marginBottom: "8px",
    },
    inputWhite: {
      width:        "100%",
      padding:      "14px 16px",
      borderRadius: "12px",
      border:       "none",
      background:   "rgba(255,255,255,0.95)",
      color:        "#1e1b4b",
      fontSize:     "1rem",
      fontWeight:   500,
      outline:      "none",
      boxSizing:    "border-box" as const,
    },
    inputDark: {
      width:        "100%",
      padding:      "14px 52px 14px 16px",
      borderRadius: "12px",
      border:       "1px solid rgba(167,139,250,0.5)",
      background:   "rgba(255,255,255,0.12)",
      color:        "#fff",
      fontSize:     "1rem",
      fontWeight:   500,
      outline:      "none",
      boxSizing:    "border-box" as const,
    },
    eyeBtn: {
      position:        "absolute" as const,
      right:           "10px",
      top:             "50%",
      transform:       "translateY(-50%)",
      background:      "rgba(79,40,160,0.8)",
      border:          "1px solid rgba(167,139,250,0.5)",
      borderRadius:    "8px",
      padding:         "6px",
      cursor:          "pointer",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
    },
    submitBtn: {
      width:          "100%",
      padding:        "16px",
      borderRadius:   "12px",
      border:         "none",
      background:     "linear-gradient(90deg,#6366f1 0%,#818cf8 100%)",
      color:          "#fff",
      fontSize:       "1.1rem",
      fontWeight:     700,
      cursor:         "pointer",
      boxShadow:      "0 4px 20px rgba(99,102,241,0.5)",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      gap:            "8px",
    },
    alertError: {
      background:   "rgba(239,68,68,0.45)",
      border:       "1px solid rgba(239,68,68,0.5)",
      borderRadius: "12px",
      padding:      "12px 16px",
      color:        "#fff",
      fontSize:     "0.875rem",
      fontWeight:   500,
      textAlign:    "center" as const,
      marginBottom: "16px",
    },
    alertSuccess: {
      background:   "rgba(34,197,94,0.45)",
      border:       "1px solid rgba(34,197,94,0.5)",
      borderRadius: "12px",
      padding:      "12px 16px",
      color:        "#fff",
      fontSize:     "0.875rem",
      fontWeight:   500,
      textAlign:    "center" as const,
      marginBottom: "16px",
    },
    link: {
      fontSize:       "0.875rem",
      color:          "rgba(221,214,254,0.75)",
      textDecoration: "none",
    },
    footer: {
      marginTop:  "32px",
      fontSize:   "0.75rem",
      color:      "rgba(221,214,254,0.5)",
    },
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        html, body, #__next {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          min-height: 100vh !important;
        }
      `}</style>

      <div style={S.page}>

        {/* ── Icon ── */}
        <div style={S.iconBox}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48" height="48"
            fill="none" viewBox="0 0 24 24"
            stroke="white" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112
                 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02
                 0 003 9c0 5.591 3.824 10.29 9 11.622
                 5.176-1.332 9-6.03 9-11.622
                 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        {/* ── Heading ── */}
        <h1 style={S.h1}>Virtual Staffing Solution</h1>
        <p style={S.subtitle}>IT Assets Management System</p>

        {/* ── Card ── */}
        <div style={S.card}>
          <h2 style={S.cardTitle}>Staff Login</h2>

          {error   && <div style={S.alertError}>⚠️ {error}</div>}
          {success && <div style={S.alertSuccess}>✅ {success}</div>}

          <form
            onSubmit={handleSubmit}
            style={{ display:"flex", flexDirection:"column", gap:"20px" }}
          >
            {/* Email */}
            <div>
              <label style={S.label}>Staff Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@company.com"
                required
                style={S.inputWhite}
              />
            </div>

            {/* Password */}
            <div>
              <label style={S.label}>Password</label>
              <div style={{ position:"relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={S.inputDark}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={S.eyeBtn}
                >
                  {showPw ? (
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20" fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgba(221,214,254,0.9)" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478
                           0-8.268-2.943-9.543-7a9.97 9.97 0
                           011.563-3.029m5.858.908a3 3 0 114.243
                           4.243M9.878 9.878l4.242 4.242M9.88
                           9.88l-3.29-3.29m7.532 7.532l3.29
                           3.29M3 3l3.59 3.59m0 0A9.953 9.953 0
                           0112 5c4.478 0 8.268 2.943 9.543
                           7a10.025 10.025 0 01-4.132
                           4.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20" fill="none"
                      viewBox="0 0 24 24"
                      stroke="rgba(221,214,254,0.9)" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478
                           0 8.268 2.943 9.542 7-1.274 4.057-5.064
                           7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div style={{ textAlign:"right", marginTop:"-10px" }}>
              <a href="/forgot-password" style={S.link}>
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...S.submitBtn,
                opacity: loading ? 0.65 : 1,
                cursor:  loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{ animation:"spin 1s linear infinite",
                             width:"20px", height:"20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                  >
                    <circle style={{ opacity:0.25 }}
                      cx="12" cy="12" r="10"
                      stroke="white" strokeWidth="4"
                    />
                    <path style={{ opacity:0.75 }}
                      fill="white" d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In as Staff"
              )}
            </button>
          </form>

          {/* Admin link */}
          <div style={{ textAlign:"center", marginTop:"24px" }}>
            <a href="/auth/admin/login" style={S.link}>
              👨‍💼 Admin? Login here
            </a>
          </div>
        </div>

        {/* Footer */}
        <p style={S.footer}>
          Secure • Reliable • Professional Asset Management
        </p>

      </div>
    </>
  );
}
