export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">IT Assets Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin Panel</span>
              <a href="/" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Assets</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Staff Members</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pending Inspections</h3>
            <p className="text-3xl font-bold text-orange-600">0</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-md text-left">
              <div className="text-lg font-semibold">Add New Asset</div>
              <div className="text-sm text-gray-600">Register new equipment</div>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-md text-left">
              <div className="text-lg font-semibold">Add Staff Member</div>
              <div className="text-sm text-gray-600">Onboard new employee</div>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-md text-left">
              <div className="text-lg font-semibold">Assign Asset</div>
              <div className="text-sm text-gray-600">Assign equipment to staff</div>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-md text-left">
              <div className="text-lg font-semibold">Generate Report</div>
              <div className="text-sm text-gray-600">View analytics and reports</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}