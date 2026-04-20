import { NextResponse } from "next/server";

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://aryankeluskar.com/api/markdown",
        href: "https://aryankeluskar.com/api/markdown",
        rel: "service-doc",
        type: "text/markdown",
        title: "Markdown representation API for site pages",
      },
      {
        anchor: "https://aryankeluskar.com/api/markdown",
        href: "https://aryankeluskar.com/api/markdown",
        rel: "service-desc",
        type: "text/markdown",
        title: "Accepts ?path= parameter, returns text/markdown",
      },
    ],
  };

  return NextResponse.json(catalog, {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json",
    },
  });
}
