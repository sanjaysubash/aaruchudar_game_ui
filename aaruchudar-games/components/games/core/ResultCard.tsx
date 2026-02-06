// filepath: components/games/core/ResultCard.tsx
import React from 'react';

export interface ResultCardProps {
  gameName: string;
  score: number; // 0-100
  timeSpentMs: number;
  keyMetricLabel: string;
  keyMetricValue: string | number;
}

const formatTime = (ms: number) => {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}m ${secs}s`;
};

const getMessage = (score: number) => {
  if (score >= 85) return 'Excellent';
  if (score >= 60) return 'Balanced';
  return 'Needs Work';
};

const ResultCard: React.FC<ResultCardProps> = ({ gameName, score, timeSpentMs, keyMetricLabel, keyMetricValue }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur p-4 sm:p-6 text-white max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-semibold">{gameName}</h3>
        <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20">
          {getMessage(score)}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-white/60">Score</span>
          <span className="text-2xl font-bold">{Math.round(score)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-white/60">Time</span>
          <span className="text-2xl font-bold">{formatTime(timeSpentMs)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-white/60">{keyMetricLabel}</span>
          <span className="text-2xl font-bold">{String(keyMetricValue)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
