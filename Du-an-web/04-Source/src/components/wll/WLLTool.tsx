"use client";

import { useState } from "react";
import WLLCalculator from "./WLLCalculator";
import SlingQuoteBuilder from "./SlingQuoteBuilder";

type Tab = "quote" | "lookup";

const TABS: { id: Tab; label: string; sub: string }[] = [
  { id: "quote", label: "Size a sling", sub: "Load weight → sling for quote" },
  { id: "lookup", label: "WLL lookup", sub: "Select rope → WLL by angle" },
];

export default function WLLTool() {
  const [tab, setTab] = useState<Tab>("quote");

  return (
    <div>
      {/* Shared hero */}
      <section className="bg-navy pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-teal text-xs tracking-[0.4em] uppercase mb-4">
            Engineering Tool · Grade 1960 · DNVGL-ST-E271
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-4">
            WLL &amp; Sling Calculator
          </h1>
          <p className="text-slate-border max-w-xl mx-auto text-lg leading-relaxed">
            Select the right sling set for your load, or look up the WLL of a
            multi-leg sling by sling angle. Fast — accurate — standards-based.
          </p>
        </div>

        {/* Tab bar */}
        <div className="max-w-md mx-auto mt-8 grid grid-cols-2 gap-2 rounded-xl border border-white/15 bg-white/5 p-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg py-2.5 px-3 text-center transition-colors ${
                tab === t.id ? "bg-teal text-navy" : "text-white/70 hover:text-white"
              }`}
            >
              <div className="font-heading font-bold text-sm">{t.label}</div>
              <div className={`font-mono text-[10px] mt-0.5 ${tab === t.id ? "text-navy/70" : "text-white/40"}`}>
                {t.sub}
              </div>
            </button>
          ))}
        </div>
      </section>

      {tab === "quote" ? <SlingQuoteBuilder /> : <WLLCalculator />}
    </div>
  );
}
