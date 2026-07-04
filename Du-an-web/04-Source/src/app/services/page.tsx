import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — United Mekong JSC",
  description:
    "Rigging supply, sling assembly, wire rope spooling, 700t proof load testing, NDT inspection and re-certification — all under one roof in Vung Tau. ISO 9001 certified.",
};

const STATS = [
  { value: "9,000 m²", label: "Workshop" },
  { value: "700t", label: "Proof Test Bed" },
  { value: "40", label: "Technicians" },
  { value: "$1M", label: "PVI Insurance / loss" },
];

const SERVICES = [
  {
    id: "supply",
    icon: "📦",
    title: "Rigging Supply",
    desc: "Immediate off-the-shelf supply of wire rope slings, shackles, hooks, swivels, turnbuckles and all standard rigging hardware from authorised brands. Custom assemblies on request.",
    items: ["Green Pin shackles & hooks", "ABLE wire rope & fittings", "Same-day dispatch from Vung Tau"],
    tags: ["Authorised distributor", "Stock held in VT"],
  },
  {
    id: "assembly",
    icon: "🔗",
    title: "Sling Assembly",
    desc: "Flemish-eye splices, swaged terminations, and custom sling sets fabricated to EN13414, ASME B30.9, or project-specific standards. Each assembly tagged, documented, and issued with a CoC.",
    items: ["Wire rope slings", "Roundslings & webbing slings", "Chain slings"],
    tags: ["EN13414", "ASME B30.9", "CoC included"],
  },
  {
    id: "spooling",
    icon: "🔄",
    title: "Wire Rope Spooling",
    desc: "Precision drum-to-drum spooling with tension control to prevent birdcaging and internal damage. Available at our Vung Tau facility, with a mobile spooling unit for on-site jobs.",
    items: ["Tension-controlled re-spooling", "Drum-to-drum transfer", "On-site / mobile unit"],
    tags: ["Tension-controlled", "On-site available"],
  },
  {
    id: "load-test",
    icon: "⚖️",
    title: "Load & Proof Testing",
    desc: "In-house 700-tonne horizontal proof test bed. Full certificates issued for every item. DNV-certified process, with short notice accepted for urgent rig-ready deadlines.",
    items: [
      "Wire rope slings",
      "Chain slings",
      "Webbing slings",
      "Shackles",
      "Roundslings",
    ],
    tags: ["700t capacity", "DNV certified", "Short notice"],
  },
  {
    id: "inspection",
    icon: "🔍",
    title: "Inspection & NDT",
    desc: "Visual inspection and Non-Destructive Testing by Level II certified technicians — covering lifting equipment and machinery, compliant with EN13414 and DNV-ST-N001.",
    items: [
      "Crane inspection",
      "Escalator inspection",
      "Elevator inspection",
      "NDT: Penetrant Testing (PT)",
      "NDT: Magnetic Testing (MT)",
    ],
    tags: ["Level II NDT", "EN13414", "DNV-ST-N001"],
  },
  {
    id: "certification",
    icon: "📋",
    title: "Certification & Recertification",
    desc: "Annual in-service inspection and re-certification of your existing sling inventory to LEEA 030 or project SJP. Full inspection register issued.",
    items: ["Annual in-service inspection", "Re-certification to LEEA 030", "Full inspection register"],
    tags: ["LEEA 030", "In-service inspection"],
  },
];

const EQUIPMENT = [
  {
    name: "Horizontal Test Bed",
    detail: "700-tonne proof load capacity",
  },
  {
    name: "Hydraulic Press",
    detail: "Swaging & swaged terminations",
  },
  {
    name: "Roundsling Machine",
    detail: "Synthetic roundsling manufacturing",
  },
  {
    name: "Industrial Sewing Machines",
    detail: "Webbing slings & soft fittings",
  },
];

const CERTS = [
  {
    code: "ISO",
    title: "ISO 9001:2008",
    detail: "Quality management — certified by ACS and DNV",
  },
  {
    code: "V.R",
    title: "Vietnam Register",
    detail: "Lifting equipment type approval",
  },
  {
    code: "MOLISA",
    title: "Safety Inspection Certificate",
    detail: "Vietnam Ministry of Labour (Bộ LĐ-TBXH)",
  },
];

