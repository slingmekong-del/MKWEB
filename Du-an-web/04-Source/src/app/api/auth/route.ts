import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export const dynamic = "force-dynamic";

// Origin of the deployed site, honouring Vercel's proxy headers.
function getOrigin(req: NextRequest): string {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  return `${proto}://${host}`;
}

// Step 1 of the Decap GitHub OAuth flow: bounce the editor to GitHub's consent
// screen with a CSRF `state` we stash in an httpOnly cookie.
export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Missing GITHUB_OAUTH_CLIENT_ID env var", { status: 500 });
  }

  const origin = getOrigin(req);
  const state = randomBytes(16).toString("hex");
  const scope = new URL(req.url).searchParams.get("scope") ?? "repo";

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", `${origin}/api/callback`);
  authUrl.searchParams.set("scope", scope);
  authUrl.searchParams.set("state", state);

  const res = NextResponse.redirect(authUrl.toString());
  res.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax", // survives the top-level redirect back from GitHub
    path: "/",
    maxAge: 600,
  });
  return res;
}
