import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { getCustomerSessionFromCookies } from "@/lib/customer-auth";
import { ButtonLink } from "@/components/ui/button";

export default async function CheckoutPage() {
  const session = await getCustomerSessionFromCookies();

  if (!session) {
    redirect("/login?next=/checkout");
  }

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as <strong>{session.email}</strong>. You can add payment
          (e.g. Stripe) and shipping here.
        </p>
        <div className="mt-8 rounded-3xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Checkout flow (payment, shipping, order creation) can be wired here.
            Customer is authenticated.
          </p>
          <div className="mt-6 flex gap-3">
            <ButtonLink href="/products" variant="outline">
              Continue shopping
            </ButtonLink>
            <ButtonLink href="/account" variant="primary">
              Account
            </ButtonLink>
          </div>
        </div>
      </div>
    </Container>
  );
}
