import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Test 1: Basic query
    const { data: assets, error: assetsError } = await supabase
      .from('assets')
      .select('*')
      .limit(3)

    if (assetsError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database Error',
        message: assetsError.message,
        details: assetsError,
        timestamp: new Date().toISOString()
      })
    }

    // Test 2: Count query
    const { count, error: countError } = await supabase
      .from('assets')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully!',
      assetCount: count || 0,
      sampleAssets: assets || [],
      timestamp: new Date().toISOString(),
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected Error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  }
}
