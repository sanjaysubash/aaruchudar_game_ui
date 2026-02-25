import React from 'react';
import { ScoreResult } from './ScoreEngine';

interface Props {
  result: ScoreResult;
}

const GameResult: React.FC<Props> = ({ result }) => {
  return (
    <div aria-live="polite">
      <h2>Result</h2>
      <p>Game: {result.gameId}</p>
      <p>Duration: {Math.round(result.durationMs / 1000)}s</p>
      <ul>
        {result.metrics.map((m) => (
          <li key={m.name}>
            {m.name}: {(m.value * 100).toFixed(0)}%
          </li>
        ))}
      </ul>
      <p>{result.summary}</p>
    </div>
  );
};

export default GameResult;
