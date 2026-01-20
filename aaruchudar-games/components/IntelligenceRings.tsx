"use client";
import React from "react";

type Ring = {
  label: string;
  value: number; // 0-100
  color: string;
};

export default function IntelligenceRings({ rings, size = 160 }: { rings: Ring[]; size?: number }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {rings.map((r, i) => {
            const offset = (circumference * (100 - r.value)) / 100;
            const innerShift = i * (stroke + 6);
            const rr = radius - innerShift;
            const cc = 2 * Math.PI * rr;
            const off = (cc * (100 - r.value)) / 100;
            return (
              <g key={r.label}>
                <circle r={rr} fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth={stroke} />
                <circle
                  r={rr}
                  fill="none"
                  stroke={r.color}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={cc}
                  strokeDashoffset={off}
                  style={{
                    transition: "stroke-dashoffset 800ms ease, opacity 800ms ease",
                    opacity: 0.9,
                  }}
                />
              </g>
            );
          })}
        </g>
      </svg>
      <div className="ml-4 grid gap-2 text-xs">
        {rings.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: r.color }} />
            <span className="uppercase tracking-wide opacity-80">{r.label}</span>
            <span className="ml-auto font-medium opacity-90">{Math.round(r.value)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}