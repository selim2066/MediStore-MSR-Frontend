export default function Loading() {
  return (
    <div className="min-h-screen relative animate-pulse">
      {/* Background vibe (same as your UI) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-emerald-50/20 dark:from-slate-900 dark:to-slate-800" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-32">
        {/* Back button skeleton */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT - IMAGE */}
          <div className="aspect-square rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-transparent dark:from-emerald-500/10" />

            {/* floating glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2/3 h-2/3 rounded-full bg-emerald-300/20 blur-3xl" />
            </div>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="flex flex-col gap-6">
            {/* Category pill */}
            <div className="h-6 w-28 rounded-full bg-emerald-200/40 dark:bg-emerald-500/10" />

            {/* Title */}
            <div className="space-y-3">
              <div className="h-8 w-full rounded-xl bg-slate-200 dark:bg-white/10" />
              <div className="h-5 w-2/3 rounded-lg bg-slate-200 dark:bg-white/10" />
            </div>

            {/* Price */}
            <div className="h-10 w-40 rounded-lg bg-emerald-200/40 dark:bg-emerald-500/10" />

            {/* Description */}
            <div className="rounded-2xl p-5 bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
              <div className="h-4 w-full bg-slate-200 dark:bg-white/10 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-white/10 rounded" />
              <div className="h-4 w-4/6 bg-slate-200 dark:bg-white/10 rounded" />
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <div className="h-12 flex-1 rounded-xl bg-emerald-200/40 dark:bg-emerald-500/10" />
              <div className="h-12 flex-1 rounded-xl bg-slate-200 dark:bg-white/10" />
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-14 rounded-3xl p-6 bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-4">
          <div className="h-6 w-48 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-4/6 rounded bg-slate-200 dark:bg-white/10" />
        </div>

        {/* RELATED */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10"
            >
              <div className="aspect-[4/3] bg-slate-200 dark:bg-white/10" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-white/10" />
                <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
                <div className="h-6 w-24 rounded bg-emerald-200/40 dark:bg-emerald-500/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}