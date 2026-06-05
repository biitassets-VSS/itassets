export default function StaffLoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Temporary redirect for demo
    window.location.href = '/staff-dashboard'
  }

  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Staff Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-md"
              placeholder="staff@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-md"
              placeholder="Enter password"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Administrator?{' '}
            <a href="/auth/admin/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}