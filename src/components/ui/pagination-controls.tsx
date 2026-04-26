import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  // pass all current searchParams so category/search are preserved in links
  searchParams?: Record<string, string | undefined>;
}

function buildUrl(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number,
) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (key !== "page" && value) qs.set(key, value);
  });
  qs.set("page", String(page));
  return `${basePath}?${qs.toString()}`;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function PaginationControls({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      {/* Prev */}
      <Button asChild={currentPage > 1} variant="outline" size="sm" disabled={currentPage <= 1}
        className="rounded-xl border-slate-200 dark:border-white/[0.09]">
        {currentPage > 1 ? (
          <Link href={buildUrl(basePath, searchParams, currentPage - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        ) : (
          <span><ChevronLeft className="w-4 h-4" /></span>
        )}
      </Button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-sm select-none">
            …
          </span>
        ) : (
          <Button
            key={p}
            asChild={p !== currentPage}
            size="sm"
            variant={p === currentPage ? "default" : "outline"}
            className={
              p === currentPage
                ? "rounded-xl bg-emerald-600 hover:bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                : "rounded-xl border-slate-200 dark:border-white/[0.09] text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400"
            }
          >
            {p !== currentPage ? (
              <Link href={buildUrl(basePath, searchParams, p as number)}>{p}</Link>
            ) : (
              <span>{p}</span>
            )}
          </Button>
        ),
      )}

      {/* Next */}
      <Button asChild={currentPage < totalPages} variant="outline" size="sm" disabled={currentPage >= totalPages}
        className="rounded-xl border-slate-200 dark:border-white/[0.09]">
        {currentPage < totalPages ? (
          <Link href={buildUrl(basePath, searchParams, currentPage + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span><ChevronRight className="w-4 h-4" /></span>
        )}
      </Button>
    </div>
  );
}