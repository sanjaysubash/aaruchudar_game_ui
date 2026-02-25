"use client";
import { useState } from 'react';
import CommandPulseGame from '../../../components/games/leadership/CommandPulseGame';
import GameResult from '../../../components/games/core/GameResult';
import { ScoreResult } from '../../../components/games/core/ScoreEngine';

export default function CommandPulsePage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Command Pulse</h1>
      {!result && <CommandPulseGame onFinish={(r) => setResult(r)} />}
      {result && <GameResult result={result} />}
    </main>
  );
}
