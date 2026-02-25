"use client";

import { useState, useEffect } from "react";

export default function EchoReflect() {
  const [step, setStep] = useState<
    "intro" | "audio" | "reflection" | "reverse" | "result"
  >("intro");

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [listeningScore, setListeningScore] = useState(0);
  const [reflectionScore, setReflectionScore] = useState(0);
  const [recallScore, setRecallScore] = useState(0);

  const [reverseVisible, setReverseVisible] = useState(true);
  const [typedAnswer, setTypedAnswer] = useState("");

  const [answeredAudio, setAnsweredAudio] = useState<number[]>([]);
  const [answeredReflection, setAnsweredReflection] = useState<number[]>([]);

  const [selectedAudio, setSelectedAudio] = useState<{ [key: number]: string }>({});
  const [selectedReflection, setSelectedReflection] = useState<{ [key: number]: number }>({});

  const [audioCompleted, setAudioCompleted] = useState(false);

  /* ---------------- TRANSITION ---------------- */

  const goToNext = (nextStep: "intro" | "audio" | "reflection" | "reverse" | "result") => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsTransitioning(false);
    }, 400);
  };

  /* ---------------- ROUND 1 ---------------- */

  const audioQuestions = [
    {
      question: "What was the main issue discussed?",
      options: ["Deadline delay", "Team conflict", "Budget cut", "Client loss"],
      correct: "Team conflict",
    },
    {
      question: "What was the speaker’s tone?",
      options: ["Angry", "Calm but concerned", "Excited", "Neutral"],
      correct: "Calm but concerned",
    },
    {
      question: "Which phrase was emphasized?",
      options: ["We must adapt", "Listen carefully", "Time is short", "Stay united"],
      correct: "Listen carefully",
    },
    {
      question: "What emotional cue was present?",
      options: ["Frustration", "Joy", "Sarcasm", "Confidence"],
      correct: "Frustration",
    },
    {
      question: "What was the logical follow-up?",
      options: ["Blame someone", "Schedule discussion", "Ignore issue", "Resign"],
      correct: "Schedule discussion",
    },
  ];

  const handleAudioAnswer = (index: number, selected: string, correct: string) => {
    if (!audioCompleted) return;
    if (answeredAudio.includes(index)) return;

    setSelectedAudio((prev) => ({ ...prev, [index]: selected }));

    if (selected === correct) {
      setListeningScore((s) => s + 6);
    }

    setAnsweredAudio([...answeredAudio, index]);
  };

  /* ---------------- ROUND 2 ---------------- */

  const reflectionQuestions = [
    {
      statement: "People never listen to me.",
      options: [
        { text: "That must feel frustrating.", score: 8 },
        { text: "Maybe you talk too softly.", score: 2 },
        { text: "Ignore them.", score: 0 },
        { text: "Who said that?", score: 1 },
      ],
    },
    {
      statement: "I always get blamed.",
      options: [
        { text: "That sounds unfair.", score: 8 },
        { text: "Maybe it’s your mistake.", score: 1 },
        { text: "Stop caring.", score: 0 },
        { text: "Explain more.", score: 4 },
      ],
    },
  ];

  const handleReflection = (index: number, score: number) => {
    if (answeredReflection.includes(index)) return;

    setSelectedReflection((prev) => ({ ...prev, [index]: score }));

    setReflectionScore((s) => s + score);
    setAnsweredReflection([...answeredReflection, index]);
  };

  /* ---------------- ROUND 3 ---------------- */

  const paragraph =
    "Effective communication requires active listening, emotional awareness, and clarity in response.";

  useEffect(() => {
    if (step === "reverse") {
      const timer = setTimeout(() => {
        setReverseVisible(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const evaluateRecall = () => {
    let score = 0;
    const lower = typedAnswer.toLowerCase();

    if (lower.includes("listening")) score += 10;
    if (lower.includes("emotional")) score += 10;
    if (lower.includes("clarity")) score += 10;

    setRecallScore(score);
    goToNext("result");
  };

  const total = listeningScore + reflectionScore + recallScore;

  const progressMap = {
    intro: 0,
    audio: 25,
    reflection: 50,
    reverse: 75,
    result: 100,
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.card,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "scale(0.96)" : "scale(1)",
          transition: "0.4s ease",
        }}
      >
        {/* Progress */}
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progressMap[step]}%`,
            }}
          />
        </div>

        {step === "intro" && (
          <>
            <h1 style={styles.title}>ECHO REFLECT</h1>
            <button style={styles.primaryBtn} onClick={() => goToNext("audio")}>
              ▶ START GAME
            </button>
          </>
        )}

        {step === "audio" && (
          <>
            <h2 style={styles.heading}>LEVEL 1 – AUDIO CHALLENGE</h2>

            <audio
              controls
              style={styles.audio}
              onEnded={() => setAudioCompleted(true)}
            >
              <source
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                type="audio/mpeg"
              />
            </audio>

            {!audioCompleted && (
              <p style={{ color: "#00ffcc", marginBottom: 15 }}>
                🔒 Listen completely to unlock answers
              </p>
            )}

            {audioQuestions.map((q, i) => (
              <div key={i} style={styles.box}>
                <p>{q.question}</p>
                {q.options.map((opt) => {
                  const isSelected = selectedAudio[i] === opt;
                  const isCorrect = opt === q.correct;

                  return (
                    <button
                      key={opt}
                      disabled={!audioCompleted}
                      style={{
                        ...styles.optionBtn,
                        opacity: !audioCompleted ? 0.5 : 1,
                        transform: isSelected ? "scale(1.05)" : "scale(1)",
                        boxShadow: isSelected
                          ? isCorrect
                            ? "0 0 20px #22c55e"
                            : "0 0 20px #ef4444"
                          : "none",
                        border: isSelected
                          ? isCorrect
                            ? "2px solid #22c55e"
                            : "2px solid #ef4444"
                          : "1px solid rgba(0,255,200,0.3)",
                        transition: "0.3s ease",
                      }}
                      onClick={() =>
                        handleAudioAnswer(i, opt, q.correct)
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ))}

            <button style={styles.primaryBtn} onClick={() => goToNext("reflection")}>
              NEXT LEVEL →
            </button>
          </>
        )}

        {step === "reflection" && (
          <>
            <h2 style={styles.heading}>LEVEL 2 – EMOTIONAL RESPONSE</h2>

            {reflectionQuestions.map((q, i) => (
              <div key={i} style={styles.box}>
                <p>{q.statement}</p>
                {q.options.map((opt, idx) => {
                  const isSelected = selectedReflection[i] === opt.score;
                  const isCorrect = opt.score >= 8;

                  return (
                    <button
                      key={idx}
                      style={{
                        ...styles.optionBtn,
                        transform: isSelected ? "scale(1.05)" : "scale(1)",
                        boxShadow: isSelected
                          ? isCorrect
                            ? "0 0 20px #22c55e"
                            : "0 0 20px #ef4444"
                          : "none",
                        border: isSelected
                          ? isCorrect
                            ? "2px solid #22c55e"
                            : "2px solid #ef4444"
                          : "1px solid rgba(0,255,200,0.3)",
                        transition: "0.3s ease",
                      }}
                      onClick={() =>
                        handleReflection(i, opt.score)
                      }
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            ))}

            <button style={styles.primaryBtn} onClick={() => goToNext("reverse")}>
              FINAL LEVEL →
            </button>
          </>
        )}

        {step === "reverse" && (
          <>
            <h2 style={styles.heading}>LEVEL 3 – MEMORY RECALL</h2>

            {reverseVisible ? (
              <div style={styles.highlightBox}>
                <p>{paragraph}</p>
                <p style={{ opacity: 0.6 }}>Disappears in 30 seconds...</p>
              </div>
            ) : (
              <>
                <textarea
                  style={styles.textarea}
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                />
                <button style={styles.primaryBtn} onClick={evaluateRecall}>
                  SUBMIT ANSWER
                </button>
              </>
            )}
          </>
        )}

        {step === "result" && (
          <>
            <h2 style={styles.heading}>🎉 GAME COMPLETE</h2>
            <div style={styles.scoreBox}>
              <p>Listening: {listeningScore}/30</p>
              <p>Reflection: {reflectionScore}/40</p>
              <p>Recall: {recallScore}/30</p>
              <h3>Total: {total}/100</h3>
            </div>

            <button style={styles.primaryBtn} onClick={() => goToNext("intro")}>
              PLAY AGAIN
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: { [key: string]: React.CSSProperties | { [key: string]: string | number } } = {
  wrapper: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top,#0f172a,#020617 60%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    color: "#fff",
    fontFamily: "Orbitron, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 900,
    padding: 40,
    borderRadius: 24,
    background: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 0 60px rgba(0,255,200,0.25)",
  },
  title: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: 800,
    textShadow: "0 0 15px #00ffcc",
  },
  heading: {
    marginBottom: 20,
    fontSize: 24,
    color: "#00ffcc",
  },
  primaryBtn: {
    marginTop: 25,
    padding: "14px 28px",
    background: "linear-gradient(90deg,#00ffcc,#00bfff)",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  optionBtn: {
    display: "block",
    marginTop: 12,
    padding: "12px 16px",
    background: "#1e293b",
    borderRadius: 12,
    color: "#fff",
    cursor: "pointer",
  },
  box: {
    marginTop: 20,
    padding: 20,
    background: "rgba(30,41,59,0.6)",
    borderRadius: 16,
  },
  highlightBox: {
    padding: 25,
    background: "rgba(17,24,39,0.9)",
    borderRadius: 16,
    border: "2px solid #00ffcc",
  },
  scoreBox: {
    marginTop: 20,
    padding: 25,
    background: "rgba(15,23,42,0.9)",
    borderRadius: 16,
    border: "1px solid #00ffcc",
  },
  textarea: {
    width: "100%",
    height: 130,
    padding: 15,
    borderRadius: 12,
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #00ffcc",
    marginTop: 15,
  },
  audio: {
    width: "100%",
    marginBottom: 25,
  },
  progressBar: {
    height: 10,
    background: "#1e293b",
    borderRadius: 20,
    marginBottom: 30,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#00ffcc,#00bfff)",
    transition: "0.6s ease",
  },
};
