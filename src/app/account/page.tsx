import { Container } from "@/components/container";
import Link from "next/link";
import { getCustomerSessionFromCookies } from "@/lib/customer-auth";

export default async function AccountPage() {
  const session = await getCustomerSessionFromCookies();

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Account</h1>

      {session ? (
        <>
          <p className="mt-3 text-sm text-muted-foreground">
            Signed in as <strong>{session.email}</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
              href="/checkout"
            >
              Checkout
            </Link>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
              >
                Sign out
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in or create an account to checkout and manage your orders.
          </p>
          <div className="mt-6 rounded-3xl border border-border bg-muted p-6 text-sm">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-2xl bg-brand px-4 text-sm font-semibold text-brand-foreground hover:opacity-90"
              href="/login?next=/account"
            >
              Sign in or register
            </Link>
            <p className="mt-4 text-muted-foreground">
              Admin? Use the same login page with your admin email and password;
              you’ll be redirected to the dashboard.
            </p>
            <Link className="mt-2 inline-block underline" href="/login">
              Go to login
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}
