'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-purple-gradient flex items-center justify-center p-4">
        <div className="w-full max-width-card">
          
          {/* Logo */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="shield-icon mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="main-heading text-white mb-3">
              Virtual Staffing Solution
            </h1>
            <p className="sub-heading">
              IT ASSETS MANAGEMENT SYSTEM
            </p>
          </div>

          {/* Success Card */}
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Email Sent!</h2>
            <p className="text-purple-200 mb-8">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and follow the instructions.
            </p>
            <Link href="/" className="primary-button block text-center">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-gradient flex items-center justify-center p-4">
      <div className="w-full max-width-card">
        
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="shield-icon mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="main-heading text-white mb-3">
            Virtual Staffing Solution
          </h1>
          <p className="sub-heading">
            IT ASSETS MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="glass-card p-8">
          <h2 className="card-title text-white text-center mb-8">Reset Password</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="field-label text-purple-200">
                Enter your email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="lakhwinder.bi@outlook.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`primary-button w-full ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="spinner"></div>
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-8">
            <Link href="/" className="text-purple-300 hover:text-white transition-colors text-sm">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
