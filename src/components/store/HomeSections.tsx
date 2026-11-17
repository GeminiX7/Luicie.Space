"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ChevronRight, ChevronLeft, ShieldCheck,
  BadgePercent, Zap, Laptop, Smartphone, Gamepad2, Watch, Headphones, Monitor, Briefcase, Joystick, TabletSmartphone, Gamepad,
} from "lucide-react";

export const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Laptop, Smartphone, Gamepad2, Watch, Headphones, Monitor, Briefcase, Joystick, TabletSmartphone, Gamepad,
};

type Category = { id: number; name: string; slug: string; description?: string | null; imageUrl?: string | null; icon?: string | null; store: string; productCount?: number };

// ---------- HERO ----------
export function Hero() {
  return (
    <section className="hero-grid-bg overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-10 lg:grid-cols-2 lg:pt-14">
        <div className="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-700 shadow-sm">
            <Zap size={12} className="fill-amber-400 text-amber-400" /> Premium Quality
          </div>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            Premium Quality.
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">Always At Your Service.</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
            This is Luicie.Space. We deal in all kinds of phone accessories, music boxes, headphones, ring lights, selfie sticks, wireless clippers, power banks and lots more. Need anything today? We&apos;re just one click away.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-7 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700">
              SHOP ACCESSORIES <ArrowRight size={16} />
            </Link>
            <a href="tel:+234813788842" className="flex h-12 items-center rounded-xl border-2 border-brand-200 bg-white px-7 text-sm font-bold text-brand-700 transition hover:border-brand-400">
              Call 0813788842
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Smartphone, t: "Phone Accessories", s: "Everyday essentials" },
              { icon: Headphones, t: "Music & Audio", s: "Music boxes & headphones" },
              { icon: Zap, t: "Power & Lighting", s: "Power banks & ring lights" },
              { icon: ShieldCheck, t: "Personal Care", s: "Wireless clippers & more" },
            ].map((f) => (
              <div key={f.t} className="flex items-center gap-2.5">
                <f.icon size={26} className="shrink-0 text-brand-600" strokeWidth={1.6} />
                <div className="leading-tight">
                  <p className="text-xs font-extrabold text-slate-900">{f.t}</p>
                  <p className="text-[11px] text-slate-500">{f.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative fade-up">
          <div className="absolute -right-4 top-0 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-dashed border-brand-300 bg-white text-center shadow-xl sm:h-28 sm:w-28">
            <span className="text-[9px] font-bold uppercase text-slate-500">Premium</span>
            <span className="text-center text-sm font-black text-brand-600 sm:text-base">Quality</span>
            <span className="text-[9px] font-bold uppercase text-slate-500">Always</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://rp0sd4q07g.ufs.sh/f/8t6otpGzNZFgnv0HSu6bLy7WOmXS4Gpq9RsFBPYfZJK61EQj"
            alt="Luicie.space featured tech collection"
            className="w-full rounded-3xl object-cover shadow-2xl shadow-brand-900/20 [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><BadgePercent size={20} /></div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Accessories for every day</p>
              <p className="text-[11px] text-slate-500">Always at your service.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- CATEGORY CAROUSEL ----------
export function CategoryCarousel({ categories }: { categories: Category[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-extrabold tracking-wide text-ink-900 sm:text-2xl">SHOP BY CATEGORY</h2>
        <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-600" />
      </div>
      <div className="relative">
        <div ref={ref} className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2">
          {categories.map((c) => {
            const Icon = ICONS[c.icon || "Laptop"] || Laptop;
            return (
              <Link key={c.id} href={`/shop?category=${c.slug}`} className="group w-44 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 text-center transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl sm:w-52">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
                  {c.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.imageUrl} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="grid h-full place-items-center text-brand-300"><Icon size={48} /></div>
                  )}
                </div>
                <p className="mt-3 text-[13px] font-extrabold text-slate-900 group-hover:text-brand-700">{c.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500">{c.description}</p>
              </Link>
            );
          })}
        </div>
        <button onClick={() => scroll(1)} className="absolute -right-2 top-1/3 z-10 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg hover:bg-brand-600 hover:text-white"><ChevronRight size={18} /></button>
        <button onClick={() => scroll(-1)} className="absolute -left-2 top-1/3 z-10 hidden h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg hover:bg-brand-600 hover:text-white md:grid"><ChevronLeft size={18} /></button>
      </div>
    </section>
  );
}

// ---------- BRAND BANNER ----------
export function BrandBanner() {
  const products = ["Phone accessories", "Music boxes", "Headphones", "Ring lights", "Selfie sticks", "Wireless clippers", "Power banks"];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-10 sm:px-10">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-400">Luicie.Space • Enugu, Nigeria</p>
            <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">Everyday Essentials.<br /><span className="text-brand-400">Premium Quality.</span></h3>
            <p className="mt-2 max-w-xs text-sm text-slate-400">Find accessories and handy gadgets for your everyday needs.</p>
            <Link href="/shop?store=accessories" className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-6 text-xs font-bold uppercase tracking-wide text-white hover:bg-brand-500">
              Shop Accessories <ArrowRight size={15} />
            </Link>
          </div>
          <div className="hidden lg:block">
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/10">{product}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-3 ring-1 ring-white/10">
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-slate-400">Need anything today?</p>
                <p className="text-2xl font-black text-brand-400">One click away.</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">Always at your service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- WHY CHOOSE ----------
export function WhyChoose() {
  const items = [
    { icon: BadgePercent, t: "Premium Quality", s: "Accessories selected for everyday use." },
    { icon: Smartphone, t: "Phone Accessories", s: "Find useful extras for your phone." },
    { icon: Headphones, t: "Music & Audio", s: "Music boxes, headphones and more." },
    { icon: Zap, t: "Power & Lighting", s: "Power banks, ring lights and selfie sticks." },
    { icon: ShieldCheck, t: "Always At Your Service", s: "Need anything today? We’re one click away." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-extrabold tracking-wide text-ink-900 sm:text-2xl">WHY CHOOSE LUICIE.SPACE?</h2>
        <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-600" />
      </div>
      <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((f) => (
          <div key={f.t} className="flex gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600"><f.icon size={20} /></div>
            <div>
              <p className="text-[13px] font-extrabold text-slate-900">{f.t}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{f.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- STORE STRIP ----------
export function StoreStrip() {
  const stores = [
    { label: "Phone Accessories", href: "/shop?store=accessories", icon: Smartphone, grad: "from-blue-500 to-blue-700", desc: "Useful everyday essentials" },
    { label: "Music Boxes", href: "/shop?store=accessories", icon: Gamepad2, grad: "from-slate-700 to-slate-900", desc: "Bring your music along" },
    { label: "Headphones", href: "/shop?store=accessories", icon: Headphones, grad: "from-violet-500 to-purple-700", desc: "Listen in comfort" },
    { label: "Ring Lights", href: "/shop?store=accessories", icon: Watch, grad: "from-emerald-500 to-teal-700", desc: "Light up your content" },
    { label: "Power & More", href: "/shop?store=accessories", icon: Zap, grad: "from-amber-500 to-orange-600", desc: "Power banks, selfie sticks & more" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stores.map((s) => (
          <Link key={s.label} href={s.href} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${s.grad}`}>
            <s.icon size={44} className="absolute -bottom-2 -right-2 opacity-20 transition group-hover:scale-110" />
            <p className="text-sm font-black">{s.label}</p>
            <p className="mt-0.5 text-[11px] text-white/75">{s.desc}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide">Shop now <ArrowRight size={12} /></p>
          </Link>
        ))}
      </div>
    </section>
  );
}
