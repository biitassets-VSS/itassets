import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Assets Management System - Virtual Staffing Solution',
  description: 'Professional IT Assets Management System for Virtual Staffing Solutions',
  keywords: 'IT Assets, Management System, Virtual Staffing, Admin Portal',
  authors: [{ name: 'AinodeArt' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        {children}
      </body>
    </html>
  );
}