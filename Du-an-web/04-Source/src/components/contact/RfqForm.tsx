"use client";

import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useRfqCart } from "@/hooks/useRfqCart";

function buildRequirements(items: { name: string; partNo: string; wText: string }[]): string {
  if (items.length === 0) return "";
  const lines = items.map(
    (it, i) =>
      `${i + 1}. ${it.name}${it.partNo ? ` (${it.partNo})` : ""}${it.wText ? ` — ${it.wText}` : ""}`
  );
  return (
    "RFQ — Request for quotation for the following products:\n" +
    lines.join("\n") +
    "\n\nPlease advise unit price, lead time and certification.\nQuantity / delivery location / required date:\n"
  );
}

export default function RfqForm() {
  const { ids, toggle, count } = useRfqCart();

  // Resolve selected products (in catalogue order) from the cart ids.
  const items = useMemo(
    () => PRODUCTS.filter((p) => ids.has(p.id)).sort((a, b) => a.no - b.no),
    [ids]
  );

  const [requirements, setRequirements] = useState("");
  const [edited, setEdited] = useState(false);

  // Prefill the requirements box from the cart, until the user types their own text.
  useEffect(() => {
    if (!edited) setRequirements(buildRequirements(items));
  }, [items, edited]);

  return (
    <form
      action="mailto:sales@mekongsling.com"
      method="POST"
      encType="text/plain"
      className="space-y-5"
    >
      {/* RFQ list summary (only when items are in the cart) */}
      {count > 0 && (
        <div className="rounded-lg border border-teal/30 bg-teal/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-bold text-navy text-sm">
              Your RFQ list ({count})
            </span>
            <button
              type="button"
              onClick={() => items.forEach((p) => toggle(p.id))}
              className="font-mono text-[11px] uppercase tracking-wider text-navy/40 hover:text-teal-dark"
            >
              Clear all
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-navy/80">
                  <span className="font-medium">{p.name}</span>
                  {p.partNo && <span className="font-mono text-navy/40"> · {p.partNo}</span>}
                  {p.wText && <span className="font-mono text-teal-dark"> · {p.wText}</span>}
                </span>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  className="text-navy/30 hover:text-red-500 shrink-0"
                  title="Remove from RFQ"
                  aria-label={`Remove ${p.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <p className="text-navy/40 text-xs mt-3">
            These products are added to your message below — edit it freely before sending.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
            Full name *
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-teal transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
            Company *
          </label>
          <input
            type="text"
            name="company"
            required
            className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-teal transition-colors"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-teal transition-colors"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-teal transition-colors"
            placeholder="+84 9xx xxx xxx"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
          Industry
        </label>
        <select
          name="industry"
          className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-teal transition-colors bg-white"
        >
          <option value="">Select industry…</option>
          <option>Offshore &amp; FPSO</option>
          <option>Port &amp; Terminal</option>
          <option>Shipbuilding &amp; Ship repair</option>
          <option>Heavy lifting &amp; Construction</option>
          <option>Onshore oil &amp; gas</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block font-mono text-xs text-navy/50 uppercase tracking-wide mb-1.5">
          Requirements *
        </label>
        <textarea
          name="requirements"
          required
          rows={count > 0 ? 8 : 5}
          value={requirements}
          onChange={(e) => {
            setRequirements(e.target.value);
            setEdited(true);
          }}
          className="w-full border border-slate-border rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-teal transition-colors resize-none"
          placeholder="Describe the equipment needed — product type, WLL, quantity, standard, delivery date, delivery location…"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-10 py-3.5 rounded bg-teal text-navy font-heading font-bold text-sm tracking-wide hover:bg-teal-dark transition-colors"
      >
        Send RFQ
      </button>

      <p className="text-navy/40 text-xs">
        * Required. We reply within one business day. Urgent?{" "}
        <a href="tel:+84942928784" className="underline hover:text-teal-dark">Call</a>
        {" "}or{" "}
        <a href="https://zalo.me/0942928784" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-dark">Zalo</a>
        {" "}Ms. Thủy directly at 0942 928 784.
      </p>
    </form>
  );
}
