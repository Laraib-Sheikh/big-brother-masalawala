import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, signAdminSession } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin");

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!adminEmail || !adminPassword || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.redirect(
      new URL("/admin/login?error=missing_env", req.url),
    );
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", req.url));
  }

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

  return NextResponse.redirect(new URL(next, req.url));
}

