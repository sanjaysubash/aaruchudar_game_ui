import { cn } from "./utils";

// Variants align with theme accents
type Variant = "logic" | "empathy" | "creativity" | "progress";

const variantBg: Record<Variant, string> = {
  logic: "bg-[var(--accent-logic)]",
  empathy: "bg-[var(--accent-empathy)]",
  creativity: "bg-[var(--accent-creativity)]",
  progress: "bg-[var(--accent-progress)]",
};

interface Props {
  value: number; // 0-100
  label?: string;
  variant?: Variant;
  className?: string;
}

export default function ProgressBar({ value, label, variant = "logic", className }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1 flex justify-between text-[10px] text-[var(--color-muted)]">
          <span className="tracking-widest">{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="relative h-2 w-full overflow-hidden rounded">
        <div className="absolute inset-0 glass border-soft" />
        <div
          className={cn("relative h-full", variantBg[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
