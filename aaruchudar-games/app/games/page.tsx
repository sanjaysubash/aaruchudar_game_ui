'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ResultCard from '../../components/games/core/ResultCard';

type SavedScore = { gameId: string; durationMs: number; metrics: { name: string; value: number }[]; summary: string; raw?: any };

const days = [
  { id: 'monday-sudoku', title: 'Monday – Sudoku', path: '/games/monday-sudoku', storageKey: 'score:monday-sudoku' },
  { id: 'tuesday-chess', title: 'Tuesday – Chess', path: '/games/tuesday-chess', storageKey: 'score:tuesday-chess' },
  { id: 'wednesday-memory', title: 'Wednesday – Memory', path: '/games/wednesday-memory', storageKey: 'score:wednesday-memory' },
  { id: 'thursday-writing', title: 'Thursday – Writing', path: '/games/thursday-writing', storageKey: 'score:thursday-writing' },
  { id: 'friday-jigsaw', title: 'Friday – Jigsaw', path: '/games/friday-jigsaw', storageKey: 'score:friday-jigsaw' },
  { id: 'saturday-skill', title: 'Saturday – Skill', path: '/games/saturday-skill', storageKey: 'score:saturday-skill' },
  { id: 'sunday-strategy', title: 'Sunday – Strategy', path: '/games/sunday-strategy', storageKey: 'score:sunday-strategy' },
];

export default function WeeklyDashboard() {
  const [scores, setScores] = useState<Record<string, SavedScore | null>>({});
  useEffect(() => {
    const loaded: Record<string, SavedScore | null> = {};
    days.forEach((d) => {
      try {
        const raw = localStorage.getItem(d.storageKey);
        loaded[d.id] = raw ? JSON.parse(raw) : null;
      } catch {
        loaded[d.id] = null;
      }
    });
    setScores(loaded);
  }, []);

  const total = useMemo(() => {
    return days.reduce((sum, d) => {
      const s = scores[d.id];
      const score = typeof s?.raw?.score === 'number' ? s.raw.score : 0;
      return sum + Math.round(score);
    }, 0);
  }, [scores]);

  const health = Math.min(100, Math.round((total / 700) * 100));
  const streak = useMemo(() => days.filter(d => !!scores[d.id]).length, [scores]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Weekly Dashboard</h1>
        <div className="mt-2 text-white/70">Weekly total: {total} / 700</div>
        <div className="mt-1 text-white/70">Brain Health Meter: {health}%</div>
        <div className="mt-1 text-white/70">Streak: {streak} / 7 days</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {days.map((d) => {
          const s = scores[d.id];
          const score = typeof s?.raw?.score === 'number' ? Math.round(s.raw.score) : 0;
          const time = s?.durationMs ?? 0;
          const keyMetric = s?.metrics?.[0];
          return (
            <div key={d.id} className="rounded-xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">{d.title}</h2>
                <Link className="text-sm text-blue-300" href={d.path}>Play</Link>
              </div>
              {s ? (
                <ResultCard gameName={d.title} score={score} timeSpentMs={time} keyMetricLabel={keyMetric?.name ?? 'Metric'} keyMetricValue={keyMetric ? Math.round(keyMetric.value * 100) + '%' : '-'} />
              ) : (
                <div className="text-white/60">No score yet.</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
