"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Microscope,
  Package,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Animated counter ──────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ── Hex grid background SVG ───────────────────────────────────────
function HexGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hex"
          x="0"
          y="0"
          width="56"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="28,2 52,14 52,38 28,50 4,38 4,14"
            fill="none"
            stroke="#10b981"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────
const STATS = [
  { value: 12, suffix: "k+", label: "Products Listed" },
  { value: 50, suffix: "k+", label: "Active Customers" },
  { value: 99, suffix: "%", label: "Payout Success" },
  { value: 48, suffix: "h", label: "Avg. First Sale" },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Grow Your Revenue",
    desc: "Tap into a platform with 50k+ active customers actively searching for OTC medicines every day.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-100 dark:border-emerald-800/30",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Instant Listing",
    desc: "Go live in minutes. Our streamlined dashboard lets you add, edit, and manage inventory with zero friction.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-100 dark:border-amber-800/30",
    glow: "shadow-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Monitor sales, revenue trends, and order status from a powerful seller dashboard built for clarity.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-100 dark:border-blue-800/30",
    glow: "shadow-blue-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payouts",
    desc: "Automated, verified payouts on every fulfilled order. No delays, no manual chasing.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-100 dark:border-rose-800/30",
    glow: "shadow-rose-500/20",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "A dedicated seller success team available to help you scale — from onboarding to operations.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-100 dark:border-violet-800/30",
    glow: "shadow-violet-500/20",
  },
  {
    icon: Package,
    title: "Order Management",
    desc: "Manage every order from PLACED to DELIVERED in one place. Full control, full visibility.",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    border: "border-cyan-100 dark:border-cyan-800/30",
    glow: "shadow-cyan-500/20",
  },
];

const STEPS = [
  {
    num: "01",
    icon: FileText,
    title: "Register as Seller",
    desc: "Create your MediStore account and select the Seller role during registration.",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Verify Your Licence",
    desc: "Submit your DGDA pharmacy or distributor licence for verification by our compliance team.",
  },
  {
    num: "03",
    icon: Package,
    title: "List Your Medicines",
    desc: "Add your OTC medicines with details, pricing, stock, and images from the seller dashboard.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Start Selling",
    desc: "Go live immediately. Receive orders, manage fulfilment, and track revenue in real time.",
  },
];

const REQUIREMENTS = [
  "Valid DGDA pharmacy or distributor licence",
  "NID / Trade licence for business verification",
  "All medicines must be unexpired and properly stored",
  "Accurate stock levels maintained at all times",
  "Orders fulfilled within the committed dispatch window",
  "Transparent pricing — no hidden charges after order placement",
];

const TESTIMONIALS = [
  {
    name: "Dr. Shafiul Islam",
    role: "Pharmacy Owner, Dhaka",
    text: "MediStore doubled our online reach within the first month. The seller dashboard is incredibly intuitive.",
    rating: 5,
  },
  {
    name: "Dr. Mushfique Emon",
    role: "Distributor, Chittagong",
    text: "The payout system is seamless and the customer base is genuinely active. Best decision we made.",
    rating: 5,
  },
];

