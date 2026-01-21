"use client";
import { me } from "@/data/users";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";

export default function ProfilePage() {
  const initials = me.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  const level = me.level ?? 3;
  const xp = me.xp ?? 1240;
  const nextXp = me.nextXp ?? 1800;
  const progress = Math.min(100, Math.round((xp / nextXp) * 100));

  const recentGames = games.slice(0, 4);
  const achievements = [
    { id: "streak7", label: "7-Day Streak", icon: "🔥", grad: "from-amber-400/30 to-rose-500/30" },
    { id: "xp1k", label: "1,000 XP", icon: "🏆", grad: "from-yellow-300/30 to-amber-400/30" },
    { id: "logicPro", label: "Logic Pro", icon: "🧩", grad: "from-cyan-400/30 to-blue-500/30" },
    { id: "speedster", label: "Speedster", icon: "⚡", grad: "from-rose-500/30 to-fuchsia-500/30" },
  ];

  return (
    <div className="section-space r-space r-gap">
      <header className="mb-8 relative text-center overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/25 to-cyan-500/25 blur-3xl" />
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300">Your Arcade Profile</h1>
        <p className="mt-2 text-sm text-white/80">Welcome back, {me.name}. Keep the streak alive.</p>
      </header>

      {/* Top hub */}
      <section className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-lg font-bold text-white bg-black/30 border border-white/20 ring-4 ring-transparent" style={{ boxShadow: "inset 0 0 24px rgba(255,255,255,0.06)" }}>
                {initials}
              </div>
              <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-fuchsia-400/30 to-amber-300/30 blur"></div>
            </div>
            <div className="min-w-0">
              <div className="text-lg font-semibold truncate">{me.name}</div>
              <div className="text-xs text-white/80 truncate">{me.handle ?? "@player"}</div>
              <div className="mt-2 inline-flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20">LEVEL {level}</span>
                {me.rankName && <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 border border-white/20">{me.rankName}</span>}
              </div>
            </div>
          </div>

          {/* XP progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-white/80 mb-1">
              <span>XP {xp.toLocaleString()}</span>
              <span>{progress}% to {nextXp.toLocaleString()}</span>
            </div>
            <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-[11px] tracking-widest mb-3 text-white/80">ACHIEVEMENTS</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {achievements.map((a) => (
              <div key={a.id} className={`relative rounded-xl p-3 border border-white/10 bg-gradient-to-br ${a.grad}`}>
                <div className="text-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">{a.icon}</div>
                <div className="mt-2 text-xs font-semibold">{a.label}</div>
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill streaks */}
      <section className="mt-6">
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="text-[11px] tracking-widest mb-3 text-white/80">SKILL STREAKS</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Logic", value: me.dimensions?.logic ?? 0, grad: "from-cyan-500/20 to-blue-500/20" },
              { label: "Creativity", value: me.dimensions?.creativity ?? 0, grad: "from-pink-500/20 to-purple-500/20" },
              { label: "EQ", value: me.dimensions?.empathy ?? 0, grad: "from-emerald-400/20 to-teal-400/20" },
              { label: "Speed", value: 42, grad: "from-rose-500/20 to-fuchsia-500/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl p-3 border border-white/10 bg-gradient-to-br ${s.grad}`}>
                <div className="text-xs text-white/80">{s.label}</div>
                <div className="mt-1 text-lg font-bold">{s.value}</div>
                <div className="mt-2 h-1.5 w-full bg-white/10 rounded">
                  <div className="h-full bg-white/70" style={{ width: `${Math.min(100, s.value)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently played */}
      <section className="mt-6">
        <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] tracking-widest text-white/80">RECENTLY PLAYED</div>
            <a href="/games" className="text-xs text-white/80 hover:text-white">See all</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentGames.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
