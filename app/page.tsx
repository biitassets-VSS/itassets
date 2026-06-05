'use client';

import { useState } from 'react';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('lakhwinder.bi@outlook.com');
  const [password, setPassword] = useState('');

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-8"
      style={{
        background: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 50%, #581C87 100%)',
        animation: 'fadeIn 0.8s ease-in-out'
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-up {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
      `}</style>

      <div className="w-full max-w-md space-y-8 slide-up">
        {/* Shield Icon */}
        <div className="text-center">
          <div 
            className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
            }}
          >
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Virtual Staffing Solution
          </h1>
          <p className="text-purple-200 text-sm tracking-wider uppercase font-medium">
            IT ASSETS MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Login Card */}
        <div 
          className="rounded-3xl border shadow-2xl p-8"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255, 255, 255, 0.15)'
          }}
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Admin Login
          </h2>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)'
                }}
                placeholder="Enter admin email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pr-12 rounded-xl text-white placeholder-purple-300 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a 
                href="#" 
                className="text-purple-300 hover:text-white transition-colors text-sm"
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full h-14 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover-scale text-lg"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)';
              }}
            >
              Sign In as Admin
            </button>
          </form>

          {/* Staff Login Link */}
          <div className="mt-8 text-center">
            <a 
              href="/staff/login" 
              className="text-purple-300 hover:text-white transition-colors text-sm"
            >
              Staff Member? Login here
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-xs">
            © Copyright Reserved AinodeArt 2026
          </p>
        </div>
      </div>
    </div>
  );
}
