// filepath: components/games/daily/MemoryCardGame.tsx
import React, { useEffect, useMemo, useState } from 'react';
import GameShell from '../core/GameShell';
import ResultCard from '../core/ResultCard';
import { ScoreResult } from '../core/ScoreEngine';

const generateDeck = () => {
  const ids = Array.from({ length: 8 }, (_, i) => i + 1);
  const deck = [...ids, ...ids].map((id, idx) => ({ id, key: `${id}-${idx}`, matched: false }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const MemoryCardGame: React.FC = () => {
  const [deck, setDeck] = useState(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]); // indexes
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);

  const totalPairs = 8;

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      const isMatch = deck[a].id === deck[b].id;
      setAttempts((x) => x + 1);
      if (isMatch) {
        setDeck((prev) => {
          const next = prev.slice();
          next[a] = { ...next[a], matched: true };
          next[b] = { ...next[b], matched: true };
          return next;
        });
        setMatches((m) => m + 1);
      }
      setTimeout(() => setFlipped([]), 700);
    }
  }, [flipped, deck]);

  const computeScore = (timeSpentMs: number): ScoreResult => {
    const matchScore = matches / totalPairs; // 0..1
    const attemptsEfficiency = attempts ? Math.max(0, (matches / attempts)) : 0; // 0..1
    const score = 100 * (0.6 * matchScore + 0.4 * attemptsEfficiency);
    return {
      gameId: 'wednesday-memory',
      durationMs: timeSpentMs,
      metrics: [
        { name: 'Matches', value: matchScore },
        { name: 'Attempts Efficiency', value: attemptsEfficiency },
      ],
      summary: score >= 85 ? 'Excellent' : score >= 60 ? 'Balanced' : 'Needs Work',
      raw: { matches, attempts, score },
    };
  };

  return (
    <GameShell
      durationMs={15 * 60 * 1000}
      onFinish={(res) => { try { if (typeof window !== 'undefined') localStorage.setItem('score:wednesday-memory', JSON.stringify(res)); } catch {} }}
      render={({ phase, timeLeftMs, start, stop, setResult }) => {
        const timeSpent = 15 * 60 * 1000 - timeLeftMs;
        const result = computeScore(timeSpent);
        React.useEffect(() => {
          if (phase !== 'finished') {
            setResult(result);
          }
        }, [phase, timeLeftMs, attempts, matches]);
        if (phase === 'finished') {
          return (
            <div className="p-4">
              <ResultCard
                gameName="Memory Match"
                score={Number(((result.raw as any)?.score ?? 0).toFixed?.(0) ?? (result.raw as any)?.score ?? 0)}
                timeSpentMs={result.durationMs}
                keyMetricLabel="Matches"
                keyMetricValue={`${matches}/${totalPairs}`}
              />
            </div>
          );
        }
        return (
          <div className="max-w-xl mx-auto text-white p-4">
            {phase === 'idle' && (
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded" onClick={() => { setDeck(generateDeck()); setFlipped([]); setAttempts(0); setMatches(0); start(); }}>Start Memory</button>
            )}
            {phase === 'running' && (
              <div className="grid grid-cols-4 gap-2">
                {deck.map((card, idx) => {
                  const isOpen = flipped.includes(idx) || card.matched;
                  return (
                    <button
                      key={card.key}
                      className={`aspect-square rounded border ${isOpen ? 'bg-white/20 border-white/30' : 'bg-black/40 border-white/20'}`}
                      onClick={() => {
                        if (isOpen || flipped.length === 2) return;
                        setFlipped((f) => [...f, idx]);
                      }}
                    >
                      <span className="text-xl">{isOpen ? card.id : '?'}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
              <span>Attempts: {attempts}</span>
              <span>Matches: {matches}</span>
              <button className="ml-auto px-3 py-2 bg-white/10 border border-white/20 rounded" onClick={stop}>Finish</button>
            </div>
          </div>
        );
      }}
    />
  );
};

export default MemoryCardGame;
