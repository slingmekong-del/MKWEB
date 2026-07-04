"use client";
import Link from "next/link";
import { useRfqCart } from "@/hooks/useRfqCart";

export default function RFQButton({ productId }: { productId: string }) {
  const { has, toggle, count } = useRfqCart();
  const inRfq = has(productId);

  return (
    <div className="space-y-3">
      <button
        onClick={() => toggle(productId)}
        className={`w-full py-3 rounded font-heading font-semibold text-sm transition-colors ${
          inRfq
            ? "bg-teal text-navy hover:bg-teal-dark"
            : "bg-navy text-white hover:bg-navy-light"
        }`}
      >
        {inRfq ? "✓ Remove from RFQ" : "+ Add to RFQ"}
      </button>

      {count > 0 && (
        <Link
          href="/contact"
          className="block w-full text-center py-2.5 rounded bg-teal/10 border border-teal/30 text-teal-dark text-sm font-heading font-semibold hover:bg-teal/20 transition-colors"
        >
          Submit RFQ ({count} item{count > 1 ? "s" : ""}) →
        </Link>
      )}
    </div>
  );
}
