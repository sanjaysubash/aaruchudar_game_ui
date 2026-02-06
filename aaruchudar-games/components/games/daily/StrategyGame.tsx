// filepath: components/games/daily/StrategyGame.tsx
import React, { useState } from 'react';
import GameShell from '../core/GameShell';
import ResultCard from '../core/ResultCard';
import { ScoreResult } from '../core/ScoreEngine';

const scenarios = [
  { id: 's1', prompt: 'Market downturn: Choose your portfolio move.', choices: ['Reduce risk', 'Hold steady', 'Increase risk'], tags: ['Defensive','Balanced','Reactive'] },
  { id: 's2', prompt: 'Team conflict: Your approach?', choices: ['Confront', 'Mediate', 'Avoid'], tags: ['Reactive','Balanced','Defensive'] },
  { id: 's3', prompt: 'Resource shortage: Strategy?', choices: ['Reallocate', 'Pause project', 'Push harder'], tags: ['Balanced','Defensive','Reactive'] },
  { id: 's4', prompt: 'Unexpected opportunity: Action?', choices: ['Analyze thoroughly', 'Quick pilot', 'Full commit'], tags: ['Defensive','Balanced','Reactive'] },
  { id: 's5', prompt: 'Competitor launches: Response?', choices: ['Differentiate', 'Price war', 'Ignore'], tags: ['Balanced','Reactive','Defensive'] },
];

const StrategyGame: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(Array(scenarios.length).fill(-1));

  const computeScore = (timeSpentMs: number): ScoreResult => {
    const tagsSelected = answers.map((a, i) => (a >= 0 ? scenarios[i].tags[a] : 'Balanced')) as Array<'Reactive'|'Defensive'|'Balanced'>;
    const consistency = tagsSelected.filter(t => t === 'Balanced').length / scenarios.length; // encourage balanced choices
    const score = 100 * consistency;
    return {
      gameId: 'sunday-strategy',
      durationMs: timeSpentMs,
      metrics: [
        { name: 'Strategic Consistency', value: consistency },
      ],
      summary: score >= 85 ? 'Excellent' : score >= 60 ? 'Balanced' : 'Needs Work',
      raw: { consistency, selections: tagsSelected, score },
    };
  };

  return (
    <GameShell
      durationMs={20 * 60 * 1000}
      onFinish={(res) => { try { if (typeof window !== 'undefined') localStorage.setItem('score:sunday-strategy', JSON.stringify(res)); } catch {} }}
      render={({ phase, timeLeftMs, start, stop, setResult }) => {
        React.useEffect(() => {
          if (phase !== 'finished') {
            const res = computeScore(20 * 60 * 1000 - timeLeftMs);
            setResult(res);
          }
        }, [phase, timeLeftMs]);
        if (phase === 'finished') {
          const result = computeScore(20 * 60 * 1000 - timeLeftMs);
          return (
            <div className="p-4">
              <ResultCard
                gameName="Strategy Scenarios"
                score={Number(((result.raw as any)?.score ?? 0).toFixed?.(0) ?? (result.raw as any)?.score ?? 0)}
                timeSpentMs={result.durationMs}
                keyMetricLabel="Consistency"
                keyMetricValue={`${Math.round((result.metrics[0].value) * 100)}%`}
              />
            </div>
          );
        }
        return (
          <div className="max-w-2xl mx-auto text-white p-4">
            {phase === 'idle' && (
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded" onClick={start}>Start Strategy</button>
            )}
            {phase === 'running' && (
              <div className="space-y-4">
                {scenarios.map((s, i) => (
                  <div key={s.id} className="rounded border border-white/10 bg-black/40 p-3">
                    <div className="text-sm mb-2 text-white/80">{s.prompt}</div>
                    <div className="flex gap-2">
                      {s.choices.map((c, idx) => (
                        <button key={c} className={`px-3 py-2 rounded border ${answers[i] === idx ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'}`} onClick={() => setAnswers(prev => { const next = prev.slice(); next[i] = idx; return next; })}>{c}</button>
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

export default StrategyGame;
