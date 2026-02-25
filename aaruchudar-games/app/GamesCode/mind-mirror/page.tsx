"use client";

import React, { useEffect, useState, useRef, CSSProperties } from "react";

export default function MindMirror() {
  const [phase, setPhase] = useState<
    "intro" | "observe" | "still" | "reflect" | "result"
  >("intro");

  const [timeLeft, setTimeLeft] = useState(60);
  const [clicks, setClicks] = useState(0);
  const [stillnessRate, setStillnessRate] = useState(5);
  const [distraction, setDistraction] = useState<string | null>(null);

  const stillStartRef = useRef<number | null>(null);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (phase === "observe") setTimeLeft(60);

    if (phase === "still") {
      setTimeLeft(120);
      stillStartRef.current = Date.now();
    }

    if (phase === "observe" || phase === "still") {
      const t = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(t);
            if (phase === "observe") setPhase("still");
            else if (phase === "still") setPhase("reflect");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(t);
    }
  }, [phase]);

  /* ---------------- CLICK TRACK ---------------- */

  useEffect(() => {
    if (phase !== "still") return;

    const handleClick = () => setClicks((c) => c + 1);
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [phase]);

  /* ---------------- DISTRACTIONS ---------------- */

  useEffect(() => {
    if (phase !== "still") return;

    const messages = [
      "⚠ DO NOT MOVE",
      "🔔 ALERT",
      "⚡ CLICK NOW",
      "❗ SYSTEM WARNING",
      "👁 FOCUS BREAK",
    ];

    const interval = setInterval(() => {
      const random =
        messages[Math.floor(Math.random() * messages.length)];
      setDistraction(random);

      setTimeout(() => setDistraction(null), 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, [phase]);

  /* ---------------- RESULT CALC ---------------- */

  const reactionControl = Math.max(0, 30 - clicks * 5);
  const focusConsistency = 30;
  const calmness = stillnessRate * 2;
  const breathAwareness = 20;

  const total =
    reactionControl + focusConsistency + calmness + breathAwareness;

  const getLevel = () => {
    if (total >= 90) return "Command Presence";
    if (total >= 70) return "Calm Leader";
    if (total >= 50) return "Balanced Mind";
    return "Needs Stillness Training";
  };

  return (
    <div style={ui.wrapper}>
      <div style={ui.bgGrid}></div>
      <div style={ui.vignette}></div>

      <div style={ui.card}>
        {phase === "intro" && (
          <>
            <h1 style={ui.title}>MIND MIRROR</h1>
            <p style={ui.subtitle}>Stillness Simulation</p>
            <button
              style={ui.btn}
              onClick={() => setPhase("observe")}
            >
              ENTER SIMULATION
            </button>
          </>
        )}

        {(phase === "observe" || phase === "still") && (
          <>
            <div style={ui.hud}>
              <span>
                {phase === "observe"
                  ? "PHASE 1 – OBSERVE"
                  : "PHASE 2 – STILLNESS"}
              </span>
              <span>⏱ {timeLeft}s</span>
            </div>

            <NeuralCore />

            {distraction && phase === "still" && (
              <div
                style={{
                  position: "absolute",
                  top: Math.random() * 70 + "%",
                  left: Math.random() * 70 + "%",
                  padding: "8px 14px",
                  background: "rgba(255,0,0,0.85)",
                  borderRadius: 8,
                  fontSize: 12,
                  animation: "glitchFlash 0.6s ease",
                  pointerEvents: "none",
                }}
              >
                {distraction}
              </div>
            )}
          </>
        )}

        {phase === "reflect" && (
          <>
            <h2 style={ui.phase}>PHASE 3 – REFLECTION</h2>
            <p>Rate your stillness level (1–10)</p>

            <input
              type="range"
              min="1"
              max="10"
              value={stillnessRate}
              onChange={(e) =>
                setStillnessRate(Number(e.target.value))
              }
              style={{ width: "100%" }}
            />

            <button
              style={ui.btn}
              onClick={() => setPhase("result")}
            >
              VIEW RESULT
            </button>
          </>
        )}

        {phase === "result" && (
          <>
            <h2 style={ui.phase}>STILLNESS INDEX</h2>
            <h1>{total} / 100</h1>
            <h3>{getLevel()}</h3>

            <div style={ui.resultBox}>
              <p>Reaction Control: {reactionControl}/30</p>
              <p>Focus Consistency: {focusConsistency}/30</p>
              <p>Calmness Reflection: {calmness}/20</p>
              <p>Breath Awareness: {breathAwareness}/20</p>
            </div>

            <button
              style={ui.btn}
              onClick={() => window.location.reload()}
            >
              RETAKE
            </button>
          </>
        )}
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes breathPulse {
          0% { transform: scale(1); box-shadow: 0 0 40px #00ffe0; }
          50% { transform: scale(1.1); box-shadow: 0 0 90px #00ffe0; }
          100% { transform: scale(1); box-shadow: 0 0 40px #00ffe0; }
        }

        @keyframes rotateRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes ripple {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 0.2; }
          100% { transform: scale(0.9); opacity: 0.7; }
        }

        @keyframes glitchFlash {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }

        @keyframes gridMove {
          0% { transform: translateY(0px); }
          100% { transform: translateY(40px); }
        }

        @keyframes auraFlicker {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
          100% { filter: brightness(1); }
        }
      `}</style>
    </div>
  );
}

/* ---------------- NEURAL CORE ---------------- */

function NeuralCore() {
  return (
    <div style={ui.coreWrapper}>
      <div style={ui.energyRing}></div>
      <div style={ui.core}></div>
      <div style={ui.innerPulse}></div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const ui: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "Orbitron, sans-serif",
    overflow: "hidden",
    position: "relative",
  },

  bgGrid: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, rgba(0,255,200,0.15) 0%, transparent 70%), repeating-linear-gradient(0deg, rgba(0,255,200,0.05) 0px, rgba(0,255,200,0.05) 1px, transparent 1px, transparent 40px)",
    animation: "gridMove 20s linear infinite",
    zIndex: 0,
  },

  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
    zIndex: 1,
  },

  card: {
    width: "100%",
    maxWidth: 760,
    padding: 32,
    borderRadius: 20,
    background: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(25px)",
    boxShadow: "0 40px 80px rgba(0,255,200,0.25)",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },

  title: {
    fontSize: 40,
    textShadow: "0 0 20px #00ffe0",
  },

  subtitle: {
    opacity: 0.7,
    marginBottom: 20,
  },

  hud: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    fontSize: 14,
    opacity: 0.8,
  },

  phase: {
    marginBottom: 10,
    color: "#00ffe0",
  },

  btn: {
    marginTop: 24,
    padding: "14px 30px",
    background: "linear-gradient(90deg,#00ffe0,#00b3ff)",
    border: "none",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: 20,
    padding: 20,
    background: "#111827",
    borderRadius: 14,
  },

  coreWrapper: {
    position: "relative",
    width: 180,
    height: 180,
    margin: "30px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  energyRing: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    border: "2px solid rgba(0,255,200,0.4)",
    animation: "rotateRing 6s linear infinite",
  },

  core: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    background: "radial-gradient(circle,#00ffe0,#004d40)",
    animation:
      "breathPulse 3s ease-in-out infinite, auraFlicker 4s ease-in-out infinite",
    boxShadow: "0 0 80px #00ffe0, 0 0 120px rgba(0,255,200,0.4)",
  },

  innerPulse: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(255,255,255,0.4),transparent)",
    animation: "ripple 2.5s ease-in-out infinite",
  },
};
