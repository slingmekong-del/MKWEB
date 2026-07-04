import Link from "next/link";

const CREDENTIALS = [
  { code: "DNV", desc: "DNV Type Approved" },
  { code: "ISO", desc: "ISO 9001 Certified" },
  { code: "IMCA", desc: "IMCA Member 2026" },
  { code: "700t", desc: "In-house Proof Test" },
];

export default function AboutTeaser() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              About Mekong Sling
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy leading-tight mb-6">
              20+ years delivering certified rigging in Vietnam
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed mb-8">
              United Mekong JSC is the authorised distributor of Green Pin, ABLE
              and other leading rigging brands in Vietnam. Every assembly we
              produce is proof-tested on our 700-tonne horizontal test bed and
              delivered with traceable certificates.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-teal-dark hover:text-teal transition-colors"
            >
              Learn more about us
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Credentials grid */}
          <div className="grid grid-cols-2 gap-4">
            {CREDENTIALS.map(({ code, desc }) => (
              <div
                key={code}
                className="bg-slate-light rounded-xl p-6 border border-slate-border"
              >
                <div className="font-heading font-extrabold text-2xl text-navy mb-2">
                  {code}
                </div>
                <div className="font-mono text-xs text-navy/50 uppercase tracking-wide">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
