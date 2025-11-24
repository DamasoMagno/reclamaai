"use client";

import "./globals.css";
import { AuthProvider } from "@/context/auth";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`antialiased`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
