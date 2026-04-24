
// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Activity, Pill, PlusCircle, Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export function HeroSection() {
//   const router = useRouter();
//   const [query, setQuery] = useState("");

//   const handleSearch = () => {
//     const trimmed = query.trim();
//     if (trimmed) {
//       router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
//     } else {
//       router.push("/shop");
//     }
//   };

//   return (
//     <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#f8fafc] dark:bg-gray-950 px-20">
//       {/* Dynamic Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px]" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]" />
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="flex flex-col lg:flex-row items-center gap-16">
//           {/* Left: Content */}
//           <div className="flex-1 text-left">
//             <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//               </span>
//               <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
//                 Verified Pharmacy
//               </span>
//             </div>

//             <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6">
//               Your Health, <br />
//               <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//                 Reimagined.
//               </span>
//             </h1>

//             <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
//               Skip the queue. Access premium healthcare essentials and OTC
//               medicines from certified sellers, delivered with care to your
//               doorstep.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 max-w-md">
//               <div className="relative flex-1 group">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
//                 {/* <Input
//                   placeholder="Find your medicine..."
//                   className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-xl focus:ring-emerald-500"
//                 /> */}
//                 <Input
//                   placeholder="Find your medicine..."
//                   className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-xl focus:ring-emerald-500"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 />
//               </div>
//               {/* <Button
//                 size="lg"
//                 className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
//               >
//                 Search
//               </Button> */}
//               <Button
//                 size="lg"
//                 onClick={handleSearch}
//                 className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
//               >
//                 Search
//               </Button>
//             </div>
//           </div>

//           {/* Right: Interactive Visual (Glassmorphism) */}
//           <div className="flex-1 relative hidden lg:block">
//             <div className="relative z-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-emerald-500 p-6 rounded-3xl text-white space-y-4 shadow-lg shadow-emerald-500/30">
//                   <Activity className="w-10 h-10" />
//                   <p className="font-bold text-xl leading-tight">
//                     Health Tracking Enabled
//                   </p>
//                 </div>
//                 <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4">
//                   <Pill className="w-10 h-10 text-emerald-400" />
//                   <p className="font-bold text-xl leading-tight">
//                     12k+ Products
//                   </p>
//                 </div>
//                 <div className="col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
//                   <div className="flex -space-x-3">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div
//                         key={i}
//                         className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm font-semibold text-slate-600">
//                     Joined by 50k+ Happy Patients areeeee
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* Floating Accents */}
//             <div className="absolute -top-10 -right-10 animate-bounce delay-700">
//               <PlusCircle className="w-20 h-20 text-emerald-500/20" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// //! updated ui ux


// ! updated ui 001
"use client";

import { Button } from "@/components/ui/button";
import { Search, Users, Home, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// ─────────────────────────────────────────────
// TYPEWRITER HOOK
// ─────────────────────────────────────────────
const MEDICINES = [
  "Paracetamol 500mg",
  "Amoxicillin 250mg",
  "Vitamin D3",
  "Omeprazole 20mg",
  "Metformin 500mg",
  "Cetirizine 10mg",
  "Azithromycin 500mg",
];

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const indexRef = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = MEDICINES[indexRef.current];

      if (!isDeleting) {
        charRef.current++;
        setDisplay(word.slice(0, charRef.current));
        if (charRef.current === word.length) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
            tick();
          }, 1900);
          return;
        }
      } else {
        charRef.current--;
        setDisplay(word.slice(0, charRef.current));
        if (charRef.current === 0) {
          setIsDeleting(false);
          indexRef.current = (indexRef.current + 1) % MEDICINES.length;
          timeout = setTimeout(tick, 280);
          return;
        }
      }

      timeout = setTimeout(tick, isDeleting ? 40 : 68);
    };

    timeout = setTimeout(tick, isDeleting ? 40 : 68);
    return () => clearTimeout(timeout);
  }, [isDeleting]);

  return display;
}

// ─────────────────────────────────────────────
// MEDICINE OBJECTS (CSS/SVG — no new packages)
// ─────────────────────────────────────────────

