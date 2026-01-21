export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="glass border-soft rounded-xl px-6 py-5 w-[min(90vw,28rem)] text-sm">
        <p className="text-[var(--color-muted)]">Preparing the lab environment…</p>
        <div className="mt-3 h-1.5 w-full bg-[rgba(148,163,184,0.18)] rounded overflow-hidden">
          <div className="h-full w-1/3 bg-[var(--accent-logic)] breathe-slow" style={{ animationDuration: "6s" }} />
        </div>
      </div>
    </div>
  );
}
