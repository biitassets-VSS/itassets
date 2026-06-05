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

  const handleForgotPassword = (): void => {
    if (!email.trim()) {
      setMessage('error:Please enter your email address first.')
      return
    }
    
    setMessage(`success:Password reset instructions will be sent to: ${email}`)
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
    setMessage('success:Staff login portal is coming soon! Please contact your administrator.')
    setTimeout(() => setMessage(''), 4000)
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
        <div className="glass-card p-8 responsive-card">
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            Admin Login
          </h2>

          {/* Message Display */}
          {message && (
            <div className={`message ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
              {messageText}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Email Field */}
            <div>
              <label 
                className="block text-purple-200 text-sm font-medium mb-2" 
                htmlFor="email"
              >
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="input-field"
                placeholder="lakhwinder.bi@outlook.com"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                className="block text-purple-200 text-sm font-medium mb-2" 
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className="input-password"
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
                    color: '#c4b5fd',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: isLoading ? 0.5 : 1
                  }}
                  className="transition hover-opacity cursor-pointer"
                  disabled={isLoading}
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
                className="btn-secondary"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
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
          </form>

          {/* Staff Login Link */}
          <div className="text-center mt-8">
            <button 
              onClick={handleStaffLogin}
              className="btn-secondary"
              disabled={isLoading}
            >
              Staff Member? Login here
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p style={{
            color: 'rgba(196, 181, 253, 0.6)',
            fontSize: '0.75rem'
          }}>
            © 2026 Virtual Staffing Solution. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}