// loading.tsx
export default function Loading() {
  return (
    <div className="p-6 space-y-3">
      <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
      ))}
    </div>
  );
}