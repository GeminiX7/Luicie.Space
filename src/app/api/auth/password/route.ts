import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getSessionUser, hashPassword, setSessionCookie, verifyPassword } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const sessionUser = await getSessionUser({ allowPasswordChange: true });
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;
    if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return NextResponse.json({ error: "Current and new passwords are required" }, { status: 400 });
    }
    if (newPassword.length < 12 || Buffer.byteLength(newPassword, "utf8") > 72) {
      return NextResponse.json({ error: "New password must be 12–72 bytes long" }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, sessionUser.id)).limit(1);
    if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const passwordHash = await hashPassword(newPassword);
    const [updated] = await db.update(users).set({
      passwordHash,
      mustChangePassword: false,
      authVersion: sql`${users.authVersion} + 1`,
      updatedAt: new Date(),
    }).where(eq(users.id, user.id)).returning({
      id: users.id, email: users.email, role: users.role, name: users.name, authVersion: users.authVersion,
    });

    await setSessionCookie({
      id: updated.id, email: updated.email, role: updated.role, name: updated.name, authVersion: updated.authVersion,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("password change error", error);
    return NextResponse.json({ error: "Password change failed" }, { status: 500 });
  }
}
