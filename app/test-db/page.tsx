'use client'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function TestDB() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    testDatabase()
  }, [])

  const testDatabase = async () => {
    try {
      setLoading(true)
      
      // Test 1: Simple assets query
      const { data: assets, error: assetsError } = await supabase
        .from('assets')
        .select('*')
        .limit(5)

      if (assetsError) {
        setError(`Assets Error: ${assetsError.message}`)
        console.error('Assets Error Details:', assetsError)
        return
      }

      // Test 2: Check connection
      const { data: connection, error: connectionError } = await supabase
        .from('assets')
        .select('count', { count: 'exact' })

      if (connectionError) {
        setError(`Connection Error: ${connectionError.message}`)
        return
      }

      setResult({
        assets: assets || [],
        assetCount: connection?.[0]?.count || 0,
        timestamp: new Date().toISOString()
      })

    } catch (err: any) {
      setError(`Catch Error: ${err.message}`)
      console.error('Full error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
      
      {loading && <div className="text-blue-600">Testing database connection...</div>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div className="space-y-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>✅ Database Connected Successfully!</strong>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2">Results:</h3>
            <p><strong>Total Assets:</strong> {result.assetCount}</p>
            <p><strong>Test Time:</strong> {result.timestamp}</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2">Sample Assets:</h3>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(result.assets, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <button 
          onClick={testDatabase}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Test Again'}
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-bold mb-2">Environment Check:</h3>
        <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
      </div>
    </div>
  )
}
