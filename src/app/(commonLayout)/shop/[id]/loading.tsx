// loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-36 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      ))}
    </div>
  );
}