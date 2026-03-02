import { Container } from "@/components/container";
import Link from "next/link";

export default function AccountPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This is a placeholder page. Connect authentication (NextAuth, Clerk, or
        your own) when you’re ready.
      </p>
      <div className="mt-6 rounded-3xl border border-border bg-muted p-6 text-sm">
        <div className="font-semibold">Admin?</div>
        <p className="mt-1 text-muted-foreground">
          Use the admin area to add products.
        </p>
        <div className="mt-4">
          <Link className="underline" href="/admin/login">
            Go to admin login
          </Link>
        </div>
      </div>
    </Container>
  );
}

