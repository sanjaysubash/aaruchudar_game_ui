// filepath: /Users/sanjaysubash/Documents/aaruchudar_game/aaruchudar-games/app/welcome/page.tsx
"use client";
import Link from "next/link";
import FeaturedGames from "@/components/FeaturedGames";

export default function WelcomePage() {
  return (
    <div className="section-space r-space r-gap">
      {/* Background now comes from app/layout like the Games page */}

      <header className="mb-12 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
          Welcome to the Brain Arcade
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
          Train your mind with vibrant mini-games. Earn XP, unlock badges, and climb the leaderboard.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/games" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-extrabold text-black bg-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:translate-y-[-2px] transition-all duration-200 ease-out">
            🕹️ Start Playing
          </Link>
          <Link href="/profile" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-bold text-white bg-white/10 border border-white/15 backdrop-blur hover:bg-white/15 hover:border-white/25 transition-colors duration-200 ease-out">
            🎖️ View Profile
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-widest text-white/80">
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Logic</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Creativity</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">EQ</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Memory</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Speed</span>
        </div>
      </header>

      {/* Featured section container keeps dark glassmorphism theme */}
      <section className="r-gap">
        <div className="rounded-2xl p-3 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <FeaturedGames />
        </div>
      </section>
    </div>
  );
}
