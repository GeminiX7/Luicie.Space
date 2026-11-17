import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Toasts } from "@/components/ui";

export const metadata: Metadata = {
  title: "Luicie.Space | Premium Quality Accessories",
  description:
    "Shop phone accessories, music boxes, headphones, ring lights, selfie sticks, wireless clippers, power banks and more at Luicie.Space. Always At Your Service.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f4f6fb] text-slate-900 antialiased">
        <ShopProvider>
          {children}
          <Toasts />
        </ShopProvider>
      </body>
    </html>
  );
}
