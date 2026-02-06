// filepath: app/games/saturday-skill/page.tsx
'use client';
import React from 'react';
import SkillLearningGame from '../../../components/games/daily/SkillLearningGame';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Saturday – Skill Learning</h1>
      <SkillLearningGame />
    </div>
  );
}
