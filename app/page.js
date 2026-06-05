'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          IT Assets Management
        </h1>
        <p className="text-gray-600 mb-8">
          Professional asset tracking and management system
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => router.push('/admin')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Admin Portal
          </button>
          
          <button
            onClick={() => router.push('/staff')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Staff Portal
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Select your portal to get started
        </p>
      </div>
    </div>
  );
}
