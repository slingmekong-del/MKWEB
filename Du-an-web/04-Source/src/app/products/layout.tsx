import type { Metadata } from "next";
import { PRODUCTS_PAGE } from "@/lib/content";

const { meta } = PRODUCTS_PAGE;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: `${meta.title} | Mekong Sling`,
    description: meta.description,
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
