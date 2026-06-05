export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Virtual Staffing Solution
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          IT Assets Management System
        </p>
        <div className="space-x-4">
          <a 
            href="/auth/admin/login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Admin Login
          </a>
          <a 
            href="/auth/staff/login" 
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Staff Login
          </a>
        </div>
      </div>
    </div>
  )
}
