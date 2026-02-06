// filepath: components/games/daily/JigsawGame.tsx
import React, { useState } from 'react';
import GameShell from '../core/GameShell';
import ResultCard from '../core/ResultCard';
import { ScoreResult } from '../core/ScoreEngine';

const initialGrid = Array.from({ length: 16 }, (_, i) => i); // target order 0..15

const shuffle = (arr: number[]) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const JigsawGame: React.FC = () => {
  const [pieces, setPieces] = useState<number[]>(() => shuffle(initialGrid));
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const correctPlacements = pieces.reduce((acc, p, idx) => acc + (p === idx ? 1 : 0), 0);

  const computeScore = (timeSpentMs: number): ScoreResult => {
    const accuracy = correctPlacements / pieces.length;
    const speed = Math.max(0, 1 - timeSpentMs / (20 * 60 * 1000));
    const score = 100 * (0.7 * accuracy + 0.3 * speed);
    return {
      gameId: 'friday-jigsaw',
      durationMs: timeSpentMs,
      metrics: [
        { name: 'Accuracy', value: accuracy },
        { name: 'Speed', value: speed },
      ],
      summary: score >= 85 ? 'Excellent' : score >= 60 ? 'Balanced' : 'Needs Work',
      raw: { correctPlacements, total: pieces.length, score },
    };
  };

  return (
    <GameShell
      durationMs={20 * 60 * 1000}
      onFinish={(res) => { try { if (typeof window !== 'undefined') localStorage.setItem('score:friday-jigsaw', JSON.stringify(res)); } catch {} }}
      render={({ phase, timeLeftMs, start, stop, setResult }) => {
        const result = computeScore(20 * 60 * 1000 - timeLeftMs);
        React.useEffect(() => {
          if (phase !== 'finished') {
            setResult(result);
          }
        }, [phase, timeLeftMs, pieces]);
        if (phase === 'finished') {
          return (
            <div className="p-4">
              <ResultCard
                gameName="Jigsaw Puzzle"
                score={Number(((result.raw as any)?.score ?? 0).toFixed?.(0) ?? (result.raw as any)?.score ?? 0)}
                timeSpentMs={result.durationMs}
                keyMetricLabel="Correct"
                keyMetricValue={`${(result.raw as any)?.correctPlacements}/${(result.raw as any)?.total}`}
              />
            </div>
          );
        }
        return (
          <div className="max-w-xl mx-auto text-white p-4">
            {phase === 'idle' && (
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded" onClick={() => { setPieces(shuffle(initialGrid)); start(); }}>Start Jigsaw</button>
            )}
            {phase === 'running' && (
              <div className="grid grid-cols-4 gap-2 select-none">
                {pieces.map((p, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={() => setDragIndex(idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragIndex == null || dragIndex === idx) return;
                      setPieces((prev) => {
                        const next = prev.slice();
                        [next[dragIndex], next[idx]] = [next[idx], next[dragIndex]];
                        return next;
                      });
                      setDragIndex(null);
                    }}
                    className={`aspect-square rounded border bg-black/40 border-white/20 flex items-center justify-center text-xl ${p === idx ? 'text-green-400' : 'text-white'}`}
                  >
                    {p + 1}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
              <span>Correct: {correctPlacements}/{pieces.length}</span>
              <button className="ml-auto px-3 py-2 bg-white/10 border border-white/20 rounded" onClick={stop}>Finish</button>
            </div>
          </div>
        );
      }}
    />
  );
};

export default JigsawGame;
