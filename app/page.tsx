'use client'

import { useState, FormEvent } from 'react'

export default function Home() {
  const [email, setEmail] = useState('lakhwinder.bi@outlook.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (email === 'lakhwinder.bi@outlook.com' && password.length >= 6) {
        setMessage('success:Login successful! Welcome to IT Assets Management System.')
        setTimeout(() => {
          setMessage('success:Redirecting to dashboard...')
        }, 1000)
      } else {
        setMessage('error:Invalid credentials. Please check your email and password.')
      }
    } catch (error) {
      setMessage('error:An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    if (!email.trim()) {
      setMessage('error:Please enter your email address first.')
      return
    }
    
    setMessage(`success:Password reset instructions will be sent to: ${email}`)
    setTimeout(() => setMessage(''), 5000)
  }

  const messageType = message.startsWith('success:') ? 'success' : 'error'
  const messageText = message.replace(/^(success:|error:)/, '')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        
        {/* Logo Section */}
        <div className="text-center mb-8 fade-in">
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(145deg, #60a5fa 0%, #8b5cf6 100%)',
            borderRadius: '20px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}>
            <svg 
              style={{ width: '40px', height: '40px', color: 'white' }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 responsive-title" style={{
            letterSpacing: '-0.025em',
            lineHeight: '1.2'
          }}>
            Virtual Staffing Solution
          </h1>
          <p className="text-purple-200 text-sm font-medium tracking-widest uppercase opacity-90">
            IT ASSETS MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card responsive-card">
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            Admin Login
          </h2>

          {/* Message Display */}
          {message && (
            <div className={`message ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
              {messageText}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="gap-6">
              
              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-purple-200 text-sm font-medium mb-2" htmlFor="email">
                  Admin Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="lakhwinder.bi@outlook.com"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-purple-200 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-password"
                    placeholder="••••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#c4b5fd',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    disabled={isLoading}
                  >
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="mb-6" style={{ textAlign: 'right' }}>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <div className="mb-6">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    'Sign In as Admin'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Staff Login Link */}
          <div className="text-center mt-8">
            <button 
              onClick={() => setMessage('success:Staff login portal coming soon!')}
              className="btn-secondary"
              disabled={isLoading}
            >
              Staff Member? Login here
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p style={{ color: 'rgba(196, 181, 253, 0.6)', fontSize: '0.75rem' }}>
            © 2026 Virtual Staffing Solution. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}