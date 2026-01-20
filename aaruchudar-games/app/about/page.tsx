import GlassCard from "@/components/GlassCard";
import GlowDivider from "@/components/GlowDivider";
import HUDPanel from "@/components/HUDPanel";
import { BrainCircuit, Gamepad2, Lock, Gauge, Sparkles, Waves } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6">
        <h1 className="h1 focus-anchor">About</h1>
        <p className="body mt-3">A calm, scientific platform for training human intelligence.</p>
      </header>
      <section className="panel p-6 r-gap">
        <div className="mb-6">
          <h2 className="h2">Aaruchudar – Intelligence Vision</h2>
          <p className="mt-2 body max-w-2xl">A science-led lab to engineer human intelligence through ethical, measurable, and calm experiences.</p>
        </div>
        <GlowDivider />

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-5 w-5" />
              <h3 className="font-semibold">Science-Driven</h3>
            </div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Evidence-led mechanics to target logic, EQ, and creativity with adaptive difficulty.</p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <Gamepad2 className="h-5 w-5" />
              <h3 className="font-semibold">Game-First</h3>
            </div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">HUD interfaces, smooth motion, and flow-centric loops tailored for mastery.</p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5" />
              <h3 className="font-semibold">Ethical & Private</h3>
            </div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Transparent telemetry, local-first design paths, and privacy-respecting integrations.</p>
          </GlassCard>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <HUDPanel title="DESIGN LANGUAGE" subtitle="NEON • GLASS • HUD">
            <ul className="list-disc pl-5 text-sm space-y-1 text-[var(--color-muted)]">
              <li>Dark mode default with electric accents</li>
              <li>Glassmorphism panels, animated grid, and scanlines</li>
              <li>Holographic gradients and glow borders</li>
              <li>60fps motion via Framer Motion</li>
            </ul>
          </HUDPanel>
          <HUDPanel title="PERFORMANCE" subtitle="SMOOTH • RESPONSIVE">
            <ul className="list-disc pl-5 text-sm space-y-1 text-[var(--color-muted)]">
              <li>Server components by default</li>
              <li>Client boundaries only where needed</li>
              <li>Optimized visuals and minimal layout shifts</li>
            </ul>
          </HUDPanel>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="flex items-center gap-3"><Gauge className="h-5 w-5" /><h3 className="font-semibold">Adaptive Flow</h3></div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Real-time calibration maintains challenge sweet-spot.</p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3"><Sparkles className="h-5 w-5" /><h3 className="font-semibold">Badge Ecosystem</h3></div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Holographic achievements celebrate meaningful milestones.</p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3"><Waves className="h-5 w-5" /><h3 className="font-semibold">Sound-Ready</h3></div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">UI is wired for future soundscapes and haptic cues.</p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
