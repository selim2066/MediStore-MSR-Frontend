// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background animate-in fade-in duration-300">

      {/* ── Hero skeleton ── */}
      <section className="py-16 md:py-24 flex flex-col items-center gap-4 px-4">
        <Bone className="w-36 h-6 rounded-full" />
        <Bone className="w-80 h-10 rounded-xl" delay={1} />
        <Bone className="w-60 h-10 rounded-xl" delay={2} />
        <Bone className="w-72 h-4 rounded-lg mt-1" delay={3} />
        <Bone className="w-52 h-4 rounded-lg" delay={4} />
        <div className="flex gap-3 mt-2">
          <Bone className="w-32 h-11 rounded-xl" delay={2} />
          <Bone className="w-28 h-11 rounded-xl" delay={3} />
        </div>
      </section>

      {/* ── Featured medicines skeleton ── */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 px-4">
        <div className="container mx-auto">

          {/* Section header */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <Bone className="w-52 h-7 rounded-lg" />
            <Bone className="w-80 h-4 rounded-lg" delay={1} />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 md:mx-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <MedicineCardSkeleton key={i} index={i} />
            ))}
          </div>

          {/* View all button */}
          <div className="flex justify-center mt-10">
            <Bone className="w-44 h-11 rounded-xl" delay={4} />
          </div>
        </div>
      </section>

      {/* ── Progress bar at bottom ── */}
      <ProgressBar />
    </div>
  );
}

/* ─── Bone: single shimmer block ─────────────────────── */
function Bone({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`bg-muted relative overflow-hidden ${className}`}
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      {/* Sweep shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
    </div>
  );
}

/* ─── Medicine card skeleton ──────────────────────────── */
function MedicineCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="rounded-3xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
      style={{
        opacity: 0,
        animation: `card-rise 0.5s ease forwards`,
        animationDelay: `${index * 70}ms`,
      }}
    >
      {/* Image area */}
      <div className="m-3 aspect-square rounded-2xl bg-muted relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-5 pb-2 flex flex-col gap-2.5">
        <Bone className="w-2/3 h-3 rounded" delay={index % 3} />
        <Bone className="w-full h-5 rounded-lg" delay={(index % 3) + 1} />
        <div className="flex items-center gap-2 mt-1">
          <Bone className="w-16 h-7 rounded-lg" delay={(index % 3) + 1} />
          <Bone className="w-10 h-4 rounded" delay={(index % 3) + 2} />
        </div>
      </div>

      {/* Button */}
      <div className="px-5 pb-5 pt-3">
        <Bone className="w-full h-12 rounded-xl" delay={(index % 3) + 2} />
      </div>
    </div>
  );
}

/* ─── Animated progress bar at bottom ────────────────── */
function ProgressBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-4 pt-2 bg-background/80 backdrop-blur-sm border-t border-border/40">
      <div className="w-48 h-[3px] rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-emerald-500 animate-[progress-sweep_2s_cubic-bezier(.4,0,.2,1)_infinite]" />
      </div>
      <div className="flex items-center gap-2">
        <span className="flex gap-1">
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </span>
        <span className="text-[11px] text-muted-foreground tracking-wide">
          Fetching medicines
        </span>
      </div>
    </div>
  );
}