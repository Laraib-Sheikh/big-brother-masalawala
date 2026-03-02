import { Container } from "@/components/container";

export default function FaqPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">FAQ</h1>
      <div className="mt-6 space-y-6 text-sm text-muted-foreground">
        <div>
          <div className="font-semibold text-foreground">Do you ship worldwide?</div>
          <div className="mt-1">
            This demo is frontend-only. Add your shipping zones when you connect a
            backend.
          </div>
        </div>
        <div>
          <div className="font-semibold text-foreground">Can I return an item?</div>
          <div className="mt-1">Add your returns policy here.</div>
        </div>
      </div>
    </Container>
  );
}

