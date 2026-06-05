import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic environment check
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    return NextResponse.json({
      success: true,
      message: 'API endpoint working!',
      timestamp: new Date().toISOString(),
      env: {
        supabaseUrl: supabaseUrl ? 'Set' : 'Missing',
        supabaseKey: supabaseKey ? 'Set' : 'Missing',
        nodeEnv: process.env.NODE_ENV
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}
@"
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
"@ | Out-File -FilePath "app/page.tsx" -Encoding utf8 -Force
