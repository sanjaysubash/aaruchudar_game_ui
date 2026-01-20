"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import SoundBadge from "@/components/SoundBadge";

const links = [
  { href: "/games", label: "Games" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/profile", label: "Profile" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 glass border-soft">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-[var(--text-primary)] hover:text-[var(--text-secondary)]">
          aaruchudar
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-muted)]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname.startsWith(l.href) ? "text-[var(--text-primary)]" : "hover:text-[var(--text-secondary)]"}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <SoundBadge armed={false} />
        </div>
        <button className="md:hidden p-2 rounded hover:bg-white/5" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[rgba(148,163,184,0.18)]">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={pathname.startsWith(l.href) ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="pt-2"><SoundBadge armed={false} /></div>
          </div>
        </div>
      )}
    </header>
  );
}
