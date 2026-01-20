"use client";
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundBadge({ armed }: { armed: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md px-2 py-1 glass border-soft text-xs hover:bg-white/5">
      {armed ? <Volume2 className="h-3.5 w-3.5 text-[var(--accent-progress)]" /> : <VolumeX className="h-3.5 w-3.5 text-[var(--text-muted)]" />}
      <span className="tracking-widest">{armed ? "ARMED" : "MUTED"}</span>
    </span>
  );
}
