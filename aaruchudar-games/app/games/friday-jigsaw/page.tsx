// filepath: app/games/friday-jigsaw/page.tsx
'use client';
import React from 'react';
import JigsawGame from '../../../components/games/daily/JigsawGame';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Friday – Jigsaw Puzzle</h1>
      <JigsawGame />
    </div>
  );
}
