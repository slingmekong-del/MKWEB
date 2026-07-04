"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useRfqCart } from "@/hooks/useRfqCart";
import type { RfqItem } from "@/lib/rfq";

function buildRequirements(items: RfqItem[]): string {
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

type Status = "idle" | "submitting" | "success" | "error";

export default function RfqForm() {
  const { ids, toggle, count } = useRfqCart();
  const formRef = useRef<HTMLFormElement>(null);

  // Resolve selected products (in catalogue order) from the cart ids.
  const items = useMemo(
    () => PRODUCTS.filter((p) => ids.has(p.id)).sort((a, b) => a.no - b.no),
    [ids]
  );

  const [requirements, setRequirements] = useState("");
  const [edited, setEdited] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Prefill the requirements box from the cart, until the user types their own text.
  useEffect(() => {
    if (!edited) setRequirements(buildRequirements(items));
  }, [items, edited]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      industry: String(fd.get("industry") || ""),
      requirements,
      website: String(fd.get("website") || ""), // honeypot
      items: items.map((p) => ({ name: p.name, partNo: p.partNo, wText: p.wText })),
    };

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        items.forEach((p) => toggle(p.id)); // clear the RFQ cart
      } else {
        setStatus("error");
        setErrorMsg(
          data.unconfigured
            ? "Our online form is being set up. Please email sales@mekongsling.com or call Ms. Thủy at 0942 928 784."
            : data.error || "Something went wrong. Please try again or contact us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Network error — please try again, or email sales@mekongsling.com / call 0942 928 784."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-teal/40 bg-teal/5 p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-heading font-extrabold text-navy text-xl mb-2">
          RFQ sent — thank you!
        </h3>
        <p className="text-navy/70 text-sm leading-relaxed max-w-md mx-auto">
          We&apos;ve emailed your request to our sales team and sent you a confirmation.
          We&apos;ll reply with a full technical quote within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setEdited(false);
          }}
          className="mt-6 inline-block px-6 py-2.5 rounded border border-navy/20 text-navy font-heading font-semibold text-sm hover:bg-navy/5 transition-colors"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, catches bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

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

      {status === "error" && (
        <p className="rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-10 py-3.5 rounded bg-teal text-navy font-heading font-bold text-sm tracking-wide hover:bg-teal-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send RFQ"}
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
