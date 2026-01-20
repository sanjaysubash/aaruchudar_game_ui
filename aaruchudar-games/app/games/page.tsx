"use client";
import { useMemo, useState } from "react";
import { games as allGames, IntelligenceType, Difficulty } from "@/data/games";
import GameCard from "@/components/GameCard";
import HUDPanel from "@/components/HUDPanel";
import { Search, Filter, Check, X } from "lucide-react";
import { cn } from "@/components/utils";

const types: IntelligenceType[] = ["Logic", "EQ", "Creativity"];
const diffs: Difficulty[] = ["Low", "Medium", "High"];

function ToggleChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full text-xs border transition-colors",
        active ? "bg-[var(--neon-cyan)]/15 border-[var(--neon-cyan)] text-white" : "border-[rgba(148,163,184,0.28)] text-[var(--color-muted)]"
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

  const games = useMemo(() => {
    return allGames.filter((g) => {
      const q = query.trim().toLowerCase();
      const qok = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
      const tok = activeTypes.length === 0 || activeTypes.some((t) => g.intelligence.includes(t));
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

  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6">
        <h1 className="h1 focus-anchor">Games</h1>
        <p className="body mt-3">Train one skill at a time. 2–5 minute sessions.</p>
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
              <div className="mt-4 flex justify-end">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
              {games.map((g) => (
                <GameCard key={g.slug} game={g} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
