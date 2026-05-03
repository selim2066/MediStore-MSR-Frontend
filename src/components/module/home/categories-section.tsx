//! updated version with more vibrant colors, dynamic icons, and enhanced hover effects

import { BackgroundEffects } from "@/components/ui/background-effects";
import { categoryService } from "@/service/category.service";
import {
  Baby,
  Bone,
  Brain,
  Droplets,
  Eye,
  FlaskConical,
  Heart,
  Leaf,
  Pill,
  Shield,
  Stethoscope,
  Sun,
  Tag,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";
import Link from "next/link";

const PALETTES = [
  {
    icon: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400",
    border: "hover:border-emerald-400/40 dark:hover:border-emerald-600/40",
    glow: "rgba(16,185,129,0.15)",
    dot: "bg-emerald-500",
  },
  {
    icon: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400",
    border: "hover:border-blue-400/40 dark:hover:border-blue-600/40",
    glow: "rgba(59,130,246,0.15)",
    dot: "bg-blue-500",
  },
  {
    icon: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400",
    border: "hover:border-violet-400/40 dark:hover:border-violet-600/40",
    glow: "rgba(139,92,246,0.15)",
    dot: "bg-violet-500",
  },
  {
    icon: "bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400",
    border: "hover:border-rose-400/40 dark:hover:border-rose-600/40",
    glow: "rgba(244,63,94,0.13)",
    dot: "bg-rose-500",
  },
  {
    icon: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400",
    border: "hover:border-amber-400/40 dark:hover:border-amber-600/40",
    glow: "rgba(245,158,11,0.15)",
    dot: "bg-amber-500",
  },
  {
    icon: "bg-teal-500/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400",
    border: "hover:border-teal-400/40 dark:hover:border-teal-600/40",
    glow: "rgba(20,184,166,0.15)",
    dot: "bg-teal-500",
  },
  {
    icon: "bg-orange-500/10 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400",
    border: "hover:border-orange-400/40 dark:hover:border-orange-600/40",
    glow: "rgba(249,115,22,0.13)",
    dot: "bg-orange-500",
  },
  {
    icon: "bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400",
    border: "hover:border-cyan-400/40 dark:hover:border-cyan-600/40",
    glow: "rgba(6,182,212,0.15)",
    dot: "bg-cyan-500",
  },
] as const;

const ICONS = [
  { keywords: ["pain", "headache", "analgesic", "analgesics"], Icon: Zap },
  { keywords: ["antibiotic", "infection", "bacteria"], Icon: Shield },
  { keywords: ["vitamin", "supplement", "mineral", "nutrition"], Icon: Sun },
  {
    keywords: ["diabetes", "insulin", "blood sugar", "glucose", "antidiabetic"],
    Icon: Droplets,
  },
  { keywords: ["allergy", "antihistamine", "sinus"], Icon: Wind },
  {
    keywords: ["gastro", "stomach", "digestive", "acid", "ulcer", "antacid"],
    Icon: FlaskConical,
  },
  {
    keywords: ["heart", "cardiac", "blood pressure", "cholesterol"],
    Icon: Heart,
  },
  { keywords: ["mental", "brain", "neuro", "anxiety", "sleep"], Icon: Brain },
  { keywords: ["eye", "optic", "vision"], Icon: Eye },
  { keywords: ["bone", "joint", "orthopedic", "arthritis"], Icon: Bone },
  { keywords: ["child", "baby", "paediatric", "infant"], Icon: Baby },
  { keywords: ["herbal", "natural", "ayurvedic", "plant"], Icon: Leaf },
  { keywords: ["fever", "temperature", "antipyretic"], Icon: Thermometer },
  {
    keywords: ["respiratory", "lung", "asthma", "cough", "breath"],
    Icon: Wind,
  },
  { keywords: ["general", "medicine", "tablet", "capsule", "otc"], Icon: Pill },
  { keywords: ["doctor", "prescription", "clinic"], Icon: Stethoscope },
];

function pickIcon(name: string) {
  const lower = name.toLowerCase();
  return (
    ICONS.find(({ keywords }) => keywords.some((k) => lower.includes(k)))
      ?.Icon ?? Tag
  );
}

export async function CategoriesSection() {
  const { data, error } = await categoryService.getCategories();
  if (error || !data?.data?.length) return null;
  const categories = data.data;

  return (
    <section className="relative py-10 md:py-14 md:px-10 lg:px-18 bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden -mt-7 z-20">
      {/* ── Background ── */}
     
      

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
              Shop by Category
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
            <span className="text-slate-900 dark:text-white">Browse by </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#059669,#10b981 50%,#34d399)",
              }}
            >
              Category
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 mt-2 text-xs max-w-xs mx-auto leading-relaxed">
            Find exactly what you need from our curated pharmaceutical
            categories.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((category, idx) => {
            const palette = PALETTES[idx % PALETTES.length];
            const Icon = pickIcon(category.name);

            return (
              <Link
                key={category.id}
                href={`/shop?categoryId=${category.id}`}
                className="group"
              >
                <div
                  className={`
                    relative overflow-hidden rounded-xl p-4
                    bg-white/40 dark:bg-white/[0.03]
                    border border-black/[0.06] dark:border-white/[0.06]
                    backdrop-blur-sm
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    hover:bg-white/65 dark:hover:bg-white/[0.06]
                    ${palette.border}
                    flex flex-col items-center text-center gap-2.5
                  `}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
                    style={{
                      background: `radial-gradient(circle at 50% 70%,${palette.glow},transparent 70%)`,
                    }}
                  />

                  {/* Top shimmer */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div
                    className={`
                      relative z-10 w-11 h-11 rounded-xl
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:scale-110
                      ${palette.icon}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Name */}
                  <p className="relative z-10 text-[12px] font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-200 leading-snug px-1">
                    {category.name}
                  </p>

                  {/* Arrow */}
                  <div className="relative z-10 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    <svg
                      className="w-3 h-3 text-slate-400 dark:text-slate-500"
                      fill="none"
                      viewBox="0 0 12 12"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        d="M1 6h10M6 1l5 5-5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`absolute bottom-0 inset-x-0 h-[2px] ${palette.dot} opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-b-xl`}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-8">
          <Link href="/shop" className="group inline-block">
            <div
              className="relative p-[1.5px] rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.5), rgba(20,184,166,0.3), rgba(16,185,129,0.5))",
              }}
            >
              <div
                className="
          relative flex items-center gap-2
          px-6 py-2.5 rounded-[11px]
          bg-[#f0fdf8] dark:bg-[#020810]
          group-hover:bg-emerald-50/80 dark:group-hover:bg-emerald-950/40
          transition-all duration-300
        "
              >
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200 tracking-wide">
                  View all medicines
                </span>

                {/* Arrow — slides right on hover */}
                <span
                  className="
            inline-flex items-center
            text-emerald-600 dark:text-emerald-400
            text-sm font-bold
            translate-x-0 group-hover:translate-x-1.5
            transition-transform duration-300 ease-out
          "
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
