// Canonical site URL — used by metadata, sitemap, robots and OG tags.
// Defaults to the production domain; override per-environment (e.g. Vercel
// preview) by setting NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mekongsling.com"
).replace(/\/$/, "");

export const SITE_NAME = "Mekong Sling";
