import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — United Mekong JSC",
  description:
    "The leading manufacturer and supplier of lifting, towing and mooring equipment in Vietnam. Est. 2008, Vung Tau.",
};

const CREDENTIALS = [
  { code: "DNV", label: "DNV Type Approved", detail: "Hardware & assemblies" },
  { code: "ISO", label: "ISO 9001 Certified", detail: "Quality management" },
  { code: "IMCA", label: "IMCA Member", detail: "Offshore lifting body" },
  { code: "700t", label: "In-house Proof Test", detail: "Horizontal test bed" },
];

const VALUES = [
  {
    title: "Quality",
    desc: "Every product we supply meets industrial and world standards. No shortcuts, no grey-market stock.",
  },
  {
    title: "Reliability",
    desc: "Genuine hardware from authorised brands — Green Pin, ABLE — with full traceability from mill to deck.",
  },
  {
    title: "Competitive price",
    desc: "Direct authorised distributor pricing with stock held in Vung Tau for immediate off-the-shelf supply.",
  },
  {
    title: "Best delivery time",
    desc: "Technical reply within one business day. Assemblies proof-tested and dispatched on schedule.",
  },
];

const CLIENTS = [
  "Vietsovpetro",
  "Seadrill",
  "Halliburton",
  "Posco",
  "Cái Mép Port",
  "PV Drilling",
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero with backdrop image */}
      <section className="relative bg-navy py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Image
          src="/backdrop-about.jpg"
          alt=""
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/70" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="font-mono text-teal text-xs tracking-[0.4em] uppercase mb-5">
            United Mekong JSC · Est. 2008
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
            Vietnam&apos;s leading name in certified rigging
          </h1>
          <p className="text-slate-border text-lg max-w-2xl mx-auto leading-relaxed">
            The leading manufacturer and supplier of lifting, towing and
            mooring equipment in Vietnam — serving offshore, port,
            shipbuilding, and heavy industry since 2008.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-light rounded-xl p-8 border border-slate-border">
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                Mission
              </p>
              <p className="font-heading font-bold text-navy text-xl leading-relaxed">
                &ldquo;To exceed our customers&apos; expectations with high quality,
                reliable and innovative products with competitive price and
                best delivery time.&rdquo;
              </p>
            </div>
            <div className="bg-slate-light rounded-xl p-8 border border-slate-border">
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                Vision
              </p>
              <p className="font-heading font-bold text-navy text-xl leading-relaxed">
                &ldquo;To become the regional most trusted partner in supplying
                of towing, mooring and lifting equipment.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                Our story
              </p>
              <h2 className="font-heading font-extrabold text-3xl text-navy leading-tight mb-6">
                15+ years at the heart of Vietnam&apos;s lifting industry
              </h2>
              <div className="space-y-4 text-navy/60 leading-relaxed">
                <p>
                  United Mekong Holding Company was founded in Vung Tau —
                  Vietnam&apos;s oil &amp; gas capital — to serve the rigorous
                  demands of offshore installations and port operations. Today
                  we run our own{" "}
                  <strong className="text-navy">Dragon Sling Division</strong>{" "}
                  (synthetic sling manufacturing) alongside our specialist
                  subsidiary{" "}
                  <strong className="text-navy">ITIS</strong> (testing and
                  inspection services).
                </p>
                <p>
                  We are the authorised distributor of Green Pin and ABLE in
                  Vietnam, holding stock in Vung Tau for immediate supply.
                  Every assembly we produce is proof-tested in-house and
                  delivered with traceable certificates.
                </p>
                <p>
                  Our customers — from FPSO operators and rig contractors to
                  shipyards and port terminals — share one requirement: zero
                  tolerance for unverified lifting gear. That is the standard
                  we hold ourselves to on every order.
                </p>
              </div>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4">
              {CREDENTIALS.map(({ code, label, detail }) => (
                <div
                  key={code}
                  className="bg-slate-light rounded-xl p-6 border border-slate-border"
                >
                  <div className="font-heading font-extrabold text-2xl text-navy mb-1">
                    {code}
                  </div>
                  <div className="font-heading font-semibold text-sm text-navy mb-1">
                    {label}
                  </div>
                  <div className="font-mono text-xs text-navy/50 uppercase tracking-wide">
                    {detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              What we stand for
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy">
              Four pillars behind every order
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border border-slate-border"
              >
                <h3 className="font-heading font-bold text-navy text-lg mb-3">
                  {title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
            Trusted by
          </p>
          <h2 className="font-heading font-extrabold text-3xl text-navy mb-10">
            Customers who trust our gear
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CLIENTS.map((name) => (
              <div
                key={name}
                className="bg-slate-light border border-slate-border rounded-xl px-8 py-5 font-heading font-bold text-navy text-lg"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-3xl text-white mb-4">
            Ready to work together?
          </h2>
          <p className="text-slate-border mb-8">
            Send us your lifting schedule and we will quote with full
            technical specs within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded bg-teal text-navy font-heading font-bold text-sm tracking-wide hover:bg-teal-dark transition-colors"
            >
              Contact us
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
