export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        IT Assets Management System
      </h1>
      <div className="space-y-4">
        <p className="text-gray-600">System is loading...</p>
        <div className="bg-green-100 p-4 rounded border">
          <h2 className="font-bold text-green-800">✅ Next.js App Working</h2>
          <p className="text-green-700">Basic routing is functional</p>
        </div>
        <div className="mt-4">
          <a 
            href="/api/test" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test API Endpoint
          </a>
        </div>
      </div>
    </div>
  )
}
