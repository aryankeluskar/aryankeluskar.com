import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
      {posts
        .sort(
          (a, b) =>
            Date.parse(b.metadata.publishedAt) -
            Date.parse(a.metadata.publishedAt),
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col gap-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="tracking-tight">{post.metadata.title}</p>
              <p className="h-6 text-xs text-muted-foreground">
                {post.metadata.publishedAt}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}
