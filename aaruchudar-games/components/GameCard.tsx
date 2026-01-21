"use client";
import Link from "next/link";
import { GameMeta } from "@/data/games";

export default function GameCard({ game }: { game: GameMeta }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="card card-hover neon-border p-4 block h-full relative overflow-hidden"
      style={{
        // subtle accent rim using the game's heroColor
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px ${game.heroColor}10`,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: game.heroColor }} />
          <div className="font-medium text-white/90">{game.title}</div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-[rgba(148,163,184,0.25)] text-[var(--color-muted)]">
          {game.difficulty}
        </span>
      </div>

      <p className="text-sm text-[var(--color-muted)]">
        {game.reason || game.tagline || "Train a single skill with focus."}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] tracking-widest">
        {game.intelligence?.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full glass border-soft"
            style={{ borderColor: "rgba(148,163,184,0.25)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
