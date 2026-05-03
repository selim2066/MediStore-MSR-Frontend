// "use client";

// import { Button } from "@/components/ui/button";
// import type { Variants } from "framer-motion";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Search,
//   ShieldCheck,
//   Sparkles,
//   Truck,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";

// // ─────────────────────────────────────────────
// // TYPEWRITER (UNCHANGED)
// // ─────────────────────────────────────────────
// const MEDICINES = [
//   "Paracetamol 500mg",
//   "Amoxicillin 250mg",
//   "Vitamin D3",
//   "Omeprazole 20mg",
//   "Metformin 500mg",
//   "Cetirizine 10mg",
//   "Azithromycin 500mg",
// ];

// function useTypewriter() {
//   const [display, setDisplay] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const indexRef = useRef(0);
//   const charRef = useRef(0);

//   useEffect(() => {
//     let timeout: ReturnType<typeof setTimeout>;

//     const tick = () => {
//       const word = MEDICINES[indexRef.current];

//       if (!isDeleting) {
//         charRef.current++;
//         setDisplay(word.slice(0, charRef.current));

//         if (charRef.current === word.length) {
//           timeout = setTimeout(() => setIsDeleting(true), 1600);
//           return;
//         }
//       } else {
//         charRef.current--;
//         setDisplay(word.slice(0, charRef.current));

//         if (charRef.current === 0) {
//           setIsDeleting(false);
//           indexRef.current = (indexRef.current + 1) % MEDICINES.length;
//         }
//       }

//       timeout = setTimeout(tick, isDeleting ? 40 : 68);
//     };

//     timeout = setTimeout(tick, 68);
//     return () => clearTimeout(timeout);
//   }, [isDeleting]);

//   return display;
// }

// // ─────────────────────────────────────────────
// // HERO
// // ─────────────────────────────────────────────
// export function HeroSection() {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const [focused, setFocused] = useState(false);

//   const [mouse, setMouse] = useState({ x: 0, y: 0 });
//   const typed = useTypewriter();

//   // ✅ SEARCH LOGIC (UNCHANGED)
//   const handleSearch = () => {
//     const trimmed = query.trim();
//     router.push(
//       trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : "/shop"
//     );
//   };

//   const fadeUp: Variants = {
//     hidden: { opacity: 0, y: 24 },
//     show: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.1 },
//     }),
//   };

//   return (
//     <section
//       onMouseMove={(e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         setMouse({
//           x: (e.clientX - rect.left) / rect.width,
//           y: (e.clientY - rect.top) / rect.height,
//         });
//       }}
//       className="relative h-[85vh] flex items-center overflow-hidden"
//     >
//       {/* BACKGROUND */}
//       <div className="absolute inset-0 z-0">
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center scale-110"
//           style={{
//             backgroundImage: "url('/medistor-hero-section-img001.png')",
//           }}
//           animate={{
//             x: (mouse.x - 0.5) * 30,
//             y: (mouse.y - 0.5) * 30,
//           }}
//         />
//         <div className="absolute inset-0 bg-black/50" />
//       </div>

//       {/* ─────────────────────────────────────────────
//           SPLIT LAYOUT WRAPPER
//       ───────────────────────────────────────────── */}
//       <div className="relative z-10 w-full px-6">
//         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12">

//           {/* ───────────────── LEFT CONTENT ───────────────── */}
//           <div className="w-full lg:w-1/2 text-center lg:text-left max-w-[560px]">

//             {/* BADGES */}
//             <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
//               {[
//                 { icon: ShieldCheck, text: "Verified Medicines" },
//                 { icon: Truck, text: "Fast Delivery" },
//                 { icon: Sparkles, text: "AI Smart Search" },
//               ].map((b, i) => (
//                 <span
//                   key={i}
//                   className="flex items-center gap-1 text-xs px-3 py-1 rounded-full
//                   bg-white/10 border border-white/15 text-white backdrop-blur-md
//                   hover:scale-105 transition"
//                 >
//                   <b.icon className="w-3 h-3 text-emerald-400" />
//                   {b.text}
//                 </span>
//               ))}
//             </div>

