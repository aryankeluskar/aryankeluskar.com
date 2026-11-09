import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  acceptsMarkdown,
  classifyMarkdownPath,
  discoveryLinkHeaders,
  markdownAlternateLink,
} from "@/lib/content-negotiation";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const classified = classifyMarkdownPath(url.pathname);

  if (
    !url.pathname.startsWith("/_next") &&
    !url.pathname.startsWith("/api") &&
    !url.pathname.startsWith("/.well-known") &&
    !url.pathname.includes(".")
  ) {
    const links = discoveryLinkHeaders();
    if (classified.kind !== "none") {
      links.push(markdownAlternateLink(classified.pathname));
      response.headers.append("Vary", "Accept");
    }
    response.headers.set("Link", links.join(", "));
  }

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    classified.kind !== "none" &&
    acceptsMarkdown(request.headers.get("accept"))
  ) {
    const mdUrl = new URL("/api/markdown", request.url);
    mdUrl.searchParams.set("path", classified.pathname);
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
