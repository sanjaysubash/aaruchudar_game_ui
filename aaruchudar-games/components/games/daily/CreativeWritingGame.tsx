// filepath: components/games/daily/CreativeWritingGame.tsx
import React, { useState } from 'react';
import GameShell from '../core/GameShell';
import ResultCard from '../core/ResultCard';
import { ScoreResult } from '../core/ScoreEngine';

const promptText = 'Write about a moment of clarity you experienced recently. Focus on sensations and thoughts.';

const CreativeWritingGame: React.FC = () => {
  const [text, setText] = useState('');

  const computeScore = (timeSpentMs: number): ScoreResult => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const completion = text.trim().length > 0 ? 1 : 0;
    const expressionVolume = Math.min(1, words / 300); // 300 words -> full
    const score = 100 * (0.5 * completion + 0.5 * expressionVolume);
    return {
      gameId: 'thursday-writing',
      durationMs: timeSpentMs,
      metrics: [
        { name: 'Completion', value: completion },
        { name: 'Expression Volume', value: expressionVolume },
      ],
      summary: score >= 85 ? 'Excellent' : score >= 60 ? 'Balanced' : 'Needs Work',
      raw: { words, score },
    };
  };

  return (
    <GameShell
      durationMs={15 * 60 * 1000}
      onFinish={(res) => { try { if (typeof window !== 'undefined') localStorage.setItem('score:thursday-writing', JSON.stringify(res)); } catch {} }}
      render={({ phase, timeLeftMs, start, stop, setResult }) => {
        const result = computeScore(15 * 60 * 1000 - timeLeftMs);
        React.useEffect(() => {
          if (phase !== 'finished') {
            setResult(result);
          }
        }, [phase, timeLeftMs, text]);
        if (phase === 'finished') {
          return (
            <div className="p-4">
              <ResultCard
                gameName="Creative Writing"
                score={Number(((result.raw as any)?.score ?? 0).toFixed?.(0) ?? (result.raw as any)?.score ?? 0)}
                timeSpentMs={result.durationMs}
                keyMetricLabel="Words"
                keyMetricValue={`${(result.raw as any)?.words}`}
              />
            </div>
          );
        }
        return (
          <div className="max-w-2xl mx-auto text-white p-4">
            {phase === 'idle' && (
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded" onClick={start}>Start Writing</button>
            )}
            {phase === 'running' && (
              <div className="space-y-3">
                <div className="text-white/80">{promptText}</div>
                <textarea
                  className="w-full h-64 bg-black/40 border border-white/20 rounded p-3 outline-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your response here..."
                />
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

export default CreativeWritingGame;
