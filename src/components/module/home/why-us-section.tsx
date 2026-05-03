// ! updated
"use client";

import { cn } from "@/lib/utils";
import {
  Clock3,
  HeartPulse,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handler = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ─────────────────────────────────────────────────────────────────────────────
// Illustrations — one per feature, all inline SVG
// ─────────────────────────────────────────────────────────────────────────────

function IllustrationShield({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* glow behind shield */}
      <ellipse
        cx="44"
        cy="52"
        rx="28"
        ry="18"
        fill="url(#sg1)"
        opacity="0.55"
      />
      {/* shield body */}
      <path
        d="M44 10 L70 22 L70 44 C70 60 44 78 44 78 C44 78 18 60 18 44 L18 22 Z"
        fill="url(#sg2)"
        stroke="rgba(16,185,129,0.4)"
        strokeWidth="1.2"
        className={
          reduced
            ? ""
            : "origin-[44px_44px] group-hover:[animation:shield-pulse_600ms_ease-out_forwards]"
        }
        style={{ transformOrigin: "44px 44px" }}
      />
      {/* inner shield highlight */}
      <path
        d="M44 18 L64 28 L64 44 C64 57 44 71 44 71 C44 71 24 57 24 44 L24 28 Z"
        fill="url(#sg3)"
        opacity="0.5"
      />
      {/* checkmark */}
      <path
        d="M33 44 L40 51 L55 36"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          reduced
            ? ""
            : "group-hover:[animation:check-draw_400ms_ease-out_200ms_forwards]"
        }
        style={{
          strokeDasharray: 28,
          strokeDashoffset: 0,
        }}
      />
      <defs>
        <radialGradient id="sg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="sg2"
          x1="44"
          y1="10"
          x2="44"
          y2="78"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient
          id="sg3"
          x1="44"
          y1="18"
          x2="44"
          y2="71"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IllustrationTruck({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* shadow */}
      <ellipse cx="44" cy="72" rx="26" ry="5" fill="#10b981" opacity="0.12" />
      {/* motion lines */}
      {!reduced && (
        <>
          <line
            x1="6"
            y1="42"
            x2="18"
            y2="42"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
            className="group-hover:[animation:motion-line_500ms_ease-out_forwards]"
          />
          <line
            x1="4"
            y1="50"
            x2="14"
            y2="50"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.25"
            className="group-hover:[animation:motion-line_500ms_ease-out_100ms_forwards]"
          />
          <line
            x1="8"
            y1="58"
            x2="16"
            y2="58"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.15"
            className="group-hover:[animation:motion-line_500ms_ease-out_200ms_forwards]"
          />
        </>
      )}
      {/* cargo box */}
      <rect
        x="22"
        y="30"
        width="34"
        height="28"
        rx="3"
        fill="url(#tg1)"
        stroke="rgba(16,185,129,0.35)"
        strokeWidth="1"
      />
      {/* cab */}
      <path
        d="M56 40 L56 58 L72 58 L72 44 L66 36 L56 36 Z"
        fill="url(#tg2)"
        stroke="rgba(16,185,129,0.35)"
        strokeWidth="1"
      />
      {/* windscreen */}
      <path
        d="M58 38 L58 46 L70 46 L70 44 L65 38 Z"
        fill="#b2f5e0"
        opacity="0.6"
      />
      {/* wheels */}
      <circle
        cx="32"
        cy="62"
        r="7"
        fill="#fff"
        stroke="#10b981"
        strokeWidth="2"
      />
      <circle cx="32" cy="62" r="3" fill="#10b981" opacity="0.3" />
      <circle
        cx="64"
        cy="62"
        r="7"
        fill="#fff"
        stroke="#10b981"
        strokeWidth="2"
      />
      <circle cx="64" cy="62" r="3" fill="#10b981" opacity="0.3" />
      {/* package stripe */}
      <line
        x1="39"
        y1="30"
        x2="39"
        y2="58"
        stroke="rgba(16,185,129,0.25)"
        strokeWidth="1"
      />
      <line
        x1="22"
        y1="43"
        x2="56"
        y2="43"
        stroke="rgba(16,185,129,0.25)"
        strokeWidth="1"
      />
      <defs>
        <linearGradient
          id="tg1"
          x1="22"
          y1="30"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient
          id="tg2"
          x1="56"
          y1="36"
          x2="72"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ← Add this ABOVE the IllustrationClock function, at module level
const CLOCK_TICKS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
  (deg, i) => {
    const major = i % 3 === 0;
    const r1 = major ? 19 : 20.5;
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      major,
      x1: parseFloat((44 + r1 * Math.cos(rad)).toFixed(6)),
      y1: parseFloat((44 + r1 * Math.sin(rad)).toFixed(6)),
      x2: parseFloat((44 + 22.5 * Math.cos(rad)).toFixed(6)),
      y2: parseFloat((44 + 22.5 * Math.sin(rad)).toFixed(6)),
    };
  },
);

