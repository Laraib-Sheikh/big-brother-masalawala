import Link from "next/link";
import { Container } from "@/components/container";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh-1px)] bg-muted/30">
      <div className="border-b border-border bg-background">
        <Container className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold">Admin</div>
            <nav className="flex items-center gap-4 text-sm">
              <Link className="hover:underline" href="/admin">
                Dashboard
              </Link>
              <Link className="hover:underline" href="/admin/products">
                Products
              </Link>
              <form action="/api/admin/logout" method="post">
                <button className="rounded-full border border-border px-4 py-2 hover:bg-muted">
                  Logout
                </button>
              </form>
            </nav>
          </div>
        </Container>
      </div>

      <Container className="py-8">{children}</Container>
    </div>
  );
}

