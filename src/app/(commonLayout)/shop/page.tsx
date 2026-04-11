// import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
// import { MedicineImage } from "@/components/module/shop/medicine-image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { categoryService } from "@/service/category.service";
// import { medicineService } from "@/service/medicine.service";
// import { MedicineWithRelations } from "@/types";
// import { Info } from "lucide-react";
// import Link from "next/link";

// interface ShopPageProps {
//   searchParams: Promise<{ categoryId?: string; search?: string }>;
// }

// export default async function ShopPage({ searchParams }: ShopPageProps) {
//   const { categoryId, search } = await searchParams;

//   const [medicinesRes, categoriesRes] = await Promise.all([
//     medicineService.getMedicines(
//       { ...(categoryId && { categoryId }), ...(search && { search }) },
//       { cache: "no-store" },
//     ),
//     categoryService.getCategories(),
//   ]);

//   const medicines =
//     (medicinesRes.data?.data?.data as MedicineWithRelations[]) || [];
//   const categories = categoriesRes.data?.data || [];

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pb-20 mx-10">
//       <div className="container mx-auto px-4 py-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <div>
//             <Badge className="bg-emerald-500/10 text-emerald-600 border-none mb-3 px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
//               Inventory
//             </Badge>
//             <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
//               All Medicines
//             </h1>
//             <p className="text-slate-500 mt-2 font-medium italic">
//               {medicines.length} products found
//             </p>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex gap-3 flex-wrap mb-12">
//           <Button
//             asChild
//             variant="ghost"
//             className={`rounded-full px-6 font-bold shadow-sm border transition-all ${
//               !categoryId
//                 ? "bg-emerald-600 text-white border-emerald-600"
//                 : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-emerald-600 hover:text-white"
//             }`}
//           >
//             <Link href="/shop">All</Link>
//           </Button>
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               asChild
//               variant="ghost"
//               className={`rounded-full px-6 font-bold shadow-sm border transition-all ${
//                 categoryId === category.id
//                   ? "bg-emerald-600 text-white border-emerald-600"
//                   : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-emerald-600 hover:text-white"
//               }`}
//             >
//               <Link href={`/shop?categoryId=${category.id}`}>
//                 {category.name}
//               </Link>
//             </Button>
//           ))}
//         </div>

//         {/* Grid */}
//         {medicines.length === 0 ? (
//           <div className="text-center py-20 text-slate-400 font-medium bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
//             No medicines found.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {medicines.map((medicine: MedicineWithRelations) => (
//               <div
//                 key={medicine.id}
//                 className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:-translate-y-1"
//               >
//                 {/* Image area */}
//                 <Link
//                   href={`/shop/${medicine.id}`}
//                   className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-800 dark:to-emerald-950/20 overflow-hidden block"
//                 >
//                   <MedicineImage
//                     src={medicine.image || null}
//                     alt={medicine.name}
//                     className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
//                   />

//                   {/* Category pill — top left */}
//                   <div className="absolute top-3 left-3">
//                     <span className="text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900">
//                       {medicine.category?.name || "General"}
//                     </span>
//                   </div>

//                   {/* Out of stock overlay */}
//                   {medicine.stock <= 0 && (
//                     <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center">
//                       <span className="bg-red-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
//                         Out of Stock
//                       </span>
//                     </div>
//                   )}
//                 </Link>

//                 {/* Content */}
//                 <div className="flex flex-col flex-1 p-5 gap-4">
//                   {/* Name + manufacturer + price row */}
//                   <div className="flex items-start justify-between gap-2">
//                     <div className="min-w-0">
//                       <h3 className="font-black text-slate-900 dark:text-white truncate text-base leading-tight">
//                         {medicine.name}
//                       </h3>
//                       <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
//                         by {medicine.manufacturer}
//                       </p>
//                     </div>
//                     <div className="shrink-0 text-right">
//                       <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-tight">
//                         ৳{medicine.price.toFixed(2)}
//                       </p>
//                       {medicine.stock > 0 && (
//                         <p className="text-[10px] text-slate-400 font-medium">
//                           {medicine.stock} left
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 mt-auto">
//                     {/* Info button */}
//                     <Link
//                       href={`/shop/${medicine.id}`}
//                       className="flex items-center justify-center w-11 h-11 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200 shrink-0 group/info"
//                     >
//                       <Info className="w-4 h-4 text-slate-400 group-hover/info:text-emerald-600 transition-colors" />
//                     </Link>

