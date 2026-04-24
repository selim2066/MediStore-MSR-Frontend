

// ! new

// "use client";

// import { useEffect, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// export function BackgroundEffects() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   // 🎯 Scroll-based parallax
//   const { scrollY } = useScroll();
//   const ySlow = useTransform(scrollY, [0, 1000], [0, 100]);
//   const yFast = useTransform(scrollY, [0, 1000], [0, -150]);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       {/* 🌗 Base Gradient */}
//       <div className="absolute inset-0 
//         bg-gradient-to-br 
//         from-slate-50 via-white to-emerald-50 
//         dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
//       />

//       {/* 🌟 Parallax Glow Blobs (Framer Motion) */}
//       <motion.div
//         style={{ y: ySlow }}
//         className="absolute top-[-20%] left-[10%] w-[50px] h-[50px]
//         bg-red-400/10 rounded-full blur-[120px]"
//       />

//       <motion.div
//         style={{ y: yFast }}
//         className="absolute bottom-[-20%] right-[10%] w-[50px] h-[50px]
//         bg-red-400/10 rounded-full blur-[120px]"
//       />

//       {/* 🌌 Dark mode extra depth */}
//       <motion.div
//         style={{ y: ySlow }}
//         className="hidden dark:block absolute top-[20%] left-[30%] w-[400px] h-[400px]
//         bg-purple-500/10 rounded-full blur-[100px]"
//       />

//       {/* 🧠 Mouse-follow glow
//       <motion.div
//         className="pointer-events-none absolute w-[50px] h-[500px]
//         bg-red-400/50 rounded-full blur-[80px]"
//         animate={{
//           x: position.x - 50,
//           y: position.y - 50,
//         }}
//         transition={{ type: "spring", stiffness: 50, damping: 20 }}
//       /> */}

//       {/* 🧩 Grid */}
//       <div className="absolute inset-0 opacity-[0.05] 
//         bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] 
//         bg-[size:100px_100px] 
//         dark:opacity-[0.06] 
//         dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
//       />

//       {/* 🎞️ Noise / Grain Overlay (Premium feel) */}
//       <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay
//         bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"
//       />
//     </div>
//   );
// }

// ! apple like dark mode
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
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 🌗 Base Gradient (FIXED) */}
      <div className="absolute inset-0 
        bg-gradient-to-br 
        from-slate-50 via-white to-emerald-50 
        dark:from-black dark:via-zinc-900 dark:to-black"
      />

      {/* 🌟 Large soft ambient blobs (FIXED SIZE) */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute top-[-20%] left-[10%] w-[400px] h-[400px]
        bg-emerald-400/5 rounded-full blur-[120px]"
      />

      <motion.div
        style={{ y: yFast }}
        className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px]
        bg-teal-400/5 rounded-full blur-[120px]"
      />

      {/* 🌌 Dark subtle depth (less aggressive) */}
      <motion.div
        style={{ y: ySlow }}
        className="hidden dark:block absolute top-[20%] left-[30%] w-[500px] h-[500px]
        bg-purple-500/5 rounded-full blur-[120px]"
      />

      {/* 🧩 Grid (VERY subtle now) */}
      <div className="absolute inset-0 opacity-[0.06] 
        bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] 
        bg-[size:80px_80px] 
        dark:opacity-[0.07] 
        dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
      />

      {/* 🎞️ Noise */}
      {/* <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-soft-light
        bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"
      /> */}
    </div>
  );
}