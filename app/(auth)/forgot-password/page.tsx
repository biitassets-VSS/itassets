export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-purple-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700"
          >
            Send Reset Email
          </button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <a href="/auth/admin/login" className="block text-sm text-blue-600 hover:underline">
            ← Back to Admin Login
          </a>
          <a href="/auth/staff/login" className="block text-sm text-blue-600 hover:underline">
            ← Back to Staff Login
          </a>
        </div>
      </div>
    </div>
  )
}