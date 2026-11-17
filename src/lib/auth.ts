import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const authSecret = process.env.AUTH_SECRET;
if (!authSecret || Buffer.byteLength(authSecret, "utf8") < 32) {
  throw new Error("AUTH_SECRET must be set to a random value of at least 32 bytes");
}

const SECRET = new TextEncoder().encode(authSecret);
export const AUTH_COOKIE = "donwise_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

type SessionPayload = { id: number; email: string; role: string; name: string; authVersion: number };

export async function signToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (typeof payload.authVersion !== "number" || !Number.isInteger(payload.authVersion)) return null;
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await signToken(payload);
  const store = await cookies();
  store.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return token;
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
}

export async function getSessionUser(options: { allowPasswordChange?: boolean } = {}) {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;
  const rows = await db.select().from(users).where(eq(users.id, payload.id)).limit(1);
  if (rows.length === 0) return null;
  const u = rows[0];
  if (payload.authVersion !== u.authVersion) return null;
  if (u.mustChangePassword && !options.allowPasswordChange) return null;
  return {
    id: u.id, name: u.name, email: u.email, role: u.role, phone: u.phone, city: u.city,
    mustChangePassword: u.mustChangePassword,
  };
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || (user.role !== "admin" && user.role !== "staff")) return null;
  return user;
}
