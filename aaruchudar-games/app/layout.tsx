import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SoundBadge from "@/components/SoundBadge";
import ClientOnly from "@/components/ClientOnly";
import SolarBackground from "@/components/SolarBackground";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Image from "next/image";
import logoImg from "./welcome/logo2.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaruchudar brain games – Fun, Colorful Brain Training",
  description: "Play vibrant brain games to boost Logic, Creativity, EQ, Memory, and Speed.",
  applicationName: "Aaruchudar brain games",
  manifest: "/site.webmanifest",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Aaruchudar brain games – Fun, Colorful Brain Training",
    description: "Play vibrant brain games to boost Logic, Creativity, EQ, Memory, and Speed.",
    url: "https://brain-arcade.example",
    siteName: "Aaruchudar brain games",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
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
          <SolarBackground />
        </ClientOnly>
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
              {/* Strong yellow brand row with logo */}
              <div className="flex items-center justify-center gap-3">
                <Image
                  src={logoImg}
                  width={36}
                  height={36}
                  alt="Aaruchudar company logo"
                  className="select-none"
                />
                <strong className="text-yellow-400 tracking-wide">Aaruchudar brain games</strong>
              </div>
              <p className="mt-3">© {new Date().getFullYear()} Aaruchudar – Fun, Colorful Brain Training</p>
            </div>
          </footer>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
