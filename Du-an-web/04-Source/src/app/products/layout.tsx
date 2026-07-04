import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Rigging & Lifting Catalogue",
  description:
    "Browse our full catalogue of shackles, wire rope slings, chains, master links, hoists and rigging hardware. Filter by category, brand and working load limit, then request a quote.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Rigging & Lifting Catalogue | Mekong Sling",
    description:
      "Shackles, wire rope slings, chains, master links, hoists and rigging hardware — filter by category, brand and WLL.",
    url: "/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
