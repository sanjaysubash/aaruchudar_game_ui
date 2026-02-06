"use client";
import { useState } from 'react';
import MirrorArgumentGame from '../../../components/games/conflict/MirrorArgumentGame';
import GameResult from '../../../components/games/core/GameResult';
import { ScoreResult } from '../../../components/games/core/ScoreEngine';

export default function MirrorArgumentPage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>The Mirror Argument</h1>
      {!result && <MirrorArgumentGame onFinish={(r) => setResult(r)} />}
      {result && <GameResult result={result} />}
    </main>
  );
}
