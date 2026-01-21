import GlassCard from "@/components/GlassCard";
import GlowDivider from "@/components/GlowDivider";
import HUDPanel from "@/components/HUDPanel";
import { BrainCircuit, Gamepad2, Lock, Gauge, Sparkles, Waves } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="section-space r-space r-gap">
      <header className="mb-8 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/25 to-cyan-500/25 blur-3xl" />
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300">About the Arcade Lab</h1>
        <p className="mt-2 text-sm text-white/85">Built for play. Tuned for growth. Science meets arcade energy.</p>
      </header>
      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-5 w-5" />
            <h3 className="font-semibold">Science-Driven</h3>
          </div>
          <p className="mt-2 text-sm text-white/85">Adaptive difficulty, short sessions, measurable progress.</p>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-pink-500/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-5 w-5" />
            <h3 className="font-semibold">Game-First</h3>
          </div>
          <p className="mt-2 text-sm text-white/85">Bold tiles, juicy feedback, badges, and XP you can feel.</p>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-emerald-400/10 to-teal-400/10">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5" />
            <h3 className="font-semibold">Private by Design</h3>
          </div>
          <p className="mt-2 text-sm text-white/85">Transparent telemetry and player-first data choices.</p>
        </div>
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <HUDPanel title="DESIGN LANGUAGE" subtitle="BOLD • ARCADE • ALIVE">
          <ul className="list-disc pl-5 text-sm space-y-1 text-white/80">
            <li>Dark canvas with neon gradients</li>
            <li>Lift and glow on hover</li>
            <li>Progress, XP, and badges are first-class</li>
            <li>Short, replayable loops</li>
          </ul>
        </HUDPanel>
        <HUDPanel title="PERFORMANCE" subtitle="SMOOTH • RESPONSIVE">
          <ul className="list-disc pl-5 text-sm space-y-1 text-white/80">
            <li>Client islands only where needed</li>
            <li>GPU-accelerated transforms</li>
            <li>Minimal layout shift</li>
          </ul>
        </HUDPanel>
      </section>

      <section className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-amber-400/10 to-rose-500/10">
          <div className="flex items-center gap-3"><Gauge className="h-5 w-5" /><h3 className="font-semibold">Adaptive Flow</h3></div>
          <p className="mt-2 text-sm text-white/85">Stay in the sweet spot — never too easy, never too hard.</p>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-yellow-300/10 to-amber-400/10">
          <div className="flex items-center gap-3"><Sparkles className="h-5 w-5" /><h3 className="font-semibold">Badges</h3></div>
          <p className="mt-2 text-sm text-white/85">Earn shiny markers of mastery and momentum.</p>
        </div>
        <div className="rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10">
          <div className="flex items-center gap-3"><Waves className="h-5 w-5" /><h3 className="font-semibold">Sound-Ready</h3></div>
          <p className="mt-2 text-sm text-white/85">Future-ready for soundscapes and haptics.</p>
        </div>
      </section>
    </div>
  );
}
