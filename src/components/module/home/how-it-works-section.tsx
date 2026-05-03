"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, PackageCheck, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Search & Discover",
    description:
      "Browse thousands of genuine medicines, vitamins, and healthcare products. Filter by category, brand, or price — find exactly what you need in seconds.",
    pill: "Smart Search",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.18)",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/[0.12]",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
    highlights: [
      "AI-powered suggestions",
      "12,000+ products",
      "Filter by category",
    ],
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Order with Confidence",
    description:
      "Add to cart, choose your preferred payment method — bKash, Nagad, card, or Cash on Delivery. Checkout takes under 60 seconds. Prescription upload made simple.",
    pill: "Secure Checkout",
    accent: "#0ea5e9",
    glow: "rgba(14,165,233,0.16)",
    iconBg: "bg-sky-500/10 dark:bg-sky-500/[0.12]",
    iconColor: "text-sky-600 dark:text-sky-400",
    dotColor: "bg-sky-500",
    highlights: ["5 payment methods", "Prescription upload", "60-sec checkout"],
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Fast & Safe Delivery",
    description:
      "Your order is packed by our verified pharmacy partners and delivered to your door. Track in real-time. Same-day delivery available in Dhaka and Chittagong.",
    pill: "Doorstep Delivery",
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.16)",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/[0.12]",
    iconColor: "text-violet-600 dark:text-violet-400",
    dotColor: "bg-violet-500",
    highlights: [
      "Real-time tracking",
      "Same-day available",
      "64 districts covered",
    ],
  },
];

// ─── Connector line between steps (desktop) ────────────────────────────────
function ConnectorLine({ accent, delay }: { accent: string; delay: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-16 xl:w-24 shrink-0 relative -mt-6">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        className="h-px w-full origin-left"
        style={{
          background: `linear-gradient(90deg, ${accent}60, ${accent}20)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4, duration: 0.3 }}
        className="absolute right-0"
      >
        <ArrowRight className="w-3.5 h-3.5" style={{ color: `${accent}80` }} />
      </motion.div>
    </div>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────
function StepCard({
  step,
  index,
  isActive,
  onHover,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative flex-1 min-w-0 group"
    >
      {/* ── Card ── */}
      <div
        className={`
          relative h-full rounded-3xl p-7 xl:p-8
          border transition-all duration-400 ease-out
          backdrop-blur-sm overflow-hidden
          ${
            isActive
              ? "bg-white dark:bg-white/[0.06] border-transparent shadow-2xl -translate-y-2"
              : "bg-white/55 dark:bg-white/[0.025] border-black/[0.07] dark:border-white/[0.07] hover:bg-white/70 dark:hover:bg-white/[0.05]"
          }
        `}
        style={
          isActive
            ? {
                boxShadow: `0 20px 60px -10px ${step.glow}, 0 0 0 1px ${step.accent}30`,
              }
            : {}
        }
      >
        {/* Active top accent bar */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 inset-x-0 h-[2.5px] rounded-t-3xl origin-left"
          style={{
            background: `linear-gradient(90deg, ${step.accent}, ${step.accent}40)`,
          }}
        />

        {/* Radial glow inside on hover */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${step.glow}, transparent)`,
          }}
        />

        {/* ── Step number + icon row ── */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          {/* Icon */}
          <div
            className={`
              w-12 h-12 rounded-2xl flex items-center justify-center
              transition-all duration-300
              ${step.iconBg}
              ${isActive ? "scale-110 rotate-3" : "group-hover:scale-105"}
            `}
          >
            <Icon className={`w-5 h-5 ${step.iconColor}`} />
          </div>

          {/* Number */}
          <span
            className="text-5xl font-black leading-none tabular-nums select-none transition-all duration-300"
            style={{
              color: isActive ? step.accent : undefined,
              opacity: isActive ? 0.25 : 0.08,
            }}
          >
            {step.number}
          </span>
        </div>

        {/* ── Pill badge ── */}
        <div className="relative z-10 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border"
            style={{
              color: step.accent,
              background: `${step.accent}12`,
              borderColor: `${step.accent}28`,
            }}
          >
            <span
              className={`w-1 h-1 rounded-full ${step.dotColor} ${isActive ? "animate-pulse" : ""}`}
            />
            {step.pill}
          </span>
        </div>

        {/* ── Title ── */}
        <h3 className="relative z-10 text-[17px] font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-3">
          {step.title}
        </h3>

        {/* ── Description ── */}
        <p className="relative z-10 text-[13px] text-slate-500 dark:text-slate-400 leading-[1.75] mb-6">
          {step.description}
        </p>

        {/* ── Feature highlights ── */}
        <ul className="relative z-10 space-y-2">
          {step.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.12 + 0.3 + i * 0.07,
                duration: 0.4,
              }}
              className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600 dark:text-slate-400"
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black"
                style={{ background: `${step.accent}18`, color: step.accent }}
              >
                ✓
              </span>
              {h}
            </motion.li>
          ))}
        </ul>

        {/* Bottom shimmer on hover */}
        <div
          className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.accent}30, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28 md:px-16 overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]">
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
        {/* Dynamic glow — shifts based on active step */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{
            left:
              activeStep === 0
                ? "5%"
                : activeStep === 1
                  ? "35%"
                  : activeStep === 2
                    ? "65%"
                    : "35%",
            opacity: activeStep !== null ? 1 : 0.6,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            top: "20%",
            width: 500,
            height: 400,
            background:
              activeStep !== null
                ? `radial-gradient(circle, ${STEPS[activeStep].glow}, transparent 70%)`
                : "radial-gradient(circle,rgba(16,185,129,0.12),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-10%",
            right: "-5%",
            width: 400,
            height: 350,
            background:
              "radial-gradient(circle,rgba(20,184,166,0.10),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Section hairlines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-4"
          >
            <span className="text-slate-900 dark:text-white">
              Medicine at your door{" "}
            </span>
            <br className="hidden sm:block" />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#059669,#10b981 45%,#2dd4bf)",
              }}
            >
              in 3 simple steps
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.5 }}
            className="text-[14px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed"
          >
            From search to doorstep — MediStore makes getting the right
            medicines effortless, safe, and fast.
          </motion.p>
        </div>

        {/* ── Steps row ── */}
        <div className="flex flex-col lg:flex-row items-stretch gap-5 lg:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="contents">
              <StepCard
                step={step}
                index={i}
                isActive={activeStep === i}
                onHover={setActiveStep}
              />
              {i < STEPS.length - 1 && (
                <ConnectorLine accent={step.accent} delay={0.3 + i * 0.15} />
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className="
              group relative inline-flex items-center gap-2.5
              px-7 py-3.5 rounded-xl
              font-bold text-sm text-white
              transition-all duration-200
              hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/25
              active:scale-[0.98]
              overflow-hidden
            "
            style={{
              background: "linear-gradient(135deg,#059669,#10b981 60%,#2dd4bf)",
            }}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>

          <Link
            href="/about"
            className="
              inline-flex items-center gap-2
              px-6 py-3.5 rounded-xl
              font-semibold text-sm
              text-slate-600 dark:text-slate-400
              bg-white/60 dark:bg-white/[0.04]
              border border-black/[0.08] dark:border-white/[0.08]
              hover:bg-white/80 dark:hover:bg-white/[0.07]
              hover:border-emerald-300/40 dark:hover:border-emerald-700/40
              hover:text-slate-800 dark:hover:text-slate-200
              transition-all duration-200
            "
          >
            Learn about us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
