"use client";
import { cubicBezier, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Globe,
  HeartHandshake,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

import Image from "next/image";

type Founder = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

// ─── Shared background (matches homepage) ────────────────────────────────────
function SectionBg({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </div>
  );
}

// ─── Pill badge ───────────────────────────────────────────────────────────────
function Badge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
        {label}
      </span>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  pre,
  highlight,
  post,
  sub,
}: {
  pre?: string;
  highlight: string;
  post?: string;
  sub?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-black tracking-tight">
        {pre && <span className="text-slate-900 dark:text-white">{pre} </span>}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg,#059669,#10b981 50%,#34d399)",
          }}
        >
          {highlight}
        </span>
        {post && (
          <span className="text-slate-900 dark:text-white"> {post}</span>
        )}
      </h2>
      {sub && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]">
      <SectionBg>
        {/* Main emerald orb */}
        <div
          className="absolute rounded-full"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle,rgba(16,185,129,0.18),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Side orbs */}
        <div
          className="absolute rounded-full"
          style={{
            top: "30%",
            left: "-10%",
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle,rgba(20,184,166,0.12),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "10%",
            right: "-10%",
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle,rgba(16,185,129,0.10),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
      </SectionBg>

      <div className="relative z-10 container mx-auto px-4 text-center py-24">
        <Badge label="Our Story" />

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          <span className="text-slate-900 dark:text-white">Medicine,</span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg,#059669,#10b981 45%,#34d399 80%,#6ee7b7)",
            }}
          >
            Reimagined.
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
          MediStore was built to solve a real problem — getting authentic,
          affordable medicine quickly and reliably across Bangladesh. We are the
          bridge between verified pharmacies and the people who need them most.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            Browse Medicines <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/[0.1] dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-sm font-semibold backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>

        {/* Floating pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {[
            "DGDA Compliant",
            "50k+ Patients",
            "500+ Pharmacies",
            "2–4 Day Delivery",
            "COD Available",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/70 dark:bg-white/[0.05] border border-black/[0.07] dark:border-white/[0.07] text-slate-600 dark:text-slate-300 backdrop-blur-sm"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MISSION + VISION ─────────────────────────────────────────────────────────
function MissionSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      <SectionBg>
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            right: "-5%",
            transform: "translateY(-50%)",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle,rgba(20,184,166,0.10),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </SectionBg>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-14">
          <Badge label="Purpose" />
          <SectionHeading highlight="Mission" pre="Our" post="& Vision" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Mission */}
          <div className="group relative overflow-hidden rounded-2xl p-7 bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%,rgba(16,185,129,0.08),transparent 70%)",
              }}
            />

            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Mission
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-[1.8]">
              To make authentic, affordable medicine accessible to every person
              in Bangladesh — no matter where they live. We connect patients
              with verified pharmacies through a seamless, trustworthy digital
              platform.
            </p>
          </div>

          {/* Vision */}
          <div className="group relative overflow-hidden rounded-2xl p-7 bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm hover:border-teal-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%,rgba(20,184,166,0.08),transparent 70%)",
              }}
            />

            <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Vision
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-[1.8]">
              A Bangladesh where healthcare logistics never delay treatment. We
              envision a future where every pharmacy is digitally connected and
              every patient can get the right medicine in hours, not days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CORE VALUES

