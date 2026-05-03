"use client";

import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  RotateCcw,
  Search,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

interface Category {
  id: string;
  name: string;
}

interface ShopSidebarProps {
  categories: Category[];
  currentCategoryId?: string;
  currentSearch?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
  currentSort?: string;
  totalCount?: number;
}

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc", label: "Name: A → Z" },
  { value: "name_desc", label: "Name: Z → A" },
];

const PRICE_PRESETS = [
  { label: "Under ৳10", min: "0", max: "10" },
  { label: "৳10 – ৳50", min: "10", max: "50" },
  { label: "৳50 – ৳200", min: "50", max: "200" },
  { label: "Over ৳200", min: "200", max: "" },
];

export function ShopSidebar({
  categories,
  currentCategoryId,
  currentSearch = "",
  currentMinPrice = "",
  currentMaxPrice = "",
  currentSort = "",
  totalCount = 0,
}: ShopSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // for typewritter
  const placeholders = [
  "Search medicines...",
  "Search antibiotics...",
  "Search pain relief...",
  "Search vitamins...",
  "Search by brand..."
];

const [placeholderIndex, setPlaceholderIndex] = useState(0);
const [typedPlaceholder, setTypedPlaceholder] = useState("");

useEffect(() => {
  const currentText = placeholders[placeholderIndex];
  let i = 0;

  const typing = setInterval(() => {
    setTypedPlaceholder(currentText.slice(0, i));
    i++;

    if (i > currentText.length) {
      clearInterval(typing);

      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 1200);
    }
  }, 60);

  return () => clearInterval(typing);
}, [placeholderIndex]);


  const [search, setSearch] = useState(currentSearch);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [sort, setSort] = useState(currentSort);
  const [sortOpen, setSortOpen] = useState(false);

  // Build URL from current state + overrides
  const buildUrl = useCallback(
    (overrides: Record<string, string | undefined>) => {
      const params = new URLSearchParams();
      const vals: Record<string, string | undefined> = {
        search: search || undefined,
        categoryId: currentCategoryId || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sort: sort || undefined,
        ...overrides,
      };
      Object.entries(vals).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      return `/shop?${params.toString()}`;
    },
    [search, currentCategoryId, minPrice, maxPrice, sort],
  );

  // Push with transition (shows pending state)
  const push = useCallback(
    (url: string) => startTransition(() => router.push(url)),
    [router],
  );

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      const url = buildUrl({ search: search || undefined, page: undefined });
      push(url);
    }, 420);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleCategory = (id?: string) => {
    const url = buildUrl({ categoryId: id, page: undefined });
    push(url);
  };

  const handlePricePreset = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
    const url = buildUrl({
      minPrice: min || undefined,
      maxPrice: max || undefined,
      page: undefined,
    });
    push(url);
  };

  const handlePriceApply = () => {
    const url = buildUrl({
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      page: undefined,
    });
    push(url);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setSortOpen(false);
    const url = buildUrl({ sort: value || undefined, page: undefined });
    push(url);
  };

  const handleReset = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    push("/shop");
  };

  const hasActiveFilters = !!(
    currentCategoryId ||
    currentSearch ||
    currentMinPrice ||
    currentMaxPrice ||
    currentSort
  );
  const activePricePreset = PRICE_PRESETS.find(
    (p) => p.min === currentMinPrice && p.max === currentMaxPrice,
  );

  return (
    <aside className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">
      <div className="sticky top-24 space-y-3 overflow-visible">
        {/* ── Header card ── */}
        <div className="rounded-2xl border border-none dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Filter className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-[13px] font-black text-slate-800 dark:text-white tracking-tight">
              Filters
            </span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        {/* ── Search ── */}
        {/* ── Search ── */}
        <div className="rounded-2xl border border-white/10 dark:border-white/10 bg-gradient-to-b from-white/70 to-white/40 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-2xl px-5 py-4 space-y-3 relative overflow-hidden group">
          {/* soft glow layer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-400/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-400/10 blur-3xl rounded-full" />
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 relative z-10">
            Search
          </p>

          <div
            className="relative flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-300 group"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))",
              borderColor: search ? "rgba(16,185,129,0.6)" : "rgba(0,0,0,0.08)",
              boxShadow: search
                ? "0 0 0 4px rgba(16,185,129,0.12), 0 10px 30px rgba(16,185,129,0.10)"
                : "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            {/* icon */}
            <Search className="w-4 h-4  group-focus-within:text-emerald-500  shrink-0" />

            {/* input */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={typedPlaceholder}
              className="flex-1  outline-none text-[14px] text-white placeholder:text-slate-400 dark:placeholder:text-black dark:text-white-200 transition-colors bg-whitesmoke"
            />

            {/* clear */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-slate-400 hover:text-rose-500 transition-colors text-sm leading-none"
              >
                ×
              </button>
            )}

            {/* active indicator */}
            <div
              className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${
                search ? "bg-emerald-500/70" : "bg-transparent"
              }`}
            />
          </div>
        </div>
        {/* ── Sort ── */}
        <div
          className={`rounded-2xl border border-none dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl px-5 py-4 space-y-3 relative ${
            sortOpen ? "z-[999]" : "z-10"
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
              Sort By
            </p>
          </div>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200"
            >
              <span>
                {SORT_OPTIONS.find((o) => o.value === sort)?.label || "Default"}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <>
                {/* Click outside backdrop */}
                <div
                  className="fixed inset-0 z-[998]"
                  onClick={() => setSortOpen(false)}
                />

                {/* Dropdown menu */}
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-slate-900 shadow-2xl z-[1000] overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSort(opt.value)}
                      className={`w-full text-left px-4 py-2.5 text-[12.5px] font-medium transition-colors duration-150 ${
                        sort === opt.value
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Category ── */}
        {/* ── Category ── */}
        <div className="rounded-2xl border border-none dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl px-5 py-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
            Category
          </p>
          <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:#d1fae5_transparent]">
            {/* All */}
            <button
              onClick={() => handleCategory(undefined)}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] group"
            >
              {/* Checkbox */}
              <span
                className={`w-4 h-4 rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                  !currentCategoryId
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"
                }`}
              >
                {!currentCategoryId && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M1.5 5L4 7.5L8.5 2.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={
                  !currentCategoryId
                    ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300"
                }
              >
                All Categories
              </span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] group"
              >
                {/* Checkbox */}
                <span
                  className={`w-4 h-4 rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                    currentCategoryId === cat.id
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"
                  }`}
                >
                  {currentCategoryId === cat.id && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M1.5 5L4 7.5L8.5 2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={
                    currentCategoryId === cat.id
                      ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300"
                  }
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Price Range ── */}
        <div className="rounded-2xl border border-none dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl px-5 py-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
            Price Range (BDT)
          </p>

          {/* Presets */}
          <div className="grid grid-cols-4 md:grid-cols-2 gap-1.5">
            {PRICE_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePricePreset(p.min, p.max)}
                className={`px-2.5 py-2 rounded-xl text-[11px] font-semibold border transition-all duration-200 text-center ${
                  activePricePreset?.label === p.label
                    ? "bg-emerald-500/10 border-emerald-400/50 text-emerald-700 dark:text-emerald-400"
                    : "border-none dark:border-white/[0.07] text-slate-500 dark:text-slate-400 hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white/50 dark:bg-white/[0.03]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Custom range inputs */}
          {/* Custom range inputs */}
          <div className="flex items-center gap-1.5 pt-1">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              min={0}
              className="w-0 flex-1 px-2.5 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] text-[12px] text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:border-emerald-400 transition-colors"
            />
            <span className="text-slate-300 dark:text-slate-600 text-xs shrink-0">
              –
            </span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              min={0}
              className="w-0 flex-1 px-2.5 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] text-[12px] text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
          <button
            onClick={handlePriceApply}
            className="w-full py-2.5 rounded-xl text-[12.5px] font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#059669,#10b981)" }}
          >
            Apply Price Filter
          </button>
        </div>

        {/* ── Loading indicator ── */}
        {isPending && (
          <div className="flex items-center justify-center gap-2 py-2">
            <div
              className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
