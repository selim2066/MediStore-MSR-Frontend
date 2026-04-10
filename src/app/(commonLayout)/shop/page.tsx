import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
import { MedicineImage } from "@/components/module/shop/medicine-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/service/category.service";
import { medicineService } from "@/service/medicine.service";
import { MedicineWithRelations } from "@/types";
import { Info } from "lucide-react";
import Link from "next/link";

interface ShopPageProps {
  searchParams: Promise<{ categoryId?: string; search?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { categoryId, search } = await searchParams;

  const [medicinesRes, categoriesRes] = await Promise.all([
    medicineService.getMedicines(
      { ...(categoryId && { categoryId }), ...(search && { search }) },
      { cache: "no-store" },
    ),
    categoryService.getCategories(),
  ]);

  const medicines =
    (medicinesRes.data?.data?.data as MedicineWithRelations[]) || [];
  const categories = categoriesRes.data?.data || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pb-20 mx-10">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-none mb-3 px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
              Inventory
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              All Medicines
            </h1>
            <p className="text-slate-500 mt-2 font-medium italic">
              {medicines.length} products found
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 flex-wrap mb-12">
          <Button
            asChild
            variant="ghost"
            className={`rounded-full px-6 font-bold shadow-sm border transition-all ${
              !categoryId
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-emerald-600 hover:text-white"
            }`}
          >
            <Link href="/shop">All</Link>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              asChild
              variant="ghost"
              className={`rounded-full px-6 font-bold shadow-sm border transition-all ${
                categoryId === category.id
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              <Link href={`/shop?categoryId=${category.id}`}>
                {category.name}
              </Link>
            </Button>
          ))}
        </div>

        {/* Grid */}
        {medicines.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            No medicines found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {medicines.map((medicine: MedicineWithRelations) => (
              <div
                key={medicine.id}
                className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image area */}
                <Link
                  href={`/shop/${medicine.id}`}
                  className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-800 dark:to-emerald-950/20 overflow-hidden block"
                >
                  <MedicineImage
                    src={medicine.image || null}
                    alt={medicine.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Category pill — top left */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900">
                      {medicine.category?.name || "General"}
                    </span>
                  </div>

                  {/* Out of stock overlay */}
                  {medicine.stock <= 0 && (
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  {/* Name + manufacturer + price row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-900 dark:text-white truncate text-base leading-tight">
                        {medicine.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                        by {medicine.manufacturer}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-tight">
                        ৳{medicine.price.toFixed(2)}
                      </p>
                      {medicine.stock > 0 && (
                        <p className="text-[10px] text-slate-400 font-medium">
                          {medicine.stock} left
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    {/* Info button */}
                    <Link
                      href={`/shop/${medicine.id}`}
                      className="flex items-center justify-center w-11 h-11 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200 shrink-0 group/info"
                    >
                      <Info className="w-4 h-4 text-slate-400 group-hover/info:text-emerald-600 transition-colors" />
                    </Link>

                    {/* Add to Cart — full width, dominant */}
                    <AddToCartButton
                      medicine={medicine}
                      className="flex-1 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-black tracking-wide shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
