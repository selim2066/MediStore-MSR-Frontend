"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────── data ─────────────────────────── */

const REVIEWS = [
  {
    id: 1,
    name: "Dr. Shafiul Islam",
    role: "General Physician",
    text: "MediStore delivered my insulin on time every single month. The interface is clean and ordering is effortless. I never have to worry about running out of medication.",
    stars: 5,
    init: "F",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    name: "Dr. Rafiqul Islam",
    role: "General Physician",
    text: "I recommend MediStore to my patients constantly. The medicine catalogue is comprehensive, prices are fair, and delivery is reliable. A genuinely trustworthy platform.",
    stars: 5,
    init: "R",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400",
  },
  {
    id: 3,
    name: "Hasibul Hasan",
    role: "Father of 1 Child",
    text: "Found my son's prescription medicine that was unavailable everywhere locally. Got it within 24 hours. The customer support was also incredibly helpful throughout.",
    stars: 5,
    init: "T",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-400",
  },
  {
    id: 4,
    name: "Rumon Khan",
    role: "Alsar Patient",
    text: "Managing a chronic condition means I order every month. MediStore has never let me down — right dose, right brand, right time. Absolutely dependable service.",
    stars: 5,
    init: "M",
    color:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
  },
  {
    id: 5,
    name: "Mehedi Maruf",
    role: "Senior Citizen",
    text: "My children set this up for me and I love it. Very easy to use, medicines arrive properly packaged and on time. I trust MediStore completely for my daily needs.",
    stars: 5,
    init: "N",
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
  },
  {
    id: 6,
    name: "Ismail Hossain",
    role: "Verified Buyer",
    text: "Fast delivery, authentic medicines, and great prices. I compared costs with local pharmacies — MediStore saves me about 20% every month. Highly recommended.",
    stars: 4,
    init: "S",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400",
  },
] as const;

const STATS = [
  { value: "4.9★", label: "Avg Rating" },
  { value: "12k+", label: "Customers" },
  { value: "98%", label: "Satisfaction" },
];

