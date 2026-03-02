import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <Container className="py-12">
      <div className="text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-foreground">{post.title}</span>
      </div>

      <article className="prose prose-zinc mt-8 max-w-3xl dark:prose-invert">
        <h1>{post.title}</h1>
        <p>
          <strong>{post.author}</strong> · {post.dateLabel}
        </p>
        <p>
          This is placeholder content so the blog routes work end-to-end.
          Replace it with MDX, a CMS (Sanity/Contentful), or Shopify blog data
          when you connect a backend.
        </p>
        <h2>Quick tips</h2>
        <ul>
          <li>Apply fragrance to pulse points (wrists, neck, behind ears).</li>
          <li>Moisturized skin helps the scent last longer.</li>
          <li>Store bottles away from heat and direct sunlight.</li>
        </ul>
      </article>
    </Container>
  );
}