//             {/* TITLE */}
//             <motion.h1
//               custom={1}
//               variants={fadeUp}
//               initial="hidden"
//               animate="show"
//               className="text-4xl lg:text-6xl font-extrabold text-white"
//             >
//               Your Health,
//               <br />
//               <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
//                 Reimagined
//               </span>
//             </motion.h1>

//             {/* SUBTITLE */}
//             <motion.p
//               custom={2}
//               variants={fadeUp}
//               initial="hidden"
//               animate="show"
//               className="text-gray-300 text-sm mt-4"
//             >
//               Premium medicines delivered fast & safely with intelligent search.
//             </motion.p>

//             {/* SEARCH */}
//             <motion.div
//               custom={3}
//               variants={fadeUp}
//               initial="hidden"
//               animate="show"
//               className="mt-6"
//             >
//               <div className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20">
//                 <div className="flex items-center px-3">
//                   <Search className="w-4 h-4 text-gray-300 mr-2" />

//                   <div className="flex-1 h-[48px] relative">
//                     {!query && !focused && (
//                       <div className="absolute inset-0 flex items-center text-gray-400 text-sm">
//                         Search {typed}
//                       </div>
//                     )}
//                     <input
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       onFocus={() => setFocused(true)}
//                       onBlur={() => setFocused(false)}
//                       onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                       className="absolute inset-0 w-full bg-transparent outline-none text-white text-sm"
//                     />
//                   </div>

//                   <Button
//                     onClick={handleSearch}
//                     className="h-9 px-4 text-sm font-semibold"
//                     style={{
//                       background: "linear-gradient(135deg,#10b981,#0d9488)",
//                     }}
//                   >
//                     Search
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* CTA */}
//             <div className="mt-5 flex gap-3 justify-center lg:justify-start">
//               <Button
//                 asChild
//                 className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold
//                 hover:scale-105 transition shadow-[0_0_20px_rgba(16,185,129,0.25)]"
//               >
//                 <Link href="/shop">
//                   Browse Shop <ArrowRight className="w-4 h-4 ml-1" />
//                 </Link>
//               </Button>

//               <Button asChild variant="ghost">
//                 <Link href="/about">Learn more</Link>
//               </Button>
//             </div>
//           </div>

//           {/* ───────────────── RIGHT VISUAL (LG ONLY) ───────────────── */}
//           <div className="hidden lg:flex w-1/2 justify-center items-center relative">
//             <div className="relative w-[420px] h-[420px]">

//               <motion.div
//                 animate={{ y: [0, -12, 0] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute top-10 left-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-white"
//               >
//                 💊 Paracetamol
//                 <p className="text-xs text-gray-300">Pain relief</p>
//               </motion.div>

//               <motion.div
//                 animate={{ y: [0, 12, 0] }}
//                 transition={{ duration: 5, repeat: Infinity }}
//                 className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-white"
//               >
//                 🧬 Vitamin D3
//                 <p className="text-xs text-gray-300">Immunity boost</p>
//               </motion.div>

//               <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* bottom fade */}
//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-background z-10" />
//     </section>
//   );
// }

"use client";

// src/components/module/home/hero-section.tsx
//
// Background stack (bottom → top):
//  [0] bg image  →  mouse-parallax (your existing logic, untouched)
//  [1] canvas    →  GSAP particle network (new animated layer)
//  [2] scrim     →  smart gradient overlay (replaces flat black/50)
//  [3] content   →  text, search, CTAs (all logic preserved)

import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/context/lenis-context";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ─── Blink keyframe ─────────────────────────────────────────────────────── */
const BLINK_CSS = `@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`;

/* ─── Typewriter (your original logic, untouched) ────────────────────────── */
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
  const charRef  = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = MEDICINES[indexRef.current];
      if (!isDeleting) {
        charRef.current++;
        setDisplay(word.slice(0, charRef.current));
        if (charRef.current === word.length) {
          timeout = setTimeout(() => setIsDeleting(true), 1600);
          return;
        }
      } else {
        charRef.current--;
        setDisplay(word.slice(0, charRef.current));
        if (charRef.current === 0) {
          setIsDeleting(false);
          indexRef.current = (indexRef.current + 1) % MEDICINES.length;
        }
      }
      timeout = setTimeout(tick, isDeleting ? 40 : 68);
    };
    timeout = setTimeout(tick, 68);
    return () => clearTimeout(timeout);
  }, [isDeleting]);

  return display;
}

