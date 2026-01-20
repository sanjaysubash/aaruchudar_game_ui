export interface Badge {
  id: string;
  name: string;
  color: string; // CSS color
}

export interface ActivityItem {
  id: string;
  label: string;
  value: string;
  at: string; // ISO date
}

export interface IntelligenceDimensions {
  logic: number; // 0-100
  empathy: number; // 0-100
  creativity: number; // 0-100
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  xp: number;
  level: number;
  rank: number;
  rankName?: string; // Identity-based rank label
  progress: number; // 0-100 toward next level
  dimensions?: IntelligenceDimensions; // Cognitive dimensions
  badges: Badge[];
  activity: ActivityItem[];
}

export interface LeaderboardRow {
  id: string;
  name: string;
  handle: string;
  score: number;
  country?: string;
}

export const me: UserProfile = {
  id: "u_001",
  name: "Cipher Nova",
  handle: "@novahuman",
  avatar: undefined,
  xp: 2480,
  level: 7,
  rank: 42,
  rankName: "Explorer",
  progress: 68,
  dimensions: { logic: 62, empathy: 54, creativity: 71 },
  badges: [
    { id: "b_logic", name: "Logic Adept", color: "var(--accent-logic)" },
    { id: "b_eq", name: "Empath", color: "var(--accent-empathy)" },
    { id: "b_cre", name: "Creative Spark", color: "var(--accent-creativity)" },
  ],
  activity: [
    { id: "a1", label: "Completed: Neuro Grid", value: "+180 XP", at: new Date().toISOString() },
    { id: "a2", label: "Badge Unlocked: Logic Adept", value: "+1", at: new Date().toISOString() },
    { id: "a3", label: "New High Score: Pattern Surge", value: "4,320", at: new Date().toISOString() },
  ],
};

export const leaderboard: Record<"daily" | "weekly" | "monthly", LeaderboardRow[]> = {
  daily: [
    { id: "u_101", name: "Vector Sky", handle: "@vsky", score: 5320 },
    { id: "u_102", name: "Ion Flux", handle: "@ion", score: 5010 },
    { id: me.id, name: me.name, handle: me.handle, score: 4980 },
    { id: "u_103", name: "Helix", handle: "@helix", score: 4800 },
  ],
  weekly: [
    { id: "u_101", name: "Vector Sky", handle: "@vsky", score: 25120 },
    { id: "u_103", name: "Helix", handle: "@helix", score: 24650 },
    { id: me.id, name: me.name, handle: me.handle, score: 24110 },
    { id: "u_102", name: "Ion Flux", handle: "@ion", score: 23890 },
  ],
  monthly: [
    { id: "u_103", name: "Helix", handle: "@helix", score: 101230 },
    { id: me.id, name: me.name, handle: me.handle, score: 99880 },
    { id: "u_101", name: "Vector Sky", handle: "@vsky", score: 98920 },
    { id: "u_102", name: "Ion Flux", handle: "@ion", score: 97600 },
  ],
};
