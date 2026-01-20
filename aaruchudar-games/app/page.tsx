"use client";
import FeaturedGames from "@/components/FeaturedGames";
import HUDPanel from "@/components/HUDPanel";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6 text-center">
        <h1 className="h1">Aaruchudar – Human Intelligence Labs</h1>
        <p className="body mt-3">Train your mind in calm, 2–5 minute sessions. One skill per play.</p>
        <div className="mt-4">
          <Link href="/games" className="inline-block px-4 py-2 rounded-md border border-[rgba(148,163,184,0.28)] text-xs">Explore Games</Link>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6">
        <HUDPanel title="WHY PLAY">
          <div className="p-4 text-sm text-[var(--color-muted)]">
            Anticipation → Focus → Challenge → Feedback → Reward → Calm. Each session grows Logic, Empathy, and Creativity.
          </div>
        </HUDPanel>

        <HUDPanel title="FEATURED">
          <div className="p-2">
            <FeaturedGames />
          </div>
        </HUDPanel>
      </section>
    </div>
  );
}
