"use client";
import { useState } from 'react';
import NoiseFocusGame from '../../../components/games/noise/NoiseFocusGame';
import GameResult from '../../../components/games/core/GameResult';
import { ScoreResult } from '../../../components/games/core/ScoreEngine';

export default function NoiseFocusPage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Command Pulse – Noise Edition</h1>
      {!result && <NoiseFocusGame onFinish={(r) => setResult(r)} />}
      {result && <GameResult result={result} />}
    </main>
  );
}
