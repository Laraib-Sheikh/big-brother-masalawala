import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { CUSTOMER_COOKIE_NAME } from "@/lib/customer-auth";

const clearCookie = (name: string) => ({
  name,
  value: "",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 0,
});

export async function POST(req: Request) {
  const c = await cookies();
  c.set(clearCookie(ADMIN_COOKIE_NAME));
  c.set(clearCookie(CUSTOMER_COOKIE_NAME));
  const url = new URL(req.url);
  const next = url.searchParams.get("next") ?? "/";
  return NextResponse.redirect(new URL(next, req.url));
}
