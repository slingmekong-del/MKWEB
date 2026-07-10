"use client";

import { useState, useMemo } from "react";
import {
  applyFilters,
  sortFlat,
  groupByCategory,
  featuredFrom,
  countByStatus,
  VISIBLE_PRODUCTS,
  EMPTY_FILTERS,
  type Filters,
  type SortKey,
} from "@/lib/products";
import { PRODUCTS_PAGE } from "@/lib/content";
import { useRfqCart } from "@/hooks/useRfqCart";
import FilterSidebar from "@/components/products/FilterSidebar";
import SearchBar from "@/components/products/SearchBar";
import ProductCard from "@/components/products/ProductCard";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "catalogue", label: "Catalogue order" },
  { value: "wll-desc",  label: "WLL: high → low" },
  { value: "wll-asc",   label: "WLL: low → high" },
  { value: "brand-az",  label: "Brand A–Z" },
];

const { hero } = PRODUCTS_PAGE;
const LIVE_COUNT = countByStatus("live");
const TOTAL_COUNT = VISIBLE_PRODUCTS.length;
// Fill {live}/{total} tokens in the CMS-managed subhead with the real counts so
// the banner always matches the catalogue (no hard-coded number to drift).
const HERO_SUBHEAD = hero.subhead
  .replace(/\{live\}/g, String(LIVE_COUNT))
  .replace(/\{total\}/g, String(TOTAL_COUNT));

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("catalogue");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { toggle: toggleRfq, has: inRfq, count: rfqCount } = useRfqCart();

  const results = useMemo(() => applyFilters(query, filters), [query, filters]);

  // Grouped view when browsing in catalogue order with no search; flat otherwise.
  const grouped = !query && sort === "catalogue";
  const groups = useMemo(() => (grouped ? groupByCategory(results) : []), [grouped, results]);
  const flat = useMemo(() => (grouped ? [] : sortFlat(results, sort)), [grouped, results, sort]);
  // Pinned "Featured" block — only while browsing the catalogue (no search / custom sort)
  const featured = useMemo(() => (grouped ? featuredFrom(results) : []), [grouped, results]);

  return (
    <div className="pt-16 min-h-screen bg-slate-light">
      {/* Page header */}
      <div className="bg-navy py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-teal text-xs tracking-[0.3em] uppercase mb-3">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
            {hero.heading}
          </h1>
          <p className="text-slate-border max-w-xl mb-6">
            {HERO_SUBHEAD}
          </p>
          <SearchBar value={query} onChange={setQuery} placeholder={hero.searchPlaceholder} />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar — desktop. `sticky` lives on this flex item (not inside
              FilterSidebar) so its containing block is the tall flex row and it
              actually has room to travel as the catalogue scrolls. */}
          <div className="hidden lg:block lg:sticky lg:top-20 lg:self-start">
            <FilterSidebar filters={filters} onChange={setFilters} totalCount={results.length} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded border border-slate-border bg-white text-sm text-navy font-medium"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  Filters
                </button>
                <span className="text-sm text-navy/50">
                  <span className="font-semibold text-navy">{results.length}</span> products
                  {query && <span> for &ldquo;{query}&rdquo;</span>}
                </span>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-sm border border-slate-border rounded px-3 py-2 bg-white text-navy focus:outline-none focus:border-teal"
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* RFQ bar */}
            {rfqCount > 0 && (
              <div className="mb-6 bg-navy text-white rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm">
                  <span className="font-bold text-teal">{rfqCount}</span> product{rfqCount > 1 ? "s" : ""} in your RFQ
                </span>
                <a href="/contact" className="bg-teal text-navy text-sm font-bold px-4 py-1.5 rounded hover:bg-teal-dark transition-colors">
                  Submit RFQ →
                </a>
              </div>
            )}

            {results.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-navy/40 text-lg mb-2">No products found</p>
                <p className="text-navy/30 text-sm mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => { setQuery(""); setFilters(EMPTY_FILTERS); }}
                  className="text-teal-dark text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : grouped ? (
              /* Grouped by category — the two-level catalogue view */
              <div className="space-y-12">
                {/* Featured — pinned above the categories; these products also
                    still appear inside their own category section below. */}
                {featured.length > 0 && (
                  <section id="featured" className="scroll-mt-24">
                    <div className="flex items-baseline gap-3 mb-4 pb-2 border-b-2 border-teal">
                      <h2 className="font-heading font-extrabold text-navy text-xl">Featured Products</h2>
                      <span className="font-mono text-xs text-navy/40">
                        {featured.length} item{featured.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {featured.map((product) => (
                        <ProductCard
                          key={`featured-${product.id}`}
                          product={product}
                          onAddRfq={toggleRfq}
                          inRfq={inRfq(product.id)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {groups.map((g) => (
                  <section key={g.id} id={g.id} className="scroll-mt-24">
                    <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-slate-border">
                      <h2 className="font-heading font-extrabold text-navy text-xl">{g.label}</h2>
                      <span className="font-mono text-xs text-navy/40">
                        {g.items.length} item{g.items.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {g.items.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddRfq={toggleRfq}
                          inRfq={inRfq(product.id)}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              /* Flat grid — search results / custom sort */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {flat.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddRfq={toggleRfq}
                    inRfq={inRfq(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading font-bold text-navy">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-navy/40 hover:text-navy text-lg">✕</button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={(f) => { setFilters(f); setMobileFiltersOpen(false); }}
              totalCount={results.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