//                     {/* Add to Cart — full width, dominant */}
//                     <AddToCartButton
//                       medicine={medicine}
//                       className="flex-1 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-black tracking-wide shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// ! improved version of ui shop page with better animations and spacing

// import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
// import { MedicineImage } from "@/components/module/shop/medicine-image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { categoryService } from "@/service/category.service";
// import { medicineService } from "@/service/medicine.service";
// import { MedicineWithRelations } from "@/types";
// import { Info, PackageSearch } from "lucide-react";
// import Link from "next/link";

// interface ShopPageProps {
//   searchParams: Promise<{ categoryId?: string; search?: string }>;
// }

// export default async function ShopPage({ searchParams }: ShopPageProps) {
//   const { categoryId, search } = await searchParams;

//   const [medicinesRes, categoriesRes] = await Promise.all([
//     medicineService.getMedicines(
//       { ...(categoryId && { categoryId }), ...(search && { search }) },
//       { cache: "no-store" },
//     ),
//     categoryService.getCategories(),
//   ]);

//   const medicines =
//     (medicinesRes.data?.data?.data as MedicineWithRelations[]) || [];
//   const categories = categoriesRes.data?.data || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/10">
//       {/* Subtle mesh/grid background texture */}
//       <div
//         className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
//         style={{
//           backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16 185 129) 1px, transparent 0)`,
//           backgroundSize: "40px 40px",
//         }}
//       />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">

//         {/* ── Header ── */}
//         <div className="mb-14">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
//             <div className="space-y-4">
//               {/* Eyebrow badge */}
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
//                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                 <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
//                   Live Inventory
//                 </span>
//               </div>

//               {/* Title */}
//               <div>
//                 <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
//                   All Medicines
//                 </h1>
//                 <p className="mt-3 text-base text-slate-500 dark:text-slate-400 font-medium">
//                   Browse our complete catalogue of certified pharmaceutical products.
//                 </p>
//               </div>
//             </div>

//             {/* Count chip */}
//             <div className="flex-shrink-0 self-start md:self-end">
//               <div className="inline-flex items-baseline gap-1.5 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm backdrop-blur-sm">
//                 <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
//                   {medicines.length}
//                 </span>
//                 <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
//                   products
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="mt-10 h-px bg-gradient-to-r from-emerald-200/60 via-slate-200/80 to-transparent dark:from-emerald-800/40 dark:via-slate-700/40" />
//         </div>

//         {/* ── Category filter bar ── */}
//         <div className="mb-12">
//           <div className="relative">
//             {/* Fade mask for horizontal scroll */}
//             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-10 rounded-r-2xl" />

//             <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x">
//               <Button
//                 asChild
//                 variant="ghost"
//                 className={`
//                   snap-start flex-shrink-0 rounded-xl px-5 py-2 h-9 text-sm font-semibold
//                   border transition-all duration-200
//                   ${
//                     !categoryId
//                       ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 scale-[1.02]"
//                       : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
//                   }
//                 `}
//               >
//                 <Link href="/shop">All</Link>
//               </Button>

