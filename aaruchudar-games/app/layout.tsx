import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SoundBadge from "@/components/SoundBadge";
import ClientOnly from "@/components/ClientOnly";
import FloatingBackground from "@/components/FloatingBackground";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaruchudar – Human Intelligence Labs",
  description: "Engineer Human Intelligence. Futuristic, game-inspired lab interface.",
  applicationName: "Aaruchudar – Human Intelligence Labs",
  manifest: "/site.webmanifest",
  icons: { icon: "/favicon.ico" },
  themeColor: "#05060a",
  openGraph: {
    title: "Aaruchudar – Human Intelligence Labs",
    description: "Engineer Human Intelligence.",
    url: "https://aaruchudar.example",
    siteName: "Aaruchudar – HIL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--text-primary)] antialiased min-h-screen flex flex-col">
        <ClientOnly>
          <FloatingBackground />
        </ClientOnly>
        {/* Floating background grid and particles */}
        {/* Background renders behind all content */}
        <div className="page-shell section-space r-space r-gap min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <footer className="mt-8 pb-12 text-center text-xs text-[var(--color-muted)]">
            <div className="mx-auto max-w-6xl px-4">
              <hr className="my-6" style={{ borderColor: "rgba(148,163,184,0.18)" }} />
              <p>© {new Date().getFullYear()} Aaruchudar – Human Intelligence Labs</p>
            </div>
          </footer>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
