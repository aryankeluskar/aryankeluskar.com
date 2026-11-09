import { NextResponse } from "next/server";
import React from "react";
import {
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  blogPostingJsonLd,
  formatPublishedDate,
  listPostSources,
  postImageUrl,
  publishedAtTime,
  readPostSource,
  type PostSource,
} from "@/data/blog";
import { DATA } from "@/data/resume";
import { resolveCitation } from "@/lib/citations";
import {
  absolutizeRootLinks,
  canonicalLink,
  classifyMarkdownPath,
  discoveryLinkHeaders,
  escapeMarkdownLinkLabel,
  SITE_URL,
} from "@/lib/content-negotiation";

if (DATA.url !== SITE_URL) {
  throw new Error(
    `DATA.url (${DATA.url}) does not match SITE_URL (${SITE_URL})`,
  );
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTENT_SIGNAL = "ai-train=no, search=yes, ai-input=yes";

function jsxToText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(jsxToText).join("");
  if (typeof node === "object" && "type" in node && "props" in node) {
    const el = node as React.ReactElement;
    if (el.type === "br") return "\n";
    if (el.type === "span") {
      const style = el.props.style || {};
      if (style.fontWeight === "bold") {
        return `**${jsxToText(el.props.children)}**`;
      }
      return jsxToText(el.props.children);
    }
    if (el.type === "b" || el.type === "strong") {
      return `**${jsxToText(el.props.children)}**`;
    }
    return jsxToText(el.props.children);
  }
  return "";
}

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]+>/g, "");
}

function buildHomePageMarkdown(): string {
  const d = DATA;
  let md = "";

  md += `# ${d.name}\n\n`;
  md += `> ${d.description}\n\n`;
  md += `**Currently:** ${d.current}\n\n`;

  md += `## About\n\n${d.summary1}\n\n${d.summary2}\n\n`;

  md += `## Links\n\n`;
  md += `- **Resume**: [${d.resumeUrl}](${d.resumeUrl})\n`;
  const socials = Object.values(d.contact.social);
  for (const s of socials) {
    if (s.name === "Send Email") {
      md += `- **Email**: [${d.contact.email}](mailto:${d.contact.email})\n`;
    } else {
      md += `- **${s.name}**: [${s.name}](${s.url})\n`;
    }
  }
  md += "\n";

  md += `## Experience\n\n`;
  for (const job of d.work) {
    md += `### ${job.title} @ ${job.company}\n\n`;
    md += `${job.location} | ${job.start} – ${job.end}\n\n`;
    md += `${jsxToText(job.description)}\n\n`;
  }

  md += `## Education\n\n`;
  for (const edu of d.education) {
    const degree =
      typeof edu.degree === "string" ? edu.degree : jsxToText(edu.degree);
    md += `**${edu.school}** — ${degree}\n\n`;
    if (edu.description) md += `${edu.description}\n\n`;
  }

  md += `## Skills\n\n${d.skills.join(", ")}\n\n`;

  md += `## Writing\n\n`;
  for (const w of d.writing) {
    md += `- [${w.title}](${w.href}) — ${w.preview}\n`;
  }
  md += "\n";

  md += `## Publications\n\n`;
  for (const pub of d.publications) {
    md += `### [${pub.title}](${pub.href})\n\n`;
    if (pub.authors) {
      const authors = pub.authors.map((a) => stripHtmlTags(a)).join(", ");
      md += `Authors: ${authors}\n\n`;
    }
    md += `Venue: ${stripHtmlTags(pub.venue)}\n\n`;
    const { citation } = resolveCitation(pub);
    if (citation) md += `Citations: ${citation}\n\n`;
    if (pub.abstract) md += `**Abstract:** ${pub.abstract}\n\n`;
    if (pub.links) {
      for (const link of pub.links) {
        md += `- [${link.title}](${link.href})\n`;
      }
      md += "\n";
    }
  }

  md += `## Projects\n\n`;
  for (const proj of d.projects) {
    md += `### [${proj.title}](${proj.href})\n\n`;
    md += `${proj.description}\n\n`;
    md += `Technologies: ${proj.technologies.join(", ")}\n\n`;
    if (proj.links) {
      for (const link of proj.links) {
        const label = link.type || "Link";
        if (label) md += `- [${label}](${link.href})\n`;
      }
      md += "\n";
    }
  }

  md += `## Hackathons\n\n`;
  for (const hack of d.hackathons) {
    md += `**${hack.title}**`;
    if (hack.dates) md += ` — ${hack.dates}`;
    if (hack.location) md += ` | ${hack.location}`;
    md += "\n\n";
    if (hack.description) md += `${hack.description}\n\n`;
    if (hack.links) {
      for (const link of hack.links) {
        md += `- [${link.title}](${link.href})\n`;
      }
      md += "\n";
    }
  }

  return md;
}

