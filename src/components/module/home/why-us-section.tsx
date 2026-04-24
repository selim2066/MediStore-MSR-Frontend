"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Truck,
  Clock3,
  Star,
  PackageCheck,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Sellers",
    description:
      "Every vendor is strictly vetted. We ensure medicine quality and source authenticity.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Fast dispatch with Cash on Delivery options. Reliable tracking straight to your doorstep.",
  },
  {
    icon: Clock3,
    title: "24/7 Ordering",
    description:
      "Browse and place orders anytime. Our platform never sleeps, prioritizing your health.",
  },
  {
    icon: Star,
    title: "Genuine Reviews",
    description:
      "Read honest, verified feedback from real customers to make informed healthcare decisions.",
  },
  {
    icon: PackageCheck,
    title: "Wide OTC Selection",
    description:
      "Thousands of non-prescription healthcare products across multiple categories.",
  },
  {
    icon: HeartPulse,
    title: "Your Health First",
    description:
      "Strict safety standards. We only list approved over-the-counter medicines.",
  },
];

export function WhyUsSection() {
  const [hasAppeared, setHasAppeared] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasAppeared(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]"
    >
      {/* ───────── BACKGROUND SYSTEM (MATCH HERO + FEATURED) ───────── */}

      {/* square grid */}
      <div
        className="absolute inset-0 opacity-[0.635] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "77px 77px",
        }}
      />

      <div
        className="absolute inset-0 hidden dark:block opacity-[1.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "77px 77px",
        }}
      />

      {/* glow blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)" }}
      />
      <div className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.12), transparent 70%)" }}
      />

      {/* top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* ───────── CONTENT ───────── */}

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Why MediStore?
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            A pharmacy experience <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              that actually cares
            </span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            We&apos;ve redesigned healthcare access. No queues, no stress — just reliability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={cn(
                "relative p-8 rounded-3xl border border-black/5 dark:border-white/10",
                "bg-white/70 dark:bg-white/[0.04] backdrop-blur-md",
                "transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10",
                hasAppeared ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDelay: `${idx * 120}ms`,
              }}
            >
              {/* icon */}
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition">
                <feature.icon className="h-6 w-6" />
              </div>

              {/* title */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>

              {/* description */}
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* subtle corner glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-tr-3xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}