/* ─── GSAP particle canvas ───────────────────────────────────────────────────
   Draws a glowing particle network on top of the bg image.
   Uses gsap.ticker → same RAF as Lenis, zero desync.
   Particles are white/emerald with low opacity so the image shows through.
─────────────────────────────────────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  baseOpacity: number;
  pulseOffset: number;
}

function useParticleCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COUNT     = Math.min(70, Math.floor((canvas.width * canvas.height) / 16000));
    const LINK_DIST = 150;
    const SPEED     = 0.22;

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:           Math.random() * canvas.width,
      y:           Math.random() * canvas.height,
      vx:          (Math.random() - 0.5) * SPEED * 2,
      vy:          (Math.random() - 0.5) * SPEED * 2,
      radius:      Math.random() * 1.6 + 0.7,
      baseOpacity: Math.random() * 0.45 + 0.2,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    let elapsed = 0;

    const onTick = (_time: number, dt: number) => {
      elapsed += dt * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20)                 p.x = canvas.width  + 20;
        if (p.x > canvas.width  + 20)  p.x = -20;
        if (p.y < -20)                 p.y = canvas.height + 20;
        if (p.y > canvas.height + 20)  p.y = -20;
      }

      // Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > LINK_DIST) continue;
          const alpha = (1 - dist / LINK_DIST) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Dots
      for (const p of particles) {
        const pulse = Math.sin(elapsed * 1.4 + p.pulseOffset) * 0.12;
        const alpha = Math.max(0, Math.min(1, p.baseOpacity + pulse));

        // Glow ring
        if (p.radius > 1.4) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          g.addColorStop(0, `rgba(52,211,153,${alpha * 0.35})`);
          g.addColorStop(1, "rgba(52,211,153,0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
    };

    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
      ro.disconnect();
    };
  }, [ref]);
}

/* ─── Framer variants ────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

/* ─── Floating info card (right panel) ───────────────────────────────────── */
function FloatCard({
  emoji, title, sub, delay, yDir = "up", className = "",
}: {
  emoji: string; title: string; sub: string;
  delay: number; yDir?: "up" | "down"; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: yDir === "up" ? [0, -10, 0] : [0, 10, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y:       { duration: yDir === "up" ? 4 : 5, delay: delay + 0.2, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`
        absolute flex items-center gap-3 px-4 py-3
        bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        ${className}
      `}
    >
      <span className="text-2xl leading-none">{emoji}</span>
      <div>
        <p className="text-white text-[13px] font-bold leading-none">{title}</p>
        <p className="text-gray-300 text-[11px] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
export function HeroSection() {
  // ── Business logic (UNCHANGED from your original) ──────────────────────
  const router = useRouter();
  const [query,   setQuery]   = useState("");
  const [focused, setFocused] = useState(false);
  const [mouse,   setMouse]   = useState({ x: 0, y: 0 });

  const handleSearch = () => {
    const trimmed = query.trim();
    router.push(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : "/shop");
  };
  // ── End business logic ──────────────────────────────────────────────────

  const typed     = useTypewriter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <>
      <style>{BLINK_CSS}</style>

      <section
        onMouseMove={(e) => {
          // Your original mouse parallax logic — unchanged
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: (e.clientX - rect.left)  / rect.width,
            y: (e.clientY - rect.top)   / rect.height,
          });
        }}
        className="relative overflow-hidden"
        style={{ height: "65vh", minHeight: 560 }}
      >

        {/* ── [0] Background image + mouse parallax (your original) ─────── */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: "url('/medistor-hero-section-img001.png')" }}
            animate={{
              x: (mouse.x - 0.5) * 28,
              y: (mouse.y - 0.5) * 28,
            }}
            transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.8 }}
          />
        </div>

        {/* ── [1] GSAP particle canvas ──────────────────────────────────── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />

        {/* ── [2] Smart overlay scrim ───────────────────────────────────── */}
        {/* Replaces flat black/50 with a 3-layer gradient:
            - left side darker → text legibility
            - bottom fade → blends into page
            - top subtle vignette → cinematic feel */}
        <div className="absolute inset-0 z-[2]"
          style={{
            background: `
              linear-gradient(
                to right,
                rgba(0,0,0,0.72) 0%,
                rgba(0,0,0,0.52) 45%,
                rgba(0,0,0,0.22) 100%
              )
            `,
          }}
        />
        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 inset-x-0 h-36 z-[2]"
          style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }} />
        {/* Top vignette */}
        <div className="absolute top-0 inset-x-0 h-24 z-[2]"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)" }} />
        {/* Emerald ambient tint — bottom-left */}
        <div className="absolute z-[2] rounded-full pointer-events-none"
          style={{ bottom: "-10%", left: "-5%", width: 480, height: 480,
            background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)",
            filter: "blur(60px)" }} />

        {/* ── [3] Content ───────────────────────────────────────────────── */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12">

              {/* ── Left: copy + search ─────────────────────────────────── */}
              <div className="w-full lg:w-[52%] text-center lg:text-left">

                {/* Badge row */}
                <motion.div
                  custom={0} variants={fadeUp} initial="hidden" animate="show"
                  className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5"
                >
                  {[
                    { icon: ShieldCheck, text: "Verified Medicines" },
                    { icon: Truck,       text: "Fast Delivery"      },
                    { icon: Sparkles,    text: "AI Smart Search"    },
                  ].map(({ icon: Icon, text }) => (
                    <span key={text}
                      className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/15 hover:border-white/30 transition-all duration-200 cursor-default">
                      <Icon className="w-3 h-3 text-emerald-400 shrink-0" />
                      {text}
                    </span>
                  ))}
                </motion.div>

                {/* Headline */}
                <motion.h1
                  custom={1} variants={fadeUp} initial="hidden" animate="show"
                  className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.07] tracking-tight mb-4"
                >
                  Your Health,
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Reimagined.
                  </span>
                </motion.h1>

                {/* Sub copy */}
                <motion.p
                  custom={2} variants={fadeUp} initial="hidden" animate="show"
                  className="text-gray-300 text-[13.5px] sm:text-sm leading-relaxed mb-6 max-w-[400px] mx-auto lg:mx-0"
                >
                  Premium medicines delivered fast & safely.
                  Powered by intelligent AI search — skip the queue, get what you need.
                </motion.p>

                {/* Search bar */}
                <motion.div
                  custom={3} variants={fadeUp} initial="hidden" animate="show"
                  className="mb-5 max-w-[460px] mx-auto lg:mx-0"
                >
                  <div
                    className="flex items-center rounded-[14px] overflow-hidden backdrop-blur-xl border transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      borderColor: focused ? "rgba(16,185,129,0.7)" : "rgba(255,255,255,0.2)",
                      boxShadow:   focused
                        ? "0 0 0 3px rgba(16,185,129,0.2), 0 8px 32px rgba(0,0,0,0.3)"
                        : "0 8px 32px rgba(0,0,0,0.25)",
                    }}
                  >
                    {/* Icon */}
                    <div className="pl-4 pr-2 flex items-center shrink-0">
                      <Search className="w-4 h-4 transition-colors duration-200"
                        style={{ stroke: focused ? "#10b981" : "#94a3b8" }} />
                    </div>

                    {/* Typewriter + input */}
                    <div className="flex-1 h-[50px] relative">
                      {!query && !focused && (
                        <div className="absolute inset-0 flex items-center pointer-events-none select-none">
                          <span className="text-gray-400 text-[13px]">Search&nbsp;</span>
                          <span className="text-gray-200 text-[13px] font-medium">{typed}</span>
                          <span className="inline-block w-[2px] h-[14px] bg-emerald-400 ml-[1px] rounded-[1px]"
                            style={{ animation: "blink .9s step-end infinite" }} />
                        </div>
                      )}
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="absolute inset-0 w-full h-full bg-transparent outline-none border-none text-white text-[13px] placeholder:text-transparent"
                        placeholder="Search medicines..."
                      />
                    </div>

                    <div className="w-px h-7 bg-white/15 shrink-0 mx-1" />

                    <Button
                      onClick={handleSearch}
                      className="shrink-0 rounded-[10px] font-bold text-[13px] text-white border-0 mr-1 transition-all hover:brightness-110 active:scale-95"
                      style={{ height: 38, paddingInline: 20, background: "linear-gradient(135deg,#10b981,#0d9488)", boxShadow: "0 4px 14px rgba(16,185,129,0.4)" }}
                    >
                      Search
                    </Button>
                  </div>
                </motion.div>

                {/* CTA row */}
                <motion.div
                  custom={4} variants={fadeUp} initial="hidden" animate="show"
                  className="flex gap-3 justify-center lg:justify-start flex-wrap"
                >
                  <Button asChild
                    className="font-semibold gap-2 shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:shadow-[0_0_32px_rgba(16,185,129,0.45)] transition-shadow"
                    style={{ background: "linear-gradient(135deg,#10b981,#0d9488)", color: "#fff" }}>
                    <Link href="/shop">
                      Browse Shop <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost"
                    className="text-white border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all">
                    <Link href="/about">Learn more</Link>
                  </Button>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                  custom={5} variants={fadeUp} initial="hidden" animate="show"
                  className="mt-6 flex items-center gap-0 justify-center lg:justify-start"
                >
                  {[
                    { val: "50k+",  label: "Patients"       },
                    { val: "12k+",  label: "Products"        },
                    { val: "99.8%", label: "Success rate"    },
                  ].map(({ val, label }, i) => (
                    <div key={label}
                      className={`px-4 ${i === 0 ? "pl-0" : "border-l border-white/15"}`}>
                      <p className="text-white font-extrabold text-base leading-none">{val}</p>
                      <p className="text-gray-400 text-[10.5px] mt-1">{label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── Right: floating glass cards (desktop only) ──────────── */}
              <div className="hidden lg:block relative w-[42%] h-[340px] shrink-0">

                {/* Center emerald glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)", filter: "blur(32px)" }} />
                </div>

                {/* Card 1 — top left */}
                <FloatCard emoji="💊" title="Paracetamol 500mg" sub="Pain & fever relief"
                  delay={0.5} yDir="up" className="top-4 left-0" />

                {/* Card 2 — top right */}
                <FloatCard emoji="🧬" title="Vitamin D3 1000IU" sub="Immunity boost"
                  delay={0.7} yDir="down" className="top-12 right-0" />

                {/* Card 3 — middle */}
                <FloatCard emoji="🛡️" title="Verified Quality" sub="All medicines certified"
                  delay={0.9} yDir="up" className="top-1/2 -translate-y-1/2 left-8" />

                {/* Card 4 — bottom right */}
                <FloatCard emoji="🚀" title="24h Delivery" sub="Most orders next-day"
                  delay={1.1} yDir="down" className="bottom-4 right-4" />

                {/* Decorative particles (CSS only — static, no GSAP needed) */}
                {[
                  { top: "18%", left: "55%", size: 5, color: "#10b981", delay: "0s" },
                  { top: "68%", left: "30%", size: 3, color: "#06b6d4", delay: "0.8s" },
                  { top: "40%", left: "78%", size: 4, color: "#8b5cf6", delay: "1.4s" },
                  { top: "80%", left: "62%", size: 3, color: "#10b981", delay: "0.4s" },
                ].map((dot, i) => (
                  <div key={i}
                    className="absolute rounded-full"
                    style={{
                      top: dot.top, left: dot.left,
                      width: dot.size, height: dot.size,
                      background: dot.color,
                      boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
                      animation: `pulse 2.5s ease-in-out infinite`,
                      animationDelay: dot.delay,
                    }}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────── */}
        <motion.button
          onClick={() => getLenis()?.scrollTo(window.innerHeight * 0.65, { duration: 1.2 })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 2, duration: 0.6 },
            y:       { delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
        </motion.button>

      </section>
    </>
  );
}