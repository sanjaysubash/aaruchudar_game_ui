"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/games", label: "Games", icon: "🕹️" },
  { href: "/leaderboard", label: "Ranks", icon: "🏆" },
  { href: "/profile", label: "Profile", icon: "🎖️" },
  { href: "/contact", label: "Contact", icon: "💬" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="mx-auto max-w-screen-sm">
        <div className="m-3 rounded-2xl border border-white/15 bg-black/50 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
          <ul className="grid grid-cols-5">
            {items.map((it) => {
              const active = pathname === it.href;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={`block text-center py-2.5 text-[11px] ${active ? "text-black" : "text-white/85"}`}
                  >
                    <div
                      className={`mx-3 mb-1 rounded-xl py-2 ${
                        active
                          ? "bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300"
                          : "bg-transparent"
                      }`}
                    >
                      <span className="text-base align-middle">{it.icon}</span>
                    </div>
                    <span className={`${active ? "font-bold" : "opacity-90"}`}>{it.label}</span>
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