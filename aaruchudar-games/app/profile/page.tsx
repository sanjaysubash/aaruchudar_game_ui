"use client";
import { me } from "@/data/users";
import HUDPanel from "@/components/HUDPanel";
import IntelligenceRings from "@/components/IntelligenceRings";
import RadarChart from "@/components/RadarChart";

export default function ProfilePage() {
  const dims = me.dimensions ?? { logic: 0, empathy: 0, creativity: 0 };
  const rings = [
    { label: "Logic", value: dims.logic, color: "var(--accent-logic)" },
    { label: "Empathy", value: dims.empathy, color: "var(--accent-empathy)" },
    { label: "Creativity", value: dims.creativity, color: "var(--accent-creativity)" },
  ];
  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6">
        <h1 className="h1 focus-anchor">Profile</h1>
        <p className="body mt-3">Identity: {me.rankName ?? "Initiate"}. Calm growth over time.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HUDPanel title="INTELLIGENCE RINGS">
          <div className="p-4">
            <IntelligenceRings rings={rings} size={180} />
          </div>
        </HUDPanel>
        <HUDPanel title="COGNITIVE RADAR">
          <div className="p-4">
            <RadarChart values={dims} size={200} />
          </div>
        </HUDPanel>
      </section>

      <section className="mt-6">
        <HUDPanel title="RECENT ACTIVITY">
          <ul className="p-4 grid gap-3">
            {me.activity.map((a) => (
              <li key={a.id} className="flex items-center justify-between text-sm">
                <span className="opacity-85">{a.label}</span>
                <span className="text-right opacity-75">{a.value}</span>
              </li>
            ))}
          </ul>
        </HUDPanel>
      </section>
    </div>
  );
}
