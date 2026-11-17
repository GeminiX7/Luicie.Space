import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, requireAdmin } from "@/lib/auth";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  const [customer] = await db.select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .where(and(eq(users.id, id), eq(users.role, "customer")))
    .limit(1);
  if (!customer) return NextResponse.json({ error: "Buyer not found" }, { status: 404 });

  const temporaryPassword = randomBytes(18).toString("base64url");
  const passwordHash = await hashPassword(temporaryPassword);
  await db.update(users).set({
    passwordHash,
    mustChangePassword: true,
    authVersion: sql`${users.authVersion} + 1`,
    updatedAt: new Date(),
  }).where(eq(users.id, customer.id));

  return NextResponse.json({
    temporaryPassword,
    buyer: { id: customer.id, name: customer.name, email: customer.email },
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
