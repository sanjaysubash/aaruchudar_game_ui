"use client";

import React, { useState, useEffect, CSSProperties } from "react";

const QUESTIONS = [
  "Imagine a world without gravity. How would humans travel, build houses, or play sports?",
  "You are given a brick. List as many non-construction uses for it as possible.",
  "If your shadow could talk, what secret would it tell about you?",
  "Create a new invention that solves a small but annoying everyday problem. Name it and explain how it works.",
  "Combine two things that don’t go together and explain the result.",
  "Write a one-line advertisement for water — as if people never knew it existed before.",
  "You wake up one morning and can hear people’s thoughts. How would you use that power for good?",
  "If you could redesign a classroom, what would it look like to make learning more exciting?",
  "Imagine you are an AI with emotions. What would be your biggest dream?",
  "Create a festival that celebrates creativity. What would people do that day?"
];

export default function UnseenSolution() {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));

  /* TIMER */
  useEffect(() => {
    if (!started) return;

    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [started]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const wordCount = answers[current].trim()
    ? answers[current].trim().split(/\s+/).length
    : 0;

  return (
    <div style={ui.wrapper}>
      <div style={ui.card}>

        {!started && (
          <>
            <h1 style={ui.title}>THE UNSEEN SOLUTION</h1>
            <p>No right answers. Only originality survives.</p>
            <button style={ui.btn} onClick={() => setStarted(true)}>
              ENTER CREATIVE ARENA
            </button>
          </>
        )}

        {started && timeLeft > 0 && (
          <>
            <div style={ui.hud}>
              <span>LEVEL {current < 5 ? "1" : "2"}</span>
              <span>{formatTime(timeLeft)}</span>
              <span>Q {current + 1}/10</span>
            </div>

            <div style={ui.questionBox}>
              {QUESTIONS[current]}
            </div>

            <textarea
              style={ui.textarea}
              value={answers[current]}
              onChange={(e) => {
                const copy = [...answers];
                copy[current] = e.target.value;
                setAnswers(copy);
              }}
              placeholder="Type your creative response..."
            />

            <div style={ui.footer}>
              <span>{wordCount} words</span>

              {current < 9 && (
                <button style={ui.btn} onClick={() => setCurrent(current + 1)}>
                  Next Challenge →
                </button>
              )}

              {current === 9 && (
                <button style={ui.btn} onClick={() => setStarted(false)}>
                  Finish
                </button>
              )}
            </div>
          </>
        )}

        {started && timeLeft === 0 && (
          <>
            <h2>Time Up</h2>
            <p>Your creativity session has ended.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- UI ---------------- */

const ui: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top,#0f172a,#000)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "Orbitron, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 900,
    padding: 40,
    borderRadius: 20,
    background: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(20px)",
  },
  title: {
    fontSize: 42,
    textShadow: "0 0 15px #00ffe0",
  },
  hud: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    opacity: 0.8,
  },
  questionBox: {
    background: "#111827",
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    height: 160,
    padding: 15,
    background: "#0f172a",
    color: "#fff",
    borderRadius: 10,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  btn: {
    padding: "12px 26px",
    background: "linear-gradient(90deg,#00ffe0,#00b3ff)",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
