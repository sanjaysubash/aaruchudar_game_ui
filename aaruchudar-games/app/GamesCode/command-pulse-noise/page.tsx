"use client";

import { useState, CSSProperties } from "react";

type Round = {
  title: string;
  setup: string;
  question: string;
  options: string[];
  correct: string;
  points: number;
  skill: string;
};

const ROUNDS: Round[] = [
  {
    title: "ROUND 1 – Focus Under Noise",
    setup:
      "An audio plays with overlapping sounds: typing, chatter, ringtone.\nOne voice gives a colour command.\n\nReal command: “Press Blue.”",
    question: "What colour did you hear as the main command?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correct: "Blue",
    points: 10,
    skill: "Selective listening under distraction.",
  },
  {
    title: "ROUND 2 – Confusing Sound Conflict",
    setup:
      "Two voices give opposite instructions:\nVoice 1 (male): “Press Red.”\nVoice 2 (female): “Press Green.”\n\nInstruction: Follow the female voice only.",
    question: "Which colour did the female voice say?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correct: "Green",
    points: 15,
    skill: "Directional listening + rule retention amid conflict.",
  },
  {
    title: "ROUND 3 – Reaction Under Chaos",
    setup:
      "Fast-changing commands with rising noise:\n“Click Blue” → “Click Yellow” → “Click Red” (fade-out).\n\nRemember the final clear command.",
    question: "What was the final clear command you heard?",
    options: ["Blue", "Yellow", "Red"],
    correct: "Red",
    points: 20,
    skill: "Reaction, short-term auditory memory, focus under stress.",
  },
];

export default function CommandPulseNoise() {
  const [step, setStep] = useState<"intro" | "round" | "result">("intro");
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const current = ROUNDS[roundIndex];

  const handleAnswer = (option: string) => {
    if (selected) return;

    setSelected(option);

    if (option === current.correct) {
      setScore((s) => s + current.points);
    }

    setTimeout(() => {
      setSelected(null);

      if (roundIndex < ROUNDS.length - 1) {
        setRoundIndex((i) => i + 1);
      } else {
        setStep("result");
      }
    }, 700);
  };

  const getResult = () => {
    if (score <= 20) {
      return {
        level: "Overwhelmed",
        interpretation:
          "Struggles under noise; needs calm focus training.",
        color: "#ef4444",
      };
    }
    if (score <= 40) {
      return {
        level: "Balanced",
        interpretation:
          "Can handle mild distraction but loses precision under chaos.",
        color: "#f59e0b",
      };
    }
    return {
      level: "Clear Focus",
      interpretation:
        "Excellent clarity under high mental noise; strong brain filtering.",
      };
  };

  const result = getResult();

  return (
    <div style={styles.wrapper}>
      <div style={styles.gameCard}>

        {/* HUD */}
        {step === "round" && (
          <div style={styles.hud}>
            <div>🎯 ROUND {roundIndex + 1} / 3</div>
            <div>⚡ SCORE: {score}</div>
          </div>
        )}

        {/* Progress Bar */}
        {step === "round" && (
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${(score / 45) * 100}%`,
              }}
            />
          </div>
        )}

        {step === "intro" && (
          <>
            <h1 style={styles.title}>COMMAND PULSE</h1>
            <h3 style={styles.subtitle}>The Noise Focus Test</h3>

            <p style={styles.text}>
              You will hear noisy audio clips with hidden commands.
            </p>
            <p style={styles.text}>Focus deeply and answer what you truly hear.</p>
            <p style={styles.text}>Use headphones for best results.</p>

            <button style={styles.mainBtn} onClick={() => setStep("round")}>
              ▶ DEPLOY
            </button>
          </>
        )}

        {step === "round" && (
          <>
            <h2 style={styles.roundTitle}>{current.title}</h2>

            <div style={styles.setupBox}>
              <p style={styles.pre}>{current.setup}</p>
            </div>

            <p style={styles.question}>{current.question}</p>

            <div style={styles.options}>
              {current.options.map((opt) => {
                const isSelected = selected === opt;
                const isCorrect = opt === current.correct;

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    style={{
                      ...styles.optionBtn,
                      transform: isSelected ? "scale(1.05)" : "scale(1)",
                      boxShadow: isSelected
                        ? isCorrect
                          ? "0 0 25px #22c55e"
                          : "0 0 25px #ef4444"
                        : "0 6px 18px rgba(0,0,0,0.5)",
                      border: isSelected
                        ? isCorrect
                          ? "2px solid #22c55e"
                          : "2px solid #ef4444"
                        : "1px solid rgba(255,255,255,0.1)",
                      transition: "0.25s ease",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <p style={styles.skill}>
              <strong>Skill Measured:</strong> {current.skill}
            </p>
          </>
        )}

        {step === "result" && (
          <>
            <h2>NOISE CLARITY INDEX (NCI)</h2>
            <h1 style={{ fontSize: 48 }}>{score} / 45</h1>

            <h2
              style={{
                color: result.color,
                textShadow: `0 0 18px ${result.color}`,
              }}
            >
              {result.level}
            </h2>

            <p style={styles.text}>{result.interpretation}</p>

            <button
              style={styles.mainBtn}
              onClick={() => window.location.reload()}
            >
              🔄 REDEPLOY
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* 🎮 BATTLEGROUND GAME STYLES */

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top,#0f172a 10%,#020617 60%,#000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "Orbitron, sans-serif",
  },
  gameCard: {
    width: "100%",
    maxWidth: 820,
    padding: 36,
    borderRadius: 24,
    background: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 80px rgba(0,255,200,0.25)",
  },
  hud: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    fontWeight: "bold",
    color: "#00ffcc",
  },
  progressBar: {
    height: 10,
    background: "#1e293b",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#00ffcc,#00bfff)",
    transition: "0.4s ease",
  },
  title: {
    fontSize: 44,
    textShadow: "0 0 20px #00ffcc",
  },
  subtitle: {
    opacity: 0.7,
  },
  text: {
    opacity: 0.8,
    marginTop: 8,
  },
  mainBtn: {
    marginTop: 24,
    padding: "14px 30px",
    background: "linear-gradient(90deg,#00ffcc,#00bfff)",
    border: "none",
    borderRadius: 14,
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 20px #00ffcc",
  },
  roundTitle: {
    color: "#00ffcc",
    marginBottom: 16,
  },
  setupBox: {
    background: "#111827",
    padding: 22,
    borderRadius: 16,
    marginBottom: 18,
  },
  pre: {
    whiteSpace: "pre-line",
    lineHeight: 1.5,
  },
  question: {
    marginTop: 18,
    fontWeight: 600,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginTop: 16,
  },
  optionBtn: {
    padding: "16px 20px",
    background: "#0f172a",
    borderRadius: 14,
    color: "#fff",
    cursor: "pointer",
  },
  skill: {
    marginTop: 20,
    fontSize: 14,
    opacity: 0.6,
  },
};
