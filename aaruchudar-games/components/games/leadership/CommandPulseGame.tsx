import React, { useEffect, useRef, useState } from 'react';
import GameShell from '../core/GameShell';
import { LeadershipScoring, ScoreResult } from '../core/ScoreEngine';

const DURATION_MS = 180_000;
const PROMPTS = ['Delegate', 'Take Control', 'Calm Team', 'Wait'] as const;

type Prompt = typeof PROMPTS[number];

interface PulsePrompt { text: Prompt; start: number; end: number; }

function schedulePrompts(durationMs: number): PulsePrompt[] {
  const windows: PulsePrompt[] = [];
  const rng = Math.random;
  let t = 2000;
  while (t < durationMs - 3000) {
    const p = PROMPTS[Math.floor(rng() * PROMPTS.length)];
    const len = 1200 + Math.floor(rng() * 1000);
    windows.push({ text: p, start: t, end: t + len });
    t += 2500 + Math.floor(rng() * 2500);
  }
  return windows;
}

const CommandPulseGame: React.FC<{ onFinish: (r: ScoreResult) => void }> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [windows] = useState<PulsePrompt[]>(() => schedulePrompts(DURATION_MS));
  const [currentPrompt, setCurrentPrompt] = useState<PulsePrompt | null>(null);
  const [actions, setActions] = useState<{ t: number; prompt: Prompt }[]>([]);
  const [deviations, setDeviations] = useState(0);

  const draw = (ctx: CanvasRenderingContext2D, timeLeftMs: number) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    const elapsed = DURATION_MS - timeLeftMs;
    const pulse = Math.sin(elapsed / 400) * 0.5 + 0.5; // 0..1
    const barH = 20 + pulse * 60;
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(0, h / 2 - barH / 2, w, barH);

    // Show current prompt
    const prompt = windows.find((w) => elapsed >= w.start && elapsed <= w.end) || null;
    setCurrentPrompt(prompt);
    if (prompt) {
      ctx.fillStyle = '#fff';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(prompt.text, w / 2, h / 2 - barH - 20);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const act = (prompt: Prompt, t: number) => {
    setActions((prev) => [...prev, { t, prompt }]);
    const expected = currentPrompt?.text;
    if (!expected || expected !== prompt) setDeviations((d) => d + 1);
  };

  const computeResult = (): ScoreResult => {
    const timingAcc = LeadershipScoring.computeTimingAccuracy(
      windows.map((w) => ({ start: w.start, end: w.end })),
      actions.map((a) => ({ t: a.t }))
    );
    const restraint = LeadershipScoring.computeRestraintBalance(
      windows.filter((w) => w.text === 'Wait').length,
      actions.filter((a) => a.prompt === 'Wait').length
    );
    const stability = LeadershipScoring.focusStability(deviations, windows.length);

    return {
      gameId: 'command-pulse',
      durationMs: DURATION_MS,
      metrics: [
        { name: 'Timing Accuracy', value: timingAcc },
        { name: 'Action-Restraint Balance', value: restraint },
        { name: 'Focus Stability', value: stability },
      ],
      summary: 'Leadership pulse session complete.',
      raw: { windows, actions, deviations },
    };
  };

  return (
    <GameShell
      durationMs={DURATION_MS}
      onFinish={(r) => onFinish(r)}
      render={({ phase, timeLeftMs, start, tracker, setResult }) => {
        // hook inputs
        useEffect(() => {
          const onKey = (ev: KeyboardEvent) => {
            const t = DURATION_MS - timeLeftMs;
            if (ev.code === 'Digit1') act('Delegate', t);
            if (ev.code === 'Digit2') act('Take Control', t);
            if (ev.code === 'Digit3') act('Calm Team', t);
            if (ev.code === 'Digit4') act('Wait', t);
          };
          if (phase === 'running') window.addEventListener('keydown', onKey);
          return () => window.removeEventListener('keydown', onKey);
        }, [phase, timeLeftMs]);

        useEffect(() => {
          if (phase === 'finished') setResult(computeResult());
        }, [phase]);

        useEffect(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          draw(ctx, timeLeftMs);
        }, [timeLeftMs]);

        return (
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {phase !== 'running' && (
                <button onClick={start} aria-label="Start">Start</button>
              )}
              <span>Time Left: {Math.ceil(timeLeftMs / 1000)}s</span>
              <div style={{ marginLeft: 'auto' }}>
                <span>Keys: 1=Delegate 2=Take Control 3=Calm Team 4=Wait</span>
              </div>
            </div>
            <div style={{ border: '1px solid #333', borderRadius: 8, height: 240 }}>
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        );
      }}
    />
  );
};

export default CommandPulseGame;