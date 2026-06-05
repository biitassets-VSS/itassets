'use client'

export default function DashboardPage() {
  const handleLogout = () => {
    document.cookie = 'next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    window.location.href = '/login'
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>✅ Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  )
}
