import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AudioController from "@/components/AudioController";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loyalty Lane Storefront",
  description: "Shopify and Tapstitch storefront scaffolding for Loyalty Lane drops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-black"><AudioController />{children}<footer className="border-t border-[#d4af37]/20 bg-black px-6 py-8 text-center text-sm text-[#f5f2eb]/60"><nav className="flex flex-wrap justify-center gap-4" aria-label="Legal and safety"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/safety">Safety</a></nav></footer></body>
    </html>
  );
}
