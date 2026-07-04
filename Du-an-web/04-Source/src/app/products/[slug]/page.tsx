import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { productSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/seo/JsonLd";
import RFQButton from "@/components/products/RFQButton";
import ProductGallery from "@/components/products/ProductGallery";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);
  if (!product) return {};
  const title = `${product.name}${product.partNo ? ` (${product.partNo})` : ""}`;
  const url = `/products/${product.id}`;
  const images = product.image ? [product.image] : undefined;
  return {
    title,
    description: product.desc,
    keywords: [product.name, product.partNo, product.brand, product.category, product.subcategory, ...product.standards].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${title} | Mekong Sling`,
      description: product.desc,
      url,
      images,
    },
  };
}

function Tag({ label, style }: { label: string; style?: string }) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
        style ?? "bg-slate-light border-slate-border text-navy/60"
      }`}
    >
      {label}
    </span>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);
  if (!product) notFound();
  const p = product;
  const live = p.status === "live";

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: p.categoryLabel, path: `/products#${p.categoryId}` },
    { name: p.name, path: `/products/${p.id}` },
  ]);

  return (
    <div className="pt-16 min-h-screen bg-slate-light">
      <JsonLd data={productSchema(p)} />
      <JsonLd data={breadcrumb} />
      {/* Breadcrumb */}
      <div className="bg-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/40">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-teal transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/products#${p.categoryId}`} className="hover:text-teal transition-colors">{p.categoryLabel}</Link>
            <span>/</span>
            <span className="text-white/55">{p.subcategory}</span>
            <span>/</span>
            <span className="text-white/80">{p.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-navy py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Tag label={p.categoryLabel} style="border-teal/30 text-teal bg-transparent" />
            <Tag label={p.subcategory} style="border-white/15 text-white/60 bg-transparent" />
            <Tag
              label={live ? "Available" : "Coming soon"}
              style={live ? "bg-teal/10 text-teal-dark border-teal/30" : "bg-amber-50 text-amber-700 border-amber-200"}
            />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-1">
            {p.name}
          </h1>
          {p.wText && <div className="font-mono text-teal text-lg font-medium">{p.wText}</div>}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            {p.partNo && <span className="font-mono text-white/40 text-sm">Part No. {p.partNo}</span>}
            {p.brand && <span className="font-mono text-white/40 text-sm">· {p.brand}</span>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left — image + catalogue (catalogue sát dưới ảnh) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <ProductGallery
              images={p.images ?? (p.image ? [p.image] : [])}
              alt={p.name}
              categoryLabel={p.categoryLabel}
              subcategory={p.subcategory}
            />

            {/* Catalogue detail */}
            {p.catalogImages && p.catalogImages.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-slate-border">
                <h2 className="font-heading font-bold text-navy text-lg mb-1">Catalogue detail</h2>
                <p className="text-navy/50 text-sm mb-5">
                  Dimensions and technical data from the manufacturer catalogue. Click an image to open full size.
                </p>
                <div className="space-y-4">
                  {p.catalogImages.map((img, i) => (
                    <a
                      key={img}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-slate-border overflow-hidden hover:border-teal/50 transition-colors"
                    >
                      <Image
                        src={img}
                        alt={`${p.name} — catalogue detail ${i + 1}`}
                        width={0}
                        height={0}
                        sizes="(max-width:1024px) 100vw, 66vw"
                        className="w-full h-auto"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — RFQ + Description + Specifications */}
          <div className="space-y-6">
            {/* RFQ / datasheet card */}
            <div className="bg-white rounded-xl p-6 border border-slate-border space-y-5">
              {live ? (
                <>
                  <div>
                    <div className="font-heading font-bold text-navy text-base mb-1">Request a Quote</div>
                    <p className="text-navy/50 text-sm leading-relaxed">
                      Add to your RFQ list. Our sales team responds within 1 business day.
                    </p>
                  </div>
                  <RFQButton productId={p.id} />
                </>
              ) : (
                <>
                  <div>
                    <div className="font-heading font-bold text-navy text-base mb-1">Datasheet coming soon</div>
                    <p className="text-navy/50 text-sm leading-relaxed">
                      This product is part of our range but full specifications are still being
                      added. Contact our sales team for the datasheet, part numbers and pricing.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="block w-full text-center py-3 rounded bg-navy text-white text-sm font-heading font-semibold hover:bg-navy-light transition-colors"
                  >
                    Request datasheet
                  </Link>
                </>
              )}

              <div className="border-t border-slate-border pt-4 space-y-3">
                <Link
                  href="/contact"
                  className="block w-full text-center py-2.5 rounded border border-navy text-navy text-sm font-heading font-semibold hover:bg-navy hover:text-white transition-colors"
                >
                  Contact sales directly
                </Link>
                <Link
                  href="/products"
                  className="block text-center text-sm text-navy/40 hover:text-teal-dark transition-colors"
                >
                  ← Back to catalogue
                </Link>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 border border-slate-border">
              <h2 className="font-heading font-bold text-navy text-lg mb-3">Description</h2>
              <p className="text-navy/70 leading-relaxed">{p.desc}</p>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-xl p-6 border border-slate-border">
              <h2 className="font-heading font-bold text-navy text-lg mb-5">Specifications</h2>
              <dl className="grid grid-cols-1 gap-5">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-navy/40 mb-1.5">Category</dt>
                  <dd className="font-heading font-semibold text-navy">{p.categoryLabel}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-navy/40 mb-1.5">Subcategory</dt>
                  <dd className="font-heading font-semibold text-navy">{p.subcategory}</dd>
                </div>
                {p.wText && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-navy/40 mb-1.5">WLL / Range</dt>
                    <dd className="font-heading font-semibold text-navy">{p.wText}</dd>
                  </div>
                )}
                {p.specs?.map((s) => (
                  <div key={s.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-navy/40 mb-1.5">{s.label}</dt>
                    <dd className="font-heading font-semibold text-navy">{s.value}</dd>
                  </div>
                ))}
                {p.partNo && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-navy/40 mb-1.5">Part Number</dt>
                    <dd className="font-heading font-semibold text-navy">{p.partNo}</dd>
                  </div>
                )}
                {p.brand && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-navy/40 mb-1.5">Brand</dt>
                    <dd className="font-heading font-semibold text-navy">{p.brand}</dd>
                  </div>
                )}
                {p.standards.length > 0 && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-navy/40 mb-2">Standards / Certifications</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {p.standards.map((s) => (
                        <Tag key={s} label={s} style="border-teal/30 text-teal-dark" />
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
