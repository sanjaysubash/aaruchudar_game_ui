"use client";
import SolarBackground from "@/components/SolarBackground";
import ClientOnly from "@/components/ClientOnly";

export default function BrainSolarSystemPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Solar background */}
      <ClientOnly>
        <SolarBackground />
      </ClientOnly>

      {/* Minimal overlay title */}
      <div className="pointer-events-none absolute inset-x-0 top-12 flex justify-center">
        <h1 className="text-white/90 text-2xl md:text-3xl font-semibold tracking-wide">Brain Solar System</h1>
      </div>
    </main>
  );
}
