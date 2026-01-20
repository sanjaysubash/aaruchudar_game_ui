"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { GameMeta } from "@/data/games";
import HUDPanel from "@/components/HUDPanel";
import ProgressBar from "@/components/ProgressBar";
import { NeonButton } from "@/components/NeonButton";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import { Clock3, Trophy, Info } from "lucide-react";

export default function ClientGame({ game }: { game: GameMeta }) {
  const DURATION = 150; // seconds, 2–5 minute focused session
  const [time, setTime] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [openEnd, setOpenEnd] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    function tick(now: number) {
      const elapsed = Math.floor((now - start) / 1000);
      const remain = Math.max(0, DURATION - elapsed);
      setTime(remain);
      if (remain === 0) {
        setOpenEnd(true);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const progress = useMemo(() => Math.min(100, Math.round(((DURATION - time) / DURATION) * 70 + Math.min(score, 300) / 3)), [time, score]);

  return (
    <div className="min-h-[calc(100vh-4rem)] mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Game viewport */}
        <div className="relative rounded-xl overflow-hidden glass-strong border-neon min-h-[60vh]">
          {/* HUD Top Bar */}
          <div className="absolute left-0 right-0 top-0 p-3 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-widest text-[var(--color-muted)]">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: game.heroColor }} />
              {game.title.toUpperCase()}
            </div>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-1 glass border-neon rounded px-2 py-1"><Clock3 className="h-3.5 w-3.5" /> {time}s</div>
              <div className="inline-flex items-center gap-1 glass border-neon rounded px-2 py-1"><Trophy className="h-3.5 w-3.5" /> {score}</div>
            </div>
          </div>

          {/* Anticipation → Focus → Challenge → Feedback → Reward → Calm */}
          <div className="h-full grid place-items-center p-6">
            <motion.div
              className="relative h-64 w-64 rounded-xl grid place-items-center"
              style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 48px ${game.heroColor || 'var(--neon-cyan)'}30`, background: "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)" }}
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* single clear action */}
              <div className="text-xs text-center mb-2 tracking-widest text-[var(--color-muted)]">FOCUS: Tap to channel energy</div>
              <NeonButton
                onClick={() => setScore((s) => s + 10)}
                className="px-4 py-2"
              >
                TAP +10
              </NeonButton>
              <div className="absolute inset-0 rounded-xl neon-border" />
            </motion.div>
            <div className="mt-4 text-[11px] tracking-widest text-[var(--color-muted)]">Feedback: Progress increases calmly</div>
          </div>

          {/* HUD Bottom */}
          <div className="absolute left-0 right-0 bottom-0 p-4">
            <ProgressBar value={progress} label="PROGRESS" variant="cyan" />
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          <HUDPanel title="SESSION GUIDE" subtitle="Calm Lab">
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Anticipation: Prepare. Focus: Tap the core. Challenge: Maintain rhythm. Feedback: Watch progress. Reward: Session complete. Calm: Reflect.
            </p>
            <ul className="mt-3 text-xs text-white/80 list-disc pl-5 space-y-1">
              <li>Tap to score in short bursts</li>
              <li>Goal: Reach 100% progress within session</li>
            </ul>
          </HUDPanel>
          <HUDPanel title="SESSION CONTROLS">
            <div className="flex gap-3">
              <NeonButton onClick={() => setOpenEnd(true)}>END SESSION</NeonButton>
              <NeonButton onClick={() => { setScore(0); setTime(DURATION); }}>RESET</NeonButton>
            </div>
          </HUDPanel>
          <HUDPanel title="ABOUT GAME">
            <div className="flex items-start gap-3 text-sm">
              <Info className="h-4 w-4 mt-0.5 text-[var(--neon-cyan)]" />
              <p className="text-[var(--color-muted)]">{game.description}</p>
            </div>
          </HUDPanel>
        </div>
      </div>

      {/* End-game Modal */}
      <Modal open={openEnd} onClose={() => setOpenEnd(false)} title={progress >= 100 ? "SESSION COMPLETE" : "SESSION COMPLETE"}>
        <div className="text-sm">
          <p className="text-[var(--color-muted)]">Score: <span className="text-white">{score}</span> • Time: <span className="text-white">{DURATION - time}s</span></p>
          <div className="mt-3"><ProgressBar value={progress} /></div>
          <p className="mt-3 text-[var(--color-muted)]">Growth cascades into Logic, Empathy, and Creativity.</p>
          <div className="mt-4 flex gap-3 justify-end">
            <NeonButton onClick={() => { setOpenEnd(false); }}>CONTINUE</NeonButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
