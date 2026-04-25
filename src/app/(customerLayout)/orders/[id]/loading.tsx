export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5 animate-pulse">

        {/* Back button */}
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />

        {/* Header */}
        <div className="rounded-3xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl px-6 py-6 space-y-4">
          <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-md" />

          <div className="flex gap-2 mt-3">
            <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-6 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 px-6 py-5">
          <div className="flex items-center justify-between">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 mb-2" />
                <div className="h-2 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 px-6 py-5 space-y-3">
          <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Items */}
        <div className="rounded-2xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 px-6 py-5 space-y-3">
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 px-4 py-4"
            >
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>

              <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 px-6 py-6 flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

      </div>
    </div>
  )
}