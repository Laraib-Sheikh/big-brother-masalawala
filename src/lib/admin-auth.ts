import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export const ADMIN_COOKIE_NAME = "mw_admin_session";

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  email: string;
  role: "admin";
};

export async function signAdminSession(session: AdminSession) {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");

  const jwt = await new SignJWT({ email: session.email, role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return jwt;
}

export async function verifyAdminToken(token: string) {
  const secret = getSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") return null;
    if (typeof payload.email !== "string" || !payload.email) return null;
    return { email: payload.email, role: "admin" as const };
  } catch {
    return null;
  }
}

export async function getAdminSessionFromCookies() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function requireAdmin() {
  const session = await getAdminSessionFromCookies();
  if (!session) throw new Error("ADMIN_REQUIRED");
  return session;
}

