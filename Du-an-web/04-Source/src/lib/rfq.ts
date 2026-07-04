// Shared RFQ (Request for Quotation) contract + email builders, used by both the
// client form (src/components/contact/RfqForm.tsx) and the server route
// (src/app/api/rfq/route.ts). Email bodies are plain HTML strings — no extra
// email-render dependency needed for these small transactional messages.

export type RfqItem = { name: string; partNo: string; wText: string };

export type RfqPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  industry?: string;
  requirements: string;
  items: RfqItem[];
  website?: string; // honeypot — real users leave this empty; bots fill it
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns a list of human-readable validation errors ([] = valid).
export function validateRfq(p: Partial<RfqPayload>): string[] {
  const errs: string[] = [];
  if (!p.name?.trim()) errs.push("Name is required");
  if (!p.company?.trim()) errs.push("Company is required");
  if (!p.email?.trim() || !EMAIL_RE.test(p.email.trim())) errs.push("A valid email is required");
  if (!p.requirements?.trim()) errs.push("Requirements are required");
  return errs;
}

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function itemsHtml(items: RfqItem[]): string {
  if (!items?.length) return "<p style='color:#64748b'>(No catalogue items selected — see requirements below.)</p>";
  const rows = items
    .map(
      (it, i) =>
        `<tr>
          <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;color:#64748b">${i + 1}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0"><strong>${esc(it.name)}</strong></td>
          <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;font-family:monospace;color:#0f766e">${esc(it.partNo || "")}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;font-family:monospace;color:#0f766e">${esc(it.wText || "")}</td>
        </tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;font-size:14px;margin:8px 0">
    <thead><tr style="background:#f1f5f9">
      <th style="padding:6px 10px;text-align:left;color:#334155">#</th>
      <th style="padding:6px 10px;text-align:left;color:#334155">Product</th>
      <th style="padding:6px 10px;text-align:left;color:#334155">Part No.</th>
      <th style="padding:6px 10px;text-align:left;color:#334155">WLL</th>
    </tr></thead>
    <tbody>${rows}</tbody></table>`;
}

// Internal notification sent to the sales inbox. Reply-To is the customer, so
// hitting "Reply" answers the customer directly.
export function salesEmailHtml(p: RfqPayload): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:640px">
    <h2 style="color:#06182F;margin:0 0 4px">New RFQ · ${esc(p.company)}</h2>
    <p style="color:#64748b;margin:0 0 16px">Received via mekongsling.com contact form</p>
    <table style="font-size:14px;border-collapse:collapse;margin-bottom:16px">
      <tr><td style="padding:3px 12px 3px 0;color:#64748b">Name</td><td><strong>${esc(p.name)}</strong></td></tr>
      <tr><td style="padding:3px 12px 3px 0;color:#64748b">Company</td><td><strong>${esc(p.company)}</strong></td></tr>
      <tr><td style="padding:3px 12px 3px 0;color:#64748b">Email</td><td><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></td></tr>
      <tr><td style="padding:3px 12px 3px 0;color:#64748b">Phone</td><td>${esc(p.phone || "—")}</td></tr>
      <tr><td style="padding:3px 12px 3px 0;color:#64748b">Industry</td><td>${esc(p.industry || "—")}</td></tr>
    </table>
    <h3 style="color:#06182F;margin:0 0 4px">Products (${p.items?.length || 0})</h3>
    ${itemsHtml(p.items || [])}
    <h3 style="color:#06182F;margin:16px 0 4px">Requirements / message</h3>
    <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:0">${esc(p.requirements)}</pre>
  </div>`;
}

// Friendly confirmation sent back to the customer. Reply-To is the sales inbox.
export function customerReplyHtml(p: RfqPayload, salesEmail: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:640px">
    <h2 style="color:#06182F;margin:0 0 8px">Thank you, ${esc(p.name.split(" ")[0] || p.name)}!</h2>
    <p style="font-size:15px;line-height:1.6">We have received your request for quotation and our sales team
      will reply with a full technical quote — specs, certificates and lead time — within
      <strong>one business day</strong>.</p>
    <h3 style="color:#06182F;margin:16px 0 4px">Your request</h3>
    ${itemsHtml(p.items || [])}
    <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:8px 0">${esc(p.requirements)}</pre>
    <p style="font-size:14px;color:#64748b;line-height:1.6;margin-top:16px">
      Need it urgently? Call or Zalo <strong>Ms. Thủy</strong> at
      <a href="tel:+84942928784">0942 928 784</a>, or email
      <a href="mailto:${esc(salesEmail)}">${esc(salesEmail)}</a>.<br/>
      — United Mekong JSC · Mekong Sling
    </p>
  </div>`;
}