//               {categories.map((category) => (
//                 <Button
//                   key={category.id}
//                   asChild
//                   variant="ghost"
//                   className={`
//                     snap-start flex-shrink-0 rounded-xl px-5 py-2 h-9 text-sm font-semibold
//                     border transition-all duration-200
//                     ${
//                       categoryId === category.id
//                         ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 scale-[1.02]"
//                         : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
//                     }
//                   `}
//                 >
//                   <Link href={`/shop?categoryId=${category.id}`}>
//                     {category.name}
//                   </Link>
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Grid / Empty state ── */}
//         {medicines.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-28 gap-5 rounded-3xl bg-white dark:bg-slate-900/60 border border-dashed border-slate-200 dark:border-slate-700/60 backdrop-blur-sm">
//             <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
//               <PackageSearch className="w-7 h-7 text-slate-400 dark:text-slate-500" />
//             </div>
//             <div className="text-center space-y-1.5">
//               <p className="text-base font-bold text-slate-700 dark:text-slate-300">
//                 No medicines found
//               </p>
//               <p className="text-sm text-slate-400 dark:text-slate-500">
//                 Try a different category or search term.
//               </p>
//             </div>
//             <Button asChild variant="ghost" className="mt-1 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700">
//               <Link href="/shop">Clear filters</Link>
//             </Button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {medicines.map((medicine: MedicineWithRelations) => (
//               <div
//                 key={medicine.id}
//                 className="group relative flex flex-col bg-white dark:bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:shadow-emerald-500/8 dark:hover:shadow-emerald-900/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
//               >
//                 {/* ── Image block ── */}
//                 <Link
//                   href={`/shop/${medicine.id}`}
//                   className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-800 dark:to-slate-800/40 overflow-hidden block"
//                 >
//                   <MedicineImage
//                     src={medicine.image || null}
//                     alt={medicine.name}
//                     className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.06]"
//                   />

//                   {/* Gradient overlay on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 via-transparent to-transparent group-hover:from-slate-900/10 transition-all duration-300" />

//                   {/* Category pill */}
//                   <div className="absolute top-3 left-3">
//                     <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/60 shadow-sm">
//                       {medicine.category?.name || "General"}
//                     </span>
//                   </div>

//                   {/* Out of stock overlay */}
//                   {medicine.stock <= 0 && (
//                     <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-[3px] flex items-center justify-center">
//                       <span className="bg-red-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
//                         Out of Stock
//                       </span>
//                     </div>
//                   )}
//                 </Link>

//                 {/* ── Content block ── */}
//                 <div className="flex flex-col flex-1 p-5 gap-4">

//                   {/* Name + manufacturer */}
//                   <div className="space-y-0.5 min-w-0">
//                     <h3 className="font-bold text-slate-900 dark:text-white truncate text-[15px] leading-snug">
//                       {medicine.name}
//                     </h3>
//                     <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">
//                       {medicine.manufacturer}
//                     </p>
//                   </div>

//                   {/* Divider */}
//                   <div className="h-px bg-slate-100 dark:bg-slate-800" />

//                   {/* Price + stock */}
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
//                         ৳{medicine.price.toFixed(2)}
//                       </p>
//                       {medicine.stock > 0 && (
//                         <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1 tabular-nums">
//                           {medicine.stock} units left
//                         </p>
//                       )}
//                     </div>
//                     {medicine.stock > 0 && (
//                       <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 px-2 py-0.5 rounded-full">
//                         In Stock
//                       </span>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 mt-auto pt-1">
//                     {/* Info button */}
//                     <Link
//                       href={`/shop/${medicine.id}`}
//                       className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200 group/info"
//                     >
//                       <Info className="w-4 h-4 text-slate-400 group-hover/info:text-emerald-600 dark:group-hover/info:text-emerald-400 transition-colors duration-200" />
//                     </Link>

