import React, { useEffect, useRef, useState } from 'react';
import GameTimer from './GameTimer';
import { InputTracker, TrackedEvent } from './InputTracker';
import { ScoreResult } from './ScoreEngine';

export type GamePhase = 'idle' | 'running' | 'finished';

export interface GameShellProps {
  durationMs: number;
  onFinish: (result: ScoreResult) => void;
  render: (ctx: {
    phase: GamePhase;
    timeLeftMs: number;
    start: () => void;
    stop: () => void;
    tracker: InputTracker;
    events: TrackedEvent[];
    setResult: (r: ScoreResult) => void;
  }) => React.ReactNode;
}

const GameShell: React.FC<GameShellProps> = ({ durationMs, onFinish, render }) => {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [timeLeftMs, setTimeLeftMs] = useState<number>(durationMs);
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const trackerRef = useRef<InputTracker>(new InputTracker((e: TrackedEvent) => setEvents((prev) => [...prev, e])));

  useEffect(() => {
    const tracker = trackerRef.current;
    if (phase === 'running') {
      tracker.attach();
    } else {
      tracker.detach();
    }
    return () => tracker.detach();
  }, [phase]);

  const handleFinish = () => {
    setPhase('finished');
    if (result) onFinish(result);
  };

  const start = () => {
    setEvents([]);
    setResult(null);
    setPhase('running');
    setTimeLeftMs(durationMs);
  };
  const stop = () => {
    setPhase('finished');
    handleFinish();
  };

  return (
    <div className="game-shell">
      {phase !== 'finished' && (
        <GameTimer
          durationMs={durationMs}
          running={phase === 'running'}
          onTick={setTimeLeftMs}
          onComplete={handleFinish}
        />
      )}
      {render({
        phase,
        timeLeftMs,
        start,
        stop,
        tracker: trackerRef.current,
        events,
        setResult: (r) => setResult(r),
      })}
    </div>
  );
};

export default GameShell;