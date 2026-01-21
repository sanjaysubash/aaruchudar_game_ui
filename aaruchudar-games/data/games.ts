import type { ReactNode } from "react";

export type IntelligenceType = "Logic" | "EQ" | "Creativity" | "Memory" | "Speed";
export type Difficulty = "Low" | "Medium" | "High";

export interface GameMeta {
  tag?: ReactNode;
  subtitle?: ReactNode;
  cover?: string | Blob;
  reason?: any;
  tagline?: any;
  id: string;
  slug: string;
  title: string;
  description: string;
  intelligence?: IntelligenceType[]; // legacy
  intelligenceType: IntelligenceType; // primary type
  difficulty: Difficulty;
  heroColor?: string; // css color string for game page accent
  xp: number;
  progress: number; // 0-100
  icon?: string; // emoji or icon name
}

const rand = (min = 10, max = 90) => Math.floor(Math.random() * (max - min + 1)) + min;

export const games: GameMeta[] = [
  // Logic
  {
    id: "g-logic-neurogrid",
    slug: "neurogrid",
    title: "Neuro Grid",
    description: "Route energy through a shifting grid to optimize throughput.",
    intelligenceType: "Logic",
    intelligence: ["Logic"],
    difficulty: "Medium",
    heroColor: "var(--accent-logic)",
    xp: 120,
    progress: rand(),
    icon: "🧩",
  },
  {
    id: "g-logic-vaults",
    slug: "logic-vaults",
    title: "Logic Vaults",
    description: "Crack layered ciphers and unlock the vaults.",
    intelligenceType: "Logic",
    intelligence: ["Logic"],
    difficulty: "High",
    heroColor: "var(--accent-logic)",
    xp: 180,
    progress: rand(),
    icon: "🔐",
  },
  {
    id: "g-logic-binary-rush",
    slug: "binary-rush",
    title: "Binary Rush",
    description: "Flip bits fast to match target states.",
    intelligenceType: "Logic",
    intelligence: ["Logic"],
    difficulty: "Medium",
    xp: 140,
    progress: rand(),
    icon: "01",
  },
  // Creativity
  {
    id: "g-crea-quantum-paint",
    slug: "quantum-paint",
    title: "Quantum Paint",
    description: "Compose dynamic patterns under time pressure.",
    intelligenceType: "Creativity",
    intelligence: ["Creativity"],
    difficulty: "High",
    heroColor: "var(--accent-creativity)",
    xp: 200,
    progress: rand(),
    icon: "🎨",
  },
  {
    id: "g-crea-idea-sparks",
    slug: "idea-sparks",
    title: "Idea Sparks",
    description: "Fuse concepts to generate visual themes.",
    intelligenceType: "Creativity",
    intelligence: ["Creativity"],
    difficulty: "Medium",
    xp: 150,
    progress: rand(),
    icon: "✨",
  },
  {
    id: "g-crea-visual-echo",
    slug: "visual-echo",
    title: "Visual Echo",
    description: "Mirror and morph shapes to match silhouettes.",
    intelligenceType: "Creativity",
    intelligence: ["Creativity"],
    difficulty: "Low",
    xp: 100,
    progress: rand(),
    icon: "🌀",
  },
  // EQ
  {
    id: "g-eq-empathy-link",
    slug: "empathy-link",
    title: "Empathy Link",
    description: "Decode tone and context to build stable social links.",
    intelligenceType: "EQ",
    intelligence: ["EQ"],
    difficulty: "Low",
    heroColor: "var(--accent-empathy)",
    xp: 90,
    progress: rand(),
    icon: "💞",
  },
  {
    id: "g-eq-emotion-radar",
    slug: "emotion-radar",
    title: "Emotion Radar",
    description: "Track subtle cues and categorize emotions.",
    intelligenceType: "EQ",
    intelligence: ["EQ"],
    difficulty: "Medium",
    xp: 130,
    progress: rand(),
    icon: "📡",
  },
  {
    id: "g-eq-perspective-shift",
    slug: "perspective-shift",
    title: "Perspective Shift",
    description: "Reframe scenarios to uncover motives.",
    intelligenceType: "EQ",
    intelligence: ["EQ"],
    difficulty: "High",
    xp: 170,
    progress: rand(),
    icon: "🔄",
  },
  // Memory
  {
    id: "g-mem-pattern-surge",
    slug: "pattern-surge",
    title: "Pattern Surge",
    description: "Snap to sequences and boost the surge chain.",
    intelligenceType: "Memory",
    intelligence: ["Logic", "Creativity"],
    difficulty: "Medium",
    heroColor: "var(--accent-progress)",
    xp: 150,
    progress: rand(),
    icon: "🧠",
  },
  {
    id: "g-mem-focus-blink",
    slug: "focus-blink",
    title: "Focus Blink",
    description: "Memorize flashes and recall positions.",
    intelligenceType: "Speed",
    intelligence: ["Speed"],
    difficulty: "Low",
    xp: 110,
    progress: rand(),
    icon: "👁️",
  },
  {
    id: "g-mem-mind-dash",
    slug: "mind-dash",
    title: "Mind Dash",
    description: "Keep track of shifting tokens under pressure.",
    intelligenceType: "Speed",
    intelligence: ["Speed"],
    difficulty: "Medium",
    xp: 140,
    progress: rand(),
    icon: "🏃",
  },
  // Speed
  {
    id: "g-speed-reflex-surge",
    slug: "reflex-surge",
    title: "Reflex Surge",
    description: "Tap targets as they appear with precision.",
    intelligenceType: "Speed",
    intelligence: ["Speed"],
    difficulty: "Medium",
    xp: 130,
    progress: rand(),
    icon: "⚡",
  },
];
