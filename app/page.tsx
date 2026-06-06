export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">IT Assets Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/auth/admin/login" className="text-blue-600 hover:text-blue-700">
                Admin
              </a>
              <a href="/auth/staff/login" className="text-green-600 hover:text-green-700">
                Staff
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Virtual Staffing Solution
          </h1>
          <p className="text-2xl text-gray-600 mb-12">
            Complete IT Assets Management System
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a 
              href="/auth/admin/login"
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300"
            >
              <div className="text-4xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Portal</h3>
              <p className="text-gray-600">Manage assets, staff, and system administration</p>
              <div className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg group-hover:bg-blue-700 transition-colors">
                Admin Login →
              </div>
            </a>

            <a 
              href="/auth/staff/login"
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300"
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Staff Portal</h3>
              <p className="text-gray-600">View assigned assets and submit inspections</p>
              <div className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg group-hover:bg-green-700 transition-colors">
                Staff Login →
              </div>
            </a>
          </div>

          <div className="mt-16 text-sm text-gray-500">
            <p>Secure • Reliable • Professional Asset Management</p>
          </div>
        </div>
      </main>
    </div>
  )
}
