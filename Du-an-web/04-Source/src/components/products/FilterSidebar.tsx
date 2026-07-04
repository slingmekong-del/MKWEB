"use client";

import {
  CATEGORIES,
  WLL_RANGES,
  STATUS_OPTIONS,
  EMPTY_FILTERS,
  getBrandsForCat,
  type Filters,
} from "@/lib/products";

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  totalCount: number;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-slate-border pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <h3 className="font-mono text-[10px] uppercase tracking-widest text-navy/40 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Option({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
        active
          ? "bg-teal/10 text-teal-dark font-semibold"
          : "text-navy/70 hover:bg-slate-light hover:text-navy"
      }`}
    >
      {label}
    </button>
  );
}

export default function FilterSidebar({ filters, onChange, totalCount }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const availableBrands = getBrandsForCat(filters.cat);

  // Human-readable chips for whatever is currently selected
  const activeChips = [
    filters.cat
      ? { key: "cat", label: CATEGORIES.find((c) => c.id === filters.cat)?.label ?? filters.cat, clear: { cat: null, brand: null } as Partial<Filters> }
      : null,
    filters.brand
      ? { key: "brand", label: filters.brand, clear: { brand: null } as Partial<Filters> }
      : null,
    filters.wll
      ? { key: "wll", label: WLL_RANGES.find((w) => w.id === filters.wll)?.label ?? filters.wll, clear: { wll: null } as Partial<Filters> }
      : null,
    filters.status
      ? { key: "status", label: STATUS_OPTIONS.find((s) => s.id === filters.status)?.label ?? filters.status, clear: { status: null } as Partial<Filters> }
      : null,
  ].filter(Boolean) as { key: string; label: string; clear: Partial<Filters> }[];

  const hasActive = activeChips.length > 0;

  return (
    <aside className="w-full lg:w-60 shrink-0">
      <div className="bg-white border border-slate-border rounded-xl p-5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-heading font-bold text-navy text-sm">Filters</span>
          <button
            onClick={() => onChange(EMPTY_FILTERS)}
            disabled={!hasActive}
            className={`text-xs font-semibold transition-colors ${
              hasActive
                ? "text-teal-dark hover:underline"
                : "text-navy/25 cursor-default"
            }`}
          >
            Clear all
          </button>
        </div>

        {/* Active filters — what the customer has selected, removable */}
        {hasActive && (
          <div className="mb-4 pb-4 border-b border-slate-border">
            <div className="font-mono text-[10px] uppercase tracking-widest text-navy/40 mb-2">
              Active ({activeChips.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => set(chip.clear)}
                  className="group inline-flex items-center gap-1 rounded-full bg-teal/10 text-teal-dark text-xs font-medium pl-2.5 pr-1.5 py-1 hover:bg-teal/20 transition-colors"
                  title={`Remove ${chip.label}`}
                >
                  {chip.label}
                  <span className="text-teal-dark/60 group-hover:text-teal-dark">✕</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result count */}
        <div className="font-mono text-xs text-navy/40 mb-4">
          {totalCount} product{totalCount === 1 ? "" : "s"} match
        </div>

        {/* Category */}
        <Section title="Category">
          {CATEGORIES.map(({ id, label }) => (
            <Option
              key={id}
              label={label}
              active={filters.cat === id}
              onClick={() => set({ cat: filters.cat === id ? null : id, brand: null })}
            />
          ))}
        </Section>

        {/* Brand */}
        {availableBrands.length > 0 && (
          <Section title="Brand">
            {availableBrands.map((brand) => (
              <Option
                key={brand}
                label={brand}
                active={filters.brand === brand}
                onClick={() => set({ brand: filters.brand === brand ? null : brand })}
              />
            ))}
          </Section>
        )}

        {/* WLL */}
        <Section title="WLL / Load">
          {WLL_RANGES.map(({ id, label }) => (
            <Option
              key={id}
              label={label}
              active={filters.wll === id}
              onClick={() => set({ wll: filters.wll === id ? null : id })}
            />
          ))}
        </Section>

        {/* Availability */}
        <Section title="Availability">
          {STATUS_OPTIONS.map(({ id, label }) => (
            <Option
              key={id}
              label={label}
              active={filters.status === id}
              onClick={() => set({ status: filters.status === id ? null : id })}
            />
          ))}
        </Section>
      </div>
    </aside>
  );
}
