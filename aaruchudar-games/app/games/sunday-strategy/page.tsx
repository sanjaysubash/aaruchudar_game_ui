// filepath: app/games/sunday-strategy/page.tsx
'use client';
import React from 'react';
import StrategyGame from '../../../components/games/daily/StrategyGame';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Sunday – Strategy</h1>
      <StrategyGame />
    </div>
  );
}