function ValuesSection() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const VALUES = [
    {
      icon: ShieldCheck,
      title: "Authenticity First",
      desc: "Verified Sellers. Every product is checked against DGDA regulations before listing.",
      color: "emerald",
    },
    {
      icon: Zap,
      title: "Speed & Reliability",
      desc: "2–4 day nationwide delivery with real-time tracking and logistics partners.",
      color: "amber",
    },
    {
      icon: FlaskConical,
      title: "Medical Integrity",
      desc: "Cold-chain storage, tamper-proof packaging, verified expiry dates always.",
      color: "sky",
    },
    {
      icon: HeartHandshake,
      title: "Patient-Centered",
      desc: "Every feature is designed to improve patient experience and safety.",
      color: "rose",
    },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[80px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-emerald-500 text-xs font-semibold mb-2">
            What We Stand For
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            Core <span className="text-emerald-500">Values</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
            Principles that shape every decision behind MediStore.
          </p>
        </div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {VALUES.map(({ icon: Icon, title, desc, color }, i) => {
            const gradient =
              color === "emerald"
                ? "from-emerald-500/20 to-teal-400/20"
                : color === "amber"
                  ? "from-amber-500/20 to-yellow-400/20"
                  : color === "sky"
                    ? "from-sky-500/20 to-cyan-400/20"
                    : "from-rose-500/20 to-pink-400/20";

            const glow =
              color === "emerald"
                ? "rgba(16,185,129,0.15)"
                : color === "amber"
                  ? "rgba(245,158,11,0.15)"
                  : color === "sky"
                    ? "rgba(14,165,233,0.15)"
                    : "rgba(244,63,94,0.15)";

            return (
              <motion.div
                key={title}
                variants={item}
                className="group relative"
              >
                {/* CARD */}
                <div className="relative p-6 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-emerald-500/10">
                  {/* GLOW LAYER */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${glow}, transparent 70%)`,
                    }}
                  />

                  {/* TOP LINE */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 group-hover:opacity-100 transition" />

                  {/* ICON */}
                  <div
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="w-5 h-5 text-slate-700 dark:text-white" />
                  </div>

                  {/* TEXT */}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── WHAT MAKES US DIFFERENT ─

function DifferentSection() {
  const DIFFERENTIATORS = [
    {
      icon: ShieldCheck,
      text: "Every seller is DGDA-licensed and manually verified by our team before going live.",
    },
    {
      icon: FlaskConical,
      text: "Medicine listings require batch numbers, expiry dates, and manufacturer proof.",
    },
    {
      icon: Truck,
      text: "Real-time logistics with a 99.8% on-time delivery success rate nationwide.",
    },
    {
      icon: Users,
      text: "24/7 customer support with dedicated pharmacist consultation via chat.",
    },
    {
      icon: Star,
      text: "Only customers who actually received the product can leave verified reviews.",
    },
    {
      icon: Zap,
      text: "Instant order confirmation and same-day dispatch from pharmacies in major cities.",
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  return (
    <section className="relative py-16 md:py-20 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div
          className="absolute rounded-full"
          style={{
            top: "20%",
            left: "-5%",
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle,rgba(16,185,129,0.10),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* LEFT (animated slightly delayed) */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.p
              variants={item}
              className="text-emerald-500 text-xs font-semibold mb-2"
            >
              Why MediStore
            </motion.p>

            <motion.h2
              variants={item}
              className="text-3xl md:text-4xl font-black leading-tight mb-4"
            >
              <span className="text-slate-900 dark:text-white">
                Not just another
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-400">
                medicine platform
              </span>
            </motion.h2>

            <motion.p
              variants={item}
              className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md"
            >
              Built to fix real gaps in Bangladesh’s pharmaceutical system —
              focused on trust, speed, and reliability.
            </motion.p>
          </motion.div>

          {/* RIGHT GRID */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {DIFFERENTIATORS.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                variants={item}
                className="group relative p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.03] backdrop-blur-md hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                {/* glow border effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-emerald-500/10 blur-xl" />

                <div className="relative flex items-start gap-3">
                  {/* icon */}
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  {/* text */}
                  <p className="text-xs leading-[1.6] text-slate-600 dark:text-slate-300">
                    {text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TEAM
function TeamSection() {
  const FOUNDERS: Founder[] = [
    {
      name: "Selim Reza",
      role: "Founder & Full Stack Developer",
      bio: "Building MediStore to simplify healthcare access in Bangladesh through modern technology and intelligent systems.",
      image: "/team/me.jpg",
    },
    {
      name: "Dr. Shafiul Islam",
      role: "Product Designer",
      bio: "Crafting intuitive experiences that make medicine discovery simple and human-friendly.",
      image: "/team/pku.jpg",
    },
    {
      name: "Hasibul Hasan",
      role: "Backend Engineer",
      bio: "Designing scalable APIs and secure systems to power the MediStore ecosystem.",
      image: "/team/hasan.jpg",
    },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      {/* ───────── BACKGROUND ───────── */}
      <div className="absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
        <div
          className="absolute rounded-full"
          style={{
            top: "-5%",
            right: "-5%",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle,rgba(16,185,129,0.10),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* ───────── HEADER ───────── */}
        <div className="text-center mb-16">
          <p className="text-emerald-500 font-semibold text-sm mb-2">
            Our Team
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            People Behind <span className="text-emerald-500">MediStore</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto">
            A passionate team working to make healthcare more accessible,
            reliable, and intelligent.
          </p>
        </div>

        {/* ───────── ZIGZAG ───────── */}
        <div className="flex flex-col gap-24 max-w-6xl mx-auto">
          {FOUNDERS.map((person, i) => {
            const reverse = i % 2 !== 0;

            return (
              <div key={i} className="grid md:grid-cols-2 gap-12 items-center">
                {/* IMAGE */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={reverse ? "md:order-2" : "md:order-1"}
                >
                  <div className="relative group rounded-3xl border border-black/[0.07] dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
                    {/* IMAGE WRAPPER (square) */}
                    <div className="relative w-full max-w-[260px] aspect-square mx-auto rounded-2xl overflow-hidden">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />

                      {/* soft overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                    </div>

                    {/* glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-emerald-500/10 blur-xl" />
                  </div>
                </motion.div>

                {/* TEXT */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={reverse ? "md:order-1" : "md:order-2"}
                >
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {person.name}
                  </h3>

                  <p className="text-emerald-500 font-semibold text-sm mb-4">
                    {person.role}
                  </p>

                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {person.bio}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      <SectionBg>
        <div className="absolute top-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse,rgba(16,185,129,0.13),transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </SectionBg>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <Badge label="Get Started" />
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
          <span className="text-slate-900 dark:text-white">
            Ready to experience{" "}
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg,#059669,#10b981 50%,#34d399)",
            }}
          >
            better healthcare?
          </span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
          Join over 50,000 patients who trust MediStore for authentic, fast
          medicine delivery across Bangladesh.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-black/[0.1] dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-sm font-semibold backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <TeamSection />
      <MissionSection />
      <ValuesSection />
      <DifferentSection />
      <CTASection />
    </main>
  );
}
