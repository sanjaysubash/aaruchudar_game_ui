// filepath: components/games/daily/SudokuGame.tsx
import React, { useMemo, useState } from 'react';
import GameShell from '../core/GameShell';
import { ScoreResult } from '../core/ScoreEngine';
import ResultCard from '../core/ResultCard';

// Pre-filled Sudoku (0 means empty). Simple valid puzzle for demo purposes.
const puzzle: number[][] = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9],
];

// Solution for validation
const solution: number[][] = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9],
];

const isFixed = (r: number, c: number) => puzzle[r][c] !== 0;

const SudokuGame: React.FC<{ onDone?: (res: ScoreResult) => void }> = ({ onDone }) => {
  const [grid, setGrid] = useState<number[][]>(() => puzzle.map(row => row.slice()));
  const [errors, setErrors] = useState(0);
  const [correctPlacements, setCorrectPlacements] = useState(0);

  const emptyCount = useMemo(() => puzzle.flat().filter(v => v === 0).length, []);

  const placeNumber = (r: number, c: number, val: number) => {
    if (isFixed(r, c)) return;
    setGrid(prev => {
      const next = prev.map(row => row.slice());
      const correct = solution[r][c] === val;
      if (correct) {
        if (next[r][c] !== solution[r][c]) setCorrectPlacements(p => p + 1);
        next[r][c] = val;
      } else {
        setErrors(e => e + 1);
        next[r][c] = val; // allow but mark error via styling
      }
      return next;
    });
  };

  const computeScore = (timeSpentMs: number): ScoreResult => {
    const completion = correctPlacements / emptyCount;
    const accuracy = Math.max(0, (correctPlacements - errors) / Math.max(1, correctPlacements));
    const timeEfficiency = Math.max(0, 1 - timeSpentMs / (15 * 60 * 1000));
    const score = 100 * (0.5 * accuracy + 0.3 * timeEfficiency + 0.2 * completion);
    return {
      gameId: 'monday-sudoku',
      durationMs: timeSpentMs,
      metrics: [
        { name: 'Accuracy', value: accuracy },
        { name: 'Time Efficiency', value: timeEfficiency },
        { name: 'Completion', value: completion },
      ],
      summary: score >= 85 ? 'Excellent' : score >= 60 ? 'Balanced' : 'Needs Work',
      raw: { correctPlacements, errors, emptyCount, score },
    };
  };

  return (
    <GameShell
      durationMs={15 * 60 * 1000}
      onFinish={(res) => { try { if (typeof window !== 'undefined') localStorage.setItem('score:monday-sudoku', JSON.stringify(res)); } catch {} onDone?.(res); }}
      render={({ phase, timeLeftMs, start, stop, setResult }) => {
        const timeSpent = 15 * 60 * 1000 - timeLeftMs;
        const result = computeScore(timeSpent);
        // Move state update into an effect to avoid re-render loops
        React.useEffect(() => {
          if (phase !== 'finished') {
            setResult(result);
          }
        }, [phase, timeLeftMs, errors, correctPlacements]);
        if (phase === 'finished') {
          return (
            <div className="p-4">
              <ResultCard
                gameName="Sudoku"
                score={Number(((result.raw as any)?.score ?? 0).toFixed?.(0) ?? (result.raw as any)?.score ?? 0)}
                timeSpentMs={result.durationMs}
                keyMetricLabel="Correct"
                keyMetricValue={`${correctPlacements}/${emptyCount}`}
              />
            </div>
          );
        }
        return (
          <div className="max-w-3xl mx-auto text-white p-4">
            {phase === 'idle' && (
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded" onClick={start}>Start Sudoku</button>
            )}
            {phase === 'running' && (
              <div className="mt-4 grid grid-cols-9 gap-1">
                {grid.map((row, r) => row.map((val, c) => {
                  const fixed = isFixed(r,c);
                  const isError = val !== 0 && val !== solution[r][c];
                  return (
                    <div key={`${r}-${c}`} className={`aspect-square flex items-center justify-center text-lg border ${fixed ? 'bg-white/5 border-white/20' : 'bg-black/40 border-white/10'} ${isError ? 'text-red-400' : ''}`}>
                      {fixed ? (
                        <span>{val}</span>
                      ) : (
                        <input
                          className="w-full h-full bg-transparent text-center outline-none"
                          inputMode="numeric"
                          maxLength={1}
                          value={val === 0 ? '' : String(val)}
                          onChange={(e) => {
                            const n = Number(e.target.value.replace(/[^1-9]/g, ''));
                            if (!isNaN(n) && n >= 1 && n <= 9) placeNumber(r, c, n);
                          }}
                        />
                      )}
                    </div>
                  );
                }))}
              </div>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
              <span>Errors: {errors}</span>
              <span>Correct: {correctPlacements}</span>
              <button className="ml-auto px-3 py-2 bg-white/10 border border-white/20 rounded" onClick={stop}>Finish</button>
            </div>
          </div>
        );
      }}
    />
  );
};

export default SudokuGame;
