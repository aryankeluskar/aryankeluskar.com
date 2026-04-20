import { NextResponse } from "next/server";

const SITE_URL = "https://aryankeluskar.com";

const pages: Record<string, { title: string; description: string; content: string }> = {
  "/": {
    title: "Aryan Keluskar",
    description:
      "20, building fast backends, scalable language models, and iOS apps. I live to learn, create, and ship.",
    content: `# Aryan Keluskar

> 20, building fast backends, scalable language models, and iOS apps. I live to learn, create, and ship.

## About

I love to solve problems, research intricate concepts, and build things that people love. Solving daunting & ambiguous problems demand clarity under chaos, thus I believe in using first principles and technological advancements to solve them. I'm currently a Computer Science senior at ASU, researching safety in large-language models.

I grew up with a deep passion for mathematics, and use bayesian statistics to explain the world around me. I have won awards at collegiate hackathons such as HackMIT 2024 and SFHacks 2024. In my free time, I'm going down rabbit-holes or cycling till I run out of roads.

## Links

- **Resume**: [dub.sh/aryans-resume](https://dub.sh/aryans-resume)
- **Google Scholar**: [scholar.google.com](https://scholar.google.com/citations?user=wVDeZtcAAAAJ)
- **GitHub**: [github.com/aryankeluskar](https://github.com/aryankeluskar)
- **LinkedIn**: [linkedin.com/in/aryankeluskar](https://linkedin.com/in/aryankeluskar)
- **Twitter/X**: [x.com/aryankeluskar](https://x.com/aryankeluskar)
- **Email**: [aryan@aryankeluskar.com](mailto:aryan@aryankeluskar.com)
`,
  },
  "/resume": {
    title: "Resume | Aryan Keluskar",
    description: "Aryan Keluskar's resume and professional experience.",
    content: `# Aryan Keluskar — Resume

San Francisco, CA | [aryan@aryankeluskar.com](mailto:aryan@aryankeluskar.com)

**Currently building [alice](https://dub.sh/wonderland) and writing [research papers](https://scholar.google.com/citations?user=wVDeZtcAAAAJ).**

## Education

**Arizona State University** — B.S. Computer Science, Minor in Statistics (Aug 2023 – May 2027)

## Experience

See full resume at [dub.sh/aryans-resume](https://dub.sh/aryans-resume)
`,
  },
  "/blog": {
    title: "Blog | Aryan Keluskar",
    description: "Aryan Keluskar's blog posts.",
    content: `# Blog — Aryan Keluskar

Posts and writings on AI, systems, and building.

Visit [aryankeluskar.com/blog](https://aryankeluskar.com/blog) for the full list.
`,
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  const page = pages[path];

  const markdown = page
    ? page.content
    : `# Aryan Keluskar\n\nVisit [aryankeluskar.com](${SITE_URL}${path}) for more information.`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": "true",
    },
  });
}