/** Tall capsule pill */
function CapsulePill({
  topColor,
  bottomColor,
  width = 46,
  height = 100,
}: {
  topColor: string;
  bottomColor: string;
  width?: number;
  height?: number;
}) {
  const bodyH = height * 0.16;
  const capH = (height - bodyH) / 2;
  const r = width / 2;
  return (
    <div
      className="relative"
      style={{ width, height, filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.18))" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: capH,
          borderRadius: `${r}px ${r}px 0 0`,
          background: topColor,
        }}
      />
      <div
        className="absolute left-0 right-0"
        style={{ top: capH, height: bodyH, background: topColor, filter: "brightness(0.88)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: capH,
          borderRadius: `0 0 ${r}px ${r}px`,
          background: bottomColor,
        }}
      />
      {/* shine */}
      <div
        className="absolute"
        style={{
          top: "8%",
          left: "22%",
          width: "28%",
          height: "28%",
          background: "rgba(255,255,255,0.38)",
          borderRadius: "50%",
          transform: "rotate(-18deg)",
        }}
      />
    </div>
  );
}

/** Round tablet */
function RoundTablet({
  color,
  size = 72,
  label,
}: {
  color: string;
  size?: number;
  label?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.2))",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "18%",
          width: "30%",
          height: "30%",
          background: "rgba(255,255,255,0.4)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "12%",
          right: "12%",
          height: 1.5,
          background: "rgba(255,255,255,0.22)",
          transform: "translateY(-50%)",
        }}
      />
      {label && (
        <span
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: 9,
            fontWeight: 700,
            position: "relative",
            zIndex: 1,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/** Oval tablet */
function OvalTablet({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 70,
        height: 32,
        background: color,
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "14%",
          width: "28%",
          height: "32%",
          background: "rgba(255,255,255,0.38)",
          borderRadius: "50%",
          transform: "rotate(-22deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "8%",
          right: "8%",
          height: 1.5,
          background: "rgba(255,255,255,0.2)",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
}

/** Medicine bottle */
function MedBottle({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))" }}>
      <div
        style={{
          width: 26,
          height: 13,
          background: color,
          marginLeft: 8,
          borderRadius: "4px 4px 0 0",
          filter: "brightness(0.85)",
        }}
      />
      <div
        style={{
          width: 20,
          height: 9,
          background: color,
          borderRadius: 2,
          margin: "0 auto",
        }}
      />
      <div
        style={{
          width: 54,
          height: 70,
          background: color,
          borderRadius: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "10%",
            right: "10%",
            bottom: "22%",
            background: "rgba(255,255,255,0.22)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.9)" }}>
            {label}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: "12%",
            height: "100%",
            background: "rgba(255,255,255,0.18)",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}

/** Blister strip pack */
function BlisterPack() {
  const pills = [
    { cx: 18, cy: 16, r: 10, rY: 12, fill: "#10b981" },
    { cx: 48, cy: 16, r: 10, rY: 12, fill: "#0ea5e9" },
    { cx: 78, cy: 16, r: 10, rY: 12, fill: "#8b5cf6" },
    { cx: 18, cy: 36, r: 10, rY: 10, fill: "#f97316" },
    { cx: 48, cy: 36, r: 10, rY: 10, fill: "#14b8a6" },
    { cx: 78, cy: 36, r: 10, rY: 10, fill: "#ef4444" },
  ];
  return (
    <svg
      width={96}
      height={48}
      viewBox="0 0 96 48"
      style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.15))" }}
    >
      <rect x={1} y={1} width={94} height={46} rx={7} fill="#e2e8f0" stroke="rgba(0,0,0,0.09)" strokeWidth={1} />
      <rect x={1} y={1} width={94} height={46} rx={7} fill="rgba(255,255,255,0.45)" />
      {pills.map((p, i) => (
        <g key={i}>
          <ellipse cx={p.cx} cy={p.cy} rx={p.r} ry={p.rY} fill={p.fill} opacity={0.9} />
          <ellipse cx={p.cx} cy={p.cy - p.rY * 0.32} rx={p.r * 0.45} ry={p.rY * 0.3} fill="rgba(255,255,255,0.38)" />
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
// FRAMER MOTION VARIANTS
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─────────────────────────────────────────────
// MEDICINE FLOAT WRAPPER
// ─────────────────────────────────────────────
type FloatDir = "up" | "down";

function FloatingMed({
  children,
  label,
  className,
  style,
  dir = "up",
  duration = 5,
  delay = 0,
  rotate = 0,
  initialDelay = 0,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  dir?: FloatDir;
  duration?: number;
  delay?: number;
  rotate?: number;
  initialDelay?: number;
}) {
  const yAmt = dir === "up" ? [0, -12, 0] : [0, 10, 0];
  return (
    <motion.div
      className={`absolute flex flex-col items-center pointer-events-none ${className ?? ""}`}
      style={{ rotate, ...style }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: yAmt,
        transition: {
          opacity: { duration: 0.6, delay: initialDelay },
          scale: { duration: 0.6, delay: initialDelay },
          y: {
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      }}
    >
      {children}
      <span className="mt-1.5 text-[9.5px] font-semibold text-slate-400 dark:text-slate-600 tracking-wider text-center whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
export function HeroSection() {
  // ── Business logic: UNCHANGED ──
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/shop");
    }
  };
  // ── End business logic ──

  const typed = useTypewriter();
  const [focused, setFocused] = useState(false);

  const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "77px 77px",
          }}
        />
        <div className="dark:block hidden absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "77px 77px",
          }}
        />
        {/* Glows */}
        <div className="absolute rounded-full" style={{ top: "-15%", left: "-5%", width: 420, height: 420, background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 65%)", filter: "blur(42px)" }} />
        <div className="absolute rounded-full" style={{ bottom: "-18%", right: "10%", width: 360, height: 360, background: "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 65%)", filter: "blur(36px)" }} />
        <div className="absolute rounded-full" style={{ top: "30%", right: "-5%", width: 280, height: 280, background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)", filter: "blur(34px)" }} />
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.45) 35%, rgba(20,184,166,0.45) 65%, transparent)" }} />
        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
      </div>

      {/* ── Floating Medicines ── */}

      {/* 1. Tall capsule — top-left, partially clipped, behind text */}
      <FloatingMed
        label="Paracetamol"
        dir="down"
        duration={5.2}
        delay={0}
        rotate={-22}
        initialDelay={0.4}
        style={{ top: 100, left: "14%", zIndex: 2, opacity: 0.92 }}
        className="hidden lg:flex"
      >
        <CapsulePill
          topColor="linear-gradient(155deg,#10b981,#059669)"
          bottomColor="linear-gradient(155deg,#f8fafc,#e2e8f0)"
          width={46}
          height={100}
        />
      </FloatingMed>

      {/* 2. Round tablet — top-right, fully visible, in front */}
      <FloatingMed
        label="Amoxicillin"
        dir="up"
        duration={4.6}
        delay={0.1}
        rotate={8}
        initialDelay={0.5}
        style={{ top: 104, right: "15%", zIndex: 6 }}
        className="flex"  /* visible on mobile too — solo medicine */
      >
        <RoundTablet
          color="linear-gradient(135deg,#14b8a6,#0d9488)"
          size={74}
          label="500mg"
        />
      </FloatingMed>

      {/* 3. Blue capsule — right-center, partially behind */}
      <FloatingMed
        label="Vitamin D3"
        dir="down"
        duration={4.9}
        delay={1.2}
        rotate={30}
        initialDelay={0.6}
        style={{ top: "42%", right: "12%", zIndex: 2, opacity: 0.85 }}
        className="hidden lg:flex"
      >
        <CapsulePill
          topColor="linear-gradient(155deg,#38bdf8,#0284c7)"
          bottomColor="linear-gradient(155deg,#f0f9ff,#e0f2fe)"
          width={38}
          height={82}
        />
      </FloatingMed>

      {/* 4. Oval tablet — left-center */}
      <FloatingMed
        label="Omeprazole"
        dir="up"
        duration={4.0}
        delay={2.1}
        rotate={-10}
        initialDelay={0.7}
        style={{ top: "46%", left: "10%", zIndex: 3, opacity: 0.85 }}
        className="hidden lg:flex"
      >
        <OvalTablet color="linear-gradient(135deg,#8b5cf6,#7c3aed)" />
      </FloatingMed>

      {/* 5. Amber bottle — bottom-left, partially clipped */}
      <FloatingMed
        label="Metformin"
        dir="down"
        duration={5.5}
        delay={0.4}
        rotate={0}
        initialDelay={0.5}
        style={{ bottom: 118, left: "16%", zIndex: 4, opacity: 0.9 }}
        className="hidden lg:flex"
      >
        <MedBottle color="linear-gradient(150deg,#fcd34d,#f59e0b,#d97706)" label="Rx" />
      </FloatingMed>

      {/* 6. Blister pack — bottom-right, partially clipped */}
      <FloatingMed
        label="Strip Pack"
        dir="up"
        duration={4.3}
        delay={1.8}
        rotate={0}
        initialDelay={0.6}
        style={{ bottom: 112, right: "13%", zIndex: 4, opacity: 0.88 }}
        className="hidden lg:flex"
      >
        <BlisterPack />
      </FloatingMed>

      {/* ── Center Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 py-20 max-w-[560px] w-full mx-auto">

        {/* Badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/25 px-4 py-1.5 rounded-full mb-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            Verified Pharmacy
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="show"
          className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 dark:text-white leading-[1.07] tracking-tight mb-4"
        >
          Your Health,
          <br />
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Reimagined.
          </span>
        </motion.h1>

        {/* Sub copy */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="show"
          className="text-slate-500 dark:text-slate-400 text-[13.5px] sm:text-sm leading-relaxed mb-5 max-w-[360px]"
        >
          Skip the queue. Access premium OTC medicines from certified sellers —
          delivered with care to your doorstep.
        </motion.p>

        {/* Role chips */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="show"
          className="flex items-center gap-2 flex-wrap justify-center mb-6"
        >
          {[
            { Icon: Users, label: "Buyers", desc: "50k+ patients" },
            { Icon: Home, label: "Sellers", desc: "500+ pharmacies" },
            { Icon: ShieldCheck, label: "Admin", desc: "Verified platform" },
          ].map(({ Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-black/[0.09] dark:border-white/[0.10] rounded-[9px] px-2.5 py-1.5"
            >
              <Icon className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="text-slate-800 dark:text-white text-[11px] font-semibold">{label}</span>
              <span className="text-slate-400 text-[10px]">·</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">{desc}</span>
            </div>
          ))}
        </motion.div>

        {/* Search bar — all business logic 100% preserved */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="show"
          className="w-full max-w-[420px] mb-6"
        >
          <div
            className="flex items-center bg-white/90 dark:bg-white/[0.05] backdrop-blur-md rounded-[14px] overflow-hidden transition-all duration-300"
            style={{
              border: `1.5px solid ${focused ? "#10b981" : "rgba(0,0,0,0.11)"}`,
              boxShadow: focused
                ? "0 0 0 3px rgba(16,185,129,0.14), 0 4px 24px rgba(0,0,0,0.08)"
                : "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            {/* Search icon */}
            <div className="pl-4 pr-2.5 flex items-center shrink-0">
              <Search
                className="w-4 h-4 transition-colors duration-200"
                style={{ stroke: focused ? "#10b981" : "#94a3b8" }}
              />
            </div>

            {/* Typewriter placeholder + real input overlay */}
            <div className="flex-1 h-[50px] relative">
              {/* Visible typewriter (shown only when input empty & not focused) */}
              {!query && !focused && (
                <div className="absolute inset-0 flex gap-3 items-center pointer-events-none select-none">
                  <span className="text-slate-400 text-[18px]">Search   </span>
                  <span className="text-slate-600 dark:text-slate-300 text-[18px] font-medium">{typed}</span>
                  <span
                    className="inline-block w-[2px] h-[16px] bg-emerald-500 ml-[1px] rounded-[1px] align-middle"
                    style={{ animation: "blink .9s step-end infinite" }}
                  />
                </div>
              )}
              {/* Real input (transparent text hidden behind typewriter, becomes visible on focus/type) */}
              <input
                className="absolute inset-0 w-full h-full bg-transparent outline-none border-none text-[13px] text-slate-800 dark:text-white placeholder:text-transparent"
                placeholder="Search medicines..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{ fontFamily: "inherit" }}
              />
            </div>

            {/* Divider */}
            <div className="w-px h-7 bg-black/[0.08] dark:bg-white/[0.10] shrink-0 mx-1" />

            {/* Search button — always visible in both themes */}
            <Button
              onClick={handleSearch}
              className="shrink-0 rounded-[10px] font-bold text-[13px] text-white border-0 transition-all duration-200 hover:brightness-110 active:scale-95 mr-1"
              style={{
                height: 38,
                paddingLeft: 20,
                paddingRight: 20,
                background: "linear-gradient(135deg,#10b981,#0d9488)",
                boxShadow: "0 4px 14px rgba(16,185,129,0.38)",
              }}
            >
              Search
            </Button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate="show"
          className="flex items-center"
        >
          {[
            { val: "50k+", label: "Happy patients" },
            { val: "12k+", label: "Products" },
            { val: "99.8%", label: "Order success" },
          ].map(({ val, label }, i) => (
            <div
              key={label}
              className={`px-4 ${i === 0 ? "pl-0" : "border-l border-black/[0.08] dark:border-white/[0.08]"}`}
            >
              <p className="text-slate-900 dark:text-white font-extrabold text-base leading-none tracking-tight">
                {val}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-[10.5px] mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* blink keyframe injected via style tag */}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}
