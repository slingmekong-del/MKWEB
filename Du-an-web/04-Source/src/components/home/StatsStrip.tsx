const STATS = [
  { value: "700t", label: "Proof Test Bed" },
  { value: "8", label: "Authorised Brands" },
  { value: "5,000+", label: "Assemblies / Year" },
  { value: "20+", label: "Years in Vung Tau" },
];

export default function StatsStrip() {
  return (
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
  );
}
