import Link from "next/link";
import { VISIBLE_PRODUCTS, CATEGORIES, countByStatus } from "@/lib/products";
import { HOME } from "@/lib/content";

const { productsTeaser } = HOME;

// Tailwind color classes must appear as literals in code — Tailwind v4 purges any
// class name it can't see at build time — so the card colour stays keyed by
// category id here; the CMS only edits each highlight's `desc`.
const HIGHLIGHT_COLORS: Record<string, string> = {
  shackle: "bg-navy",
  "synthetic-sling": "bg-teal-dark",
  "hoist-trolley": "bg-navy-light",
  fittings: "bg-teal",
};

const HIGHLIGHTS = productsTeaser.highlights.map((h) => ({
  ...h,
  color: HIGHLIGHT_COLORS[h.id] ?? "bg-navy",
}));

const BRANDS = productsTeaser.brands;

export default function ProductsTeaser() {
  const total = VISIBLE_PRODUCTS.length;
  const live = countByStatus("live");

  const cards = HIGHLIGHTS.flatMap((h) => {
    const cat = CATEGORIES.find((c) => c.id === h.id);
    if (!cat) return []; // category may have been removed/hidden in the CMS
    const count = VISIBLE_PRODUCTS.filter((p) => p.categoryId === h.id).length;
    return [{ ...h, label: cat.label, count }];
  });

  return (
    <section className="bg-slate-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-teal-dark text-xs tracking-[0.3em] uppercase mb-4">
            {productsTeaser.eyebrow}
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy mb-4">
            {productsTeaser.heading}
          </h2>
          <p className="text-navy/60 max-w-xl mx-auto">
            {total} products across {CATEGORIES.length} categories — {live} live with full
            datasheets today, the rest of our Green&nbsp;Pin &amp; ABLE range arriving soon.
            Smart search understands English and Vietnamese.
          </p>
        </div>

        {/* Category highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map(({ id, label, desc, count, color }) => (
            <Link
              key={id}
              href={`/products#${id}`}
              className="group relative rounded-xl overflow-hidden p-6 text-white hover:scale-[1.02] transition-transform"
            >
              <div className={`absolute inset-0 ${color}`} />
              <div className="relative">
                <div className="font-mono text-xs text-white/50 uppercase tracking-widest mb-3">
                  {count} item{count > 1 ? "s" : ""}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{label}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  Browse
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Brands */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-10">
          {BRANDS.map((brand) => (
            <span key={brand} className="font-mono text-sm text-navy/40 uppercase tracking-widest">
              {brand}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-8 py-3.5 rounded bg-navy text-white font-heading font-bold text-sm tracking-wide hover:bg-navy-light transition-colors"
          >
            View Full Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
