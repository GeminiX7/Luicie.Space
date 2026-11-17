import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { TopBar, SiteHeader } from "@/components/store/Header";
import { Newsletter, SiteFooter } from "@/components/store/Footer";
import { getSessionUser } from "@/lib/auth";

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser({ allowPasswordChange: true });
  if (user?.mustChangePassword) redirect("/change-password?required=1");

  return (
    <div className="min-h-screen">
      <TopBar />
      <SiteHeader />
      <main className="min-h-[60vh]">{children}</main>
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
