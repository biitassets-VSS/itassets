import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IT Assets Management System - Virtual Staffing Solution',
  description: 'Professional IT Assets Management System for Virtual Staffing Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}