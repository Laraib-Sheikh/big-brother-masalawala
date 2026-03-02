import { redirect } from "next/navigation";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = searchParams?.next ?? "/admin";
  redirect(`/login?next=${encodeURIComponent(next)}`);
}
