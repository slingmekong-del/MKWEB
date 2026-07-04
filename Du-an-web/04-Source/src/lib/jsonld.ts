import { SITE_URL, SITE_NAME } from "@/lib/site";
import type { Product } from "@/lib/products";

const ORG_ID = `${SITE_URL}/#organization`;

// Absolute URL from a site-relative path (schema.org expects absolute URLs).
function abs(path: string): string {
  if (!path) return SITE_URL;
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

// The company behind the site — reused as `publisher`/`brand` via @id reference.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "United Mekong JSC",
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: abs("/logo-mekong.jpg"),
    image: abs("/opengraph-image"),
    description:
      "Manufacturer and supplier of certified rigging, lifting, towing and mooring equipment in Vietnam.",
    foundingDate: "2008",
    email: "sales@mekongsling.com",
    telephone: "+842543512738",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 444A, Binh Gia Str, Ward Tam Thang",
      addressLocality: "Ho Chi Minh City",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+842543512738",
      email: "sales@mekongsling.com",
      areaServed: "VN",
      availableLanguage: ["en", "vi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

// Product detail structured data. No `offers` on purpose: this is a B2B
// request-a-quote catalogue with no public prices, and an Offer without a price
// triggers Rich Results errors. WLL and standards go in additionalProperty.
export function productSchema(p: Product) {
  const img = p.images?.length ? p.images.map(abs) : p.image ? [abs(p.image)] : undefined;

  const additionalProperty = [
    p.wText && { "@type": "PropertyValue", name: "Working Load Limit", value: p.wText },
    ...p.standards.map((s) => ({
      "@type": "PropertyValue",
      name: "Standard / Certification",
      value: s,
    })),
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc,
    ...(img ? { image: img } : {}),
    ...(p.partNo ? { sku: p.partNo, mpn: p.partNo } : {}),
    category: p.categoryLabel,
    ...(p.brand
      ? { brand: { "@type": "Brand", name: p.brand } }
      : {}),
    manufacturer: { "@id": ORG_ID },
    url: `${SITE_URL}/products/${p.id}`,
    ...(additionalProperty.length ? { additionalProperty } : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}
