"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/leaderboard", label: "Ranks" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="mx-auto max-w-screen-sm">
        <div className="m-3 rounded-xl border border-[rgba(148,163,184,0.18)] bg-black/40 backdrop-blur-md">
          <ul className="grid grid-cols-5">
            {items.map((it) => {
              const active = pathname === it.href;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={`block text-center py-3 text-xs tracking-wide ${active ? "text-logic" : "opacity-80"}`}
                  >
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}