// filepath: app/games/tuesday-chess/page.tsx
'use client';
import React from 'react';
import ChessFocusGame from '../../../components/games/daily/ChessFocusGame';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Tuesday – Chess Decisions</h1>
      <ChessFocusGame />
    </div>
  );
}
