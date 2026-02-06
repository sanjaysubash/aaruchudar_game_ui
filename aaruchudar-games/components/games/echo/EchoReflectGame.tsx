import React, { useEffect, useRef, useState } from 'react';
import GameShell from '../core/GameShell';
import { EchoScoring, ScoreResult } from '../core/ScoreEngine';

const DURATION_MS = 120_000;

const SAMPLE_TEXT = 'Team morale dipped after a missed deadline. A brief acknowledgment and a clear recovery plan eased tension.';

const EchoReflectGame: React.FC<{ onFinish: (r: ScoreResult) => void }> = ({ onFinish }) => {
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [listeningUnits, setListeningUnits] = useState(0);
  const [reflectionAlignment, setReflectionAlignment] = useState(0);
  const [recallUnits, setRecallUnits] = useState(0);

  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(SAMPLE_TEXT);
    u.rate = 1.0;
    utterRef.current = u;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setListeningUnits(SAMPLE_TEXT.split(' ').length);
  };

  const onReflect = (choice: 'Acknowledge then plan' | 'Ignore emotions' | 'Only plan') => {
    const align = choice === 'Acknowledge then plan' ? 1 : choice === 'Only plan' ? 0.6 : 0.2;
    setReflectionAlignment(align);
  };

  const onRecall = (text: string) => {
    const target = ['morale', 'deadline', 'acknowledgment', 'plan', 'tension'];
    const hits = target.reduce((acc, k) => acc + (text.toLowerCase().includes(k) ? 1 : 0), 0);
    setRecallUnits(hits);
  };

  const compute = (): ScoreResult => {
    const la = EchoScoring.listeningAccuracy(listeningUnits, SAMPLE_TEXT.split(' ').length);
    const er = EchoScoring.emotionalReflection(reflectionAlignment);
    const mr = EchoScoring.meaningRecall(recallUnits, 5);
    return {
      gameId: 'echo-reflect',
      durationMs: DURATION_MS,
      metrics: [
        { name: 'Listening Accuracy', value: la },
        { name: 'Emotional Reflection', value: er },
        { name: 'Meaning Recall', value: mr },
      ],
      summary: 'Echo reflection measured.',
      raw: { listeningUnits, reflectionAlignment, recallUnits },
    };
  };

  return (
    <GameShell
      durationMs={DURATION_MS}
      onFinish={(r) => onFinish(r)}
      render={({ phase, start, setResult }) => {
        useEffect(() => { if (phase === 'finished') setResult(compute()); }, [phase]);
        return (
          <div style={{ display: 'grid', gap: 12 }}>
            {phase === 'idle' && <button onClick={() => { start(); speak(); }}>Start + Play</button>}
            <div style={{ display: 'grid', gap: 6 }}>
              <span>Reflection choice:</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onReflect('Acknowledge then plan')}>Acknowledge then plan</button>
                <button onClick={() => onReflect('Only plan')}>Only plan</button>
                <button onClick={() => onReflect('Ignore emotions')}>Ignore emotions</button>
              </div>
            </div>
            <div>
              <label>
                Memory rephrase:
                <input onChange={(e) => onRecall(e.target.value)} placeholder="Rephrase key meaning" />
              </label>
            </div>
          </div>
        );
      }}
    />
  );
};

export default EchoReflectGame;