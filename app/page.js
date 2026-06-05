'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-blue-600">
      
      {/* Header */}
      <header className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 6.26L18 7L13.09 7.74L12 12L10.91 7.74L6 7L10.91 6.26L12 2Z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl">IT Assets</span>
          </div>
          
          <div className="space-x-4">
            <button 
              onClick={() => router.push('/admin/login')}
              className="text-purple-200 hover:text-white px-4 py-2"
            >
              Admin
            </button>
            <button 
              onClick={() => router.push('/staff/login')}
              className="text-purple-200 hover:text-white px-4 py-2"
            >
              Staff
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-4xl">
          
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-500 rounded-3xl mb-8">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 6.26L18 7L13.09 7.74L12 12L10.91 7.74L6 7L10.91 6.26L12 2ZM12 15C10.34 15 9 16.34 9 18S10.34 21 12 21 15 19.66 15 18 13.66 15 12 15M12 17C12.55 17 13 17.45 13 18S12.55 19 12 19 11 18.55 11 18 11.45 17 12 17Z"/>
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Virtual Staffing Solution
          </h1>
          
          <p className="text-2xl text-purple-200 mb-2">
            IT ASSETS MANAGEMENT SYSTEM
          </p>
          
          <p className="text-lg text-purple-300 mb-12 max-w-2xl mx-auto">
            Streamline your IT asset tracking, manage inventory, and optimize resource allocation with our comprehensive management platform.
          </p>

          {/* Login Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            
            {/* Admin Login Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H9V23H11V16H13V23H15V9H21Z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Admin Portal</h3>
              <p className="text-purple-200 mb-6">
                Manage users, assets, and system settings
              </p>
              
              <button
                onClick={() => router.push('/admin/login')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Login as Admin
              </button>
            </div>

            {/* Staff Login Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4C16.55 4 17 4.45 17 5S16.55 6 16 6 15 5.55 15 5 15.45 4 16 4M13 1.07C14.07 1.28 15.05 1.64 15.9 2.16L14.5 3.56C13.9 3.29 13.21 3.12 12.5 3.07V1.07H13M5.05 13H7.05C7.56 16.24 10.07 18.81 13.22 19.39V21.41C8.41 20.74 4.74 16.39 5.05 13M16.5 5.5L15.5 4.5C14.76 5.05 13.92 5.45 13 5.65V7.65C14.03 7.4 14.96 6.85 15.74 6.1L16.5 5.5M19.42 9.3C19.32 8.58 19.12 7.89 18.84 7.26L20.26 5.84C20.84 7.05 21.16 8.36 21.25 9.7L19.42 9.3M12.5 16.5C14.71 16.5 16.5 14.71 16.5 12.5S14.71 8.5 12.5 8.5 8.5 10.29 8.5 12.5 10.29 16.5 12.5 16.5M10.09 10.09L11.5 11.5L14.91 8.09L16.31 9.5L11.5 14.31L8.69 11.5L10.09 10.09Z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Staff Portal</h3>
              <p className="text-purple-200 mb-6">
                View and manage assigned assets
              </p>
              
              <button
                onClick={() => router.push('/staff/login')}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Login as Staff
              </button>
            </div>

          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                📊
              </div>
              <h4 className="text-white font-semibold mb-2">Asset Tracking</h4>
              <p className="text-purple-300 text-sm">Real-time inventory management</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                👥
              </div>
              <h4 className="text-white font-semibold mb-2">User Management</h4>
              <p className="text-purple-300 text-sm">Role-based access control</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                📱
              </div>
              <h4 className="text-white font-semibold mb-2">Mobile Ready</h4>
              <p className="text-purple-300 text-sm">Access anywhere, anytime</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center p-6">
        <p className="text-purple-300 text-sm">
          © 2024 Virtual Staffing Solution. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
