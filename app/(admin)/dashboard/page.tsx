export default function AdminDashboardPage() {
  return (
    <div className="p-6">
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
        <div className="space-y-2">
          <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-md">
            Add New Asset
          </button>
          <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-md">
            Add Staff Member
          </button>
          <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-md">
            Assign Asset
          </button>
          <button className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-md">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}