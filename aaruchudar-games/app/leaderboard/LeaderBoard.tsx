"use client";
import { useMemo, useState } from "react";
import { leaderboard as data, me } from "@/data/users";
import HUDPanel from "@/components/HUDPanel";
import { NeonButton } from "@/components/NeonButton";
import { motion, AnimatePresence } from "framer-motion";

const periods = ["daily", "weekly", "monthly"] as const;

type Period = typeof periods[number];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("daily");
  const rows = useMemo(() => data[period].slice().sort((a, b) => b.score - a.score), [period]);

  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6">
        <h1 className="h1 focus-anchor">Leaderboard</h1>
        <p className="body mt-3">Calm rankings. Progress over spectacle. Identity rank: {me.rankName ?? "Initiate"}.</p>
      </header>
      <section className="panel p-6 r-gap">
        <div className="flex gap-2 mb-6">
          {periods.map((p) => (
            <NeonButton
              key={p}
              size="sm"
              onClick={() => setPeriod(p)}
              className={p === period ? "text-logic" : "opacity-70"}
            >
              {p.toUpperCase()}
            </NeonButton>
          ))}
        </div>

        <HUDPanel title={`LEADERBOARD · ${period.toUpperCase()}`}>
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[80px_1fr_160px] px-3 py-2 text-[10px] tracking-widest text-[var(--color-muted)]">
                <div>RANK</div>
                <div>USER</div>
                <div className="text-right">SCORE</div>
              </div>
              <AnimatePresence initial={false}>
                {rows.map((r, i) => {
                  const isMe = r.id === me.id;
                  return (
                    <motion.div
                      key={r.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className={
                        "relative grid grid-cols-[80px_1fr_160px] items-center px-3 py-3 rounded-md border " +
                        (isMe ? "border-[var(--accent-logic)]/50 bg-white/5" : "border-[rgba(148,163,184,0.18)]")
                      }
                    >
                      <div className="relative z-10 text-sm">{i + 1}</div>
                      <div className="relative z-10">
                        <div className="text-sm">{r.name} <span className="text-[var(--color-muted)]">{r.handle}</span></div>
                        {isMe && <div className="text-[10px] tracking-widest text-logic">{me.rankName}</div>}
                      </div>
                      <div className="relative z-10 text-right font-medium">{r.score.toLocaleString()}</div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </HUDPanel>
      </section>
    </div>
  );
}
