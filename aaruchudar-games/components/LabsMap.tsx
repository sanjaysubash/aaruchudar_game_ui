"use client";
import { useState } from "react";

type LabNode = {
  id: string;
  title: string;
  unlocked: boolean;
  x: number; // 0..1 relative
  y: number; // 0..1 relative
};

const nodes: LabNode[] = [
  { id: "calibration", title: "Calibration", unlocked: true, x: 0.1, y: 0.6 },
  { id: "focus", title: "Focused Attention", unlocked: true, x: 0.3, y: 0.4 },
  { id: "working-memory", title: "Working Memory", unlocked: false, x: 0.5, y: 0.5 },
  { id: "pattern", title: "Pattern Reasoning", unlocked: false, x: 0.7, y: 0.35 },
  { id: "adaptation", title: "Adaptive Strategy", unlocked: false, x: 0.85, y: 0.55 },
];

export default function LabsMap() {
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <div className="panel p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white/90 font-semibold">Intelligence Map</h3>
        <span className="text-xs text-white/60">{nodes.filter(n => n.unlocked).length}/{nodes.length} unlocked</span>
      </div>
      <div className="relative h-64 md:h-72">
        {/* Paths */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.slice(0, -1).map((n, i) => {
            const nx = nodes[i + 1];
            return (
              <line
                key={`${n.id}-${nx.id}`}
                x1={`${n.x * 100}%`} y1={`${n.y * 100}%`}
                x2={`${nx.x * 100}%`} y2={`${nx.y * 100}%`}
                stroke="rgba(255,255,255,0.12)" strokeWidth={2}
              />
            );
          })}
        </svg>
        {/* Nodes */}
        {nodes.map((n) => (
          <button
            key={n.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border ${n.unlocked ? "bg-white/10 border-[var(--border)]" : "bg-white/3 border-white/10"}`}
            style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%`, width: 20, height: 20 }}
            onMouseEnter={() => setHoverId(n.id)}
            onMouseLeave={() => setHoverId((id) => (id === n.id ? null : id))}
          />
        ))}
        {/* Hover detail */}
        {hoverId && (() => {
          const n = nodes.find(x => x.id === hoverId)!;
          return (
            <div
              className="absolute -translate-x-1/2 -translate-y-full mt-2 px-3 py-2 panel text-xs text-white/80"
              style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
            >
              <div className="font-medium text-white">{n.title}</div>
              <div className="text-white/60">{n.unlocked ? "Unlocked" : "Locked"}</div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
