export interface Metric {
  name: string;
  value: number; // 0..1 normalized
}
export interface ScoreResult {
  gameId: string;
  durationMs: number;
  metrics: Metric[];
  summary: string;
  raw?: Record<string, unknown>;
}

export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function combineMetrics(metrics: Metric[]): number {
  if (!metrics.length) return 0;
  const sum = metrics.reduce((a, m) => a + m.value, 0);
  return clamp01(sum / metrics.length);
}

// Specific scoring helpers used by games
export const LeadershipScoring = {
  computeTimingAccuracy: (windows: Array<{ start: number; end: number }>, actions: Array<{ t: number }>) => {
    if (!windows.length || !actions.length) return 0;
    let hits = 0;
    actions.forEach((a) => {
      if (windows.some((w) => a.t >= w.start && a.t <= w.end)) hits++;
    });
    return clamp01(hits / actions.length);
  },
  computeRestraintBalance: (requiredWaits: number, performedActions: number) => {
    // Optimal actions equals requiredWaits; deviation reduces score
    if (requiredWaits <= 0) return performedActions > 0 ? 0 : 1;
    const diff = Math.abs(performedActions - requiredWaits);
    return clamp01(1 - diff / Math.max(1, requiredWaits));
  },
  focusStability: (deviations: number, totalPrompts: number) => {
    if (totalPrompts <= 0) return 0;
    return clamp01(1 - deviations / totalPrompts);
  },
};

export const ConflictScoring: {
  tagWeights: Readonly<{ Reactive: number; Defensive: number; Balanced: number }>;
  index: (tags: Array<'Reactive' | 'Defensive' | 'Balanced'>) => number;
} = {
  tagWeights: { Reactive: 0.2, Defensive: 0.5, Balanced: 1.0 },
  index: (tags) => {
    if (!tags.length) return 0;
    const sum = tags.reduce<number>((a, t) => a + (ConflictScoring.tagWeights as any)[t], 0);
    return clamp01(sum / tags.length);
  },
};

export const NoiseScoring = {
  selectiveAttention: (correct: number, total: number) => (total ? clamp01(correct / total) : 0),
  ruleRetention: (recall: number) => clamp01(recall),
  reactionPrecision: (msErrorAvg: number) => clamp01(1 - msErrorAvg / 500), // 500ms window baseline
};

export const EchoScoring = {
  listeningAccuracy: (correctUnits: number, totalUnits: number) => (totalUnits ? clamp01(correctUnits / totalUnits) : 0),
  emotionalReflection: (alignment: number) => clamp01(alignment),
  meaningRecall: (unitsRecalled: number, unitsTarget: number) => (unitsTarget ? clamp01(unitsRecalled / unitsTarget) : 0),
};

export const StillnessScoring = {
  impulseInhibition: (inputsCount: number, durationMs: number) => {
    // More stillness => higher score
    const perMinute = inputsCount / Math.max(1, durationMs / 60000);
    return clamp01(1 - perMinute / 10);
  },
  stillnessDuration: (quietMs: number, durationMs: number) => clamp01(quietMs / durationMs),
  calmSelfAssessment: (selfScore: number) => clamp01(selfScore),
};

export const OriginalityScoring = {
  // Placeholder uniqueness model: length + rare char ratio
  ideaUniqueness: (text: string) => {
    if (!text) return 0;
    const lenScore = clamp01(text.length / 300);
    const rareChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const rareScore = clamp01(rareChars / 30);
    return clamp01((lenScore + rareScore) / 2);
  },
  conceptualDistance: (keywords: string[]) => clamp01(Math.min(1, keywords.length / 10)),
};
