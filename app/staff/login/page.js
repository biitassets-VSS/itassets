'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Staff login:', { email, password });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-2xl mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 6.26L18 7L13.09 7.74L12 12L10.91 7.74L6 7L10.91 6.26L12 2ZM12 15C10.34 15 9 16.34 9 18S10.34 21 12 21 15 19.66 15 18 13.66 15 12 15M12 17C12.55 17 13 17.45 13 18S12.55 19 12 19 11 18.55 11 18 11.45 17 12 17Z"/>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Virtual Staffing Solution
          </h1>
          <p className="text-purple-200 text-lg">
            IT ASSETS MANAGEMENT SYSTEM
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Staff Login
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Staff Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-white/90 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-purple-800/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-green-500 border border-purple-600/50"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-purple-200 hover:text-white text-sm">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors duration-200 transform hover:scale-105"
            >
              Sign In as Staff
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push('/admin/login')}
                className="text-purple-200 hover:text-white underline"
              >
                Admin? Login here
              </button>
            </div>

          </form>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-purple-200 hover:text-white text-sm"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}
