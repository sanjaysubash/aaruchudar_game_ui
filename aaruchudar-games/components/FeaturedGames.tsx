"use client";
import GameCard from "./GameCard";
import { games } from "@/data/games";
import Link from "next/link";

export default function FeaturedGames() {
  const featured = games.slice(0, 4);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 tracking-widest">FEATURED GAMES</h2>
        <Link href="/games" className="text-xs px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors">View All</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            aria-label={`Open ${game.title}`}
            className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,box-shadow,border-color] duration-200 ease-out md:hover:-translate-y-[3px] md:hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] md:hover:border-white/20"
          >
            <div className="relative aspect-video">
              <img src={game.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-0 md:group-hover:ring-1 md:group-hover:ring-white/20 transition-all duration-200 ease-out" />
            </div>
            <div className="p-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-white font-semibold tracking-tight">
                  {game.title}
                </h3>
                <p className="text-xs text-white/70">{game.subtitle}</p>
              </div>
              <span className="px-2 py-1 rounded-lg text-[10px] text-white/80 bg-white/5 border border-white/10">{game.tag}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
