import Link from "next/link";
import { Container } from "@/components/container";

const inputClass =
  "mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const labelClass = "text-sm font-medium";

function ErrorMessage({
  error,
  isRegister,
}: {
  error: string | undefined;
  isRegister: boolean;
}) {
  if (!error) return null;
  const messages: Record<string, string> = {
    missing: "Please enter email and password.",
    invalid: "Invalid email or password.",
    config: "Server configuration error. Please try again later.",
    short: "Password must be at least 6 characters.",
    exists: "An account with this email already exists. Sign in instead.",
    missing_env: "Server configuration error.",
    server:
      "Something went wrong. Please check that the database is set up and migrations are run, then try again.",
  };
  const msg = messages[error] ?? error;
  return (
    <div className="mt-4 rounded-2xl border border-border bg-muted px-4 py-3 text-sm">
      {msg}
    </div>
  );
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string; error?: string; tab?: string }>;
}) {
  const params = await searchParams;
  const next = params?.next ?? "/account";
  const error = params?.error;
  const tab = params?.tab === "register" ? "register" : "login";

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use your email and password. Admins sign in here too and will be
          redirected to the dashboard.
        </p>

        <div className="mt-6 flex gap-2 rounded-2xl border border-border bg-muted/50 p-1">
          <Link
            href={tab === "login" ? "#" : `/login?next=${encodeURIComponent(next)}`}
            className={`flex-1 rounded-xl py-2.5 text-center text-sm font-medium transition-colors ${
              tab === "login"
                ? "bg-background text-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Login
          </Link>
          <Link
            href={tab === "register" ? "#" : `/login?tab=register&next=${encodeURIComponent(next)}`}
            className={`flex-1 rounded-xl py-2.5 text-center text-sm font-medium transition-colors ${
              tab === "register"
                ? "bg-background text-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Register
          </Link>
        </div>

        <ErrorMessage error={error} isRegister={tab === "register"} />

        {tab === "login" ? (
          <form
            className="mt-6 space-y-3"
            action="/api/auth/login"
            method="post"
          >
            <input type="hidden" name="next" value={next} />
            <div>
              <label className={labelClass} htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                className={inputClass}
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                className={inputClass}
                type="password"
                name="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="h-11 w-full rounded-2xl bg-brand text-sm font-semibold text-brand-foreground hover:opacity-90"
            >
              Sign in
            </button>
          </form>
        ) : (
          <form
            className="mt-6 space-y-3"
            action="/api/auth/register"
            method="post"
          >
            <input type="hidden" name="next" value={next} />
            <div>
              <label className={labelClass} htmlFor="reg-name">
                Name
              </label>
              <input
                id="reg-name"
                className={inputClass}
                type="text"
                name="name"
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="reg-phone">
                Phone
              </label>
              <input
                id="reg-phone"
                className={inputClass}
                type="tel"
                name="phone"
                placeholder="+92 300 1234567"
                autoComplete="tel"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="reg-email">
                Email
              </label>
              <input
                id="reg-email"
                className={inputClass}
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="reg-address">
                Address
              </label>
              <input
                id="reg-address"
                className={inputClass}
                type="text"
                name="address"
                placeholder="Street, city, postal code"
                autoComplete="street-address"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="reg-password">
                Password (min 6 characters)
              </label>
              <input
                id="reg-password"
                className={inputClass}
                type="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="h-11 w-full rounded-2xl bg-brand text-sm font-semibold text-brand-foreground hover:opacity-90"
            >
              Create account
            </button>
          </form>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <Link className="underline hover:text-foreground" href="/">
            Back to store
          </Link>
          <Link className="underline hover:text-foreground" href="/account">
            Account
          </Link>
        </div>
      </div>
    </Container>
  );
}
