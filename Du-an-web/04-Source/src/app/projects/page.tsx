import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — United Mekong JSC",
  description:
    "Case studies from offshore, port, shipbuilding and heavy-lift projects supplied by United Mekong JSC.",
};

const SECTORS = [
  {
    id: "offshore",
    icon: "⚓",
    title: "Offshore & FPSO",
    desc: "Wire rope slings, shackles, and crane rigging sets for FPSO mooring, topside lifts, and subsea installation. Familiar with IMCA M 179 and DNV-ST-N001.",
    clients: "FPSO operators · Rig contractors · DSV support",
  },
  {
    id: "port",
    icon: "🏗️",
    title: "Port & Terminal",
    desc: "Container spreader slings, quay crane rigging, and general cargo gear for Vung Tau, Cái Mép, and HCMC port facilities.",
    clients: "Port terminals · Stevedores · Logistics contractors",
  },
  {
    id: "shipbuilding",
    icon: "🚢",
    title: "Shipbuilding & Repair",
    desc: "Launch and drydock rigging, block-erection sling sets, and chain blocks for shipyards across Southeast Asia.",
    clients: "Shipyards · OSV operators · Vessel owners",
  },
  {
    id: "heavy-lift",
    icon: "🏛️",
    title: "Heavy Lift & Construction",
    desc: "Multi-leg sling sets, beam spreaders, and turnbuckle assemblies for onshore heavy-lift, civil construction, and petrochemical plant erection.",
    clients: "EPC contractors · Heavy-lift specialists",
  },
];

const STATS = [
  { value: "20+", label: "Years in rigging" },
  { value: "500+", label: "Projects delivered" },
  { value: "700t", label: "Proof test capacity" },
  { value: "1-day", label: "Quote turnaround" },
];

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-navy py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-teal text-xs tracking-[0.4em] uppercase mb-5">
            Projects &amp; case studies
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
            Trusted across industries, project after project
          </h1>
          <p className="text-slate-border text-lg max-w-2xl mx-auto leading-relaxed">
            From offshore FPSO topside lifts to port crane rigging and
            shipyard block erection — we deliver certified gear and
            documentation to keep your operations moving.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-teal py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="font-heading font-extrabold text-3xl text-navy mb-1">
                {value}
              </div>
              <div className="font-mono text-xs text-navy/70 uppercase tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              Industry sectors
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy">
              Sectors we serve
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECTORS.map(({ id, icon, title, desc, clients }) => (
              <div
                key={id}
                className="bg-slate-light rounded-xl p-8 border border-slate-border"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-heading font-bold text-navy text-xl mb-3">
                  {title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-4">{desc}</p>
                <p className="font-mono text-xs text-teal-dark uppercase tracking-wide">
                  {clients}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery placeholder */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              Gallery
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy mb-4">
              Project photos
            </h2>
            <p className="text-navy/60 max-w-md mx-auto">
              Photo gallery coming soon — we are currently curating our
              project portfolio. Contact us to discuss your specific
              sector or application.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-slate-border/40 border border-slate-border flex items-center justify-center"
              >
                <span className="font-mono text-xs text-navy/30 uppercase tracking-wide">
                  Photo {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-3xl text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-slate-border mb-8">
            Tell us about your lifting requirement and we will respond with
            a technical proposal within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded bg-teal text-navy font-heading font-bold text-sm tracking-wide hover:bg-teal-dark transition-colors"
            >
              Start a conversation
            </Link>
            <Link
              href="/products"
              className="px-8 py-3.5 rounded border border-white/30 text-white font-heading font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
