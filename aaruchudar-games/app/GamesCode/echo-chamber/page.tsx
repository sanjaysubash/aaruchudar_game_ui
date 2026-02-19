"use client";

import React, { useState, useEffect } from "react";

/* ---------------- DATA (UNCHANGED) ---------------- */

const audioQuestions = [
  {
    question: "What was the main message of the speaker?",
    options: ["Conflict resolution", "Personal growth", "Team failure", "Urgency"],
    correct: "Personal growth",
  },
  {
    question: "Which emotion dominated the tone?",
    options: ["Anger", "Hope", "Fear", "Confusion"],
    correct: "Hope",
  },
  {
    question: "What word was repeated twice?",
    options: ["Growth", "Change", "Focus", "Trust"],
    correct: "Growth",
  },
  {
    question: "What would be the next logical line?",
    options: [
      "We must adapt together.",
      "Blame others immediately.",
      "Stop trying.",
      "Ignore the lesson.",
    ],
    correct: "We must adapt together.",
  },
  {
    question: "Choose the correct title:",
    options: [
      "The Power of Reflection",
      "A Sudden Crisis",
      "Workplace Chaos",
      "Silent Breakdown",
    ],
    correct: "The Power of Reflection",
  },
];

const emotionalStatements = [
  {
    text: "I worked hard but still failed.",
    options: [
      { text: "Try harder next time.", score: 0 },
      { text: "That must feel disappointing after all your effort.", score: 10 },
      { text: "You should’ve planned better.", score: 2 },
      { text: "That’s just life.", score: 3 },
    ],
  },
];

const recallParagraph =
  "Innovation grows when curiosity meets patience and failure is seen as feedback.";

/* ---------------- COMPONENT ---------------- */

