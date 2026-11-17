import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser({ allowPasswordChange: true });
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user });
}
