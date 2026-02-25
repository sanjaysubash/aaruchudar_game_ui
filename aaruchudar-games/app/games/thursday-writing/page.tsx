// filepath: app/games/thursday-writing/page.tsx
'use client';
import React from 'react';
import CreativeWritingGame from '../../../components/games/daily/CreativeWritingGame';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Thursday – Creative Writing</h1>
      <CreativeWritingGame />
    </div>
  );
}
