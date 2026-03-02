import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import {
  CUSTOMER_COOKIE_NAME,
  signCustomerSession,
} from "@/lib/customer-auth";
import { prisma } from "@/lib/db";

function getBaseUrl(req: Request): string {
  try {
    if (req.url && req.url.startsWith("http")) return req.url;
  } catch {
    /* ignore */
  }
  const host = req.headers.get("host") ?? "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

function redirectToRegisterError(
  req: Request,
  error: string,
  nextUrl: string,
) {
  const base = getBaseUrl(req);
  const url = new URL(
    `/login?tab=register&error=${encodeURIComponent(error)}&next=${encodeURIComponent(nextUrl)}`,
    base,
  );
  return NextResponse.redirect(url);
}

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const name = String(form.get("name") ?? "").trim() || null;
  const phone = String(form.get("phone") ?? "").trim() || null;
  const address = String(form.get("address") ?? "").trim() || null;
  const nextUrl = String(form.get("next") ?? "/account").trim() || "/account";

  if (!email || !password) {
    return redirectToRegisterError(req, "missing", nextUrl);
  }

  if (password.length < 6) {
    return redirectToRegisterError(req, "short", nextUrl);
  }

  if (!process.env.CUSTOMER_SESSION_SECRET) {
    return redirectToRegisterError(req, "config", nextUrl);
  }

  try {
    const existing = await prisma.customer.findUnique({
      where: { email },
    });

    if (existing) {
      return redirectToRegisterError(req, "exists", nextUrl);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const customer = await prisma.customer.create({
      data: { email, passwordHash, name, phone, address },
    });

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

    return NextResponse.redirect(new URL(nextUrl, getBaseUrl(req)));
  } catch (err) {
    console.error("[api/auth/register]", err);
    return redirectToRegisterError(req, "server", nextUrl);
  }
}
