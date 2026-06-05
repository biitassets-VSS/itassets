'use client'

import { useState, FormEvent } from 'react'

interface InputChangeEvent {
  target: {
    value: string
  }
}

export default function Home() {
  const [email, setEmail] = useState<string>('lakhwinder.bi@outlook.com')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (email === 'lakhwinder.bi@outlook.com' && password.length >= 6) {
        setMessage('Login successful! Welcome to IT Assets Management System.')
        setTimeout(() => {
          setMessage('Redirecting to dashboard...')
        }, 1000)
      } else {
        setMessage('Invalid credentials. Please check your email and password.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = (): void => {
    if (!email.trim()) {
      setMessage('Please enter your email address first.')
      return
    }
    
    setMessage(`Password reset instructions will be sent to: ${email}`)
    
    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000)
  }

  const handleEmailChange = (e: InputChangeEvent): void => {
    setEmail(e.target.value)
    if (message) setMessage('')
  }

  const handlePasswordChange = (e: InputChangeEvent): void => {
    setPassword(e.target.value)
    if (message) setMessage('')
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev)
  }

  const handleStaffLogin = (): void => {
    setMessage('Staff login portal is coming soon! Please contact your administrator.')
    setTimeout(() => setMessage(''), 4000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        
        {/* Logo Section */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(145deg, #60a5fa 0%, #8b5cf6 100%)',
            borderRadius: '20px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <svg 
              style={{ width: '40px', height: '40px', color: 'white' }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              role="img"
              aria-label="Security Shield"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.75rem',
            letterSpacing: '-0.025em',
            lineHeight: '1.2'
          }}>
            Virtual Staffing Solution
          </h1>
          <p style={{
            color: '#c4b5fd',
            fontSize: '0.875rem',
            fontWeight: '500',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.9,
            margin: 0
          }}>
            IT ASSETS MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: '600',
            color: 'white',
            textAlign: 'center',
            marginBottom: '2rem',
            margin: '0 0 2rem 0'
          }}>
            Admin Login
          </h2>

          {/* Message Display */}
          {message && (
            <div style={{
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              background: message.includes('successful') || message.includes('sent') 
                ? 'rgba(34, 197, 94, 0.1)' 
                : 'rgba(239, 68, 68, 0.1)',
              border: message.includes('successful') || message.includes('sent')
                ? '1px solid rgba(34, 197, 94, 0.3)'
                : '1px solid rgba(239, 68, 68, 0.3)',
              color: message.includes('successful') || message.includes('sent') 
                ? '#dcfce7' 
                : '#fecaca',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            
            {/* Email Field */}
            <div>
              <label style={{
                display: 'block',
                color: '#c4b5fd',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }} htmlFor="email">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  color: '#374151',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                placeholder="lakhwinder.bi@outlook.com"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: 'block',
                color: '#c4b5fd',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }} htmlFor="password">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  style={{
                    width: '100%',
                    padding: '1rem 3rem 1rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    color: 'white',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••••"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#c4b5fd',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.3s ease',
                    opacity: isLoading ? 0.5 : 1
                  }}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div style={{ textAlign: 'right' }}>
              <button 
                type="button"
                onClick={handleForgotPassword}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c4b5fd',
                  fontSize: '0.875rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  opacity: isLoading ? 0.5 : 1
                }}
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: isLoading 
                  ? 'rgba(96, 165, 250, 0.7)' 
                  : 'linear-gradient(145deg, #60a5fa 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(96, 165, 250, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In as Admin'
              )}
            </button>
          </form>

          {/* Staff Login Link */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={handleStaffLogin}
              style={{
                background: 'none',
                border: 'none',
                color: '#c4b5fd',
                fontSize: '0.875rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'color 0.3s ease',
                opacity: isLoading ? 0.5 : 1
              }}
              disabled={isLoading}
            >
              Staff Member? Login here
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{
            color: 'rgba(196, 181, 253, 0.6)',
            fontSize: '0.75rem',
            margin: 0
          }}>
            © 2026 Virtual Staffing Solution. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}