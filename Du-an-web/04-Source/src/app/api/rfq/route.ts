import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  validateRfq,
  salesEmailHtml,
  customerReplyHtml,
  type RfqPayload,
} from "@/lib/rfq";

export const dynamic = "force-dynamic";

const FROM = process.env.RFQ_FROM_EMAIL || "Mekong Sling <onboarding@resend.dev>";
const TO = process.env.RFQ_TO_EMAIL || "sales@mekongsling.com";
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK_URL;

// Best-effort: push one lead row to a Google Apps Script web-app webhook that
// appends to the customer-list sheet. Never blocks or fails the RFQ.
async function appendToSheet(p: RfqPayload) {
  if (!SHEET_WEBHOOK) return;
  await fetch(SHEET_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      name: p.name,
      company: p.company,
      email: p.email,
      phone: p.phone || "",
      industry: p.industry || "",
      products: (p.items || []).map((i) => i.name).join("; "),
      requirements: p.requirements,
    }),
    signal: AbortSignal.timeout(8000),
  });
}

export async function POST(req: NextRequest) {
  let body: Partial<RfqPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden `website` field. Pretend success, drop it.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateRfq(body);
  if (errors.length) {
    return NextResponse.json({ ok: false, error: errors.join(". ") }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client so it can show the call/Zalo fallback.
    return NextResponse.json(
      { ok: false, error: "Email service not configured", unconfigured: true },
      { status: 503 }
    );
  }

  const payload: RfqPayload = {
    name: body.name!.trim(),
    company: body.company!.trim(),
    email: body.email!.trim(),
    phone: body.phone?.trim() || "",
    industry: body.industry?.trim() || "",
    requirements: body.requirements!.trim(),
    items: Array.isArray(body.items) ? body.items : [],
  };

  const resend = new Resend(apiKey);

  // Critical path: the notification to sales. If this fails, the RFQ failed.
  const sales = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: payload.email,
    subject: `RFQ · ${payload.company} · ${payload.items.length} product${payload.items.length === 1 ? "" : "s"}`,
    html: salesEmailHtml(payload),
  });
  if (sales.error) {
    console.error("RFQ sales email failed:", sales.error);
    return NextResponse.json(
      { ok: false, error: "Could not send your request. Please call or Zalo us." },
      { status: 502 }
    );
  }

  // Best-effort side effects — never block the customer's success response.
  const [first, ...rest] = payload.name.split(/\s+/);
  await Promise.allSettled([
    // Auto-reply confirmation to the customer
    resend.emails.send({
      from: FROM,
      to: [payload.email],
      replyTo: TO,
      subject: "We received your RFQ — Mekong Sling",
      html: customerReplyHtml(payload, TO),
    }),
    // Add to the "customer list" audience in Resend
    AUDIENCE_ID
      ? resend.contacts.create({
          email: payload.email,
          firstName: first || payload.name,
          lastName: rest.join(" "),
          unsubscribed: false,
          audienceId: AUDIENCE_ID,
        })
      : Promise.resolve(),
    // Append a row to the Google Sheet customer list
    appendToSheet(payload),
  ]).then((results) => {
    results.forEach((r) => {
      if (r.status === "rejected") console.error("RFQ side-effect failed:", r.reason);
    });
  });

  return NextResponse.json({ ok: true });
}
