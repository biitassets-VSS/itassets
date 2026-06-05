import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body.email as string
    const password = body.password as string

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'lakhwinder.bi@outlook.com'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Admin@123'

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json(
        { success: true, message: 'Login successful', role: 'admin' },
        { status: 200 }
      )

      response.cookies.set('admin-token', 'admin-authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return response
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
