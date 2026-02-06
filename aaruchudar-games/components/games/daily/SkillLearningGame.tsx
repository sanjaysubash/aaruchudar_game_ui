// filepath: components/games/daily/SkillLearningGame.tsx
import React, { useState } from 'react';
import GameShell from '../core/GameShell';
import ResultCard from '../core/ResultCard';
import { ScoreResult } from '../core/ScoreEngine';

const skills = ['Language', 'Music', 'Any Skill'];

const SkillLearningGame: React.FC = () => {
  const [skill, setSkill] = useState<string | null>(null);
  const [reflections, setReflections] = useState<string[]>(['', '', '']);

  const reflectionQuality = Math.min(1, reflections.join(' ').trim().split(/\s+/).filter(Boolean).length / 200); // 200 words

  const computeScore = (timeSpentMs: number): ScoreResult => {
    const completion = timeSpentMs >= 0 ? 1 : 0; // ran timer
    const score = 100 * (0.6 * completion + 0.4 * reflectionQuality);
    return {
      gameId: 'saturday-skill',
      durationMs: timeSpentMs,
      metrics: [
        { name: 'Completion', value: completion },
        { name: 'Reflection Quality', value: reflectionQuality },
      ],
      summary: score >= 85 ? 'Excellent' : score >= 60 ? 'Balanced' : 'Needs Work',
      raw: { skill, reflectionWords: reflections.join(' ').trim().split(/\s+/).filter(Boolean).length, score },
    };
  };

  return (
    <GameShell
      durationMs={30 * 60 * 1000}
      onFinish={(res) => { try { if (typeof window !== 'undefined') localStorage.setItem('score:saturday-skill', JSON.stringify(res)); } catch {} }}
      render={({ phase, timeLeftMs, start, stop, setResult }) => {
        const result = computeScore(30 * 60 * 1000 - timeLeftMs);
        React.useEffect(() => {
          if (phase !== 'finished') {
            setResult(result);
          }
        }, [phase, timeLeftMs, reflections, skill]);
        if (phase === 'finished') {
          return (
            <div className="p-4 space-y-4">
              <ResultCard
                gameName="Skill Learning"
                score={Number(((result.raw as any)?.score ?? 0).toFixed?.(0) ?? (result.raw as any)?.score ?? 0)}
                timeSpentMs={result.durationMs}
                keyMetricLabel="Words"
                keyMetricValue={`${(result.raw as any)?.reflectionWords}`}
              />
              <div className="space-y-3">
                <div className="text-white/80">Reflection</div>
                {[0,1,2].map(i => (
                  <textarea key={i} className="w-full h-24 bg-black/40 border border-white/20 rounded p-3 outline-none" value={reflections[i]} onChange={(e) => setReflections(prev => { const next = prev.slice(); next[i] = e.target.value; return next; })} placeholder={`Reflection ${i+1}`} />
                ))}
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-2xl mx-auto text-white p-4">
            {phase === 'idle' && (
              <div className="space-y-3">
                <div className="text-white/80">Select a skill to focus on for 30 minutes.</div>
                <div className="flex gap-2">
                  {skills.map(s => (
                    <button key={s} className={`px-3 py-2 rounded border ${skill === s ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'}`} onClick={() => setSkill(s)}>{s}</button>
                  ))}
                </div>
                <button disabled={!skill} className="px-4 py-2 bg-white/10 border border-white/20 rounded disabled:opacity-50" onClick={start}>Start Session</button>
              </div>
            )}
            {phase === 'running' && (
              <div className="space-y-3">
                <div className="text-white/70">Focus on: {skill}</div>
                <div className="text-white/50">The timer runs silently. Practice or learn your chosen skill.</div>
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

export default SkillLearningGame;
