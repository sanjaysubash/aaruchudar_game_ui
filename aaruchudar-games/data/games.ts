export type IntelligenceType = "Logic" | "EQ" | "Creativity";
export type Difficulty = "Low" | "Medium" | "High";

export interface GameMeta {
  reason?: any;
  tagline?: any;
  slug: string;
  title: string;
  description: string;
  intelligence: IntelligenceType[];
  difficulty: Difficulty;
  heroColor?: string; // css color string for game page accent
}

export const games: GameMeta[] = [
  {
    slug: "neuro-grid",
    title: "Neuro Grid",
    description: "Route energy through a shifting grid to optimize throughput.",
    intelligence: ["Logic"],
    difficulty: "Medium",
    heroColor: "var(--accent-logic)",
  },
  {
    slug: "empathy-link",
    title: "Empathy Link",
    description: "Decode tone and context to build stable social links.",
    intelligence: ["EQ"],
    difficulty: "Low",
    heroColor: "var(--accent-empathy)",
  },
  {
    slug: "quantum-paint",
    title: "Quantum Paint",
    description: "Compose dynamic patterns under time pressure.",
    intelligence: ["Creativity"],
    difficulty: "High",
    heroColor: "var(--accent-creativity)",
  },
  {
    slug: "logic-vaults",
    title: "Logic Vaults",
    description: "Crack layered ciphers and unlock the vaults.",
    intelligence: ["Logic"],
    difficulty: "High",
    heroColor: "var(--accent-logic)",
  },
  {
    slug: "pattern-surge",
    title: "Pattern Surge",
    description: "Snap to sequences and boost the surge chain.",
    intelligence: ["Logic", "Creativity"],
    difficulty: "Medium",
    heroColor: "var(--accent-progress)",
  },
];
