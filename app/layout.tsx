import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Load Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application (NEXT.JS SPECIFIC)
export const metadata: Metadata = {
  title: 'MNRN Todo App',
  description:
    'A modern todo application built with MongoDB, Next.js, React, and Node.js',
};

// Root layout component (NEXT.JS SPECIFIC)
// In Next.js App Router, this wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
