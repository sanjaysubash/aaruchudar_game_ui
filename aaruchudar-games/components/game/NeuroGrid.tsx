"use client";
import { useEffect, useRef, useState } from "react";

export default function NeuroGrid({ accent = "var(--accent-logic)", onScore }: { accent?: string; onScore: (inc: number) => void; }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState<boolean[][]>(() => Array.from({ length: 5 }, () => Array(5).fill(false)));

  // deterministic grid of nodes
  const rows = 5, cols = 5;

  function draw() {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth; const h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, w, h);

    // background grid
    ctx.strokeStyle = "rgba(148,163,184,0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= rows; i++) {
      const y = (i * h) / rows;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    for (let j = 0; j <= cols; j++) {
      const x = (j * w) / cols;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }

    // connections and nodes
    const r = Math.min(w, h) / 50 + 3; // node radius
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = (j + 0.5) * (w / cols);
        const y = (i + 0.5) * (h / rows);
        const on = active[i][j];
        // connections to right and bottom if both active
        if (j < cols - 1 && on && active[i][j + 1]) {
          const nx = ((j + 1) + 0.5) * (w / cols);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, y); ctx.stroke();
        }
        if (i < rows - 1 && on && active[i + 1][j]) {
          const ny = ((i + 1) + 0.5) * (h / rows);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, ny); ctx.stroke();
        }
        // node
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = on ? accent : "rgba(255,255,255,0.25)";
        ctx.shadowColor = on ? accent : "transparent";
        ctx.shadowBlur = on ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  useEffect(() => { draw(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [active, accent]);
  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function hitTest(clientX: number, clientY: number) {
    const canvas = canvasRef.current; if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left; const y = clientY - rect.top;
    const cellW = rect.width / cols; const cellH = rect.height / rows;
    const j = Math.floor(x / cellW); const i = Math.floor(y / cellH);
    if (i < 0 || j < 0 || i >= rows || j >= cols) return null;
    return { i, j };
  }

  function onClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const pos = hitTest(e.clientX, e.clientY); if (!pos) return;
    setActive((prev) => {
      const next = prev.map((row) => row.slice());
      next[pos.i][pos.j] = !next[pos.i][pos.j];
      return next;
    });
    onScore(5);
  }

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="relative w-full max-w-[640px] aspect-square rounded-xl overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block bg-black/20" onClick={onClick} />
      </div>
    </div>
  );
}
