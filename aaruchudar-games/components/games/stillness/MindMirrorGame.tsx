import React, { useEffect, useState } from 'react';
import GameShell from '../core/GameShell';
import { StillnessScoring, ScoreResult } from '../core/ScoreEngine';

const DURATION_MS = 120_000;

const MindMirrorGame: React.FC<{ onFinish: (r: ScoreResult) => void }> = ({ onFinish }) => {
  const [inputsCount, setInputsCount] = useState(0);
  const [quietMs, setQuietMs] = useState(0);
  const [lastInputT, setLastInputT] = useState<number>(performance.now());
  const [selfScore, setSelfScore] = useState(0.5);

  const onAnyInput = () => {
    setInputsCount((c) => c + 1);
    const now = performance.now();
    setQuietMs((q) => q + Math.max(0, now - lastInputT));
    setLastInputT(now);
  };

  const compute = (): ScoreResult => {
    const ii = StillnessScoring.impulseInhibition(inputsCount, DURATION_MS);
    const sd = StillnessScoring.stillnessDuration(quietMs, DURATION_MS);
    const cs = StillnessScoring.calmSelfAssessment(selfScore);
    return {
      gameId: 'mind-mirror',
      durationMs: DURATION_MS,
      metrics: [
        { name: 'Impulse Inhibition', value: ii },
        { name: 'Stillness Duration', value: sd },
        { name: 'Calm Self-Assessment', value: cs },
      ],
      summary: 'Stillness measured.',
      raw: { inputsCount, quietMs, selfScore },
    };
  };

  return (
    <GameShell
      durationMs={DURATION_MS}
      onFinish={(r) => onFinish(r)}
      render={({ phase, start, setResult }) => {
        useEffect(() => {
          const onKey = () => onAnyInput();
          const onMouse = () => onAnyInput();
          if (phase === 'running') {
            window.addEventListener('keydown', onKey);
            window.addEventListener('mousedown', onMouse);
          }
          return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('mousedown', onMouse);
          };
        }, [phase]);
        useEffect(() => { if (phase === 'finished') setResult(compute()); }, [phase]);
        return (
          <div style={{ display: 'grid', gap: 12 }}>
            {phase === 'idle' && <button onClick={start}>Begin Stillness</button>}
            <p>No input expected. Remain still. Subtle distractions may occur.</p>
            <label>
              Calm self-assessment (0-1):
              <input type="range" min={0} max={1} step={0.01} value={selfScore} onChange={(e) => setSelfScore(Number(e.target.value))} />
            </label>
          </div>
        );
      }}
    />
  );
};

export default MindMirrorGame;