import Link from "next/link";
import { Container } from "@/components/container";
import { blogPosts } from "@/lib/content";

export default function BlogPage() {
  return (
    <Container className="py-12">
      <div className="text-sm font-semibold text-muted-foreground">Blog</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        News & updates
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Short reads about fragrance, routines, and product highlights.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            href={p.href}
            className="rounded-3xl border border-border bg-card p-6 hover:bg-muted"
          >
            <div className="text-xs font-semibold text-muted-foreground">
              {p.author} · {p.dateLabel}
            </div>
            <div className="mt-2 text-lg font-semibold">{p.title}</div>
            <div className="mt-3 text-sm text-muted-foreground underline">
              Read
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