// ── Variants ──────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
});

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function BecomeASellerPage() {
  return (
    <main className="min-h-screen bg-[#f0fdf8] dark:bg-[#020810] overflow-x-hidden">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        <HexGrid />

        {/* Radial glow */}

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-400/10 dark:bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-400/8 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating molecule decoration */}
        <svg
          className="absolute right-8 top-32 w-48 h-48 opacity-10 dark:opacity-[0.07] hidden lg:block"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="8" fill="#10b981" />
          <circle cx="160" cy="60" r="6" fill="#10b981" />
          <circle cx="40" cy="60" r="6" fill="#10b981" />
          <circle cx="160" cy="140" r="6" fill="#10b981" />
          <circle cx="40" cy="140" r="6" fill="#10b981" />
          <circle cx="100" cy="20" r="5" fill="#34d399" />
          <circle cx="100" cy="180" r="5" fill="#34d399" />
          <line
            x1="100"
            y1="100"
            x2="160"
            y2="60"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="100"
            x2="40"
            y2="60"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="100"
            x2="160"
            y2="140"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="100"
            x2="40"
            y2="140"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="20"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="180"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="60"
            x2="160"
            y2="140"
            stroke="#34d399"
            strokeWidth="0.8"
            strokeDasharray="4 3"
          />
          <line
            x1="40"
            y1="60"
            x2="40"
            y2="140"
            stroke="#34d399"
            strokeWidth="0.8"
            strokeDasharray="4 3"
          />
        </svg>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/50 mb-8"
          >
            <Microscope className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase">
              Seller Programme
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.08] tracking-tight mb-6"
          >
            Bring Your{" "}
            <span className="relative inline-block">
              <span className="text-emerald-500">Pharmacy</span>
              {/* Underline glow */}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
            </span>
            <br />
            to the Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Join MediStore&apos;s verified seller network. Reach thousands of
            patients, manage inventory intelligently, and grow your medicine
            business on Bangladesh&apos;s most trusted OTC platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5"
            >
              Start Selling Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/70 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-white dark:hover:bg-white/[0.08] transition-all duration-200"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-gray-400 dark:text-gray-600"
          >
            {[
              "DGDA Verified",
              "SSLCommerz Secured",
              "Zero Setup Fee",
              "Instant Activation",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <section className="relative py-16 px-4 border-y border-black/[0.06] dark:border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 tracking-wide uppercase">
                {s.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
              Why MediStore
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              Everything you need to{" "}
              <span className="text-emerald-500">scale</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.08}>
                <div
                  className={`group h-full p-6 rounded-2xl border ${b.border} ${b.bg} hover:shadow-xl ${b.glow} transition-all duration-300 hover:-translate-y-1`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-white/70 dark:bg-white/[0.06] border ${b.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <b.icon className={`w-5 h-5 ${b.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="relative py-24 px-4 overflow-hidden"
      >
        <HexGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              Up and running in{" "}
              <span className="text-emerald-500">4 steps</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-emerald-300/40 dark:via-emerald-700/40 to-transparent pointer-events-none" />

            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center group">
                  {/* Step number circle */}
                  <div className="relative w-20 h-20 mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 dark:bg-emerald-500/10 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-1 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] flex flex-col items-center justify-center gap-0.5">
                      <step.icon className="w-5 h-5 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                        {step.num}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS ────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <FadeIn>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
                Requirements
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                Who can <span className="text-emerald-500">sell</span> on
                MediStore?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                We maintain strict quality standards to protect our customers.
                Only licensed pharmacies and verified distributors can list
                medicines on MediStore.
              </p>
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>

            {/* Right — checklist */}
            <FadeIn delay={0.15}>
              <div className="bg-white/60 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-7 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Eligibility Checklist
                  </span>
                </div>
                {REQUIREMENTS.map((req, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {req}
                    </p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-black/[0.06] dark:border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
              Seller Stories
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">
              Trusted by pharmacies{" "}
              <span className="text-emerald-500">nationwide</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.12}>
                <div className="h-full bg-white/60 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-7 flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                    &quot;{t.text}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-black/[0.05] dark:border-white/[0.05]">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-12 text-center shadow-2xl shadow-emerald-500/20">
              <HexGrid />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 mb-6">
                  <Zap className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-semibold text-white tracking-widest uppercase">
                    Zero Setup Fee
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  Ready to reach
                  <br />
                  50,000+ customers?
                </h2>
                <p className="text-emerald-100 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  Join MediStore today and turn your pharmacy into a 24/7
                  digital storefront. Activation is instant, setup is free, and
                  support is always one message away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/register"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-emerald-700 font-bold text-sm hover:bg-emerald-50 transition-all hover:-translate-y-0.5 shadow-xl"
                  >
                    Create Seller Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all"
                  >
                    Talk to Our Team
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