function buildResumeMarkdown(): string {
  const d = DATA;
  let md = `# ${d.name} — Resume\n\n`;
  md += `${d.location} | [${d.contact.email}](mailto:${d.contact.email})\n\n`;
  md += `**${d.current}**\n\n`;

  md += `## Education\n\n`;
  for (const edu of d.education) {
    const degree =
      typeof edu.degree === "string" ? edu.degree : jsxToText(edu.degree);
    md += `**${edu.school}** — ${degree}\n\n`;
    if (edu.description) md += `${edu.description}\n\n`;
  }

  md += `## Experience\n\n`;
  for (const job of d.work) {
    md += `### ${job.title} @ ${job.company}\n\n`;
    md += `${job.location} | ${job.start} – ${job.end}\n\n`;
    md += `${jsxToText(job.description)}\n\n`;
  }

  md += `See full resume at [${d.resumeUrl}](${d.resumeUrl})\n`;
  return md;
}

function buildBlogIndexMarkdown(posts: PostSource[]): string {
  const sorted = [...posts].sort((a, b) => {
    const delta =
      publishedAtTime(b.metadata.publishedAt) -
      publishedAtTime(a.metadata.publishedAt);
    if (delta !== 0) return delta;
    return a.slug.localeCompare(b.slug);
  });

  const sections = sorted.map((post) => {
    const href = `${SITE_URL}/blog/${post.slug}`;
    return [
      `## [${escapeMarkdownLinkLabel(post.metadata.title)}](${href})`,
      "",
      formatPublishedDate(post.metadata.publishedAt),
      "",
      post.metadata.summary,
      "",
    ].join("\n");
  });

  return [
    "---",
    `title: ${JSON.stringify(`${BLOG_TITLE} | ${DATA.name}`)}`,
    `description: ${JSON.stringify(BLOG_DESCRIPTION)}`,
    "---",
    "",
    `# ${BLOG_TITLE}`,
    "",
    BLOG_DESCRIPTION,
    "",
    sections.join("\n"),
  ].join("\n");
}

function buildBlogPostMarkdown(post: PostSource): string {
  const image = postImageUrl(post, SITE_URL);
  const body = absolutizeRootLinks(post.content.trim(), SITE_URL);
  const jsonLd = blogPostingJsonLd(post, { url: SITE_URL, name: DATA.name });

  return [
    "---",
    `title: ${JSON.stringify(`${post.metadata.title} | ${DATA.name}`)}`,
    `description: ${JSON.stringify(post.metadata.summary)}`,
    `publishedAt: ${JSON.stringify(post.metadata.publishedAt)}`,
    `image: ${JSON.stringify(image)}`,
    "---",
    "",
    `# ${post.metadata.title}`,
    "",
    formatPublishedDate(post.metadata.publishedAt),
    "",
    body,
    "",
    "```json",
    JSON.stringify(jsonLd, null, 2),
    "```",
    "",
  ].join("\n");
}

function markdownResponse(
  body: string,
  init: { status?: number; links?: string[] } = {},
) {
  const markdown = body.endsWith("\n") ? body : `${body}\n`;
  const tokens = Math.floor(Buffer.byteLength(markdown, "utf8") / 4);
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
    "X-Content-Type-Options": "nosniff",
    "x-markdown-tokens": String(tokens),
    "Content-Signal": CONTENT_SIGNAL,
    "Cache-Control": "no-store",
  });
  if (init.links && init.links.length > 0) {
    headers.set("Link", init.links.join(", "));
  }
  return new NextResponse(markdown, {
    status: init.status ?? 200,
    headers,
  });
}

function pageLinks(pathname: string): string[] {
  return [canonicalLink(pathname), ...discoveryLinkHeaders()];
}

function markdownTarget(request: Request): string {
  const url = new URL(request.url);
  // A rewrite keeps the visitor's URL. Direct /api/markdown?path= calls
  // carry the page in the query string instead.
  if (url.pathname === "/api/markdown") {
    return url.searchParams.get("path") ?? "/";
  }
  return url.pathname;
}

export async function GET(request: Request) {
  const classified = classifyMarkdownPath(markdownTarget(request));

  if (classified.kind === "none") {
    return markdownResponse(
      [
        "---",
        `title: ${JSON.stringify("Not Found")}`,
        "---",
        "",
        "# Not Found",
        "",
        "No markdown representation exists for this path.",
        "",
      ].join("\n"),
      { status: 404 },
    );
  }

  if (classified.kind === "home") {
    return markdownResponse(buildHomePageMarkdown(), {
      links: pageLinks(classified.pathname),
    });
  }

  if (classified.kind === "resume") {
    return markdownResponse(buildResumeMarkdown(), {
      links: pageLinks(classified.pathname),
    });
  }

  if (classified.kind === "blog-index") {
    return markdownResponse(buildBlogIndexMarkdown(listPostSources()), {
      links: pageLinks(classified.pathname),
    });
  }

  const post = readPostSource(classified.slug);
  if (!post) {
    return markdownResponse(
      [
        "---",
        `title: ${JSON.stringify("Not Found")}`,
        "---",
        "",
        "# Not Found",
        "",
        `No blog post exists for \`${classified.slug}\`.`,
        "",
      ].join("\n"),
      { status: 404 },
    );
  }

  return markdownResponse(buildBlogPostMarkdown(post), {
    links: pageLinks(classified.pathname),
  });
}
