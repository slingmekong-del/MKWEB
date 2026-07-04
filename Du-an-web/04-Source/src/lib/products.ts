import productsData from "@/data/products.json";
import categoriesData from "../../content/categories.json";

export type ProductStatus = "live" | "coming";

export type Product = {
  id: string;
  no: number;
  partNo: string;
  name: string;
  brand: string;
  category: string;
  categoryId: string;
  categoryLabel: string;
  subcategory: string;
  rank: number;
  wText: string;
  wmin: number;
  wmax: number;
  status: ProductStatus;
  hidden?: boolean; // true = removed from the whole site (CMS toggle), distinct from status
  image: string | null;
  images?: string[];        // product photos, 1–4 (gallery); falls back to `image`
  catalogImages?: string[]; // catalog / spec-sheet page images
  pdf: string | null;
  desc: string;
  specs?: { label: string; value: string }[]; // key technical attributes (rendered in Specifications card)
  standards: string[];
  syn: string[];
};

export const PRODUCTS: Product[] = productsData as Product[];

// Products shown on the site (CMS may hide individual SKUs via `hidden`). All
// public-facing listing/search/grouping runs off this subset; `PRODUCTS` is kept
// for lookups by id where hidden state is handled by the caller.
export const VISIBLE_PRODUCTS: Product[] = PRODUCTS.filter((p) => !p.hidden);

// Accent-insensitive normalization: lowercase, strip Vietnamese diacritics,
// đ→d. Lets a customer type "ma ní" or "ma ni", "cáp bản" or "cap ban" alike.
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining diacritical marks
    .replace(/đ/g, "d");
}

// Pre-normalized search fields per product (built once, keyed by id)
type SearchDoc = {
  name: string;
  partNo: string;
  subcategory: string;
  category: string;
  brand: string;
  desc: string;
  standards: string[];
  syn: string[];
};
const SEARCH_DOCS = new Map<string, SearchDoc>(
  PRODUCTS.map((p) => [
    p.id,
    {
      name: norm(p.name),
      partNo: norm(p.partNo),
      subcategory: norm(p.subcategory),
      category: norm(p.category),
      brand: norm(p.brand),
      desc: norm(p.desc),
      standards: p.standards.map(norm),
      syn: p.syn.map(norm),
    },
  ])
);

// Categories in display order (rank order from Mr Bac's master list), sourced
// from content/categories.json so the CMS can rename / reorder / hide them.
export type Category = { id: string; label: string; rank: number; visible?: boolean };
export const CATEGORIES: Category[] = categoriesData.categories as Category[];

// Categories shown in the listing / filter UI (hidden ones stay in data but off-site).
export const VISIBLE_CATEGORIES: Category[] = CATEGORIES.filter((c) => c.visible !== false);

export const WLL_RANGES = [
  { id: "lt2",     label: "< 2 t",      min: 0,   max: 2 },
  { id: "2to10",   label: "2 – 10 t",   min: 2,   max: 10 },
  { id: "10to35",  label: "10 – 35 t",  min: 10,  max: 35 },
  { id: "35to120", label: "35 – 120 t", min: 35,  max: 120 },
  { id: "gt120",   label: "> 120 t",    min: 120, max: Infinity },
];

export const STATUS_OPTIONS = [
  { id: "live",   label: "Available now" },
  { id: "coming", label: "Coming soon" },
];

// All unique non-empty brands
export function getAllBrands(): string[] {
  const set = new Set<string>();
  VISIBLE_PRODUCTS.forEach((p) => p.brand && set.add(p.brand));
  return Array.from(set).sort();
}

// Brands available for a given category selection
export function getBrandsForCat(cat: string | null): string[] {
  const pool = cat ? VISIBLE_PRODUCTS.filter((p) => p.categoryId === cat) : VISIBLE_PRODUCTS;
  const set = new Set<string>();
  pool.forEach((p) => p.brand && set.add(p.brand));
  return Array.from(set).sort();
}

export function countByStatus(status: ProductStatus): number {
  return VISIBLE_PRODUCTS.filter((p) => p.status === status).length;
}

export type Filters = {
  cat: string | null;
  brand: string | null;
  wll: string | null;
  status: string | null;
};

export const EMPTY_FILTERS: Filters = { cat: null, brand: null, wll: null, status: null };

export type SortKey = "catalogue" | "wll-desc" | "wll-asc" | "brand-az";

function matchesWll(p: Product, wllId: string): boolean {
  const range = WLL_RANGES.find((r) => r.id === wllId);
  if (!range) return true;
  if (p.wmin === 0 && p.wmax === 0) return false;
  return p.wmax >= range.min && p.wmin <= range.max;
}

