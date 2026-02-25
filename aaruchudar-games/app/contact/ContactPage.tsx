"use client";
import HUDPanel from "@/components/HUDPanel";

export default function ContactPage() {
  return (
    <div className="section-space r-space r-gap">
      <header className="mb-8 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/25 to-cyan-500/25 blur-3xl" />
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300">Contact the Lab</h1>
        <p className="mt-2 text-sm text-white/85">Questions, ideas, or feedback — we read everything.</p>
      </header>

      <section className="grid grid-cols-1 gap-6">
        <HUDPanel title="MESSAGE">
          <form className="p-4 grid gap-4">
            <input className="rounded-md bg-white/5 border border-white/20 py-2 px-3 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50" placeholder="Your name" />
            <input className="rounded-md bg-white/5 border border-white/20 py-2 px-3 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder="Email" type="email" />
            <textarea className="rounded-md bg-white/5 border border-white/20 py-2 px-3 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50" placeholder="Message" rows={5} />
            <button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-black font-extrabold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 shadow-[0_10px_20px_rgba(0,0,0,0.35)] hover:scale-[1.02] active:scale-[0.99] transition-transform">
              Send Message
            </button>
          </form>
        </HUDPanel>
      </section>
    </div>
  );
}
