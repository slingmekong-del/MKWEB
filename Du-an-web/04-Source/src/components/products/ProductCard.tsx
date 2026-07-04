import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  onAddRfq: (id: string) => void;
  inRfq: boolean;
};

export default function ProductCard({ product: p, onAddRfq, inRfq }: Props) {
  const live = p.status === "live";
  const href = `/products/${p.id}`;

  return (
    <div className="group bg-white border border-slate-border rounded-xl overflow-hidden hover:shadow-md hover:border-teal/40 transition-all flex flex-col">
      {/* Image / hero */}
      <Link href={href} className="relative aspect-[4/3] bg-white border-b border-slate-border flex items-center justify-center overflow-hidden">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-4"
          />
        ) : (
          <div className="absolute inset-0 bg-navy flex flex-col items-center justify-center text-center px-4">
            <div className="font-mono text-teal text-[10px] tracking-widest uppercase mb-1">
              {p.categoryLabel}
            </div>
            <div className="font-heading font-bold text-white text-base leading-tight">
              {p.subcategory}
            </div>
          </div>
        )}
        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
            live
              ? "bg-teal/10 text-teal-dark border-teal/30"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
        >
          {live ? "Available" : "Coming soon"}
        </span>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Category › Subcategory (the 2-level path) */}
        <div className="font-mono text-[10px] uppercase tracking-wider text-navy/40">
          {p.categoryLabel} <span className="text-teal-dark">›</span> {p.subcategory}
        </div>

        <Link href={href} className="block hover:text-teal-dark transition-colors">
          <div className="font-heading font-bold text-navy text-base leading-snug">{p.name}</div>
        </Link>

        {/* Part no + brand + WLL */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {p.partNo && (
            <span className="font-mono text-xs text-navy/50">{p.partNo}</span>
          )}
          {p.brand && (
            <span className="font-mono text-[10px] uppercase tracking-wider bg-slate-light text-navy/60 px-2 py-0.5 rounded">
              {p.brand}
            </span>
          )}
        </div>
        {p.wText && (
          <div className="font-mono text-teal-dark text-sm font-medium">{p.wText}</div>
        )}

        <div className="flex-1" />

        {/* CTAs */}
        {live ? (
          <div className="flex gap-2">
            <button
              onClick={() => onAddRfq(p.id)}
              className={`flex-1 py-2.5 rounded text-sm font-heading font-semibold transition-colors ${
                inRfq
                  ? "bg-teal text-navy cursor-default"
                  : "bg-navy text-white hover:bg-navy-light"
              }`}
            >
              {inRfq ? "✓ In RFQ" : "+ Add to RFQ"}
            </button>
            <Link
              href={href}
              className="px-3 py-2.5 rounded border border-slate-border text-navy/60 text-sm hover:border-navy hover:text-navy transition-colors"
              title="View details"
            >
              →
            </Link>
          </div>
        ) : (
          <Link
            href="/contact"
            className="block text-center py-2.5 rounded border border-slate-border text-navy/60 text-sm font-heading font-semibold hover:border-navy hover:text-navy transition-colors"
          >
            Request datasheet
          </Link>
        )}
      </div>
    </div>
  );
}
