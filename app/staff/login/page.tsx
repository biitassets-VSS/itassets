'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Staff login successful!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-purple-gradient flex items-center justify-center p-4">
      <div className="w-full max-width-card">
        
        <div className="text-center mb-8 animate-fade-in">
          <div className="shield-icon mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h1 className="main-heading text-white mb-3">
            Virtual Staffing Solution
          </h1>
          <p className="sub-heading">
            IT ASSETS MANAGEMENT SYSTEM
          </p>
        </div>

        <div className="glass-card p-8">
          <h2 className="card-title text-white text-center mb-8">Staff Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="field-label text-purple-200">
                Staff Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="staff@outlook.com"
                required
              />
            </div>

            <div>
              <label className="field-label text-purple-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input pr-12"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`primary-button ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="spinner"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In as Staff'
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <Link href="/" className="staff-link">
              Admin? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
