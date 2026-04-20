import { NextResponse } from "next/server";

export async function GET() {
  const index = {
    $schema:
      "https://agentskills.io/schemas/agent-skills-index.json",
    skills: [
      {
        name: "sitemap",
        type: "discovery",
        description:
          "Canonical sitemap listing all pages on aryankeluskar.com",
        url: "https://aryankeluskar.com/sitemap.xml",
        sha256:
          "0000000000000000000000000000000000000000000000000000000000000000",
      },
      {
        name: "markdown-negotiation",
        type: "content",
        description:
          "Request any HTML page with Accept: text/markdown to get a markdown version",
        url: "https://aryankeluskar.com/api/markdown",
        sha256:
          "0000000000000000000000000000000000000000000000000000000000000000",
      },
      {
        name: "api-catalog",
        type: "discovery",
        description:
          "API catalog per RFC 9727 listing available APIs and services",
        url: "https://aryankeluskar.com/.well-known/api-catalog",
        sha256:
          "0000000000000000000000000000000000000000000000000000000000000000",
      },
      {
        name: "mcp-server-card",
        type: "discovery",
        description:
          "MCP Server Card for agent tool discovery (SEP-1649)",
        url: "https://aryankeluskar.com/.well-known/mcp/server-card.json",
        sha256:
          "0000000000000000000000000000000000000000000000000000000000000000",
      },
    ],
  };

  return NextResponse.json(index, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
