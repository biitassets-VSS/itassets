import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Protect admin/dashboard routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}
