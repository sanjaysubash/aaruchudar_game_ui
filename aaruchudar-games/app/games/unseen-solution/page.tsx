"use client";
import { useState } from 'react';
import UnseenSolutionGame from '../../../components/games/originality/UnseenSolutionGame';
import GameResult from '../../../components/games/core/GameResult';
import { ScoreResult } from '../../../components/games/core/ScoreEngine';

export default function UnseenSolutionPage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>The Unseen Solution</h1>
      {!result && <UnseenSolutionGame onFinish={(r) => setResult(r)} />}
      {result && <GameResult result={result} />}
    </main>
  );
}
