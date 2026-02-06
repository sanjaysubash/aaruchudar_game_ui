// filepath: app/games/monday-sudoku/page.tsx
'use client';
import React from 'react';
import SudokuGame from '../../../components/games/daily/SudokuGame';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Monday – Sudoku</h1>
      <SudokuGame />
    </div>
  );
}
