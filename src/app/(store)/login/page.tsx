"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Button, Input, PageLoader } from "@/components/ui";
import { StoreLogo } from "@/components/store/StoreLogo";
import { SITE } from "@/lib/constants";

function LoginInner() {
  const { login, toast } = useShop();
  const router = useRouter();
  const next = useSearchParams().get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error || "Login failed");
      return;
    }
    if (res.mustChangePassword) {
      router.replace("/change-password?required=1");
      return;
    }
    router.push(next);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2.5">
        <StoreLogo className="h-11 w-11 rounded-2xl shadow-lg shadow-brand-600/25" />
        <div className="leading-tight">
          <p className="text-2xl font-black">Luicie<span className="text-brand-600">.Space</span></p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Premium Quality</p>
        </div>
      </Link>
      <div className="mt-6 w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        <h1 className="text-xl font-black text-slate-900">Welcome back to Luicie.Space 👋</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to manage your orders and saved accessories.</p>
        <form onSubmit={submit} className="mt-5 space-y-4">
          <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative">
            <Input label="Password" type={show ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-[34px] text-slate-400">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
          {error && <p className="rounded-xl bg-red-50 p-3 text-[13px] font-semibold text-red-600">{error}</p>}
          <Button type="submit" loading={loading} className="w-full" size="lg">Sign In</Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-500">
          Don&apos;t have an account? <Link href="/register" className="font-bold text-brand-600 hover:underline">Create one</Link>
        </p>
        <div className="mt-5 border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
          <p>{SITE.address}</p>
          <p className="mt-1">Need help? <a href="tel:+234813788842" className="font-bold text-brand-600 hover:underline">{SITE.phone}</a></p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<PageLoader />}><LoginInner /></Suspense>;
}
