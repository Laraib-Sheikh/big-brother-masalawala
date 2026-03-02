import { Container } from "@/components/container";

export default function ShippingPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Shipping & Returns
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This is a placeholder page. When you add Shopify/Stripe, you can render
        real shipping rates and return rules here.
      </p>
    </Container>
  );
}