export default function EchoChamber() {
  const [step, setStep] = useState<
    "intro" | "r1" | "r2" | "r3" | "result"
  >("intro");

  const [r1Score, setR1Score] = useState(0);
  const [r2Score, setR2Score] = useState(0);
  const [r3Score, setR3Score] = useState(0);

  const [audioComplete, setAudioComplete] = useState(false);
  const [typed, setTyped] = useState("");
  const [showParagraph, setShowParagraph] = useState(true);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  /* Reverse Reflection Timer */
  useEffect(() => {
    if (step === "r3") {
      const t = setTimeout(() => setShowParagraph(false), 20000);
      return () => clearTimeout(t);
    }
  }, [step]);

  const evaluateRecall = () => {
    let score = 0;
    const lower = typed.toLowerCase();
    if (lower.includes("curiosity")) score += 10;
    if (lower.includes("patience")) score += 10;
    if (lower.includes("failure")) score += 10;
    setR3Score(score);
    setStep("result");
  };

  const total = r1Score + r2Score + r3Score;

  const getLevel = () => {
    if (total >= 90) return "Deep Reflector";
    if (total >= 70) return "Active Listener";
    if (total >= 50) return "Surface Listener";
    return "Reactive Thinker";
  };

  const resetSelection = () => setSelectedOption(null);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        {step === "intro" && (
          <>
            <h1 style={styles.title}>THE ECHO CHAMBER</h1>
            <p>Ultimate Brain Reflection Test</p>
            <button style={styles.btn} onClick={() => setStep("r1")}>
              ENTER TEST
            </button>
          </>
        )}

        {/* ROUND 1 */}
        {step === "r1" && (
          <>
            <h2>Round 1 – Sound Mirror</h2>

            <audio
              controls
              onEnded={() => setAudioComplete(true)}
              style={styles.audio}
            >
              <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
            </audio>

            {!audioComplete && <p>Listen fully to unlock questions</p>}

            {audioQuestions.map((q, i) => (
              <div key={i} style={styles.box}>
                <p>{q.question}</p>

                {q.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === q.correct;

                  return (
                    <button
                      key={opt}
                      disabled={!audioComplete || selectedOption !== null}
                      onClick={() => {
                        setSelectedOption(opt);
                        if (isCorrect) setR1Score((s) => s + 6);
                      }}
                      style={{
                        ...styles.optionCard,
                        transform: isSelected ? "scale(1.03)" : "scale(1)",
                        border: isSelected
                          ? isCorrect
                            ? "2px solid #22c55e"
                            : "2px solid #ef4444"
                          : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isSelected
                          ? isCorrect
                            ? "0 0 25px rgba(34,197,94,0.8)"
                            : "0 0 25px rgba(239,68,68,0.8)"
                          : "0 10px 25px rgba(0,0,0,0.6)",
                        background: isSelected
                          ? isCorrect
                            ? "linear-gradient(90deg,#052e1a,#064e3b)"
                            : "linear-gradient(90deg,#3f0f0f,#7f1d1d)"
                          : "linear-gradient(180deg,#0f172a,#020617)",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ))}

            <button
              style={styles.btn}
              onClick={() => {
                resetSelection();
                setStep("r2");
              }}
            >
              Next Round
            </button>
          </>
        )}

        {/* ROUND 2 */}
        {step === "r2" && (
          <>
            <h2>Round 2 – Emotional Echo</h2>

            {emotionalStatements.map((s, i) => (
              <div key={i} style={styles.box}>
                <p>{s.text}</p>

                {s.options.map((o, idx) => {
                  const isSelected = selectedOption === o.text;

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => {
                        setSelectedOption(o.text);
                        setR2Score((v) => v + o.score);
                      }}
                      style={{
                        ...styles.optionCard,
                        transform: isSelected ? "scale(1.03)" : "scale(1)",
                        border: isSelected
                          ? o.score >= 8
                            ? "2px solid #22c55e"
                            : "2px solid #ef4444"
                          : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isSelected
                          ? o.score >= 8
                            ? "0 0 25px rgba(34,197,94,0.8)"
                            : "0 0 25px rgba(239,68,68,0.8)"
                          : "0 10px 25px rgba(0,0,0,0.6)",
                        background: isSelected
                          ? o.score >= 8
                            ? "linear-gradient(90deg,#052e1a,#064e3b)"
                            : "linear-gradient(90deg,#3f0f0f,#7f1d1d)"
                          : "linear-gradient(180deg,#0f172a,#020617)",
                      }}
                    >
                      {o.text}
                    </button>
                  );
                })}
              </div>
            ))}

            <button
              style={styles.btn}
              onClick={() => {
                resetSelection();
                setStep("r3");
              }}
            >
              Final Round
            </button>
          </>
        )}

        {/* ROUND 3 */}
        {step === "r3" && (
          <>
            <h2>Round 3 – Reverse Reflection</h2>

            {showParagraph ? (
              <div style={styles.box}>
                <p>{recallParagraph}</p>
                <p>Visible for 20 seconds...</p>
              </div>
            ) : (
              <>
                <textarea
                  style={styles.textarea}
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                />
                <button style={styles.btn} onClick={evaluateRecall}>
                  Submit Reflection
                </button>
              </>
            )}
          </>
        )}

        {/* RESULT */}
        {step === "result" && (
          <>
            <h2>Brain Reflection Index (BRI)</h2>
            <h1>{total} / 100</h1>
            <h3>{getLevel()}</h3>

            <p>Focus Accuracy: {r1Score}/30</p>
            <p>Emotional Reflection: {r2Score}/40</p>
            <p>Meaning Recall: {r3Score}/30</p>

            <button style={styles.btn} onClick={() => window.location.reload()}>
              Retake Test
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

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
  card: {
    width: "100%",
    maxWidth: 780,
    padding: 30,
    borderRadius: 20,
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(20px)",
  },
  title: {
    fontSize: 42,
    textShadow: "0 0 15px #00ffe0",
  },
  btn: {
    marginTop: 20,
    padding: "14px 28px",
    background: "linear-gradient(90deg,#00ffe0,#00b3ff)",
    border: "none",
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
  },
  optionCard: {
    width: "100%",
    padding: "16px 18px",
    marginTop: 12,
    background: "linear-gradient(180deg,#0f172a,#020617)",
    borderRadius: 14,
    color: "#fff",
    cursor: "pointer",
    textAlign: "left",
    fontSize: 15,
    transition: "all 0.25s ease",
    boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
  },
  box: {
    marginTop: 16,
    padding: 16,
    background: "#111827",
    borderRadius: 12,
  },
  textarea: {
    width: "100%",
    height: 120,
    marginTop: 10,
    background: "#0f172a",
    color: "#fff",
    borderRadius: 8,
  },
  audio: {
    width: "100%",
    marginBottom: 20,
  },
};
