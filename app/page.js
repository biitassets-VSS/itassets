export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          IT Assets Management System
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your asset management portal
        </p>
        <div className="space-x-4">
          <a 
            href="/admin" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg inline-block"
          >
            Admin Portal
          </a>
          <a 
            href="/staff" 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg inline-block"
          >
            Staff Portal
          </a>
        </div>
      </div>
    </div>
  );
}