/* ─────────────────────────── sub-components ─────────────────────────── */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-[15px] h-[15px] ${
            i < count ? "text-amber-400" : "text-slate-200 dark:text-slate-700"
          }`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  style,
}: {
  review: (typeof REVIEWS)[number];
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className="
        group relative flex flex-col
        bg-white/90 dark:bg-slate-900/80
        border border-slate-200/80 dark:border-slate-700/50
        rounded-[20px] p-6 overflow-hidden
        hover:-translate-y-1.5 hover:border-emerald-300/60 dark:hover:border-emerald-700/50
        hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/20
        transition-all duration-300 ease-out
        backdrop-blur-sm
        select-none
      "
    >
      {/* Big quotation mark */}
      <span
        className="
          absolute top-4 right-4
          text-[52px] leading-none font-black
          text-emerald-500/10 dark:text-emerald-400/10
          font-serif pointer-events-none
        "
      >
        &quot;
      </span>

      {/* Stars */}
      <Stars count={review.stars} />

      {/* Review text */}
      <p className="mt-4 mb-6 text-[13.5px] leading-[1.75] text-slate-600 dark:text-slate-400 font-normal flex-1 min-h-[80px]">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-slate-100 via-slate-200/60 to-transparent dark:from-slate-800 dark:via-slate-700/40 dark:to-transparent mb-4" />

      {/* Author row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${review.color}`}
        >
          {review.init}
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">
            {review.name}
          </p>
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 truncate mt-0.5">
            {review.role}
          </p>
        </div>

        {/* Verified badge */}
        <div className="ml-auto flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-[9px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          <span>✓</span>
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── main component ─────────────────────────── */

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);

  const maxIndex = Math.max(0, REVIEWS.length - perView);

  /* ── responsive perView ── */
  useEffect(() => {
    const update = () => {
      const w = viewportRef.current?.offsetWidth ?? window.innerWidth;
      setPerView(w < 480 ? 1 : w < 768 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── auto-play ── */
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, 4200);
  }, [maxIndex]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [startAuto]);

  /* ── slide track offset ── */
  useEffect(() => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0] as HTMLElement | undefined;
    if (!card) return;
    const cardW = card.offsetWidth;
    const gap = 18;
    trackRef.current.style.transform = `translateX(-${current * (cardW + gap)}px)`;
  }, [current, perView]);

  const slide = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((c) => Math.max(0, Math.min(maxIndex, c + dir)));
      startAuto();
      setTimeout(() => setIsAnimating(false), 420);
    },
    [isAnimating, maxIndex, startAuto],
  );

  const goTo = (i: number) => {
    setCurrent(Math.min(i, maxIndex));
    startAuto();
  };

  /* ── touch ── */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) slide(dx < 0 ? 1 : -1);
  };

  const dotCount = maxIndex + 1;

  return (
    <section className="relative py-20 overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]">
      {/* ── Square grid — light ── */}
      <div
        className="absolute inset-0 opacity-[0.635] dark:opacity-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
          backgroundSize: "77px 77px",
        }}
      />

      {/* ── Square grid — dark ── */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "77px 77px",
        }}
      />

      {/* ── Glow blobs ── */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] rounded-full blur-[90px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full blur-[90px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.12), transparent 70%)",
        }}
      />

      {/* ── Top edge line ── */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
              Trusted by Patients
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08]">
            <span className="text-slate-900 dark:text-white">What Our </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #059669, #10b981 50%, #34d399)",
              }}
            >
              Customers
            </span>
            <span className="text-slate-900 dark:text-white"> Say</span>
          </h2>

          <p className="mt-4 text-base text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
            Real experiences from real people who trust MediStore for their
            healthcare needs.
          </p>
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Viewport */}
          <div
            ref={viewportRef}
            className="overflow-hidden rounded-2xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex gap-[18px] transition-transform duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform"
            >
              {REVIEWS.map((review) => {
                const cardPct =
                  perView === 1
                    ? "100%"
                    : perView === 2
                      ? "calc(50% - 9px)"
                      : "calc(33.333% - 12px)";
                return (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    style={{ flex: `0 0 ${cardPct}`, minWidth: 0 }}
                  />
                );
              })}
            </div>
          </div>

          {/* Prev button */}
          <button
            onClick={() => slide(-1)}
            disabled={current === 0}
            aria-label="Previous reviews"
            className="
              absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              shadow-md shadow-slate-200/50 dark:shadow-slate-950/50
              flex items-center justify-center
              text-slate-500 dark:text-slate-400
              hover:border-emerald-300 dark:hover:border-emerald-700
              hover:text-emerald-600 dark:hover:text-emerald-400
              hover:bg-emerald-50 dark:hover:bg-emerald-950/30
              active:scale-90
              disabled:opacity-30 disabled:pointer-events-none
              transition-all duration-200
            "
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next button */}
          <button
            onClick={() => slide(1)}
            disabled={current >= maxIndex}
            aria-label="Next reviews"
            className="
              absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              shadow-md shadow-slate-200/50 dark:shadow-slate-950/50
              flex items-center justify-center
              text-slate-500 dark:text-slate-400
              hover:border-emerald-300 dark:hover:border-emerald-700
              hover:text-emerald-600 dark:hover:text-emerald-400
              hover:bg-emerald-50 dark:hover:bg-emerald-950/30
              active:scale-90
              disabled:opacity-30 disabled:pointer-events-none
              transition-all duration-200
            "
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Dots ── */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                h-2 rounded-full border-none cursor-pointer
                transition-all duration-300 ease-out
                ${
                  i === current
                    ? "w-6 bg-emerald-500"
                    : "w-2 bg-slate-200 dark:bg-slate-700 hover:bg-emerald-300 dark:hover:bg-emerald-700"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
