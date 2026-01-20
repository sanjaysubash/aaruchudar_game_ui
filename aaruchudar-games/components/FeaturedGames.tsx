"use client";
import GameCard from "./GameCard";
import { games } from "@/data/games";

export default function FeaturedGames() {
  const featured = games.slice(0, 3);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="label">FEATURED GAMES</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((g) => (
          <div key={g.slug} className="md:col-span-1">
            <GameCard game={g} />
          </div>
        ))}
      </div>
    </div>
  );
}
