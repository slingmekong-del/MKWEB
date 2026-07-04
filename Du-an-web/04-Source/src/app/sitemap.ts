import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top-level marketing / tool pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/products`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/wll-tool`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/projects`,  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`,   lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
  ];

  // One entry per product detail page. Live products rank above coming-soon.
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.status === "live" ? 0.8 : 0.4,
  }));

  return [...staticRoutes, ...productRoutes];
}
