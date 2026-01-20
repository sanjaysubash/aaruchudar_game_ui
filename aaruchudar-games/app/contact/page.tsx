"use client";
import HUDPanel from "@/components/HUDPanel";

export default function ContactPage() {
  return (
    <div className="section-space r-space r-gap">
      <header className="mb-6">
        <h1 className="h1 focus-anchor">Contact</h1>
        <p className="body mt-3">We respond with care. Ask about the lab or share feedback.</p>
      </header>

      <section className="grid grid-cols-1 gap-6">
        <HUDPanel title="MESSAGE">
          <form className="p-4 grid gap-4">
            <input className="rounded-md bg-transparent border border-[rgba(148,163,184,0.28)] py-2 px-3 text-sm" placeholder="Your name" />
            <input className="rounded-md bg-transparent border border-[rgba(148,163,184,0.28)] py-2 px-3 text-sm" placeholder="Email" type="email" />
            <textarea className="rounded-md bg-transparent border border-[rgba(148,163,184,0.28)] py-2 px-3 text-sm" placeholder="Message" rows={5} />
            <button type="submit" className="px-4 py-2 rounded-md border border-[rgba(148,163,184,0.28)] text-xs">Send</button>
          </form>
        </HUDPanel>
      </section>
    </div>
  );
}
