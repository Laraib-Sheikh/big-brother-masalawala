import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export const CUSTOMER_COOKIE_NAME = "mw_customer_session";

function getSecret() {
  const secret = process.env.CUSTOMER_SESSION_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export type CustomerSession = {
  customerId: string;
  email: string;
  role: "customer";
};

export async function signCustomerSession(session: CustomerSession) {
  const secret = getSecret();
  if (!secret) throw new Error("CUSTOMER_SESSION_SECRET is not set");

  const jwt = await new SignJWT({
    customerId: session.customerId,
    email: session.email,
    role: session.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return jwt;
}

export async function verifyCustomerToken(token: string) {
  const secret = getSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "customer") return null;
    if (typeof payload.customerId !== "string" || !payload.customerId) return null;
    if (typeof payload.email !== "string" || !payload.email) return null;
    return {
      customerId: payload.customerId,
      email: payload.email,
      role: "customer" as const,
    };
  } catch {
    return null;
  }
}

export async function getCustomerSessionFromCookies() {
  const token = (await cookies()).get(CUSTOMER_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyCustomerToken(token);
}

export async function requireCustomer() {
  const session = await getCustomerSessionFromCookies();
  if (!session) throw new Error("CUSTOMER_REQUIRED");
  return session;
}
