import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const BLOG_TITLE = "Blog";
export const BLOG_DESCRIPTION =
  "My thoughts on software development, life, and more.";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export type PostSource = {
  slug: string;
  content: string;
  metadata: Metadata;
};

const SLUG_PATTERN = /^[A-Za-z0-9._-]+$/;

function contentDirectory(): string {
  return path.join(process.cwd(), "content");
}

function requireFrontmatterString(
  data: Record<string, unknown>,
  key: string,
  slug: string,
): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `content/${slug}.mdx is missing frontmatter field "${key}"`,
    );
  }
  if (value.includes("\n") || value.includes("\r")) {
    throw new Error(
      `content/${slug}.mdx frontmatter field "${key}" must be a single line`,
    );
  }
  return value;
}

function parseMetadata(data: Record<string, unknown>, slug: string): Metadata {
  const title = requireFrontmatterString(data, "title", slug);
  const publishedAt = requireFrontmatterString(data, "publishedAt", slug);
  const summary = requireFrontmatterString(data, "summary", slug);
  if (Number.isNaN(publishedAtTime(publishedAt))) {
    throw new Error(
      `content/${slug}.mdx has an invalid publishedAt: ${publishedAt}`,
    );
  }

  const metadata: Metadata = { title, publishedAt, summary };
  if ("image" in data && data.image != null) {
    if (typeof data.image !== "string" || data.image.trim() === "") {
      throw new Error(
        `content/${slug}.mdx has an invalid image frontmatter field`,
      );
    }
    metadata.image = data.image;
  }
  return metadata;
}

export function publishedAtTime(publishedAt: string): number {
  const iso = publishedAt.includes("T")
    ? publishedAt
    : `${publishedAt}T00:00:00Z`;
  return Date.parse(iso);
}

export function formatPublishedDate(publishedAt: string): string {
  const parsed = publishedAtTime(publishedAt);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid publishedAt date: ${publishedAt}`);
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(parsed));
}

export function readPostSource(slug: string): PostSource | null {
  if (!SLUG_PATTERN.test(slug) || slug === "." || slug === "..") return null;

  const dir = contentDirectory();
  const filePath = path.resolve(dir, `${slug}.mdx`);
  const root = path.resolve(dir);
  if (filePath !== root && !filePath.startsWith(root + path.sep)) return null;
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);
  if (
    parsed.data === null ||
    typeof parsed.data !== "object" ||
    Array.isArray(parsed.data)
  ) {
    throw new Error(`content/${slug}.mdx has unreadable frontmatter`);
  }

  return {
    slug,
    content: parsed.content,
    metadata: parseMetadata(parsed.data as Record<string, unknown>, slug),
  };
}

export function listPostSources(): PostSource[] {
  const dir = contentDirectory();
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch (error) {
    throw new Error(`Cannot read blog content directory ${dir}`, {
      cause: error,
    });
  }

  return entries
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => {
      const slug = path.basename(file, ".mdx");
      const post = readPostSource(slug);
      if (!post) {
        throw new Error(`Failed to read content/${file}`);
      }
      return post;
    });
}

export function postImageUrl(
  post: { metadata: Metadata },
  siteUrl: string,
): string {
  return post.metadata.image
    ? `${siteUrl}${post.metadata.image}`
    : `${siteUrl}/og?title=${post.metadata.title}`;
}

export function blogPostingJsonLd(
  post: { slug: string; metadata: Metadata },
  site: { url: string; name: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    image: postImageUrl(post, site.url),
    url: `${site.url}/blog/${post.slug}`,
    author: {
      "@type": "Person" as const,
      name: site.name,
    },
  };
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  const raw = readPostSource(slug);
  if (!raw) return null;
  const content = await markdownToHTML(raw.content);
  return {
    source: content,
    metadata: raw.metadata,
    slug,
  };
}

export async function getBlogPosts() {
  const posts = listPostSources();
  return Promise.all(
    posts.map(async (post) => ({
      metadata: post.metadata,
      slug: post.slug,
      source: await markdownToHTML(post.content),
    })),
  );
}
