"use client";
import { useState } from 'react';
import MindMirrorGame from '../../../components/games/stillness/MindMirrorGame';
import GameResult from '../../../components/games/core/GameResult';
import { ScoreResult } from '../../../components/games/core/ScoreEngine';

export default function MindMirrorPage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Mind Mirror</h1>
      {!result && <MindMirrorGame onFinish={(r) => setResult(r)} />}
      {result && <GameResult result={result} />}
    </main>
  );
}
