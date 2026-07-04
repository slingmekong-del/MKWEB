import type { Metadata } from "next";
import RfqForm from "@/components/contact/RfqForm";

export const metadata: Metadata = {
  title: "Contact — United Mekong JSC",
  description:
    "Get in touch with our sales team. Quote with full technical specs within one business day.",
};

const SALES_TEAM = [
  {
    name: "Ms. Thủy",
    role: "Head of Sales",
    phone: "0942 928 784",
    email: "sales@mekongsling.com",
    priority: true,
  },
  {
    name: "Ms. Thúy",
    role: "Sales Representative",
    phone: "0938 261 415",
    email: "sales7@mekongsling.com",
    priority: false,
  },
  {
    name: "Ms. Phương",
    role: "Sales Representative",
    phone: "0936 793 973",
    email: "sales12@mekongsling.com",
    priority: false,
  },
  {
    name: "Mr. An",
    role: "Sales Representative",
    phone: "0938 185 183",
    email: "sales8@mekongsling.com",
    priority: false,
  },
  {
    name: "Mr. Ngọc",
    role: "Sales Representative",
    phone: "0983 325 832",
    email: "sales2@mekongsling.com",
    priority: false,
  },
  {
    name: "Ms. Hằng",
    role: "Sales Representative",
    phone: "0909 231 064",
    email: "sales5@mekongsling.com",
    priority: false,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-navy py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-teal text-xs tracking-[0.4em] uppercase mb-5">
            Get in touch
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6">
            We reply within one business day
          </h1>
          <p className="text-slate-border text-lg max-w-xl mx-auto leading-relaxed">
            Send us your lifting requirements and we will come back with a
            full technical quote — specs, certs, and lead time included.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: company info + sales team */}
            <div className="lg:col-span-2 space-y-8">

              {/* Company info */}
              <div>
                <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                  Company information
                </p>
                <h2 className="font-heading font-extrabold text-2xl text-navy mb-4">
                  United Mekong JSC
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3 items-start">
                    <span className="text-lg mt-0.5">📍</span>
                    <span className="text-navy/70 leading-relaxed">
                      No. 444A, Binh Gia Str, Ward Tam Thang,<br />
                      Ho Chi Minh City, Vietnam
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-lg">📞</span>
                    <a href="tel:+842543512738" className="text-navy font-semibold hover:text-teal-dark transition-colors">
                      0254 3512 738
                    </a>
                    <span className="text-navy/40 text-xs">(Tel)</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-lg">📠</span>
                    <span className="text-navy/70">0254 3512 739</span>
                    <span className="text-navy/40 text-xs">(Fax)</span>
                  </div>
                </div>
              </div>

              {/* Sales team */}
              <div>
                <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
                  Sales team
                </p>
                <div className="space-y-3">
                  {SALES_TEAM.map(({ name, role, phone, email, priority }) => (
                    <div
                      key={email}
                      className={`rounded-xl p-4 border ${
                        priority
                          ? "bg-navy border-teal/30"
                          : "bg-slate-light border-slate-border"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-heading font-bold text-sm ${priority ? "text-white" : "text-navy"}`}>
                          {name}
                        </span>
                        {priority && (
                          <span className="font-mono text-xs text-teal border border-teal/40 rounded-full px-2 py-0.5">
                            Priority
                          </span>
                        )}
                      </div>
                      <div className={`font-mono text-xs uppercase tracking-wide mb-2 ${priority ? "text-teal/70" : "text-navy/40"}`}>
                        {role}
                      </div>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={`tel:+84${phone.replace(/^0/, "").replace(/\s/g, "")}`}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                              priority
                                ? "border-white/30 text-white hover:bg-white/10"
                                : "border-navy/20 text-navy hover:bg-navy/5"
                            }`}
                          >
                            📞 Call
                          </a>
                          <a
                            href={`https://zalo.me/${phone.replace(/\s/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border border-teal/40 text-teal hover:bg-teal/10 transition-colors"
                          >
                            💬 Zalo
                          </a>
                          <span className={`text-sm font-semibold ${priority ? "text-slate-border" : "text-navy"}`}>
                            {phone}
                          </span>
                        </div>
                        <a
                          href={`mailto:${email}`}
                          className={`hover:text-teal transition-colors ${priority ? "text-slate-border/70" : "text-navy/60"}`}
                        >
                          ✉️ {email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to include */}
              <div className="bg-slate-light rounded-xl p-6 border border-slate-border">
                <p className="font-heading font-bold text-navy text-sm mb-3">
                  For a fast quote, please include:
                </p>
                <ul className="space-y-1.5 text-navy/60 text-sm">
                  <li>• Equipment type required</li>
                  <li>• Working load limit (SWL / WLL)</li>
                  <li>• Applicable standard (EN, ASME, DNV…)</li>
                  <li>• Quantity &amp; delivery location</li>
                  <li>• Required delivery date</li>
                </ul>
              </div>
            </div>

            {/* Right: RFQ Form */}
            <div className="lg:col-span-3">
              <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-6">
                Request for Quotation (RFQ)
              </p>
              <RfqForm />

              {/* Map — lấp khoảng trống bên dưới form */}
              <div className="mt-8">
                <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-3">
                  Location
                </p>
                <div className="rounded-xl overflow-hidden border border-slate-border">
                  <iframe
                    src="https://maps.google.com/maps?q=444A+Binh+Gia+Street+Tam+Thang+Ho+Chi+Minh+City+Vietnam&output=embed"
                    width="100%"
                    height="320"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="United Mekong JSC location"
                  />
                </div>
                <p className="font-mono text-xs text-navy/40 mt-2">
                  444A Binh Gia Str, Ward Tam Thang, Ho Chi Minh City, Vietnam
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
