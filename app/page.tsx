'use client';

import { useState } from 'react';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('lakhwinder.bi@outlook.com');
  const [password, setPassword] = useState('');

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            transform: translateY(50px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        
        .slide-up {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .gradient-button {
          background: linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%);
          transition: all 0.3s ease;
        }
        
        .gradient-button:hover {
          background: linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%);
          transform: scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.4);
        }
        
        .input-field {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .password-field {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          transition: all 0.3s ease;
        }
        
        .password-field:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .password-field::placeholder {
          color: rgba(196, 181, 253, 0.7);
        }
      `}</style>

      <div 
        className="fade-in"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 50%, #581C87 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div 
          className="slide-up"
          style={{
            width: '100%',
            maxWidth: '560px',
            textAlign: 'center'
          }}
        >
          
          {/* Shield Icon */}
          <div style={{ marginBottom: '40px' }}>
            <div 
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                borderRadius: '20px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.4)'
              }}
            >
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <div style={{ marginBottom: '50px' }}>
            <h1 
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '10px',
                lineHeight: '1.1'
              }}
            >
              Virtual Staffing Solution
            </h1>
            <p 
              style={{
                color: '#C4B5FD',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '500'
              }}
            >
              IT ASSETS MANAGEMENT SYSTEM
            </p>
          </div>

          {/* Login Card */}
          <div 
            className="glass-card"
            style={{
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'left'
            }}
          >
            <h2 
              style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
                marginBottom: '40px'
              }}
            >
              Admin Login
            </h2>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Email Field */}
              <div>
                <label 
                  style={{
                    display: 'block',
                    color: '#C4B5FD',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}
                >
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter admin email"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    color: '#1F2937'
                  }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label 
                  style={{
                    display: 'block',
                    color: '#C4B5FD',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}
                >
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-field"
                    placeholder="••••••••••"
                    style={{
                      width: '100%',
                      padding: '16px 50px 16px 16px',
                      borderRadius: '12px',
                      fontSize: '16px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#C4B5FD',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div style={{ textAlign: 'right' }}>
                <a 
                  href="#" 
                  style={{
                    color: '#C4B5FD',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'white'}
                  onMouseOut={(e) => e.target.style.color = '#C4B5FD'}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="gradient-button"
                style={{
                  width: '100%',
                  height: '58px',
                  borderRadius: '12px',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sign In as Admin
              </button>
            </form>

            {/* Staff Login Link */}
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <a 
                href="/staff/login" 
                style={{
                  color: '#C4B5FD',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.target.style.color = 'white'}
                onMouseOut={(e) => e.target.style.color = '#C4B5FD'}
              >
                Staff Member? Login here
              </a>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ color: '#C4B5FD', fontSize: '12px' }}>
              © Copyright Reserved AinodeArt 2026
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
