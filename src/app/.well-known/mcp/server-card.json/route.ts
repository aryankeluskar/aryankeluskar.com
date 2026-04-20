import { NextResponse } from "next/server";

export async function GET() {
  const card = {
    "$schema": "https://modelcontextprotocol.io/schema/server-card.json",
    serverInfo: {
      name: "aryankeluskar.com",
      version: "1.0.0",
      description:
        "Aryan Keluskar's personal site — portfolio, blog, and resume",
    },
    transport: {
      type: "sse",
      url: "https://aryankeluskar.com/.well-known/mcp/sse",
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        listChanged: false,
      },
    },
  };

  return NextResponse.json(card, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
