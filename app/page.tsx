'use client';

import { useState } from 'react';

export default function Home() {
  const [adminHover, setAdminHover] = useState(false);
  const [staffHover, setStaffHover] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 25%, #9333EA 50%, #7C3AED 75%, #6D28D9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '400px',
        width: '100%'
      }}>
        {/* Logo/Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(147, 197, 253, 0.9)',
          borderRadius: '20px',
          margin: '0 auto 40px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        }}>
          🛡️
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 10px 0',
          lineHeight: '1.1',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          Virtual Staffing Solution
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.1rem',
          margin: '0 0 50px 0',
          opacity: '0.9',
          fontWeight: '400',
          letterSpacing: '0.5px'
        }}>
          IT ASSETS MANAGEMENT SYSTEM
        </p>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            margin: '0 0 30px 0',
            color: 'white'
          }}>
            Choose Your Role
          </h2>

          {/* Admin Login Button */}
          <a 
            href="/admin/login"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 24px',
              margin: '0 0 16px 0',
              background: adminHover ? 'rgba(37, 99, 235, 1)' : 'rgba(59, 130, 246, 0.9)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              boxShadow: adminHover ? '0 6px 20px rgba(59, 130, 246, 0.6)' : '0 4px 15px rgba(59, 130, 246, 0.4)',
              transform: adminHover ? 'translateY(-2px)' : 'translateY(0)',
              boxSizing: 'border-box'
            }}
            onMouseEnter={() => setAdminHover(true)}
            onMouseLeave={() => setAdminHover(false)}
          >
            🔐 Admin Login
          </a>

          {/* Staff Login Button */}
          <a 
            href="/staff/login"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 24px',
              margin: '0',
              background: staffHover ? 'rgba(5, 150, 105, 1)' : 'rgba(16, 185, 129, 0.9)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              boxShadow: staffHover ? '0 6px 20px rgba(16, 185, 129, 0.6)' : '0 4px 15px rgba(16, 185, 129, 0.4)',
              transform: staffHover ? 'translateY(-2px)' : 'translateY(0)',
              boxSizing: 'border-box'
            }}
            onMouseEnter={() => setStaffHover(true)}
            onMouseLeave={() => setStaffHover(false)}
          >
            👥 Staff Login
          </a>
        </div>

        {/* Footer Info */}
        <div style={{
          marginTop: '40px',
          fontSize: '0.9rem',
          opacity: '0.8',
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center'
        }}>
          <div>📊<br />Asset Management</div>
          <div>👤<br />User Management</div>  
          <div>📱<br />Mobile Ready</div>
        </div>
      </div>
    </div>
  );
}
