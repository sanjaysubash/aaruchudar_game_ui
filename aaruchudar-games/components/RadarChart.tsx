"use client";
import React from "react";

export default function RadarChart({ values, size = 180 }: { values: { logic: number; empathy: number; creativity: number }; size?: number }) {
  const pad = 10;
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = (s / 2) - pad;
  const toPoint = (angleDeg: number, v: number) => {
    const a = (angleDeg - 90) * (Math.PI / 180);
    const rr = r * (v / 100);
    return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) };
  };
  const pts = [
    toPoint(0, values.logic),
    toPoint(120, values.empathy),
    toPoint(240, values.creativity),
  ];
  const path = `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y} L ${pts[2].x},${pts[2].y} Z`;
  return (
    <svg width={s} height={s} className="block">
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-logic)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent-creativity)" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <g>
        {/* grid */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke="rgba(148,163,184,0.18)" />
        ))}
        {/* axes */}
        {[0, 120, 240].map((deg) => {
          const p = toPoint(deg, 100);
          return <line key={deg} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(148,163,184,0.18)" />;
        })}
        {/* polygon */}
        <path d={path} fill="url(#radarFill)" stroke="var(--accent-logic)" style={{ transition: "d 800ms ease" }} />
      </g>
    </svg>
  );
}