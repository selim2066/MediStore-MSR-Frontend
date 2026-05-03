// !updated latest — sidebar layout with filters
import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
import { MedicineImage } from "@/components/module/shop/medicine-image";
import { ShopSidebar } from "@/components/module/shop/shop-sidebar";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { categoryService } from "@/service/category.service";
import { medicineService } from "@/service/medicine.service";
import { MedicineWithRelations } from "@/types";
import { Info, PackageSearch, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface ShopPageProps {
  searchParams: Promise<{
    categoryId?: string;
    search?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}

// Map sort param → API params
function resolveSortParams(sort?: string) {
  switch (sort) {
    case "price_asc":
      return { sortBy: "price", sortOrder: "asc" };
    case "price_desc":
      return { sortBy: "price", sortOrder: "desc" };
    case "name_asc":
      return { sortBy: "name", sortOrder: "asc" };
    case "name_desc":
      return { sortBy: "name", sortOrder: "desc" };
    default:
      return {};
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { categoryId, search, page, minPrice, maxPrice, sort } =
    await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const sortParams = resolveSortParams(sort);

  const [medicinesRes, categoriesRes] = await Promise.all([
    medicineService.getMedicines(
      {
        ...(categoryId && { categoryId }),
        ...(search && { search }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...sortParams,
        page: String(currentPage),
        limit: "8",
      },
      { cache: "no-store" },
    ),
    categoryService.getCategories(),
  ]);

  const medicines =
    (medicinesRes.data?.data?.data as MedicineWithRelations[]) || [];
  const categories = categoriesRes.data?.data || [];
  const meta = medicinesRes.data?.data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalCount = meta?.total_medicine ?? medicines.length;

  const hasActiveFilters = !!(
    categoryId ||
    search ||
    minPrice ||
    maxPrice ||
    sort
  );

  return (
    <div className="relative min-h-screen py-10 bg-[#f0fdf8] dark:bg-[#020810]">
      {/* ── Fixed background ── */}
      <div className="fixed inset-0 pointer-events-none select-none -z-10">
        <div
          className="absolute inset-0 opacity-[0.635] dark:opacity-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            left: "-5%",
            width: 480,
            height: 480,
            background:
              "radial-gradient(circle,rgba(16,185,129,0.13),transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-10%",
            right: "-5%",
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle,rgba(20,184,166,0.10),transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(16,185,129,0.45) 35%,rgba(20,184,166,0.45) 65%,transparent)",
          }}
        />
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {/* ── Page header ── */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                  Live Inventory
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
                <span className="text-slate-900 dark:text-white">All </span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#059669,#10b981 50%,#34d399)",
                  }}
                >
                  Medicines
                </span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Browse our complete catalogue of certified pharmaceutical
                products.
              </p>
            </div>

            <div className="flex-shrink-0 self-start sm:self-end">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 shadow-sm backdrop-blur-sm">
                {hasActiveFilters && (
                  <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                )}
                <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {totalCount}
                </span>
                <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                  {hasActiveFilters ? "filtered" : "products"}
                </span>
              </div>
            </div>
          </div>

          {/* Active filter badges */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                Active filters:
              </span>
              {search && (
                <ActiveBadge
                  label={`"${search}"`}
                  href={buildClearUrl(
                    { search: undefined },
                    { categoryId, minPrice, maxPrice, sort },
                  )}
                />
              )}
              {categoryId && (
                <ActiveBadge
                  label={
                    categories.find((c) => c.id === categoryId)?.name ??
                    "Category"
                  }
                  href={buildClearUrl(
                    { categoryId: undefined },
                    { search, minPrice, maxPrice, sort },
                  )}
                />
              )}
              {(minPrice || maxPrice) && (
                <ActiveBadge
                  label={`৳${minPrice || "0"} – ${maxPrice ? "৳" + maxPrice : "∞"}`}
                  href={buildClearUrl(
                    { minPrice: undefined, maxPrice: undefined },
                    { search, categoryId, sort },
                  )}
                />
              )}
              {sort && (
                <ActiveBadge
                  label={`Sort: ${sort.replace("_", " ")}`}
                  href={buildClearUrl(
                    { sort: undefined },
                    { search, categoryId, minPrice, maxPrice },
                  )}
                />
              )}
              <Link
                href="/shop"
                className="text-[11px] font-bold text-rose-400 hover:text-rose-600 transition-colors underline underline-offset-2"
              >
                Clear all
              </Link>
            </div>
          )}
        </div>

        {/* ── Main layout: sidebar + content ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar */}
          <ShopSidebar
            categories={categories}
            currentCategoryId={categoryId}
            currentSearch={search}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
            currentSort={sort}
            totalCount={totalCount}
          />

          {/* ── Content panel ── */}
          <div className="flex-1 min-w-0">
            <div className="relative rounded-3xl border border-none dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-slate-950/60 overflow-hidden px-5 sm:px-8 py-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

              {/* Empty state */}
              {medicines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-28 gap-5 rounded-2xl bg-white/60 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <PackageSearch className="w-7 h-7 text-slate-400 dark:text-slate-500" />
                  </div>
                  <div className="text-center space-y-1.5">
                    <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                      No medicines found
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                      Try adjusting your filters or search term.
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="mt-1 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-800 active:scale-[0.97] transition-all duration-200"
                  >
                    <Link href="/shop">Clear filters</Link>
                  </Button>
                </div>
              ) : (
                /* ── Card grid — business logic UNCHANGED ── */
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {medicines.map((medicine: MedicineWithRelations) => (
                    <div
                      key={medicine.id}
                      className="group relative flex flex-col bg-white/80 dark:bg-white/[0.04] rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/[0.08] shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/20 hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-800/60 transition-all duration-300 backdrop-blur-md"
                    >
                      {/* Image block */}
                      <Link
                        href={`/shop/${medicine.id}`}
                        className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-800/60 dark:to-slate-800/20 overflow-hidden block"
                      >
                        <MedicineImage
                          src={medicine.image || null}
                          alt={medicine.name}
                          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.07]"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-white/96 dark:bg-slate-900/96 backdrop-blur-md text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/60 shadow-sm">
                            {medicine.category?.name || "General"}
                          </span>
                        </div>
                        {medicine.stock <= 0 && (
                          <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-[3px] flex items-center justify-center">
                            <span className="bg-red-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </Link>

                      {/* Content block */}
                      <div className="flex flex-col flex-1 p-5 gap-4">
                        <div className="space-y-0.5 min-w-0">
                          <h3 className="font-bold text-slateald-900 dark:text-white truncate text-[15px] leading-snug">
                            {medicine.name}
                          </h3>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">
                            {medicine.manufacturer}
                          </p>
                        </div>

                        <div className="h-px bg-gradient-to-r from-slate-100 via-slate-200/60 to-transparent dark:from-slate-800 dark:via-slate-700/40 dark:to-transparent" />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                              ৳{medicine.price.toFixed(2)}
                            </p>
                            {medicine.stock > 0 && (
                              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1 tabular-nums">
                                {medicine.stock} units left
                              </p>
                            )}
                          </div>
                          {medicine.stock > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 px-2.5 py-1 rounded-full">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              In Stock
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 mt-auto pt-1">
                          <Link
                            href={`/shop/${medicine.id}`}
                            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/[0.09] hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 active:scale-90 transition-all duration-200 group/info"
                          >
                            <Info className="w-4 h-4 text-slate-400 group-hover/info:text-emerald-600 dark:group-hover/info:text-emerald-400 transition-colors" />
                          </Link>
                          <AddToCartButton
                            medicine={medicine}
                            className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 active:scale-[0.97] text-white text-xs font-bold tracking-wide shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/shop"
                searchParams={{
                  ...(categoryId && { categoryId }),
                  ...(search && { search }),
                  ...(minPrice && { minPrice }),
                  ...(maxPrice && { maxPrice }),
                  ...(sort && { sort }),
                }}
              />

              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-600/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper: Active filter badge ─────────────────────────────────────────────
function ActiveBadge({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 dark:hover:bg-rose-950/30 dark:hover:border-rose-800 dark:hover:text-rose-400 transition-all duration-150"
    >
      {label}
      <span className="text-[10px] leading-none">×</span>
    </Link>
  );
}

// ─── Helper: build URL with cleared params ────────────────────────────────────
function buildClearUrl(
  clear: Record<string, undefined>,
  keep: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();
  const all = { ...keep, ...clear };
  Object.entries(all).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });
  const qs = params.toString();
  return `/shop${qs ? `?${qs}` : ""}`;
}
