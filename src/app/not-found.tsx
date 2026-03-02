import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-muted p-10 text-center">
        <div className="text-sm font-semibold text-muted-foreground">404</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Go home
          </ButtonLink>
          <Link className="self-center text-sm underline" href="/products">
            Browse products
          </Link>
        </div>
      </div>
    </Container>
  );
}

