export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-pulse">

        {/* HEADER */}
        <div className="space-y-3">
          <div className="h-8 w-48 bg-zinc-200/70 dark:bg-zinc-800 rounded-xl" />
          <div className="h-4 w-72 bg-zinc-200/60 dark:bg-zinc-800/70 rounded-lg" />
        </div>

        {/* EMPTY STATE PLACEHOLDER (hidden by real UI later) */}
        <div className="space-y-4">

          {/* ORDER CARDS */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md p-5"
            >
              
              <div className="flex items-center justify-between gap-4 flex-wrap">

                {/* LEFT */}
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-zinc-200/70 dark:bg-zinc-800 rounded-md" />
                  <div className="h-3 w-40 bg-zinc-200/50 dark:bg-zinc-800/60 rounded-md" />
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                  {/* PRICE */}
                  <div className="h-5 w-20 bg-zinc-200/70 dark:bg-zinc-800 rounded-md" />

                  {/* STATUS BADGE */}
                  <div className="h-6 w-24 bg-zinc-200/60 dark:bg-zinc-800 rounded-full" />

                  {/* ARROW */}
                  <div className="w-8 h-8 bg-zinc-200/60 dark:bg-zinc-800 rounded-xl" />

                </div>

              </div>

              {/* divider */}
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-zinc-200/60 dark:via-zinc-800 to-transparent" />

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}