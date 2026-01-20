import { cn } from "./utils";

type Variant = "cyan" | "violet" | "green" | "magenta" | "blue";

const variantBg: Record<Variant, string> = {
  cyan: "bg-[var(--neon-cyan)]",
  violet: "bg-[var(--neon-violet)]",
  green: "bg-[var(--neon-green)]",
  magenta: "bg-[var(--neon-magenta)]",
  blue: "bg-[var(--neon-blue)]",
};

interface Props {
  value: number; // 0-100
  label?: string;
  variant?: Variant;
  className?: string;
}

export default function ProgressBar({ value, label, variant = "cyan", className }: Props) {
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
        <div className="absolute inset-0 glass border-neon" />
        <div
          className={cn("relative h-full shadow-[0_0_12px_currentColor]", variantBg[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
