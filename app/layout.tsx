export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ✅ NO bg class on body — let each page control its own background */}
      <body className="inter_className" style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
