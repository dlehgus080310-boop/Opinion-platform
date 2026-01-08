import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Opinion Platform",
  description: "A platform for essays, articles, and opinions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-beige-50 text-beige-900 min-h-screen`}
      >
        <Navbar />
        {/* Emergency Deployment Indicator */}
        <div className="bg-red-600 text-white text-center py-2 font-bold uppercase tracking-widest text-sm sticky top-0 z-50 animate-pulse">
          System Migration v4.0 - Update Active
        </div>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="text-center py-6 text-beige-50 text-xs border-t border-amber-800 mt-12 bg-amber-900">
          <p>Opinion Platform &copy; 2026</p>
          <p className="mt-1 font-mono">System Version 4.0 (Emergency Protocol)</p>
        </footer>
      </body>
    </html>
  );
}
