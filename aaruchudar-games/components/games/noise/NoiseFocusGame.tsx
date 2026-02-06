import React, { useEffect, useRef, useState } from 'react';
import GameShell from '../core/GameShell';
import { NoiseScoring, ScoreResult } from '../core/ScoreEngine';

const DURATION_MS = 120_000;

const NoiseFocusGame: React.FC<{ onFinish: (r: ScoreResult) => void }> = ({ onFinish }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [msErrorAvg, setMsErrorAvg] = useState(0);
  const [lastTargetTime, setLastTargetTime] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  const playNoiseBurst = (isTarget: boolean) => {
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = isTarget ? 660 : 330 + Math.random() * 400;
    gain.gain.value = 0.05;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  };

  const schedule = (timeLeftMs: number) => {
    const elapsed = DURATION_MS - timeLeftMs;
    // Every ~2s a command, one of them is correct by rule: frequency closest to 660
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const isTarget = Math.random() < 0.33;
    playNoiseBurst(isTarget);
    setTotalCount((c) => c + 1);
    if (isTarget) setLastTargetTime(performance.now()); else setLastTargetTime(null);
  };

  const onUserReact = (timeLeftMs: number) => {
    const now = performance.now();
    if (lastTargetTime) {
      const err = Math.abs(now - lastTargetTime);
      setCorrectCount((c) => c + 1);
      setMsErrorAvg((prev) => (prev === 0 ? err : (prev + err) / 2));
    }
  };

  const compute = (): ScoreResult => {
    const sa = NoiseScoring.selectiveAttention(correctCount, totalCount);
    const rr = NoiseScoring.ruleRetention(0.7); // placeholder rule memory
    const rp = NoiseScoring.reactionPrecision(msErrorAvg || 500);
    return {
      gameId: 'noise-focus',
      durationMs: DURATION_MS,
      metrics: [
        { name: 'Selective Attention', value: sa },
        { name: 'Rule Retention', value: rr },
        { name: 'Reaction Precision', value: rp },
      ],
      summary: 'Noise clarity measured.',
      raw: { correctCount, totalCount, msErrorAvg },
    };
  };

  return (
    <GameShell
      durationMs={DURATION_MS}
      onFinish={(r) => onFinish(r)}
      render={({ phase, timeLeftMs, start, setResult }) => {
        useEffect(() => {
          if (phase === 'running') {
            const iv = setInterval(() => schedule(timeLeftMs), 2000);
            return () => clearInterval(iv);
          }
        }, [phase, timeLeftMs]);
        useEffect(() => { if (phase === 'finished') setResult(compute()); }, [phase]);
        return (
          <div style={{ display: 'grid', gap: 12 }}>
            {phase !== 'running' && <button onClick={start}>Start</button>}
            <button disabled={phase !== 'running'} onClick={() => onUserReact(timeLeftMs)}>React</button>
            <span>Time Left: {Math.ceil(timeLeftMs / 1000)}s</span>
          </div>
        );
      }}
    />
  );
};

export default NoiseFocusGame;