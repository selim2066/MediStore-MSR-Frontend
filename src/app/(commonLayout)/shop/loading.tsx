export default function Loading() {
  return (
    <div className="relative py-5 lg:py-10 min-h-screen bg-[#f0fdf8] dark:bg-[#020810] overflow-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0 opacity-[0.6] dark:opacity-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "77px 77px",
          }}
        />
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

        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-teal-400/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 animate-pulse">

        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="h-6 w-40 bg-zinc-200/70 dark:bg-zinc-800 rounded-full" />
            <div className="h-12 w-72 bg-zinc-200/70 dark:bg-zinc-800 rounded-xl" />
            <div className="h-4 w-96 bg-zinc-200/50 dark:bg-zinc-800/60 rounded-lg" />
          </div>

          <div className="h-14 w-32 bg-zinc-200/60 dark:bg-zinc-800 rounded-2xl" />
        </div>

        {/* ACTIVE FILTERS */}
        <div className="h-6 w-full max-w-3xl bg-zinc-200/40 dark:bg-zinc-800 rounded-lg mb-6" />

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* SIDEBAR */}
          <div className="w-full lg:w-[260px] xl:w-[280px] space-y-4">
            
            {/* Filter blocks */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 space-y-3 bg-white/60 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-zinc-800"
              >
                <div className="h-3 w-24 bg-zinc-200/70 dark:bg-zinc-800 rounded" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="h-3 w-full bg-zinc-200/60 dark:bg-zinc-800 rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <div className="flex-1">

            {/* GRID CARD WRAPPER */}
            <div className="rounded-3xl px-5 sm:px-8 py-8 border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-white/[0.03]">

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">

                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-white/70 dark:bg-white/5"
                  >
                    {/* IMAGE */}
                    <div className="aspect-[4/3] bg-zinc-200/60 dark:bg-zinc-800" />

                    {/* CONTENT */}
                    <div className="p-5 space-y-4">
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-zinc-200/60 dark:bg-zinc-800 rounded" />
                        <div className="h-3 w-1/2 bg-zinc-200/50 dark:bg-zinc-800 rounded" />
                      </div>

                      <div className="h-px bg-zinc-200/50 dark:bg-zinc-800" />

                      <div className="flex justify-between items-center">
                        <div className="h-6 w-20 bg-zinc-200/60 dark:bg-zinc-800 rounded" />
                        <div className="h-5 w-16 bg-zinc-200/60 dark:bg-zinc-800 rounded-full" />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <div className="h-10 w-10 bg-zinc-200/60 dark:bg-zinc-800 rounded-xl" />
                        <div className="h-10 flex-1 bg-zinc-200/60 dark:bg-zinc-800 rounded-xl" />
                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {/* PAGINATION */}
              <div className="flex justify-center mt-10 gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 bg-zinc-200/60 dark:bg-zinc-800 rounded-md"
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}