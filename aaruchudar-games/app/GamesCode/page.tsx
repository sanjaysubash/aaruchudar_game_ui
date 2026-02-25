import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Games | Aaruchudar",
  description: "Play games.",
};

const games = [
  { slug: "command-pulse", title: "Command Pulse" },
  { slug: "command-pulse-noise", title: "Command Pulse (Noise)" },
  { slug: "echo-chamber", title: "Echo Chamber" },
  { slug: "echo-reflect", title: "Echo Reflect" },
  { slug: "mind-mirror", title: "Mind Mirror" },
  { slug: "mirror-argument", title: "Mirror Argument" },
  { slug: "unseen-solution", title: "Unseen Solution" },
];

export default function GamesCodeIndexPage() {
  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6">
        <h1 className="brand-text-match text-4xl sm:text-5xl font-extrabold">Games</h1>
        <p className="mt-2 text-sm text-white/85">Choose a game to start playing.</p>
      </header>

      <section className="panel p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((g) => (
            <Link
              key={g.slug}
              href={`/GamesCode/${g.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <div className="text-base font-semibold text-white">{g.title}</div>
              <div className="mt-1 text-xs text-white/70">Open</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
