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
