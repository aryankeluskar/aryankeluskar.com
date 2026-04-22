import { NextResponse } from "next/server";
import React from "react";
import { DATA } from "@/data/resume";

const SITE_URL = "https://aryankeluskar.com";

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
    md += `**${edu.school}** — ${degree} (${edu.start} – ${edu.end})\n\n`;
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
    md += `Venue: ${pub.venue}\n\n`;
    if (pub.citation) md += `Citations: ${pub.citation}\n\n`;
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
    md += `**${edu.school}** — ${degree} (${edu.start} – ${edu.end})\n\n`;
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  let markdown: string;

  if (path === "/") {
    markdown = buildHomePageMarkdown();
  } else if (path === "/resume") {
    markdown = buildResumeMarkdown();
  } else if (path === "/blog") {
    markdown = `# Blog — ${DATA.name}\n\nPosts and writings on AI, systems, and building.\n\nVisit [${DATA.name}'s Blog](${SITE_URL}/blog) for the full list.`;
  } else {
    markdown = `# ${DATA.name}\n\nVisit [${SITE_URL}${path}](${SITE_URL}${path}) for more information.`;
  }

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": "true",
    },
  });
}