const PROCESS = [
  { step: "01", title: "Send enquiry", desc: "Email or call with your equipment list, SWL, and required standard." },
  { step: "02", title: "Technical quote", desc: "We respond with full specs, certifications, and delivery timeline within one business day." },
  { step: "03", title: "Manufacture & test", desc: "Assembly and proof testing at our Vung Tau facility. You can witness if required." },
  { step: "04", title: "Deliver with docs", desc: "Equipment delivered with CoC, test report, and mill certs — ready for your doc control." },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-navy py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-teal text-xs tracking-[0.4em] uppercase mb-5">
            Services
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
            End-to-end rigging services in{" "}
            <span className="whitespace-nowrap">Vung Tau</span>
          </h1>
          <p className="text-slate-border text-lg max-w-2xl mx-auto leading-relaxed">
            From supply to assembly, proof testing to NDT — everything under
            one roof so your lifting gear arrives rig-ready with full
            certification.
          </p>
        </div>
      </section>

      {/* Capability stats */}
      <section className="bg-navy-light border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-heading font-extrabold text-3xl text-teal mb-1">
                  {value}
                </div>
                <div className="font-mono text-xs text-slate-border uppercase tracking-widest">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ id, icon, title, desc, items, tags }) => (
              <div
                key={id}
                className="bg-slate-light rounded-xl p-8 border border-slate-border hover:border-teal/40 transition-colors flex flex-col"
              >
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="font-heading font-bold text-navy text-xl mb-3">
                  {title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-5">
                  {desc}
                </p>
                <ul className="space-y-1.5 mb-6">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-navy/70 text-sm leading-relaxed"
                    >
                      <span className="text-teal-dark mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-teal-dark border border-teal-dark/30 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & equipment */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                Our facility
              </p>
              <h2 className="font-heading font-extrabold text-3xl text-navy leading-tight mb-6">
                A 9,000 m² workshop built for heavy lifting work
              </h2>
              <div className="space-y-4 text-navy/60 leading-relaxed">
                <p>
                  Every service runs from our own 9,000 m² facility in Vung Tau,
                  staffed by 40 technicians and inspectors. Manufacturing,
                  proof testing, and inspection happen in-house — so we control
                  quality and lead time end to end.
                </p>
                <p>
                  Our operations are covered by PVI insurance up to USD 1
                  million per loss, giving project teams the assurance they
                  need for safety-critical lifting gear.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EQUIPMENT.map(({ name, detail }) => (
                <div
                  key={name}
                  className="bg-white rounded-xl p-6 border border-slate-border"
                >
                  <div className="font-heading font-bold text-navy text-base mb-1">
                    {name}
                  </div>
                  <div className="font-mono text-xs text-navy/50 uppercase tracking-wide leading-relaxed">
                    {detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal text-xs tracking-[0.3em] uppercase mb-4">
              How it works
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-white">
              From enquiry to rig-ready in four steps
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="font-heading font-extrabold text-5xl text-teal/20 mb-3">
                  {step}
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {title}
                </h3>
                <p className="text-slate-border text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
              Accreditations
            </p>
            <h2 className="font-heading font-extrabold text-3xl text-navy">
              Certified processes you can audit
            </h2>
          </div>
          {/* TODO: thêm ảnh logo chứng chỉ thật khi Mr. Bắc gửi (ISO/VR/MOLISA certificates) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {CERTS.map(({ code, title, detail }) => (
              <div
                key={code}
                className="bg-slate-light rounded-xl p-8 border border-slate-border text-center"
              >
                <div className="font-heading font-extrabold text-3xl text-navy mb-3">
                  {code}
                </div>
                <div className="font-heading font-bold text-navy text-base mb-2">
                  {title}
                </div>
                <div className="font-mono text-xs text-navy/50 uppercase tracking-wide leading-relaxed">
                  {detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-3xl text-navy mb-4">
            Tell us what you need to lift
          </h2>
          <p className="text-navy/60 mb-8">
            Send your lifting schedule, SWL requirements, and any applicable
            standards — we will quote within one business day.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded bg-teal text-navy font-heading font-bold text-sm tracking-wide hover:bg-teal-dark transition-colors"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </div>
  );
}
