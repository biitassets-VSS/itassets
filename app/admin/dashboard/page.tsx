'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const adminToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin-token='))

    if (!adminToken) {
      router.push('/admin-login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/admin-login')
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1a1a2e' }}>👨‍💼 Admin Dashboard</h1>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>IT Assets Management System</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#4361ee', padding: '25px', borderRadius: '10px', color: 'white', boxShadow: '0 4px 12px rgba(67,97,238,0.3)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>💻 Total Assets</h3>
            <p style={{ fontSize: '40px', fontWeight: 'bold', margin: 0 }}>1,234</p>
          </div>
          <div style={{ backgroundColor: '#2ec4b6', padding: '25px', borderRadius: '10px', color: 'white', boxShadow: '0 4px 12px rgba(46,196,182,0.3)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>👥 Total Staff</h3>
            <p style={{ fontSize: '40px', fontWeight: 'bold', margin: 0 }}>45</p>
          </div>
          <div style={{ backgroundColor: '#ff9f1c', padding: '25px', borderRadius: '10px', color: 'white', boxShadow: '0 4px 12px rgba(255,159,28,0.3)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>📋 Inspections</h3>
            <p style={{ fontSize: '40px', fontWeight: 'bold', margin: 0 }}>89</p>
          </div>
          <div style={{ backgroundColor: '#e63946', padding: '25px', borderRadius: '10px', color: 'white', boxShadow: '0 4px 12px rgba(230,57,70,0.3)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🔔 Notifications</h3>
            <p style={{ fontSize: '40px', fontWeight: 'bold', margin: 0 }}>12</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0 }}>⚡ Quick Actions</h2>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a href="/api/assets" style={{ padding: '12px 24px', backgroundColor: '#4361ee', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
              💻 Manage Assets
            </a>
            <a href="/api/staff" style={{ padding: '12px 24px', backgroundColor: '#2ec4b6', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
              👥 Manage Staff
            </a>
            <a href="/api/inspections" style={{ padding: '12px 24px', backgroundColor: '#ff9f1c', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
              📋 Inspections
            </a>
            <a href="/api/notifications" style={{ padding: '12px 24px', backgroundColor: '#e63946', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
              🔔 Notifications
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
