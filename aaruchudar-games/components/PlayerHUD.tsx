"use client";
import { Star, Trophy, Layers, FlaskConical } from "lucide-react";

export default function PlayerHUD() {
  // Static demo values; integrate with real user data later
  const xp = 1240;
  const level = 7;
  const rank = "Explorer";
  const labs = 4;

  return (
    <div className="panel mt-2 mb-2">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-2 text-sm text-white/85">
          <Star className="h-4 w-4 text-[var(--accent-progress)]" />
          <span>XP</span>
          <span className="font-medium text-white">{xp}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/85">
          <Layers className="h-4 w-4 text-[var(--accent-logic)]" />
          <span>Level</span>
          <span className="font-medium text-white">{level}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/85">
          <Trophy className="h-4 w-4 text-[var(--accent-empathy)]" />
          <span>Rank</span>
          <span className="font-medium text-white">{rank}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/85">
          <FlaskConical className="h-4 w-4 text-[var(--accent-creativity)]" />
          <span>Labs</span>
          <span className="font-medium text-white">{labs}</span>
        </div>
      </div>
    </div>
  );
}
