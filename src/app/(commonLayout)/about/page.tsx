"use client";
import Link from "next/link";
import {
  ShieldCheck, Zap, HeartHandshake, Globe, ArrowRight,
  FlaskConical, Truck, Users, Star, CheckCircle2,
} from "lucide-react";

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
function SectionHeading({ pre, highlight, post, sub }: {
  pre?: string; highlight: string; post?: string; sub?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-black tracking-tight">
        {pre && <span className="text-slate-900 dark:text-white">{pre} </span>}
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg,#059669,#10b981 50%,#34d399)" }}
        >
          {highlight}
        </span>
        {post && <span className="text-slate-900 dark:text-white"> {post}</span>}
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
            top: "10%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 600,
            background: "radial-gradient(circle,rgba(16,185,129,0.18),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Side orbs */}
        <div
          className="absolute rounded-full"
          style={{
            top: "30%", left: "-10%", width: 350, height: 350,
            background: "radial-gradient(circle,rgba(20,184,166,0.12),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "10%", right: "-10%", width: 350, height: 350,
            background: "radial-gradient(circle,rgba(16,185,129,0.10),transparent 70%)",
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
            style={{ backgroundImage: "linear-gradient(135deg,#059669,#10b981 45%,#34d399 80%,#6ee7b7)" }}
          >
            Reimagined.
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
          MediStore was built to solve a real problem — getting authentic, affordable medicine
          quickly and reliably across Bangladesh. We are the bridge between verified pharmacies
          and the people who need them most.
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
          {["DGDA Compliant", "50k+ Patients", "500+ Pharmacies", "2–4 Day Delivery", "COD Available"].map((tag) => (
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
            top: "50%", right: "-5%", transform: "translateY(-50%)",
            width: 400, height: 400,
            background: "radial-gradient(circle,rgba(20,184,166,0.10),transparent 70%)",
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
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(circle at 50% 100%,rgba(16,185,129,0.08),transparent 70%)" }} />

            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Mission</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-[1.8]">
              To make authentic, affordable medicine accessible to every person in Bangladesh —
              no matter where they live. We connect patients with verified pharmacies through a
              seamless, trustworthy digital platform.
            </p>
          </div>

          {/* Vision */}
          <div className="group relative overflow-hidden rounded-2xl p-7 bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm hover:border-teal-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(circle at 50% 100%,rgba(20,184,166,0.08),transparent 70%)" }} />

            <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Vision</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-[1.8]">
              A Bangladesh where healthcare logistics never delay treatment. We envision a future
              where every pharmacy is digitally connected and every patient can get the right
              medicine in hours, not days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CORE VALUES ──────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Authenticity First",
    desc: "Every seller is verified. Every product is checked against DGDA regulations before listing.",
    color: { icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", border: "hover:border-emerald-400/40", glow: "rgba(16,185,129,0.10)" },
  },
  {
    icon: Zap,
    title: "Speed & Reliability",
    desc: "2–4 day nationwide delivery with real-time order tracking and dedicated logistics partners.",
    color: { icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400", border: "hover:border-amber-400/40", glow: "rgba(245,158,11,0.10)" },
  },
  {
    icon: FlaskConical,
    title: "Medical Integrity",
    desc: "We never compromise on quality. Cold-chain storage, tamper-evident packaging, verified expiry dates.",
    color: { icon: "bg-sky-500/10 text-sky-600 dark:text-sky-400", border: "hover:border-sky-400/40", glow: "rgba(14,165,233,0.10)" },
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centered",
    desc: "Every feature we build starts with one question: does this make a patient's life easier?",
    color: { icon: "bg-rose-500/10 text-rose-600 dark:text-rose-400", border: "hover:border-rose-400/40", glow: "rgba(244,63,94,0.10)" },
  },
];

function ValuesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      <SectionBg>
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-5%", left: "50%", transform: "translateX(-50%)",
            width: 500, height: 300,
            background: "radial-gradient(ellipse,rgba(16,185,129,0.08),transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
      </SectionBg>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge label="What We Stand For" />
          <SectionHeading highlight="Core Values" sub="The principles that guide every decision we make." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {VALUES.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-2xl p-6 bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${color.border}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 100%,${color.glow},transparent 70%)` }}
              />
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${color.icon}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-[1.75]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHAT MAKES US DIFFERENT ──────────────────────────────────────────────────
const DIFFERENTIATORS = [
  { icon: ShieldCheck, text: "Every seller is DGDA-licensed and manually verified by our team before going live." },
  { icon: FlaskConical, text: "Medicine listings require batch numbers, expiry dates, and manufacturer proof." },
  { icon: Truck, text: "Real-time logistics with a 99.8% on-time delivery success rate nationwide." },
  { icon: Users, text: "24/7 customer support with dedicated pharmacist consultation via chat." },
  { icon: Star, text: "Only customers who actually received the product can leave verified reviews." },
  { icon: Zap, text: "Instant order confirmation and same-day dispatch from pharmacies in major cities." },
];

function DifferentSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      <SectionBg>
        <div
          className="absolute rounded-full"
          style={{
            top: "20%", left: "-5%", width: 400, height: 400,
            background: "radial-gradient(circle,rgba(16,185,129,0.10),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </SectionBg>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left */}
          <div>
            <Badge label="Why MediStore" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
              <span className="text-slate-900 dark:text-white">Not just another</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg,#059669,#10b981 50%,#34d399)" }}
              >
                medicine app.
              </span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-[1.8] max-w-md">
              We built MediStore from the ground up to address the gaps in Bangladesh&apos;s pharmaceutical
              supply chain. Every feature is purpose-built for patients, caregivers, and healthcare providers.
            </p>
          </div>

          {/* Right — feature list */}
          <div className="space-y-3">
            {DIFFERENTIATORS.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] hover:border-emerald-400/40 hover:bg-white/80 dark:hover:bg-white/[0.05] transition-all duration-200 backdrop-blur-sm"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-[1.7]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────
const TEAM = [
  { name: "Md Selim Reza", role: "Founder & CEO", initials: "SR", color: "from-emerald-400 to-teal-500" },
  { name: "Dr. Shafiul Islam", role: "Chief Pharmacist", initials: "FK", color: "from-sky-400 to-blue-500" },
  { name: "Ismail Opu", role: "Head of Logistics", initials: "RA", color: "from-violet-400 to-purple-500" },
  { name: "Hasibul Hasan", role: "Customer Experience", initials: "NI", color: "from-rose-400 to-pink-500" },
];

function TeamSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      <SectionBg>
        <div className="absolute top-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
        <div
          className="absolute rounded-full"
          style={{
            top: "-5%", right: "-5%", width: 400, height: 400,
            background: "radial-gradient(circle,rgba(20,184,166,0.10),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </SectionBg>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge label="The Team" />
          <SectionHeading highlight="People" pre="The" post="Behind MediStore" sub="A passionate team building the future of healthcare access in Bangladesh." />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {TEAM.map(({ name, role, initials, color }) => (
            <div
              key={name}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm hover:border-emerald-400/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-black text-lg shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {initials}
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-snug">{role}</p>
            </div>
          ))}
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
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 600, height: 400,
            background: "radial-gradient(ellipse,rgba(16,185,129,0.13),transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </SectionBg>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <Badge label="Get Started" />
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
          <span className="text-slate-900 dark:text-white">Ready to experience </span>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg,#059669,#10b981 50%,#34d399)" }}
          >
            better healthcare?
          </span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
          Join over 50,000 patients who trust MediStore for authentic, fast medicine delivery across Bangladesh.
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
      <MissionSection />
      <ValuesSection />
      <DifferentSection />
      <TeamSection />
      <CTASection />
    </main>
  );
}