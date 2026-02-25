// filepath: components/games/daily/ChessFocusGame.tsx
import React, { useMemo, useState, useEffect } from 'react';
import GameShell from '../core/GameShell';
import ResultCard from '../core/ResultCard';
import { ScoreResult } from '../core/ScoreEngine';

// Simple positions represented by FEN-like id and best move among options
const positions = [
  { id: 'pos1', prompt: 'White to move: Choose the best tactical move', options: ['Qh7+', 'Qe7', 'Qg6'], best: 0 },
  { id: 'pos2', prompt: 'Black to move: Secure advantage', options: ['...Nd4', '...Qe7', '...c5'], best: 2 },
  { id: 'pos3', prompt: 'White to move: Endgame choice', options: ['Kf3', 'h4', 'g4'], best: 1 },
  { id: 'pos4', prompt: 'Black to move: Attack continuation', options: ['...Rg8', '...Qh3', '...Nd4'], best: 1 },
  { id: 'pos5', prompt: 'White to move: Defend accurately', options: ['Bd2', 'Qd2', 'Re1'], best: 2 },
];

const ChessFocusGame: React.FC = () => {
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(positions.length).fill(null));

  const computeScore = (timeSpentMs: number): ScoreResult => {
    const correct = answers.reduce<number>((acc, a, i) => acc + (a === positions[i].best ? 1 : 0), 0);
    const accuracy = correct / positions.length;
    const avgTimePerMove = positions.length ? timeSpentMs / positions.length : timeSpentMs;
    const decisionSpeed = Math.max(0, 1 - avgTimePerMove / (4 * 60 * 1000)); // baseline 4 min per move
    const score = 100 * (0.6 * accuracy + 0.4 * decisionSpeed);
    return {
      gameId: 'tuesday-chess',
      durationMs: timeSpentMs,
      metrics: [
        { name: 'Strategic Accuracy', value: accuracy },
        { name: 'Decision Speed', value: decisionSpeed },
      ],
      summary: score >= 85 ? 'Excellent' : score >= 60 ? 'Balanced' : 'Needs Work',
      raw: { correct, total: positions.length, score },
    };
  };

  return (
    <GameShell
      durationMs={20 * 60 * 1000}
      onFinish={(res) => { try { if (typeof window !== 'undefined') localStorage.setItem('score:tuesday-chess', JSON.stringify(res)); } catch {} }}
      render={({ phase, timeLeftMs, start, stop, setResult }) => {
        // Compute and set result in a stable effect with fixed deps
        React.useEffect(() => {
          if (phase !== 'finished') {
            const res = computeScore(20 * 60 * 1000 - timeLeftMs);
            setResult(res);
          }
        }, [phase, timeLeftMs]);
        if (phase === 'finished') {
          const finalRes = computeScore(20 * 60 * 1000 - timeLeftMs);
          return (
            <div className="p-4">
              <ResultCard
                gameName="Chess Decisions"
                score={Number(((finalRes.raw as any)?.score ?? 0).toFixed?.(0) ?? (finalRes.raw as any)?.score ?? 0)}
                timeSpentMs={finalRes.durationMs}
                keyMetricLabel="Correct"
                keyMetricValue={`${(finalRes.raw as any)?.correct}/${(finalRes.raw as any)?.total}`}
              />
            </div>
          );
        }
        return (
          <div className="max-w-2xl mx-auto text-white p-4">
            {phase === 'idle' && (
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded" onClick={start}>Start Chess</button>
            )}
            {phase === 'running' && (
              <div className="space-y-4">
                {positions.map((p, i) => (
                  <div key={p.id} className="rounded border border-white/10 bg-black/40 p-3">
                    <div className="text-sm mb-2 text-white/80">{p.prompt}</div>
                    <div className="flex gap-2">
                      {p.options.map((opt, idx) => (
                        <button
                          key={opt}
                          className={`px-3 py-2 rounded border ${answers[i] === idx ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'}`}
                          onClick={() => setAnswers(prev => { const next = prev.slice(); next[i] = idx; return next; })}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-white/10 border border-white/20 rounded" onClick={stop}>Finish</button>
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ChessFocusGame;
