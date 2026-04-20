import { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blog";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aryankeluskar.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt
        ? new Date(post.metadata.publishedAt)
        : new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));
  } catch {
    // No blog posts yet
  }

  // GCSP pages
  let gcspPages: MetadataRoute.Sitemap = [];
  try {
    const gcspDir = path.join(process.cwd(), "src/app/gcsp");
    const files = fs.readdirSync(gcspDir);
    const htmlFiles = files.filter(
      (f) => f.endsWith(".html") && f !== "index.html"
    );
    gcspPages = htmlFiles.map((f) => ({
      url: `${baseUrl}/gcsp/${f.replace(".html", "")}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }));
    // Add GCSP index
    gcspPages.push({
      url: `${baseUrl}/gcsp`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  } catch {
    // No GCSP pages
  }

  return [...staticPages, ...blogPages, ...gcspPages];
}
