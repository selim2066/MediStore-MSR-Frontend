import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { medicineService } from "@/service/medicine.service";
import { Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ArrowRight, PackageCheck, Search, ShoppingCart } from "lucide-react";

const BRAND_COLORS = [
  {
    light: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(16,185,129,0.35)",
    stop1: "#10b981",
    stop2: "#06b6d4",
  },
  {
    light: "bg-sky-50 dark:bg-sky-950",
    text: "text-sky-600 dark:text-sky-400",
    glow: "rgba(14,165,233,0.35)",
    stop1: "#0ea5e9",
    stop2: "#6366f1",
  },
  {
    light: "bg-violet-50 dark:bg-violet-950",
    text: "text-violet-600 dark:text-violet-400",
    glow: "rgba(139,92,246,0.35)",
    stop1: "#8b5cf6",
    stop2: "#ec4899",
  },
];

function getBrandColor(index: number) {
  return BRAND_COLORS[index % BRAND_COLORS.length];
}

export async function FeaturedMedicinesSection() {
  const { data, error } = await medicineService.getMedicines(
    { limit: "8" },
    { revalidate: 60 },
  );

  const medicines = !error && data?.data?.data?.length ? data.data.data : [];

  return (
    <section className="py-10 md:py-5 md:px-10 lg:px-18 relative overflow-hidden bg-[#f0fdf8] dark:bg-[#040a13]">
      {/* ───────── BACKGROUND SYSTEM  ───────── */}

      {/* ───────── BACKGROUND SYSTEM (REFINED) ───────── */}

      {/* Light grid */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-0"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
    `,
          backgroundSize: "77px 77px",
        }}
      />

      {/* Dark grid */}
      <div
        className="absolute inset-0 hidden dark:block opacity-[0.08]"
        style={{
          backgroundImage: `
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
    `,
          backgroundSize: "77px 77px",
        }}
      />

      {/* Glow blobs (same design, slightly softer) */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.10), transparent 70%)",
        }}
      />

      {/* top line */}
     

      {/* square grid */}
      <div
        className="absolute inset-0 opacity-[1.035] dark:opacity-[1.06]"
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
          backgroundSize: "177px 177px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER */}
        <ScrollReveal className="flex justify-center items-center mb-14">
          <div className="text-center ">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-md font-semibold px-4 py-1.5 rounded-full mb-5 ">
              <Sparkles className="w-3.5 h-3.5" />
              Handpicked for You
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Medicines
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.map((medicine, index) => {
            const color = getBrandColor(index);

            return (
              <ScrollReveal key={medicine.id} delay={index * 60}>
                <Link href={`/shop/${medicine.id}`} className="block">
                  {/* BORDER WRAPPER */}
                  <div
                    className="med-border-shell group"
                    style={
                      {
                        "--c1": color.stop1,
                        "--c2": color.stop2,
                      } as React.CSSProperties
                    }
                  >
                    {/* CARD */}
                    <div className="med-card-lift rounded-[20px] bg-white dark:bg-[#0d1117] overflow-hidden border border-slate-100 dark:border-slate-800 med-noise">
                      {/* IMAGE */}
                      <div className="relative h-56 overflow-hidden">
                        <div className={`absolute inset-0 ${color.light}`} />

                        <div
                          className="med-radial-glow absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at center, ${color.glow}, transparent 70%)`,
                          }}
                        />

                        <img
                          src={medicine.image || "/medicine01 blue.avif"}
                          className="med-img-zoom w-full h-full object-contain relative z-10 p-4"
                        />

                        {index % 3 === 0 && (
                          <div className="med-badge-anim absolute top-3 left-3 z-20">
                            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-4 relative z-10">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                          {medicine.name}
                        </h3>

                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-slate-400">
                            {medicine.manufacturer}
                          </span>

                          <span className={`font-bold text-sm ${color.text}`}>
                            ৳{medicine.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="py-5 flex justify-center items-center">
           <Link
            href="/shop"
            className="
              group relative inline-flex items-center gap-2.5
              px-7 py-3.5 rounded-xl
              font-bold text-sm text-white
              transition-all duration-200
              hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/25
              active:scale-[0.98]
              overflow-hidden text-center justify-center
            "
            style={{
              background: "linear-gradient(135deg,#059669,#10b981 60%,#2dd4bf)",
            }}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>

        </div>
        
      </div>
    </section>
  );
}
