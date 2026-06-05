import './globals.css'

export const metadata = {
  title: 'IT Assets Management System',
  description: 'Virtual Staffing Solution - IT Assets Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
