export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="glass border-neon rounded-xl px-6 py-5 w-[min(90vw,28rem)] text-sm">
        <div className="scanlines rounded">
          <p className="text-[var(--color-muted)]">Initializing Aaruchudar Lab...
            <span className="ml-2 inline-block w-3 h-4 bg-[var(--neon-cyan)] animate-pulse" />
          </p>
          <div className="mt-3 space-y-2">
            <div className="h-1.5 w-full bg-[rgba(148,163,184,0.18)] rounded overflow-hidden">
              <div className="h-full w-1/2 bg-[var(--neon-cyan)] animate-[pulse_1.4s_ease-in-out_infinite]" />
            </div>
            <div className="text-[10px] tracking-widest text-[var(--color-muted)]">SECURE CHANNEL: ONLINE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
