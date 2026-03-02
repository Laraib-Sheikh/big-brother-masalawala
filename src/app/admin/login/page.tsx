import Link from "next/link";
import { Container } from "@/components/container";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { next?: string; error?: string };
}) {
  const next = searchParams?.next ?? "/admin";
  const error = searchParams?.error;

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
        <div className="text-sm font-semibold text-muted-foreground">Admin</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use your admin email and password to manage products.
        </p>

        {error ? (
          <div className="mt-4 rounded-2xl border border-border bg-muted px-4 py-3 text-sm">
            {error === "invalid" ? "Invalid email or password." : error}
          </div>
        ) : null}

        <form className="mt-6 space-y-3" action="/api/admin/login" method="post">
          <input type="hidden" name="next" value={next} />
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              type="email"
              name="email"
              placeholder="admin@masalaywala.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button className="h-11 w-full rounded-2xl bg-brand text-sm font-semibold text-brand-foreground hover:opacity-90">
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link className="underline" href="/">
            Back to store
          </Link>
        </div>
      </div>
    </Container>
  );
}