function IllustrationClock({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* glow */}
      <circle cx="44" cy="44" r="28" fill="url(#cg1)" opacity="0.3" />
      {/* face */}
      <circle
        cx="44"
        cy="44"
        r="26"
        fill="url(#cg2)"
        stroke="rgba(16,185,129,0.35)"
        strokeWidth="1.2"
      />
      {/* inner highlight ring */}
      <circle
        cx="44"
        cy="44"
        r="22"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.4"
      />
      {/* tick marks */}
      {CLOCK_TICKS.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="#10b981"
          strokeWidth={t.major ? 1.5 : 0.8}
          strokeLinecap="round"
          opacity={t.major ? 0.7 : 0.4}
        />
      ))}
      {/* hour hand */}
      <line
        x1="44"
        y1="44"
        x2="44"
        y2="30"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={
          reduced
            ? ""
            : "origin-[44px_44px] group-hover:[animation:hour-tick_600ms_ease-in-out_forwards]"
        }
        style={{ transformOrigin: "44px 44px" }}
      />
      {/* minute hand */}
      <line
        x1="44"
        y1="44"
        x2="53"
        y2="36"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={
          reduced
            ? ""
            : "origin-[44px_44px] group-hover:[animation:minute-tick_600ms_ease-in-out_forwards]"
        }
        style={{ transformOrigin: "44px 44px" }}
      />
      {/* center dot */}
      <circle cx="44" cy="44" r="3" fill="#10b981" />
      <circle cx="44" cy="44" r="1.5" fill="white" />
      {/* pulse ring on hover */}
      <circle
        cx="44"
        cy="44"
        r="26"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        opacity="0"
        className={
          reduced
            ? ""
            : "group-hover:[animation:clock-pulse_700ms_ease-out_forwards]"
        }
      />
      <defs>
        <radialGradient id="cg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="cg2"
          x1="18"
          y1="18"
          x2="70"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IllustrationStar({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ambient glow */}
      <ellipse cx="44" cy="50" rx="26" ry="16" fill="#10b981" opacity="0.1" />
      {/* main star — centered */}
      <path
        d="M44 16 L48.8 35.2 L69 35.2 L52.9 46.8 L57.7 66 L44 55.4 L30.3 66 L35.1 46.8 L19 35.2 L39.2 35.2 Z"
        fill="url(#stg1)"
        stroke="rgba(16,185,129,0.4)"
        strokeWidth="1"
        className={
          reduced
            ? ""
            : "origin-[44px_41px] group-hover:[animation:star-bounce_500ms_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
        }
        style={{ transformOrigin: "44px 41px" }}
      />
      {/* sparkles */}
      {!reduced && (
        <>
          <circle
            cx="20"
            cy="22"
            r="2"
            fill="#10b981"
            opacity="0"
            className="group-hover:[animation:sparkle_400ms_ease-out_200ms_forwards]"
          />
          <circle
            cx="68"
            cy="26"
            r="1.5"
            fill="#10b981"
            opacity="0"
            className="group-hover:[animation:sparkle_400ms_ease-out_300ms_forwards]"
          />
          <circle
            cx="72"
            cy="54"
            r="2"
            fill="#6ee7b7"
            opacity="0"
            className="group-hover:[animation:sparkle_400ms_ease-out_100ms_forwards]"
          />
          <circle
            cx="16"
            cy="56"
            r="1.5"
            fill="#6ee7b7"
            opacity="0"
            className="group-hover:[animation:sparkle_400ms_ease-out_250ms_forwards]"
          />
        </>
      )}
      {/* small satellite stars */}
      <path
        d="M70 18 L71.2 22 L75 22 L72 24.4 L73.2 28.4 L70 26 L66.8 28.4 L68 24.4 L65 22 L68.8 22 Z"
        fill="#a7f3d0"
        opacity="0.7"
      />
      <path
        d="M14 30 L15 33.2 L18 33.2 L15.6 35 L16.6 38.2 L14 36.4 L11.4 38.2 L12.4 35 L10 33.2 L13 33.2 Z"
        fill="#6ee7b7"
        opacity="0.5"
      />
      <defs>
        <linearGradient
          id="stg1"
          x1="19"
          y1="16"
          x2="69"
          y2="66"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IllustrationPackage({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* shadow */}
      <ellipse cx="44" cy="74" rx="22" ry="5" fill="#10b981" opacity="0.1" />
      {/* box body */}
      <rect
        x="18"
        y="36"
        width="52"
        height="34"
        rx="3"
        fill="url(#pkg1)"
        stroke="rgba(16,185,129,0.35)"
        strokeWidth="1"
        className={
          reduced
            ? ""
            : "origin-[44px_53px] group-hover:[animation:pkg-bounce_500ms_cubic-bezier(0.34,1.4,0.64,1)_forwards]"
        }
        style={{ transformOrigin: "44px 53px" }}
      />
      {/* box lid */}
      <path
        d="M15 30 L44 22 L73 30 L73 38 L44 38 L15 38 Z"
        fill="url(#pkg2)"
        stroke="rgba(16,185,129,0.3)"
        strokeWidth="1"
      />
      {/* lid fold line */}
      <line
        x1="44"
        y1="22"
        x2="44"
        y2="38"
        stroke="rgba(16,185,129,0.3)"
        strokeWidth="1"
      />
      {/* tape stripe on body */}
      <rect
        x="18"
        y="49"
        width="52"
        height="8"
        rx="0"
        fill="rgba(16,185,129,0.1)"
      />
      {/* Rx / + symbol on front */}
      <path
        d="M38 58 L38 68 M34 62 L42 62"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M46 58 Q52 58 52 62 Q52 66 46 66 L46 68 M50 66 L53 68"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient
          id="pkg1"
          x1="18"
          y1="36"
          x2="70"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient
          id="pkg2"
          x1="15"
          y1="22"
          x2="73"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IllustrationHeart({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* glow */}
      <ellipse
        cx="44"
        cy="48"
        rx="26"
        ry="20"
        fill="url(#hg1)"
        opacity="0.35"
      />
      {/* heart */}
      <path
        d="M44 68 C44 68 14 50 14 32 C14 22 22 16 30 18 C36 20 40 24 44 30 C48 24 52 20 58 18 C66 16 74 22 74 32 C74 50 44 68 44 68 Z"
        fill="url(#hg2)"
        stroke="rgba(239,68,68,0.3)"
        strokeWidth="1"
        className={
          reduced
            ? ""
            : "origin-[44px_44px] [animation:heartbeat_2.4s_ease-in-out_infinite] group-hover:[animation:heartbeat-fast_0.8s_ease-in-out_infinite]"
        }
        style={{ transformOrigin: "44px 44px" }}
      />
      {/* inner highlight */}
      <path
        d="M34 26 C30 24 24 28 23 34"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* ECG / pulse line */}
      <polyline
        points="16,48 26,48 30,38 34,56 38,42 42,52 46,48 72,48"
        fill="none"
        stroke="rgba(239,68,68,0.7)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          reduced
            ? ""
            : "group-hover:[animation:pulse-line_600ms_ease-out_forwards]"
        }
        style={{ strokeDasharray: 80, strokeDashoffset: 80 }}
      />
      <defs>
        <radialGradient id="hg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="hg2"
          x1="14"
          y1="16"
          x2="74"
          y2="68"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FeatureIllustration router
// ─────────────────────────────────────────────────────────────────────────────
type IllustrationKey =
  | "shield"
  | "truck"
  | "clock"
  | "star"
  | "package"
  | "heart";

function FeatureIllustration({
  type,
  reduced,
}: {
  type: IllustrationKey;
  reduced: boolean;
}) {
  const map: Record<IllustrationKey, React.ReactNode> = {
    shield: <IllustrationShield reduced={reduced} />,
    truck: <IllustrationTruck reduced={reduced} />,
    clock: <IllustrationClock reduced={reduced} />,
    star: <IllustrationStar reduced={reduced} />,
    package: <IllustrationPackage reduced={reduced} />,
    heart: <IllustrationHeart reduced={reduced} />,
  };
  return (
    <div className="relative w-20 h-20 shrink-0">
      {/* soft radial glow behind illustration */}
      <div className="absolute inset-0 rounded-full bg-emerald-400/10 dark:bg-emerald-400/[0.07] blur-lg scale-110" />
      <div className="relative w-full h-full">{map[type]}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FeatureCard
// ─────────────────────────────────────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  illustration: IllustrationKey;
  delay: number;
  hasAppeared: boolean;
  reduced: boolean;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  illustration,
  delay,
  hasAppeared,
  reduced,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        // layout
        "group relative flex flex-col p-7 rounded-3xl overflow-hidden",
        // border + glass
        "border border-black/[0.06] dark:border-white/[0.08]",
        "bg-white/75 dark:bg-white/[0.04] backdrop-blur-md",
        // scroll reveal
        "transition-[opacity,transform] duration-700",
        hasAppeared ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        // hover lift — skipped if reduced motion
        !reduced &&
          "hover:-translate-y-1.5 hover:shadow-[0_20px_48px_-12px_rgba(16,185,129,0.18)] hover:border-emerald-300/40 dark:hover:border-emerald-500/25",
        // idle breathing — only without reduced motion
        !reduced && "animate-[card-breathe_4s_ease-in-out_infinite]",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Illustration row ── */}
      <div className="flex items-start justify-between mb-5">
        {/* icon pill */}
        <div
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
            "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
            !reduced &&
              "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* SVG illustration — top-right */}
        <div
          className={cn(
            "transition-transform duration-500 ease-out",
            !reduced && "group-hover:-translate-y-1 group-hover:scale-105",
          )}
        >
          <FeatureIllustration type={illustration} reduced={reduced} />
        </div>
      </div>

      {/* ── Text ── */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {description}
      </p>

      {/* ── Hover gradient sweep (decorative) ── */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 pointer-events-none rounded-3xl",
          "bg-gradient-to-br from-emerald-50/60 via-transparent to-teal-50/40",
          "dark:from-emerald-900/10 dark:via-transparent dark:to-teal-900/10",
          !reduced && "transition-opacity duration-500 group-hover:opacity-100",
        )}
      />

      {/* ── Corner accent ── */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.04] rounded-bl-[80px] rounded-tr-3xl pointer-events-none" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Features data
// ─────────────────────────────────────────────────────────────────────────────
const features: {
  icon: React.ElementType;
  title: string;
  description: string;
  illustration: IllustrationKey;
}[] = [
  {
    icon: ShieldCheck,
    title: "Verified Sellers",
    description:
      "Every vendor is strictly vetted. We ensure medicine quality and source authenticity.",
    illustration: "shield",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Fast dispatch with Cash on Delivery options. Reliable tracking straight to your doorstep.",
    illustration: "truck",
  },
  {
    icon: Clock3,
    title: "24/7 Ordering",
    description:
      "Browse and place orders anytime. Our platform never sleeps, prioritizing your health.",
    illustration: "clock",
  },
  {
    icon: Star,
    title: "Genuine Reviews",
    description:
      "Read honest, verified feedback from real customers to make informed healthcare decisions.",
    illustration: "star",
  },
  {
    icon: PackageCheck,
    title: "Wide OTC Selection",
    description:
      "Thousands of non-prescription healthcare products across multiple categories.",
    illustration: "package",
  },
  {
    icon: HeartPulse,
    title: "Your Health First",
    description:
      "Strict safety standards. We only list approved over-the-counter medicines.",
    illustration: "heart",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
export function WhyUsSection() {
  const [hasAppeared, setHasAppeared] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasAppeared(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/*
        ── Keyframes injected once via a <style> tag ──────────────────────────
        Using a style tag is the cleanest approach for custom @keyframes in
        Next.js App Router without a Framer Motion / extra Tailwind plugin dep.
        All animation class names are scoped / unique to this component.
      */}
      <style>{`
        /* card idle breathing */
        @keyframes card-breathe {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-2px) scale(1.003); }
        }

        /* shield pulse on hover */
        @keyframes shield-pulse {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.08); }
          70%  { transform: scale(0.97); }
          100% { transform: scale(1.03); }
        }

        /* check draw (no-op, stroke-dashoffset is already 0) */
        @keyframes check-draw {
          from { stroke-dashoffset: 28; }
          to   { stroke-dashoffset: 0;  }
        }

        /* truck motion lines */
        @keyframes motion-line {
          0%   { transform: translateX(6px); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateX(-4px); opacity: 0; }
        }

        /* clock hands tick */
        @keyframes hour-tick {
          0%   { transform: rotate(0deg); }
          60%  { transform: rotate(25deg); }
          100% { transform: rotate(20deg); }
        }
        @keyframes minute-tick {
          0%   { transform: rotate(0deg); }
          60%  { transform: rotate(-30deg); }
          100% { transform: rotate(-24deg); }
        }
        @keyframes clock-pulse {
          0%   { r: 26; opacity: 0.6; stroke-width: 1.5; }
          100% { r: 36; opacity: 0; stroke-width: 0.5; }
        }

        /* star bounce */
        @keyframes star-bounce {
          0%   { transform: scale(1) rotate(0deg); }
          40%  { transform: scale(1.15) rotate(-4deg); }
          70%  { transform: scale(0.97) rotate(2deg); }
          100% { transform: scale(1.07) rotate(0deg); }
        }
        @keyframes sparkle {
          0%   { opacity: 0; transform: scale(0); }
          50%  { opacity: 1; transform: scale(1.4); }
          100% { opacity: 0; transform: scale(1); }
        }

        /* package bounce */
        @keyframes pkg-bounce {
          0%   { transform: translateY(0) scale(1); }
          35%  { transform: translateY(-8px) scale(1.04, 0.97); }
          60%  { transform: translateY(2px) scale(0.98, 1.02); }
          100% { transform: translateY(-3px) scale(1.02); }
        }

        /* heartbeat idle */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14%      { transform: scale(1.06); }
          28%      { transform: scale(1); }
          42%      { transform: scale(1.04); }
          70%      { transform: scale(1); }
        }
        /* heartbeat fast on hover */
        @keyframes heartbeat-fast {
          0%, 100% { transform: scale(1); }
          20%      { transform: scale(1.1); }
          40%      { transform: scale(1); }
          60%      { transform: scale(1.07); }
          80%      { transform: scale(1); }
        }
        /* ECG pulse line draw */
        @keyframes pulse-line {
          to { stroke-dashoffset: 0; }
        }

        /* prefers-reduced-motion: strip everything */
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"],
          [class*="group-hover:[animation"] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative py-20 md:py-28 lg:px-18 overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]"
      >
        {/* ── Background system (unchanged from original) ─────────────── */}
        <div
          className="absolute inset-0 opacity-[0.635] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "177px 177px",
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
        <div
          className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] rounded-full blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.12), transparent 70%)",
          }}
        />
       

        {/* ── Content ─────────────────────────────────────────────────── */}
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
              We&apos;ve redesigned healthcare access. No queues, no stress —
              just reliability.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ">
            {features.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                illustration={feature.illustration}
                delay={idx * 100}
                hasAppeared={hasAppeared}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
