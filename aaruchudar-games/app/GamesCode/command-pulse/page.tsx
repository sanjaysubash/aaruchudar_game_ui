"use client";

import React, { useEffect, useState, useRef } from "react";

const ACTIONS = [
  "Delegate Task",
  "Calm the Team",
  "Take Control",
  "Pause Decision",
  "Reorganize Team",
];

export default function CommandPulse() {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(1);
  const [timeLeft, setTimeLeft] = useState(180);
  const [pulse, setPulse] = useState(70);
  const [prompt, setPrompt] = useState("");
  const [noise, setNoise] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [phase3Mode, setPhase3Mode] = useState<"ACT" | "WAIT">("ACT");
  const [finished, setFinished] = useState(false);

  const [score, setScore] = useState({
    timing: 0,
    focus: 0,
    clarity: 0,
  });

  const correctAction = useRef("");
  const canClick = useRef(true);

  const strengthenPulse = () => {
    setPulse((p) => Math.min(100, p + 6));
    setScore((s) => ({
      timing: s.timing + 1,
      focus: s.focus + (phase === 2 ? 1 : 0),
      clarity: s.clarity + 1,
    }));
  };

  const weakenPulse = () => {
    setPulse((p) => Math.max(0, p - 8));
    setScore((s) => ({
      ...s,
      clarity: Math.max(0, s.clarity - 1),
    }));
  };

  /* TIMER */
  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => {
      setTimeLeft((v) => {
        const newTime = v - 1;
        if (newTime <= 1) {
          clearInterval(t);
          setStarted(false);
          setFinished(true);
          return 0;
        }
        if (newTime <= 60) {
          setPhase(3);
        } else if (newTime <= 120) {
          setPhase(2);
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started]);

  /* PROMPT ENGINE */
  useEffect(() => {
    if (!started) return;

    const i = setInterval(() => {
      canClick.current = true;
      const a = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      correctAction.current = a;
      setPrompt(a);
      setMessage("");

      if (phase === 2) {
        setNoise(["URGENT", "ERROR", "BLAME", "CHAOS"].sort(() => 0.5 - Math.random()));
      } else setNoise([]);

      if (phase === 3) {
        setPhase3Mode(Math.random() > 0.5 ? "ACT" : "WAIT");
      }

      setTimeout(() => {
        if (canClick.current) {
          weakenPulse();
          setMessage("⏳ Hesitation");
        }
      }, 2000);
    }, 3200);

    return () => clearInterval(i);
  }, [started, phase]);

  const handleAction = (action: string) => {
    if (!canClick.current) return;
    canClick.current = false;

    if (phase === 3) {
      if (phase3Mode === "WAIT" && action !== "Wait") return weakenPulse();
      if (phase3Mode === "ACT" && action === "Wait") return weakenPulse();
    }

    if (action === correctAction.current || action === "Wait") {
      strengthenPulse();
      setMessage("✅ Perfect");
    } else {
      weakenPulse();
      setMessage("❌ Wrong");
    }
  };

  /* FINAL SCORE CALCULATION */
  const calculateFinalScore = () => {
    const timingScore = Math.min(40, score.timing * 2);
    const focusScore = Math.min(30, score.focus * 2);
    const clarityScore = Math.min(30, score.clarity * 2);
    return timingScore + focusScore + clarityScore;
  };

  const finalScore = calculateFinalScore();

  const getLevel = () => {
    if (finalScore >= 90) return "Command Genius";
    if (finalScore >= 70) return "Balanced Leader";
    if (finalScore >= 50) return "Emerging Leader";
    return "Needs Rhythm Alignment";
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.gameCard}>

        {!started && !finished && (
          <div style={{ textAlign: "center" }}>
            <h1 style={styles.title}>COMMAND PULSE</h1>
            <p>Leadership • Rhythm • Control</p>
            <button style={styles.mainBtn} onClick={() => setStarted(true)}>
              START SIMULATION
            </button>
          </div>
        )}

        {started && (
          <>
            <div style={styles.hud}>
              <span>⏱ {timeLeft}s</span>
              <span>PHASE {phase}</span>
            </div>

            <div style={styles.pulseShell}>
              <div
                style={{
                  ...styles.pulseEnergy,
                  width: `${pulse}%`,
                }}
              />
            </div>

            {phase === 3 && (
              <div style={styles.mode}>
                {phase3Mode === "ACT" ? "⚡ ACT MODE" : "🧘 WAIT MODE"}
              </div>
            )}

            <div style={styles.console}>
              <h2>{prompt}</h2>
            </div>

            {phase === 2 && (
              <div style={styles.noise}>
                {noise.map((n, i) => (
                  <span key={i}>{n}</span>
                ))}
              </div>
            )}

            <div style={styles.controls}>
              {ACTIONS.map((a) => (
                <button key={a} style={styles.btn3D} onClick={() => handleAction(a)}>
                  {a}
                </button>
              ))}
              {phase === 3 && (
                <button style={styles.waitBtn} onClick={() => handleAction("Wait")}>
                  WAIT
                </button>
              )}
            </div>

            <p style={styles.msg}>{message}</p>
          </>
        )}

        {finished && (
          <div style={styles.resultCard}>
            <h2>FINAL PERFORMANCE</h2>
            <h1>{finalScore} / 100</h1>
            <h3 style={{ color: "#00ffcc" }}>{getLevel()}</h3>

            <div style={styles.breakdown}>
              <p>Timing Accuracy: {Math.min(40, score.timing * 2)} / 40</p>
              <p>Focus Stability: {Math.min(30, score.focus * 2)} / 30</p>
              <p>Decision Clarity: {Math.min(30, score.clarity * 2)} / 30</p>
            </div>

            <button
              style={styles.mainBtn}
              onClick={() => window.location.reload()}
            >
              RESTART
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🎮 AAA GAME UI */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top,#020617,#000)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "Orbitron, sans-serif",
  },
  gameCard: {
    width: "100%",
    maxWidth: 820,
    padding: 30,
    borderRadius: 22,
    background: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 80px rgba(0,255,200,0.2)",
  },
  title: {
    fontSize: 42,
    textShadow: "0 0 20px #00ffe0",
  },
  mainBtn: {
    marginTop: 20,
    padding: "14px 32px",
    background: "linear-gradient(90deg,#00ffe0,#00b3ff)",
    border: "none",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 20px #00ffe0",
  },
  hud: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  pulseShell: {
    height: 20,
    background: "#020617",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 18,
  },
  pulseEnergy: {
    height: "100%",
    background: "linear-gradient(90deg,#00ffe0,#00b3ff)",
    transition: "width 0.4s ease",
  },
  mode: {
    textAlign: "center",
    marginBottom: 14,
    color: "#00ffcc",
  },
  console: {
    padding: 22,
    background: "#111827",
    borderRadius: 14,
    textAlign: "center",
    marginBottom: 18,
  },
  noise: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    color: "#ff3355",
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  btn3D: {
    padding: "12px 18px",
    background: "#0f172a",
    borderRadius: 10,
    border: "1px solid #334155",
    cursor: "pointer",
    color: "#fff",
  },
  waitBtn: {
    padding: "12px 18px",
    background: "#1e40af",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  msg: { textAlign: "center", marginTop: 12 },
  resultCard: {
    textAlign: "center",
  },
  breakdown: {
    marginTop: 14,
    opacity: 0.85,
  },
};
