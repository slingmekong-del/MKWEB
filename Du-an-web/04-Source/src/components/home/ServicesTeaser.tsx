import Link from "next/link";

const SERVICES = [
  {
    id: "spooling",
    title: "Wire Rope Spooling",
    desc: "Precision spooling from drum to drum with tension control. Available in our Vung Tau facility.",
    tags: ["On-site", "Tension-controlled"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: "load-testing",
    title: "Load & Proof Testing",
    desc: "In-house 700-tonne horizontal test bed. Full proof-load certificates issued for every tested assembly.",
    tags: ["700t capacity", "DNV certified"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "ndt",
    title: "Inspection & NDT",
    desc: "Visual inspection, MPI, MT & PT by Level II certified technicians. Compliant with EN13414 and DNV standards.",
    tags: ["Level II NDT", "EN13414"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
];

export default function ServicesTeaser() {
  return (
    <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-teal text-xs tracking-[0.3em] uppercase mb-4">
            Services
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
            End-to-end rigging services
          </h2>
          <p className="text-slate-border max-w-xl mx-auto">
            From spooling to proof testing to NDT inspection — everything under one roof in Vung Tau.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SERVICES.map(({ id, title, desc, tags, icon }) => (
            <div
              key={id}
              className="bg-navy-light border border-white/10 rounded-xl p-8 hover:border-teal/30 transition-colors"
            >
              <div className="text-teal mb-5">{icon}</div>
              <h3 className="font-heading font-bold text-white text-xl mb-3">{title}</h3>
              <p className="text-slate-border text-sm leading-relaxed mb-5">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-teal border border-teal/30 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-block px-8 py-3.5 rounded border border-teal/50 text-teal font-heading font-bold text-sm tracking-wide hover:bg-teal/10 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
