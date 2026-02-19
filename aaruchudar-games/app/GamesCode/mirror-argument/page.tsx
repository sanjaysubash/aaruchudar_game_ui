"use client";

import React, { CSSProperties, useState } from "react";

type Option = {
  text: string;
  points: number;
};

type Round = {
  scenario: string;
  options: Option[];
};

const ROUNDS: Round[] = [
  {
    scenario: "“You always think your ideas are better than others.”",
    options: [
      { text: "That’s not true! You don’t understand my logic.", points: 0 },
      { text: "Maybe I came across that way. Let’s review both ideas.", points: 10 },
      { text: "Fine. Do it your way. I’m done.", points: 2 },
    ],
  },
  {
    scenario: "“This is all your fault — you made the wrong call!”",
    options: [
      { text: "If you were responsible, we wouldn’t be here.", points: 1 },
      { text: "Let’s pause and see what actually went wrong.", points: 10 },
      { text: "Whatever. I don’t care anymore.", points: 3 },
    ],
  },
  {
    scenario: "“You’re not leadership material — you can’t handle stress.”",
    options: [
      { text: "I may fail, but I’ll improve and prove myself.", points: 10 },
      { text: "You’ve judged me already. Why try?", points: 2 },
      { text: "You have no right to say that.", points: 0 },
    ],
  },
];

export default function MirrorArgument() {
  const [step, setStep] = useState<"intro" | "play" | "result">("intro");
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [transition, setTransition] = useState(false);

  const currentRound = ROUNDS[roundIndex];

  const handleChoice = (points: number, index: number) => {
    if (selected !== null) return;

    setSelected(index);
    setScore((s) => s + points);

    setTimeout(() => {
      setTransition(true);

      setTimeout(() => {
        setTransition(false);
        setSelected(null);

        if (roundIndex < ROUNDS.length - 1) {
          setRoundIndex((r) => r + 1);
        } else {
          setStep("result");
        }
      }, 400);
    }, 700);
  };

  const getResult = () => {
    if (score <= 10) {
      return {
        title: "Reactive",
        desc: "Emotion dominates logic. Needs calm and reflection practice.",
        color: "#ef4444",
      };
    }
    if (score <= 20) {
      return {
        title: "Defensive",
        desc: "You respond, but emotional balance can improve.",
        color: "#f59e0b",
      };
    }
    return {
      title: "Balanced",
      desc: "Strong emotional intelligence. Calm under conflict.",
      color: "#22c55e",
    };
  };

  const result = getResult();

  return (
    <div style={styles.space}>
      <div
        style={{
          ...styles.game,
          transform: transition ? "translateX(50px)" : "translateX(0)",
          opacity: transition ? 0 : 1,
          transition: "0.4s ease",
        }}
      >
        {step === "intro" && (
          <div style={styles.center}>
            <h1 style={styles.title}>THE MIRROR ARGUMENT</h1>
            <p style={styles.sub}>
              Enter the emotional conflict simulator.
            </p>
            <button style={styles.startBtn} onClick={() => setStep("play")}>
              ▶ START SIMULATION
            </button>
          </div>
        )}

        {step === "play" && (
          <>
            {/* HUD */}
            <div style={styles.hud}>
              <div>ROUND {roundIndex + 1} / 3</div>
              <div>{score} XP</div>
            </div>

            {/* XP BAR */}
            <div style={styles.xpBar}>
              <div
                style={{
                  ...styles.xpFill,
                  width: `${(score / 30) * 100}%`,
                }}
              />
            </div>

            <div style={styles.scenarioBox}>
              <p style={styles.scenario}>{currentRound.scenario}</p>
            </div>

            <div style={styles.options}>
              {currentRound.options.map((opt, i) => {
                const isSelected = selected === i;
                const good = opt.points >= 8;

                return (
                  <button
                    key={i}
                    onClick={() => handleChoice(opt.points, i)}
                    style={{
                      ...styles.optionBtn,
                      transform: isSelected ? "scale(1.06)" : "scale(1)",
                      boxShadow: isSelected
                        ? good
                          ? "0 0 25px #22c55e"
                          : "0 0 25px #ef4444"
                        : "0 8px 20px rgba(0,0,0,0.4)",
                      border: isSelected
                        ? good
                          ? "2px solid #22c55e"
                          : "2px solid #ef4444"
                        : "1px solid rgba(255,255,255,0.08)",
                      transition: "0.25s ease",
                    }}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === "result" && (
          <div style={styles.center}>
            <h2>SIMULATION COMPLETE</h2>
            <h1 style={{ fontSize: 52 }}>{score} / 30</h1>

            <h2
              style={{
                color: result.color,
                textShadow: `0 0 15px ${result.color}`,
              }}
            >
              {result.title}
            </h2>

            <p style={styles.resultDesc}>{result.desc}</p>

            <button
              style={styles.startBtn}
              onClick={() => window.location.reload()}
            >
              🔄 RESTART
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🎮 ADVANCED GAME STYLES */

const styles: Record<string, CSSProperties | Record<string, CSSProperties>> = {
  space: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top,#0f172a 20%,#020617 60%,#000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "Orbitron, sans-serif",
  },
  game: {
    width: "100%",
    maxWidth: 780,
    padding: 36,
    borderRadius: 22,
    background: "rgba(15,23,42,0.8)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 80px rgba(0,255,200,0.2)",
  },
  title: {
    fontSize: 44,
    textShadow: "0 0 20px #00ffcc",
  },
  center: { textAlign: "center" },
  sub: { opacity: 0.75, marginTop: 12 },
  startBtn: {
    marginTop: 28,
    padding: "14px 34px",
    background: "linear-gradient(90deg,#00ffcc,#00bfff)",
    border: "none",
    borderRadius: 14,
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 20px #00ffcc",
  },
  hud: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
    fontWeight: "bold",
    color: "#00ffcc",
  },
  xpBar: {
    height: 10,
    background: "#1e293b",
    borderRadius: 20,
    marginBottom: 22,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    background: "linear-gradient(90deg,#00ffcc,#00bfff)",
    transition: "0.4s ease",
  },
  scenarioBox: {
    background: "rgba(17,24,39,0.9)",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  scenario: { fontSize: 18, lineHeight: 1.6 },
  options: { display: "flex", flexDirection: "column", gap: 16 },
  optionBtn: {
    padding: "16px 20px",
    background: "#0f172a",
    borderRadius: 14,
    color: "#fff",
    cursor: "pointer",
  },
  resultDesc: {
    marginTop: 12,
    opacity: 0.8,
    fontSize: 16,
    lineHeight: 1.6,
    maxWidth: 520,
    marginLeft: "auto",
    marginRight: "auto",
  },
};
