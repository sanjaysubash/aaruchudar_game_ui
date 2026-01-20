export default function GlowDivider({ className = "" }: { className?: string }) {
  return (
    <div className={"relative h-[1px] w-full my-8 " + className}>
      <div className="absolute inset-0 bg-[rgba(148,163,184,0.18)]" />
      {/* Calm accent line; no glow */}
      <div className="absolute left-0 top-0 h-px w-16 bg-[var(--accent-logic)] opacity-60" />
    </div>
  );
}
