import React, { useEffect, useState } from 'react';
import GameShell from '../core/GameShell';
import { OriginalityScoring, ScoreResult } from '../core/ScoreEngine';

const DURATION_MS = 180_000;

const UnseenSolutionGame: React.FC<{ onFinish: (r: ScoreResult) => void }> = ({ onFinish }) => {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const compute = (): ScoreResult => {
    const u = OriginalityScoring.ideaUniqueness(text);
    const d = OriginalityScoring.conceptualDistance(keywords);
    return {
      gameId: 'unseen-solution',
      durationMs: DURATION_MS,
      metrics: [
        { name: 'Idea Uniqueness', value: u },
        { name: 'Conceptual Distance', value: d },
      ],
      summary: 'Originality assessed.',
      raw: { text, keywords },
    };
  };

  return (
    <GameShell
      durationMs={DURATION_MS}
      onFinish={(r) => onFinish(r)}
      render={({ phase, start, setResult, timeLeftMs }) => {
        useEffect(() => { if (phase === 'finished') setResult(compute()); }, [phase]);
        return (
          <div style={{ display: 'grid', gap: 12 }}>
            {phase === 'idle' && <button onClick={start}>Start Prompt</button>}
            <p>Prompt: Propose an unconventional way to improve deep-work focus without digital tools.</p>
            <textarea
              rows={8}
              placeholder="Type your idea..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <label>
              Keywords (comma-separated):
              <input
                placeholder="e.g., nature, ritual, architecture"
                onChange={(e) => {
                  const ks = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                  setKeywords(ks);
                }}
              />
            </label>
            <div>Time Left: {Math.ceil(timeLeftMs / 1000)}s</div>
          </div>
        );
      }}
    />
  );
};

export default UnseenSolutionGame;