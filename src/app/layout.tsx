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
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="text-center py-6 text-beige-900/30 text-xs border-t border-beige-200 mt-12 bg-beige-100/50">
          <p>Opinion Platform &copy; 2026</p>
          <p className="mt-1 font-mono">System Version 3.3 (Global Auth Reset)</p>
        </footer>
      </body>
    </html>
  );
}
