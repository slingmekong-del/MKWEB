import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getOrigin(req: NextRequest): string {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  return `${proto}://${host}`;
}

// Returns the tiny HTML page Decap's popup expects: it announces itself to the
// opener (the CMS), then relays the auth result back via postMessage.
function relay(message: string): NextResponse {
  const literal = JSON.stringify(message); // safe JS string literal
  const doc = `<!doctype html><meta charset="utf-8"><title>Authorizing…</title>
<script>
(function () {
  function receive(e) {
    window.opener.postMessage(${literal}, e.origin);
    window.removeEventListener("message", receive, false);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>`;
  return new NextResponse(doc, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

// Step 2: GitHub redirects here with a code; we verify state, swap the code for
// an access token, and hand it to the CMS.
export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return relay(`authorization:github:error:${JSON.stringify({ error: "OAuth not configured" })}`);
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = req.cookies.get("decap_oauth_state")?.value;

  if (!code || !state || !savedState || state !== savedState) {
    return relay(`authorization:github:error:${JSON.stringify({ error: "Invalid OAuth state" })}`);
  }

  const origin = getOrigin(req);
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${origin}/api/callback`,
    }),
  });

  const data = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!data.access_token) {
    return relay(
      `authorization:github:error:${JSON.stringify({ error: data.error ?? "No access token" })}`
    );
  }

  const res = relay(
    `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}`
  );
  res.cookies.delete("decap_oauth_state");
  return res;
}
