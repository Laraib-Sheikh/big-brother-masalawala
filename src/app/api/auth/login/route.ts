import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { ADMIN_COOKIE_NAME, signAdminSession } from "@/lib/admin-auth";
import {
  CUSTOMER_COOKIE_NAME,
  signCustomerSession,
} from "@/lib/customer-auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const nextUrl = String(form.get("next") ?? "/account").trim() || "/account";

  if (!email || !password) {
    return NextResponse.redirect(
      new URL(`/login?error=missing&next=${encodeURIComponent(nextUrl)}`, req.url),
    );
  }

  const baseUrl = new URL(req.url).origin;

  // 1) Try admin credentials first
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (
    adminEmail &&
    adminPassword &&
    process.env.ADMIN_SESSION_SECRET &&
    email === adminEmail &&
    password === adminPassword
  ) {
    const token = await signAdminSession({ email, role: "admin" });
    (await cookies()).set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    // Admin: redirect to /admin if next is not a customer page
    const adminNext =
      nextUrl.startsWith("/admin") || nextUrl === "/admin"
        ? nextUrl
        : "/admin";
    return NextResponse.redirect(new URL(adminNext, req.url));
  }

  // 2) Try customer login
  if (!process.env.CUSTOMER_SESSION_SECRET) {
    return NextResponse.redirect(
      new URL(
        `/login?error=config&next=${encodeURIComponent(nextUrl)}`,
        req.url,
      ),
    );
  }

  const customer = await prisma.customer.findUnique({
    where: { email },
  });

  if (!customer) {
    return NextResponse.redirect(
      new URL(
        `/login?error=invalid&next=${encodeURIComponent(nextUrl)}`,
        req.url,
      ),
    );
  }

  const valid = await bcrypt.compare(password, customer.passwordHash);
  if (!valid) {
    return NextResponse.redirect(
      new URL(
        `/login?error=invalid&next=${encodeURIComponent(nextUrl)}`,
        req.url,
      ),
    );
  }

  const token = await signCustomerSession({
    customerId: customer.id,
    email: customer.email,
    role: "customer",
  });

  (await cookies()).set({
    name: CUSTOMER_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.redirect(new URL(nextUrl, req.url));
}
