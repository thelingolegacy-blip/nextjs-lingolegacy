import type { Metadata } from "next";
import Link from "next/link";
import AudioController from "@/components/AudioController";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-black"><AudioController />{children}<footer className="border-t border-[#d4af37]/20 bg-black px-6 py-8 text-center text-sm text-[#f5f2eb]/60"><nav className="flex flex-wrap justify-center gap-4" aria-label="Legal and safety"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/safety">Safety</Link></nav></footer></body>
    </html>
  );
}
