import Link from "next/link";
import { Store, ShieldCheck, Users, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="overflow-hidden rounded-3xl bg-ink-900 p-8 text-white sm:p-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-400">Our Story</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
          Premium Quality. Always At Your Service.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          Luicie.Space is based in Enugu, Nigeria, offering phone accessories, music boxes, headphones, ring lights, selfie sticks,
          wireless clippers, power banks and lots more. Need anything today? We&apos;re just one click away.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Store, t: "Everyday Accessories", s: "Phone accessories and useful gadgets for everyday life." },
          { icon: Users, t: "Wide Selection", s: "Music boxes, headphones, ring lights, selfie sticks and more." },
          { icon: ShieldCheck, t: "Premium Quality", s: "Quality accessories selected to serve you well." },
          { icon: Award, t: "Here to Help", s: "Need anything today? We’re just one click away." },
        ].map((f) => (
          <div key={f.t} className="rounded-3xl border border-slate-100 bg-white p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600"><f.icon size={22} /></div>
            <p className="mt-3 font-extrabold text-slate-900">{f.t}</p>
            <p className="mt-1 text-[13px] text-slate-500">{f.s}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-black text-slate-900">What We Offer</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "📱 Phone accessories",
              "🔊 Music boxes and headphones",
              "💡 Ring lights and selfie sticks",
              "✂️ Wireless clippers",
              "🔋 Power banks and lots more",
            ].map((s) => (
              <li key={s} className="rounded-xl bg-slate-50 px-4 py-3 font-semibold text-slate-700">{s}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-brand-600 to-violet-600 p-6 text-white sm:p-8">
          <div>
            <h2 className="text-xl font-black">Always At Your Service.</h2>
            <p className="mt-2 text-sm text-white/85">
              Based in Enugu, Nigeria. Need anything today? We&apos;re just one click away.
            </p>
          </div>
          <Link href="/shop" className="mt-6 inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-brand-700">
            Shop Accessories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
