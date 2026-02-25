import { useEffect, useRef } from 'react';

interface Props {
  durationMs: number;
  running: boolean;
  onTick: (timeLeftMs: number) => void;
  onComplete: () => void;
}

const TICK_MS = 50; // fine-grained without heavy load

const GameTimer: React.FC<Props> = ({ durationMs, running, onTick, onComplete }) => {
  const startRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    startRef.current = performance.now();
    timerRef.current = window.setInterval(() => {
      const now = performance.now();
      const elapsed = (startRef.current ? now - startRef.current : 0);
      const left = Math.max(0, durationMs - elapsed);
      onTick(left);
      if (left <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        onComplete();
      }
    }, TICK_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [running, durationMs, onTick, onComplete]);

  return null;
};

export default GameTimer;