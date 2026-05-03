"use client";

// ─── Brand data ────────────────────────────────────────────────────────────────
const BRANDS = [
  { name: "Square Pharma",     abbr: "SQ",  color: "#0284c7", bg: "bg-sky-500/10" },
  { name: "Beximco Pharma",    abbr: "BX",  color: "#059669", bg: "bg-emerald-500/10" },
  { name: "ACME Labs",         abbr: "AC",  color: "#7c3aed", bg: "bg-violet-500/10" },
  { name: "Incepta Pharma",    abbr: "IN",  color: "#dc2626", bg: "bg-rose-500/10" },
  { name: "Renata Ltd",        abbr: "RN",  color: "#d97706", bg: "bg-amber-500/10" },
  { name: "ACI Limited",       abbr: "ACI", color: "#0d9488", bg: "bg-teal-500/10" },
  { name: "Opsonin Pharma",    abbr: "OP",  color: "#2563eb", bg: "bg-blue-500/10" },
  { name: "General Pharma",    abbr: "GP",  color: "#16a34a", bg: "bg-green-500/10" },
  { name: "Novo Nordisk",      abbr: "NN",  color: "#0369a1", bg: "bg-sky-600/10" },
  { name: "Sanofi BD",         abbr: "SF",  color: "#9333ea", bg: "bg-purple-500/10" },
  { name: "Ibn Sina Pharma",   abbr: "IS",  color: "#15803d", bg: "bg-green-600/10" },
  { name: "Healthcare Pharma", abbr: "HC",  color: "#b45309", bg: "bg-amber-600/10" },
];

const TRACK = [...BRANDS, ...BRANDS];

// ─── Brand pill ────────────────────────────────────────────────────────────────
function BrandPill({ brand }: { brand: (typeof BRANDS)[number] }) {
  return (
    <div
      className="
        flex-shrink-0 flex items-center gap-3
        px-5 py-3.5 rounded-xl mx-2.5
        bg-white/70 dark:bg-white/[0.04]
        border border-black/[0.07] dark:border-white/[0.07]
        backdrop-blur-sm
        hover:border-emerald-300/40 dark:hover:border-emerald-700/30
        hover:-translate-y-0.5 hover:shadow-lg
        transition-all duration-200 ease-out
        group cursor-default select-none
      "
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${brand.bg}`}
        style={{ color: brand.color }}
      >
        {brand.abbr}
      </div>
      <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-200 whitespace-nowrap">
        {brand.name}
      </span>
    </div>
  );
}

// ─── Marquee row ────────────────────────────────────────────────────────────────
function MarqueeRow({ reverse = false, speed = 40 }: { reverse?: boolean; speed?: number }) {
  const animName = reverse ? "marquee-rev" : "marquee-fwd";
  return (
    <div className="relative flex overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#f0fdf8] dark:from-[#020810] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#f0fdf8] dark:from-[#020810] to-transparent" />
      <div
        className="flex"
        style={{ animation: `${animName} ${speed}s linear infinite`, willChange: "transform" }}
      >
        {TRACK.map((brand, i) => (
          <BrandPill key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function BrandsSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]">
      <style>{`
        @keyframes marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-play-state: paused !important; }
        }
      `}</style>

      {/* ── Background system ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.635] dark:opacity-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%", left: "30%", width: 500, height: 300,
            background: "radial-gradient(ellipse,rgba(16,185,129,0.10),transparent 70%)",
            filter: "blur(70px)",
          }}
        />
       
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
              Our Partners
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            <span className="text-slate-900 dark:text-white">Medicines from </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#059669,#10b981 50%,#34d399)" }}
            >
              trusted brands
            </span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            We partner exclusively with licensed pharmaceutical companies to ensure every product meets the highest standards.
          </p>
        </div>

        {/* Marquee rows */}
        <div className="space-y-4">
          <MarqueeRow reverse={false} speed={38} />
          <MarqueeRow reverse={true} speed={44} />
        </div>

        {/* Bottom badges */}
        <div className="flex justify-center gap-4 mt-10 px-4 flex-wrap">
          {[
            { val: "12+",  label: "Partner brands" },
            { val: "100%", label: "Licensed sellers" },
            { val: "DGDA", label: "Compliant products" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm"
            >
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{item.val}</span>
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}