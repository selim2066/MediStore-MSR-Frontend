"use client";

import { useEffect, useRef } from "react";

export function BackgroundEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerp(current.current.x, mouse.current.x, 0.06);
      current.current.y = lerp(current.current.y, mouse.current.y, 0.06);

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${current.current.x}px ${current.current.y}px, rgba(16,185,129,0.07), rgba(99,102,241,0.04) 40%, transparent 70%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* ── Animated gradient base ── */}
      <div
        aria-hidden
        className="fixed inset-0 -z-30 bg-white dark:bg-slate-950"
      />
      <div
        aria-hidden
        className="fixed inset-0 -z-20 opacity-60 dark:opacity-40"
        style={{ animation: "gradientShift 18s ease infinite" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(125deg, #ffffff 0%, #ecfdf5 20%, #eff6ff 45%, #f5f3ff 70%, #f0fdf4 90%, #ffffff 100%)",
          }}
        />
      </div>

      {/* Dark mode gradient base */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 hidden dark:block opacity-80"
        style={{ animation: "gradientShiftDark 18s ease infinite" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(125deg, #020617 0%, #022c22 25%, #0f172a 50%, #1e1b4b 75%, #020617 100%)",
          }}
        />
      </div>

      {/* ── Blobs ── */}

      {/* Top-left emerald blob */}
      <div
        aria-hidden
        className="fixed -z-10 pointer-events-none"
        style={{
          top: "-10%",
          left: "-8%",
          width: "clamp(300px, 50vw, 700px)",
          height: "clamp(300px, 50vw, 700px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.28) 0%, rgba(5,150,105,0.12) 50%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blobFloat1 22s ease-in-out infinite",
        }}
      />

      {/* Center-right indigo blob */}
      <div
        aria-hidden
        className="fixed -z-10 pointer-events-none"
        style={{
          top: "25%",
          right: "-12%",
          width: "clamp(250px, 40vw, 580px)",
          height: "clamp(250px, 40vw, 580px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.10) 50%, transparent 70%)",
          filter: "blur(90px)",
          animation: "blobFloat2 28s ease-in-out infinite",
        }}
      />

      {/* Bottom-center blue blob */}
      <div
        aria-hidden
        className="fixed -z-10 pointer-events-none"
        style={{
          bottom: "-15%",
          left: "30%",
          width: "clamp(200px, 35vw, 500px)",
          height: "clamp(200px, 35vw, 500px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.20) 0%, rgba(16,185,129,0.08) 50%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blobFloat3 24s ease-in-out infinite",
        }}
      />

      {/* Small accent blob top-right */}
      <div
        aria-hidden
        className="fixed -z-10 pointer-events-none"
        style={{
          top: "5%",
          right: "20%",
          width: "clamp(120px, 18vw, 260px)",
          height: "clamp(120px, 18vw, 260px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "blobFloat1 16s ease-in-out infinite reverse",
        }}
      />

      {/* ── Noise texture overlay ── */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.028] dark:opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* ── Mouse spotlight ── */}
      <div
        ref={spotlightRef}
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none transition-none"
      />

      {/* ── Keyframes injected as a style tag ── */}
      <style>{`
        @keyframes gradientShift {
          0%   { opacity: 0.55; transform: scale(1)   rotate(0deg); }
          33%  { opacity: 0.65; transform: scale(1.02) rotate(1deg); }
          66%  { opacity: 0.60; transform: scale(0.99) rotate(-1deg); }
          100% { opacity: 0.55; transform: scale(1)   rotate(0deg); }
        }
        @keyframes gradientShiftDark {
          0%   { opacity: 0.75; }
          50%  { opacity: 0.90; }
          100% { opacity: 0.75; }
        }
        @keyframes blobFloat1 {
          0%   { transform: translate(0px, 0px)   scale(1); }
          25%  { transform: translate(30px, -40px) scale(1.05); }
          50%  { transform: translate(-20px, 30px) scale(0.97); }
          75%  { transform: translate(40px, 20px)  scale(1.03); }
          100% { transform: translate(0px, 0px)   scale(1); }
        }
        @keyframes blobFloat2 {
          0%   { transform: translate(0px, 0px)    scale(1); }
          30%  { transform: translate(-50px, 30px) scale(1.06); }
          60%  { transform: translate(30px, -40px) scale(0.96); }
          100% { transform: translate(0px, 0px)    scale(1); }
        }
        @keyframes blobFloat3 {
          0%   { transform: translate(0px, 0px)   scale(1); }
          40%  { transform: translate(40px, -30px) scale(1.04); }
          70%  { transform: translate(-30px, 20px) scale(0.98); }
          100% { transform: translate(0px, 0px)   scale(1); }
        }
      `}</style>
    </>
  );
}