//                     {/* Add to Cart */}
//                     <AddToCartButton
//                       medicine={medicine}
//                       className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold tracking-wide shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ! background effects for shop page
import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
import { MedicineImage } from "@/components/module/shop/medicine-image";
import { BackgroundEffects } from "@/components/ui/background-effects";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/service/category.service";
import { medicineService } from "@/service/medicine.service";
import { MedicineWithRelations } from "@/types";
import { Info, PackageSearch } from "lucide-react";
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
    <>
      {/* ── Animated background layer (client component, renders behind everything) ── */}
      <BackgroundEffects />

      {/* ── Page shell ── */}
      <div className="relative min-h-screen">
        {/* Glassmorphism content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
          <div className="relative rounded-3xl border border-white/60 dark:border-slate-700/40 bg-white/55 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-slate-200/40 dark:shadow-slate-950/60 overflow-hidden px-6 sm:px-10 py-10">

            {/* Inner top-edge highlight line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

            {/* ── Header ── */}
            <div className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                  {/* Eyebrow badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                      Live Inventory
                    </span>
                  </div>

                  <div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                      All Medicines
                    </h1>
                    <p className="mt-3 text-base text-slate-500 dark:text-slate-400 font-medium">
                      Browse our complete catalogue of certified pharmaceutical products.
                    </p>
                  </div>
                </div>

                {/* Count chip */}
                <div className="flex-shrink-0 self-start md:self-end">
                  <div className="inline-flex items-baseline gap-1.5 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 shadow-sm backdrop-blur-sm">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                      {medicines.length}
                    </span>
                    <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                      products
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 h-px bg-gradient-to-r from-emerald-200/60 via-slate-200/80 to-transparent dark:from-emerald-800/40 dark:via-slate-700/40" />
            </div>

            {/* ── Category filter bar ── */}
            <div className="mb-12">
              <div className="relative">
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/80 dark:from-slate-900/80 to-transparent pointer-events-none z-10 rounded-r-2xl" />
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x">
                  <Button
                    asChild
                    variant="ghost"
                    className={`snap-start flex-shrink-0 rounded-xl px-5 py-2 h-9 text-sm font-semibold border transition-all duration-200 ${
                      !categoryId
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 scale-[1.02]"
                        : "bg-white/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 backdrop-blur-sm"
                    }`}
                  >
                    <Link href="/shop">All</Link>
                  </Button>

                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      asChild
                      variant="ghost"
                      className={`snap-start flex-shrink-0 rounded-xl px-5 py-2 h-9 text-sm font-semibold border transition-all duration-200 ${
                        categoryId === category.id
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 scale-[1.02]"
                          : "bg-white/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 backdrop-blur-sm"
                      }`}
                    >
                      <Link href={`/shop?categoryId=${category.id}`}>
                        {category.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Grid / Empty state ── */}
            {medicines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 gap-5 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700/60 backdrop-blur-sm">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <PackageSearch className="w-7 h-7 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="text-center space-y-1.5">
                  <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                    No medicines found
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Try a different category or search term.
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-1 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700"
                >
                  <Link href="/shop">Clear filters</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {medicines.map((medicine: MedicineWithRelations) => (
                  <div
                    key={medicine.id}
                    className="group relative flex flex-col bg-white/80 dark:bg-slate-900/70 rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md"
                  >
                    {/* Image block */}
                    <Link
                      href={`/shop/${medicine.id}`}
                      className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50/80 to-emerald-50/40 dark:from-slate-800/80 dark:to-slate-800/40 overflow-hidden block"
                    >
                      <MedicineImage
                        src={medicine.image || null}
                        alt={medicine.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.06]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 to-transparent group-hover:from-slate-900/8 transition-all duration-300" />

                      {/* Category pill */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/60 shadow-sm">
                          {medicine.category?.name || "General"}
                        </span>
                      </div>

                      {/* Out of stock */}
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
                        <h3 className="font-bold text-slate-900 dark:text-white truncate text-[15px] leading-snug">
                          {medicine.name}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">
                          {medicine.manufacturer}
                        </p>
                      </div>

                      <div className="h-px bg-slate-100 dark:bg-slate-800" />

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
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 px-2 py-0.5 rounded-full">
                            In Stock
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto pt-1">
                        <Link
                          href={`/shop/${medicine.id}`}
                          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200 group/info"
                        >
                          <Info className="w-4 h-4 text-slate-400 group-hover/info:text-emerald-600 dark:group-hover/info:text-emerald-400 transition-colors duration-200" />
                        </Link>

                        <AddToCartButton
                          medicine={medicine}
                          className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold tracking-wide shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inner bottom-edge highlight */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-600/30 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}
