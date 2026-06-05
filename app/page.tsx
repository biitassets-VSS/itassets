'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('lakhwinder.bi@outlook.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login functionality working!');
  };

  const handleForgotPassword = () => {
    alert(`Password reset link will be sent to: ${email}`);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(145deg, #60a5fa 0%, #8b5cf6 100%)',
            borderRadius: '20px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}>
            <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.75rem',
            letterSpacing: '-0.025em'
          }}>
            Virtual Staffing Solution
          </h1>
          <p style={{
            color: '#c4b5fd',
            fontSize: '0.875rem',
            fontWeight: '500',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.9
          }}>
            IT ASSETS MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: '600',
            color: 'white',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Admin Login
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                color: '#c4b5fd',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  color: '#374151',
                  outline: 'none'
                }}
                placeholder="lakhwinder.bi@outlook.com"
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                color: '#c4b5fd',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 3rem 1rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    color: 'white',
                    outline: 'none'
                  }}
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#c4b5fd',
                    cursor: 'pointer'
                  }}
                >
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div style={{ textAlign: 'right' }}>
              <button 
                type="button"
                onClick={handleForgotPassword}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c4b5fd',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(145deg, #60a5fa 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(96, 165, 250, 0.3)'
              }}
            >
              Sign In as Admin
            </button>
          </form>

          {/* Staff Login */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => alert('Staff login page coming soon!')}
              style={{
                background: 'none',
                border: 'none',
                color: '#c4b5fd',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Staff Member? Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}