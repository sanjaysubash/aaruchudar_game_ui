import React, { useEffect, useState } from 'react';
import GameShell from '../core/GameShell';
import { ConflictScoring, ScoreResult } from '../core/ScoreEngine';

const DURATION_MS = 180_000;

type Tag = 'Reactive' | 'Defensive' | 'Balanced';

interface Node {
  id: string;
  prompt: string;
  options: { label: string; tag: Tag; next?: string }[];
}

const NODES: Record<string, Node> = {
  r1: {
    id: 'r1',
    prompt: 'Your peer challenges your plan as unrealistic. Choose your response.',
    options: [
      { label: 'Push back hard', tag: 'Reactive', next: 'r2a' },
      { label: 'Clarify assumptions', tag: 'Balanced', next: 'r2b' },
      { label: 'Defend credentials', tag: 'Defensive', next: 'r2c' },
    ],
  },
  r2a: {
    id: 'r2a',
    prompt: 'Tension rises. The room is silent. Choose your adjustment.',
    options: [
      { label: 'Double down', tag: 'Reactive', next: 'r3a' },
      { label: 'Invite counter-examples', tag: 'Balanced', next: 'r3b' },
      { label: 'Shift topic', tag: 'Defensive', next: 'r3c' },
    ],
  },
  r2b: {
    id: 'r2b',
    prompt: 'They share two concerns. Choose your focus.',
    options: [
      { label: 'Address emotion first', tag: 'Balanced', next: 'r3b' },
      { label: 'Address data first', tag: 'Balanced', next: 'r3b' },
      { label: 'Dismiss concern', tag: 'Reactive', next: 'r3a' },
    ],
  },
  r2c: {
    id: 'r2c',
    prompt: 'They mention past failures. Choose your stance.',
    options: [
      { label: 'Acknowledge and refocus', tag: 'Balanced', next: 'r3b' },
      { label: 'List achievements', tag: 'Defensive', next: 'r3c' },
      { label: 'Call out bias', tag: 'Reactive', next: 'r3a' },
    ],
  },
  r3a: {
    id: 'r3a',
    prompt: 'Conflict escalated. Final move.',
    options: [
      { label: 'Walk away', tag: 'Reactive' },
      { label: 'Set a follow-up', tag: 'Balanced' },
      { label: 'Appeal to authority', tag: 'Defensive' },
    ],
  },
  r3b: {
    id: 'r3b',
    prompt: 'Dialogue stabilized. Final move.',
    options: [
      { label: 'Summarize shared goals', tag: 'Balanced' },
      { label: 'Request pilot test', tag: 'Balanced' },
      { label: 'Keep debating', tag: 'Reactive' },
    ],
  },
  r3c: {
    id: 'r3c',
    prompt: 'Defensive posture detected. Final move.',
    options: [
      { label: 'Return to outcomes', tag: 'Balanced' },
      { label: 'Highlight risks', tag: 'Defensive' },
      { label: 'Blame constraints', tag: 'Reactive' },
    ],
  },
};

const MirrorArgumentGame: React.FC<{ onFinish: (r: ScoreResult) => void }> = ({ onFinish }) => {
  const [nodeId, setNodeId] = useState<string>('r1');
  const [tags, setTags] = useState<Tag[]>([]);

  const compute = (): ScoreResult => {
    const idx = ConflictScoring.index(tags as any);
    return {
      gameId: 'mirror-argument',
      durationMs: DURATION_MS,
      metrics: [
        { name: 'Emotional Regulation', value: idx },
        { name: 'Logic over Emotion', value: idx },
        { name: 'Resilience under criticism', value: idx },
      ],
      summary: 'Conflict engagement measured.',
      raw: { path: tags, endNode: nodeId },
    };
  };

  return (
    <GameShell
      durationMs={DURATION_MS}
      onFinish={(r) => onFinish(r)}
      render={({ phase, start, setResult }) => {
        useEffect(() => {
          if (phase === 'finished') setResult(compute());
        }, [phase]);
        const node = NODES[nodeId];
        return (
          <div style={{ display: 'grid', gap: 12 }}>
            {phase === 'idle' && <button onClick={start}>Start</button>}
            <h3>{node.prompt}</h3>
            <div style={{ display: 'grid', gap: 8 }}>
              {node.options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTags((prev) => [...prev, o.tag]);
                    if (o.next) setNodeId(o.next); else setNodeId(nodeId);
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default MirrorArgumentGame;
