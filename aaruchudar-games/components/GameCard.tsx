"use client";
import Link from "next/link";
import { GameMeta } from "@/data/games";

export default function GameCard({ game }: { game: GameMeta }) {
  return (
    <Link href={`/games/${game.slug}`} className="block rounded-xl border border-[rgba(148,163,184,0.18)] p-4 hover:opacity-100">
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: game.heroColor }} />
        <div className="font-medium">{game.title}</div>
      </div>
      <p className="text-sm text-[var(--color-muted)]">{game.reason || game.tagline || "Train a single skill with focus."}</p>
      <div className="mt-3 text-[10px] tracking-widest flex items-center gap-3">
        <span>{game.intelligence.join(" • ")}</span>
        <span className="ml-auto">{game.difficulty}</span>
      </div>
    </Link>
  );
}
