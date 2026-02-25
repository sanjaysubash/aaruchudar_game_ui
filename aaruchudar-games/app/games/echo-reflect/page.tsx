"use client";
import { useState } from 'react';
import EchoReflectGame from '../../../components/games/echo/EchoReflectGame';
import GameResult from '../../../components/games/core/GameResult';
import { ScoreResult } from '../../../components/games/core/ScoreEngine';

export default function EchoReflectPage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Echo Reflect</h1>
      {!result && <EchoReflectGame onFinish={(r) => setResult(r)} />}
      {result && <GameResult result={result} />}
    </main>
  );
}