// Word-aware match: true if any whole word in `hay` equals the token or begins
// with it (type-ahead prefix). Avoids "ma" matching the middle of "manila".
function wordHit(hay: string, token: string): boolean {
  return hay
    .split(/[^a-z0-9]+/)
    .some((w) => w === token || (token.length >= 2 && w.startsWith(token)));
}

function scoreQuery(p: Product, q: string): number {
  const d = SEARCH_DOCS.get(p.id)!;
  const nq = norm(q).trim();
  if (!nq) return 0;
  const tokens = nq.split(/\s+/).filter(Boolean);
  let score = 0;

  // (B) Whole-phrase synonym match — the strongest signal for Vietnamese terms
  // ("ma ni", "con coc", "pa lang xich"). Exact synonym beats any token noise.
  for (const s of d.syn) {
    if (s === nq) score += 40;
    else if (nq.length >= 4 && s.includes(nq)) score += 18;
    else if (s.length >= 4 && nq.includes(s)) score += 15;
  }
  if (d.name.includes(nq)) score += 12;
  if (d.subcategory.includes(nq)) score += 8;
  if (d.partNo.includes(nq)) score += 15;

  // (A) Per-token, word-boundary matching. `covered` tracks how many query
  // tokens hit at least one field, used for the coverage penalty below.
  let covered = 0;
  for (const t of tokens) {
    let hit = false;
    if (wordHit(d.name, t)) { score += 10; hit = true; }
    if (d.partNo.includes(t)) { score += 9; hit = true; }
    if (wordHit(d.subcategory, t)) { score += 7; hit = true; }
    if (wordHit(d.category, t)) { score += 5; hit = true; }
    if (d.syn.some((s) => wordHit(s, t))) { score += 6; hit = true; }
    if (wordHit(d.brand, t)) { score += 4; hit = true; }
    if (d.standards.some((s) => wordHit(s, t))) { score += 3; hit = true; }
    if (wordHit(d.desc, t)) { score += 2; hit = true; }
    const numMatch = t.match(/^(\d+(?:\.\d+)?)t?$/);
    if (numMatch) {
      const n = parseFloat(numMatch[1]);
      if (p.wmax > 0 && n >= p.wmin && n <= p.wmax) { score += 8; hit = true; }
    }
    if (hit) covered++;
  }

  // (C) Multi-word queries: a product matching only some tokens is likely the
  // wrong type (e.g. "ma" alone matching "master link") — demote it hard.
  if (tokens.length > 1 && covered < tokens.length) score = Math.round(score * 0.1);

  // Live products rank above "coming soon" on equal relevance
  if (score > 0 && p.status === "live") score += 1;
  return score;
}

// Ranked type-ahead suggestions (English or Vietnamese, accent-insensitive).
// Shared by SearchBar so the dropdown and the results grid rank identically.
export function suggest(query: string, limit = 6): Product[] {
  if (query.trim().length < 2) return [];
  const scored = VISIBLE_PRODUCTS.map((p) => ({ p, score: scoreQuery(p, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
  if (scored.length === 0) return [];
  // Drop trailing near-zero noise (a lone desc/prefix hit) so the dropdown only
  // shows genuinely relevant products.
  const floor = Math.max(6, scored[0].score * 0.2);
  return scored
    .filter(({ score }) => score >= floor)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function applyFilters(query: string, filters: Filters): Product[] {
  let results = VISIBLE_PRODUCTS.filter((p) => {
    if (filters.cat && p.categoryId !== filters.cat) return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.wll && !matchesWll(p, filters.wll)) return false;
    if (filters.status && p.status !== filters.status) return false;
    return true;
  });

  if (query.trim()) {
    results = results
      .map((p) => ({ p, score: scoreQuery(p, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ p }) => p);
  }
  return results;
}

export function sortFlat(list: Product[], sort: SortKey): Product[] {
  const out = [...list];
  if (sort === "wll-desc") out.sort((a, b) => b.wmax - a.wmax);
  else if (sort === "wll-asc") out.sort((a, b) => a.wmin - b.wmin);
  else if (sort === "brand-az") out.sort((a, b) => a.brand.localeCompare(b.brand));
  else out.sort((a, b) => a.no - b.no); // catalogue order
  return out;
}

export type CategoryGroup = {
  id: string;
  label: string;
  rank: number;
  items: Product[];
};

// Group a product list into ordered category sections (empty + hidden categories dropped)
export function groupByCategory(list: Product[]): CategoryGroup[] {
  return VISIBLE_CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    rank: c.rank,
    items: list.filter((p) => p.categoryId === c.id).sort((a, b) => a.no - b.no),
  })).filter((g) => g.items.length > 0);
}
