import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;

  // 1. Add Link response headers for agent discovery (RFC 8288)
  // Only on HTML pages (not static assets, API routes, or .well-known)
  if (
    !url.pathname.startsWith("/_next") &&
    !url.pathname.startsWith("/api") &&
    !url.pathname.startsWith("/.well-known") &&
    !url.pathname.includes(".")
  ) {
    const links = [
      `</.well-known/api-catalog>; rel="api-catalog"`,
      `</.well-known/agent-skills/index.json>; rel="agent-skills"`,
      `</.well-known/mcp/server-card.json>; rel="mcp-server"`,
      `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
    ];
    response.headers.set("Link", links.join(", "));
  }

  // 2. Markdown negotiation for agents
  // If Accept: text/markdown is requested, redirect to a markdown representation
  const accept = request.headers.get("accept") || "";
  if (
    accept.includes("text/markdown") &&
    !url.pathname.startsWith("/_next") &&
    !url.pathname.startsWith("/api") &&
    !url.pathname.startsWith("/.well-known") &&
    !url.pathname.includes(".")
  ) {
    // Serve markdown version via /api/markdown route
    const mdUrl = new URL("/api/markdown", request.url);
    mdUrl.searchParams.set("path", url.pathname);
    return NextResponse.rewrite(mdUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
