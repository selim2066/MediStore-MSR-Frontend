"use client";

import { useEffect, useRef, useState } from "react";
import {
  Users,
  ShoppingBag,
  Store,
  BadgeCheck,
} from "lucide-react";

// ─── Eased counter hook ───────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, started: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, started]);

  return value;
}

// ─── Individual stat card ─────────────────────────────────────────────────────
interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: {
    icon: string;
    glow: string;
    border: string;
    dot: string;
  };
}

const STATS: StatItem[] = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Happy Patients",
    sublabel: "Served across Bangladesh",
    color: {
      icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "rgba(16,185,129,0.15)",
      border: "hover:border-emerald-400/40",
      dot: "bg-emerald-500",
    },
  },
  {
    icon: ShoppingBag,
    value: 12000,
    suffix: "+",
    label: "Products Listed",
    sublabel: "OTC & prescription range",
    color: {
      icon: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      glow: "rgba(14,165,233,0.15)",
      border: "hover:border-sky-400/40",
      dot: "bg-sky-500",
    },
  },
  {
    icon: Store,
    value: 500,
    suffix: "+",
    label: "Verified Pharmacies",
    sublabel: "Vetted seller network",
    color: {
      icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      glow: "rgba(139,92,246,0.15)",
      border: "hover:border-violet-400/40",
      dot: "bg-violet-500",
    },
  },
  {
    icon: BadgeCheck,
    value: 99,
    suffix: ".8%",
    label: "Order Success Rate",
    sublabel: "Reliable delivery, every time",
    color: {
      icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      glow: "rgba(245,158,11,0.15)",
      border: "hover:border-amber-400/40",
      dot: "bg-amber-500",
    },
  },
];

// Format large numbers: 50000 → 50,000 → displayed as "50k" style
function formatValue(raw: number, suffix: string, target: number): string {
  if (target >= 1000 && suffix === "+") {
    // show "50k" once we're close enough
    if (raw >= 1000) return `${(raw / 1000).toFixed(raw >= 10000 ? 0 : 1)}k`;
    return `${raw}`;
  }
  return `${raw}`;
}

function StatCard({
  stat,
  started,
  index,
}: {
  stat: StatItem;
  started: boolean;
  index: number;
}) {
  const Icon = stat.icon;
  const raw = useCountUp(stat.value, 1800 + index * 100, started);
  const display = formatValue(raw, stat.suffix, stat.value);

  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-2xl p-6
        bg-white/60 dark:bg-white/[0.03]
        border border-black/[0.07] dark:border-white/[0.07]
        backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:shadow-xl hover:bg-white/80 dark:hover:bg-white/[0.06]
        ${stat.color.border}
      `}
      style={{
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 80%, ${stat.color.glow}, transparent 70%)`,
        }}
      />

      {/* Top shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom accent bar */}
      <div
        className={`absolute bottom-0 inset-x-0 h-[2px] ${stat.color.dot} opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-b-2xl`}
      />

      {/* Icon */}
      <div
        className={`inline-flex w-11 h-11 rounded-xl items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${stat.color.icon}`}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Counter */}
      <div className="flex items-end gap-0.5 mb-1">
        <span
          className="text-4xl font-black tracking-tight text-slate-900 dark:text-white tabular-nums leading-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {display}
        </span>
        <span className="text-2xl font-black text-emerald-500 leading-none mb-0.5">
          {stat.suffix}
        </span>
      </div>

      {/* Labels */}
      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2">
        {stat.label}
      </p>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">
        {stat.sublabel}
      </p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function StatsSection() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]"
    >
      {/* ── Background system ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light grid */}
        <div
          className="absolute inset-0 opacity-[0.635] dark:opacity-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        {/* Dark grid */}
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            left: "-5%",
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle,rgba(16,185,129,0.14),transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-10%",
            right: "-5%",
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle,rgba(20,184,166,0.12),transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        {/* Section lines */}
       
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
              By The Numbers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            <span className="text-slate-900 dark:text-white">Trusted by </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#059669,#10b981 50%,#34d399)",
              }}
            >
              thousands
            </span>
            <span className="text-slate-900 dark:text-white"> across Bangladesh</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Real numbers from a platform built on trust, quality, and care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} started={started} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}