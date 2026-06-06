import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Assets Management System",
  description: "Virtual Staffing Solution - IT Assets Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
