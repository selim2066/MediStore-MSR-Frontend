


// // ! apple like dark mode
// "use client";

// import { useEffect, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// export function BackgroundEffects() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const { scrollY } = useScroll();
//   const ySlow = useTransform(scrollY, [0, 1000], [0, 80]);
//   const yFast = useTransform(scrollY, [0, 1000], [0, -120]);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       {/* 🌗 Base Gradient (FIXED) */}
//       <div className="absolute inset-0 
//         bg-gradient-to-br 
//         from-slate-50 via-white to-emerald-50 
//         dark:from-black dark:via-zinc-900 dark:to-black"
//       />

//       {/* 🌟 Large soft ambient blobs (FIXED SIZE) */}
//       <motion.div
//         style={{ y: ySlow }}
//         className="absolute top-[-20%] left-[10%] w-[400px] h-[400px]
//         bg-emerald-400/5 rounded-full blur-[120px]"
//       />

//       <motion.div
//         style={{ y: yFast }}
//         className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px]
//         bg-teal-400/5 rounded-full blur-[120px]"
//       />

//       {/* 🌌 Dark subtle depth (less aggressive) */}
//       <motion.div
//         style={{ y: ySlow }}
//         className="hidden dark:block absolute top-[20%] left-[30%] w-[500px] h-[500px]
//         bg-purple-500/5 rounded-full blur-[120px]"
//       />

//       {/* 🧩 Grid (VERY subtle now) */}
//       <div className="absolute inset-0 opacity-[0.06] 
//         bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] 
//         bg-[size:80px_80px] 
//         dark:opacity-[0.07] 
//         dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
//       />

//       {/* 🎞️ Noise */}
//       {/* <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-soft-light
//         bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"
//       /> */}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundEffects() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 1000], [0, 80]);
  const yFast = useTransform(scrollY, [0, 1000], [0, -120]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* 🌗 BASE LAYER (REFINED + MATCH HERO) */}
      <div className="absolute inset-0 bg-gradient-to-br
        from-slate-50 via-white to-emerald-50
        dark:from-black dark:via-zinc-900 dark:to-black" />

      {/* 🧠 HERO-ALIGNED FOCUS GLOW (NEW) */}
      <div
        className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          background: `radial-gradient(
            700px circle at ${position.x * 100}% ${position.y * 100}%,
            rgba(16,185,129,0.18),
            transparent 45%
          )`,
        }}
      />

      {/* 🌌 PRIMARY ENERGY BLOBS (SOFTER + CONTROLLED) */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute top-[-15%] left-[5%] w-[520px] h-[520px]
        bg-emerald-400/10 dark:bg-emerald-400/5
        rounded-full blur-[140px]"
      />

      <motion.div
        style={{ y: yFast }}
        className="absolute bottom-[-20%] right-[5%] w-[520px] h-[520px]
        bg-teal-400/10 dark:bg-teal-400/5
        rounded-full blur-[140px]"
      />

      {/* 🧬 SECONDARY DEPTH LAYER (PURPLE REMOVED → CLEAN AI TONE) */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute top-[25%] left-[35%] w-[600px] h-[600px]
        bg-cyan-400/5 dark:bg-cyan-400/3
        rounded-full blur-[160px]"
      />

      {/* 🧩 GRID (NOW ULTRA SUBTLE = PREMIUM FEEL) */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]
        bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        bg-[size:190px_190px]
        dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
      />

      {/* 🌫️ DEPTH VIGNETTE (FOCUS HERO CENTER) */}
      <div className="absolute inset-0
        bg-radial-gradient(from transparent, transparent 40%, rgba(0,0,0,0.2))"
      />

    </div>
  );
}