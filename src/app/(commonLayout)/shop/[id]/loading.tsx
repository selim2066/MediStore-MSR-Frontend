// src/app/(shop)/medicine/[id]/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen relative animate-pulse">

      {/* Background glow (match real page) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/60 to-white dark:from-black/60 dark:to-black" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-400/10 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-32">

        {/* Back button skeleton */}
        <div className="h-10 w-40 rounded-full bg-white/60 dark:bg-white/5 border border-white/10 mb-10 backdrop-blur-xl" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="flex flex-col gap-4">

            {/* IMAGE */}
            <div className="aspect-square rounded-3xl
              bg-white/60 dark:bg-white/5
              border border-white/10
              backdrop-blur-2xl relative overflow-hidden">

              {/* glow inside */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-emerald-400/10 blur-[80px]" />
              </div>
            </div>

            {/* TRUST CARDS */}
            <div className="grid grid-cols-3 gap-3">

              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl
                  bg-white/60 dark:bg-white/5
                  border border-white/10
                  backdrop-blur-2xl"
                />
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-7">

            {/* TITLE */}
            <div className="h-10 w-3/4 rounded-xl bg-white/60 dark:bg-white/5 border border-white/10" />

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-white/50 dark:bg-white/5 border border-white/10" />
              <div className="h-4 w-5/6 rounded bg-white/50 dark:bg-white/5 border border-white/10" />
              <div className="h-4 w-2/3 rounded bg-white/50 dark:bg-white/5 border border-white/10" />
            </div>

            {/* PRICE */}
            <div className="h-28 rounded-2xl bg-emerald-200/30 dark:bg-emerald-500/10 border border-white/10" />

            {/* BUTTONS */}
            <div className="flex gap-3">

              <div className="flex-1 h-12 rounded-xl bg-white/60 dark:bg-white/5 border border-white/10" />

              <div className="flex-1 h-12 rounded-xl bg-white/60 dark:bg-white/5 border border-white/10" />

            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-12 rounded-3xl p-6
          bg-white/60 dark:bg-white/5
          border border-white/10
          backdrop-blur-2xl">

          <div className="h-6 w-48 rounded bg-white/60 dark:bg-white/5 border border-white/10 mb-6" />

          <div className="space-y-4">

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-2xl
                bg-white/50 dark:bg-white/5
                border border-white/10"
              />
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}