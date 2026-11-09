export const SITE_URL = "https://aryankeluskar.com";

const BLOG_SLUG = /^[A-Za-z0-9._-]+$/;

export type MarkdownPath =
  | { kind: "home"; pathname: "/" }
  | { kind: "resume"; pathname: "/resume" }
  | { kind: "blog-index"; pathname: "/blog" }
  | { kind: "blog-post"; pathname: string; slug: string }
  | { kind: "none"; pathname: string };

export function classifyMarkdownPath(input: string): MarkdownPath {
  let pathname: string;
  try {
    pathname = decodeURIComponent(input);
  } catch {
    return { kind: "none", pathname: input };
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  if (
    pathname.includes("\0") ||
    pathname.includes("\\") ||
    pathname.split("/").includes("..")
  ) {
    return { kind: "none", pathname };
  }

  if (pathname === "/") return { kind: "home", pathname };
  if (pathname === "/resume") return { kind: "resume", pathname };
  if (pathname === "/blog") return { kind: "blog-index", pathname };

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length);
    if (!slug || slug.includes("/") || !isBlogSlug(slug)) {
      return { kind: "none", pathname };
    }
    return { kind: "blog-post", pathname: `/blog/${slug}`, slug };
  }

  return { kind: "none", pathname };
}

function isBlogSlug(slug: string): boolean {
  return BLOG_SLUG.test(slug) && slug !== "." && slug !== "..";
}

// Explicit text/markdown with q>0 wins, including when text/html is also
// listed. That matches Cloudflare Markdown for Agents and clients such as
// Claude Code (`text/markdown, text/html, */*`). q=0 does not match.
// `*/*` alone does not request markdown.
export function acceptsMarkdown(accept: string | null): boolean {
  if (!accept) return false;

  for (const part of accept.split(",")) {
    const [type, ...params] = part
      .trim()
      .split(";")
      .map((segment) => segment.trim())
      .filter(Boolean);
    if (!type || type.toLowerCase() !== "text/markdown") continue;

    let quality = 1;
    for (const param of params) {
      const eq = param.indexOf("=");
      if (eq === -1) continue;
      const key = param.slice(0, eq).trim().toLowerCase();
      if (key !== "q") continue;
      const raw = param.slice(eq + 1).trim().replace(/^"|"$/g, "");
      const parsed = Number(raw);
      quality = Number.isFinite(parsed) ? parsed : 0;
    }
    if (quality > 0) return true;
  }

  return false;
}

export function escapeMarkdownLinkLabel(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
}

export function absolutizeRootLinks(markdown: string, origin: string): string {
  const base = origin.endsWith("/") ? origin.slice(0, -1) : origin;
  const lines = markdown.split("\n");
  let fence: { char: "`" | "~"; len: number } | null = null;

  return lines
    .map((line) => {
      const fenceMatch = /^( {0,3})(`{3,}|~{3,})/.exec(line);
      if (fenceMatch) {
        const marker = fenceMatch[2];
        const char = marker[0] as "`" | "~";
        const len = marker.length;
        if (!fence) {
          fence = { char, len };
        } else if (fence.char === char && len >= fence.len) {
          fence = null;
        }
        return line;
      }
      if (fence) return line;
      return absolutizeLine(line, base);
    })
    .join("\n");
}

function absolutizeLine(line: string, base: string): string {
  const parts = line.split("`");
  return parts
    .map((part, index) => (index % 2 === 1 ? part : rewriteRootLinks(part, base)))
    .join("`");
}

function rewriteRootLinks(text: string, base: string): string {
  return text.replace(
    /\]\(\s*(\/(?!\/)[^)\s]*)([^)]*)\)/g,
    (_match, href: string, rest: string) => `](${base}${href}${rest})`,
  );
}

export function discoveryLinkHeaders(): string[] {
  return [
    `</.well-known/api-catalog>; rel="api-catalog"`,
    `</.well-known/agent-skills/index.json>; rel="agent-skills"`,
    `</.well-known/mcp/server-card.json>; rel="mcp-server"`,
    `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
  ];
}

export function markdownAlternateLink(pathname: string): string {
  return `<${SITE_URL}${pathname}>; rel="alternate"; type="text/markdown"`;
}

export function canonicalLink(pathname: string): string {
  return `<${SITE_URL}${pathname}>; rel="canonical"`;
}
