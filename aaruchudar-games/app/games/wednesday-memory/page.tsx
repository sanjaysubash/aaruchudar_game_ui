// filepath: app/games/wednesday-memory/page.tsx
'use client';
import React from 'react';
import MemoryCardGame from '../../../components/games/daily/MemoryCardGame';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Wednesday – Memory Match</h1>
      <MemoryCardGame />
    </div>
  );
}
