"use client";
import { useMemo, useState, useEffect } from "react";
import { games as allGames, IntelligenceType, Difficulty } from "@/data/games";
import GameCard from "@/components/GameCard";
import HUDPanel from "@/components/HUDPanel";
import { Search, Filter, Check, X } from "lucide-react";
import { cn } from "@/components/utils";

const types: IntelligenceType[] = ["Logic", "EQ", "Creativity", "Memory", "Speed"];
const diffs: Difficulty[] = ["Low", "Medium", "High"];

function ToggleChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full text-xs border transition-colors",
        active ? "bg-[var(--accent-logic)]/15 border-[var(--accent-logic)] text-white" : "border-[rgba(148,163,184,0.28)] text-[var(--color-muted)]"
      )}
    >
      <span className="inline-flex items-center gap-1.5">{active && <Check className="h-3 w-3" />} {children}</span>
    </button>
  );
}

export default function GamesPage() {
  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<IntelligenceType[]>([]);
  const [activeDiffs, setActiveDiffs] = useState<Difficulty[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [parallax, setParallax] = useState(0);

  // attach scroll listener safely on client
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setParallax(Math.max(-24, Math.min(24, y * 0.06)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const games = useMemo(() => {
    return allGames.filter((g) => {
      const q = query.trim().toLowerCase();
      const qok = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
      const gTypes = (g.intelligence && g.intelligence.length ? g.intelligence : [g.intelligenceType]);
      const tok = activeTypes.length === 0 || activeTypes.some((t) => gTypes.includes(t));
      const dok = activeDiffs.length === 0 || activeDiffs.includes(g.difficulty);
      return qok && tok && dok;
    });
  }, [query, activeTypes, activeDiffs]);

  function toggleType(t: IntelligenceType) {
    setActiveTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }
  function toggleDiff(d: Difficulty) {
    setActiveDiffs((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  function clearFilters() {
    setActiveTypes([]);
    setActiveDiffs([]);
    setQuery("");
  }

  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6">
        <h1 className="brand-text-match text-4xl sm:text-5xl font-extrabold">Games</h1>
        <p className="mt-2 text-sm text-white/85">Pick a tile, earn XP, collect badges. Sessions are quick and punchy.</p>
      </header>

      <section className="panel p-6 r-gap">
        {/* mobile filter trigger */}
        <div className="md:hidden mb-4 flex items-center gap-3">
          <button
            className="px-3 py-2 rounded-md border border-[rgba(148,163,184,0.28)] text-xs inline-flex items-center gap-2"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
          <div className="text-[10px] tracking-widest text-[var(--color-muted)]">{games.length} results</div>
        </div>

        {/* sheet */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl border border-[rgba(148,163,184,0.18)] bg-[rgba(2,6,23,0.9)] backdrop-blur-md p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs tracking-widest text-[var(--color-muted)]">FILTERS</div>
                <button className="p-2" onClick={() => setFiltersOpen(false)}><X className="h-4 w-4" /></button>
              </div>
              <div className="grid gap-4">
                <div>
                  <div className="text-[11px] tracking-widest mb-2 opacity-80">SEARCH</div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Find a challenge..."
                      className="w-full rounded-md bg-transparent border border-[rgba(148,163,184,0.28)] py-2 pl-9 pr-3 text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-[11px] tracking-widest mb-2 opacity-80">INTELLIGENCE</div>
                  <div className="flex flex-wrap gap-2">
                    {types.map((t) => (
                      <ToggleChip key={t} active={activeTypes.includes(t)} onClick={() => toggleType(t)}>
                        {t}
                      </ToggleChip>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] tracking-widest mb-2 opacity-80">DIFFICULTY</div>
                  <div className="flex flex-wrap gap-2">
                    {diffs.map((d) => (
                      <ToggleChip key={d} active={activeDiffs.includes(d)} onClick={() => toggleDiff(d)}>
                        {d}
                      </ToggleChip>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="px-3 py-2 rounded-md border border-[rgba(148,163,184,0.28)] text-xs"
                  onClick={clearFilters}
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 rounded-md border border-[rgba(148,163,184,0.28)] text-xs"
                  onClick={() => setFiltersOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          {/* desktop sidebar */}
          <div className="space-y-4 hidden md:block">
            <HUDPanel title="SEARCH">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a challenge..."
                  className="w-full rounded-md bg-transparent border border-[rgba(148,163,184,0.28)] py-2 pl-9 pr-3 text-sm outline-none"
                />
              </div>
            </HUDPanel>

            <HUDPanel title="INTELLIGENCE TYPE">
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <ToggleChip key={t} active={activeTypes.includes(t)} onClick={() => toggleType(t)}>
                    {t}
                  </ToggleChip>
                ))}
              </div>
            </HUDPanel>

            <HUDPanel title="DIFFICULTY">
              <div className="flex flex-wrap gap-2">
                {diffs.map((d) => (
                  <ToggleChip key={d} active={activeDiffs.includes(d)} onClick={() => toggleDiff(d)}>
                    {d}
                  </ToggleChip>
                ))}
              </div>
            </HUDPanel>
          </div>

          <div>
            {/* Active filter summary chips */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="group px-2.5 py-1 rounded-full border border-[rgba(148,163,184,0.28)] text-xs inline-flex items-center gap-1 hover:border-[var(--accent-logic)]/70 transition"
                >
                  <Search className="h-3.5 w-3.5 text-[var(--color-muted)] group-hover:text-[var(--accent-logic)]" />
                  <span>“{query}”</span>
                  <X className="h-3 w-3 opacity-70" />
                </button>
              )}
              {activeTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  className="px-2.5 py-1 rounded-full border border-[rgba(148,163,184,0.28)] text-xs inline-flex items-center gap-1 hover:border-[var(--accent-logic)]/70 transition"
                >
                  <span>{t}</span>
                  <X className="h-3 w-3 opacity-70" />
                </button>
              ))}
              {activeDiffs.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDiff(d)}
                  className="px-2.5 py-1 rounded-full border border-[rgba(148,163,184,0.28)] text-xs inline-flex items-center gap-1 hover:border-[var(--accent-logic)]/70 transition"
                >
                  <span>{d}</span>
                  <X className="h-3 w-3 opacity-70" />
                </button>
              ))}
              {(query || activeTypes.length || activeDiffs.length) ? (
                <button onClick={clearFilters} className="ml-1 text-[10px] tracking-widest text-[var(--color-muted)] hover:text-white transition">
                  Clear all
                </button>
              ) : null}
            </div>

            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 will-change-transform"
              style={{ transform: `translateY(${parallax}px)` }}
            >
              {games.map((g, i) => (
                <div
                  key={g.slug}
                  className="group relative rounded-xl overflow-hidden h-full"
                  style={{ transitionDelay: `${(i % 6) * 30}ms` }}
                >
                  {/* interactive wrapper to enhance card effects */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(56,189,248,0.08), transparent 40%)"
                  }} />
                  <span
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-80"
                    style={{
                      background: "radial-gradient(circle, rgba(250,250,250,0.9), rgba(56,189,248,0.3))",
                      boxShadow: "0 0 12px rgba(56,189,248,0.6)",
                      left: "var(--sx, 50%)",
                      top: "var(--sy, 50%)",
                      transition: "left 80ms linear, top 80ms linear, opacity 200ms"
                    }}
                  />
                  <div
                    className="relative h-full transform-gpu transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.015]"
                    style={{ perspective: "800px" }}
                    onMouseMove={(e) => {
                      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                      const cx = rect.left + rect.width / 2;
                      const cy = rect.top + rect.height / 2;
                      const dx = e.clientX - cx;
                      const dy = e.clientY - cy;
                      const tiltX = Math.max(-6, Math.min(6, (-dy / rect.height) * 18));
                      const tiltY = Math.max(-6, Math.min(6, (dx / rect.width) * 18));

                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      (e.currentTarget.parentElement as HTMLElement)?.style.setProperty("--x", `${x}%`);
                      (e.currentTarget.parentElement as HTMLElement)?.style.setProperty("--y", `${y}%`);
                      (e.currentTarget.parentElement as HTMLElement)?.style.setProperty("--sx", `${e.clientX - rect.left}px`);
                      (e.currentTarget.parentElement as HTMLElement)?.style.setProperty("--sy", `${e.clientY - rect.top}px`);

                      (e.currentTarget as HTMLDivElement).style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateZ(0)";
                      const parent = e.currentTarget.parentElement as HTMLElement | null;
                      if (parent) {
                        parent.style.setProperty("--sx", `50%`);
                        parent.style.setProperty("--sy", `50%`);
                      }
                    }}
                  >
                    <GameCard game={g} />
                  </div>
                </div>
              ))}
            </div>

            {games.length === 0 && (
              <div className="mt-10 flex justify-center">
                <div className="rounded-2xl p-6 text-center border border-white/10 bg-gradient-to-br from-rose-600/20 via-fuchsia-600/10 to-amber-500/10 max-w-md w-full">
                  <div className="text-4xl mb-2">🕹️</div>
                  <div className="font-bold text-white text-lg">No matches found</div>
                  <div className="text-white/80 text-sm mt-1">Try different filters or clear all to see every game.</div>
                  <button
                    onClick={clearFilters}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30 border border-white/20 hover:bg-black/40 transition font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
