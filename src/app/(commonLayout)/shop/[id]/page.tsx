// // ! UI ONLY UPDATE (Apple-style dark mode consistency)

// import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
// import ReviewSection from "@/components/module/shop/review-section";
// import { BackgroundEffects } from "@/components/ui/background-effects";
// import { Button } from "@/components/ui/button";
// import { medicineService } from "@/service/medicine.service";
// import {
//   ArrowLeft,
//   BadgeCheck,
//   Clock,
//   Package,
//   ShieldCheck,
//   ShoppingBag,
//   Truck,
// } from "lucide-react";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// export default async function MedicineDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const { data, error } = await medicineService.getMedicineById(id);

//   if (error || !data?.data) return notFound();

//   const medicine = data.data;

//   return (
//     <>
//       <BackgroundEffects />

//       {/* Sticky mobile CTA */}
//       <div
//         className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-4
//         bg-white/80 dark:bg-black/60
//         backdrop-blur-2xl
//         border-t border-slate-200/60 dark:border-white/10
//         shadow-lg shadow-slate-200/60 dark:shadow-none"
//       >
//         <div className="flex items-center gap-3 max-w-lg mx-auto">
//           <div className="flex flex-col">
//             <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
//               Unit Price
//             </span>
//             <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
//               ৳{medicine.price.toFixed(2)}
//             </span>
//           </div>

//           <div className="flex-1">
//             <AddToCartButton medicine={medicine} />
//           </div>
//         </div>
//       </div>

//       <div className="min-h-screen relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-32">
//           {/* Back */}
//           <Link
//             href="/shop"
//             className="inline-flex items-center gap-2 text-sm font-semibold
//             text-slate-600 dark:text-slate-400
//             hover:text-emerald-500 dark:hover:text-emerald-400 mb-10"
//           >
//             <span
//               className="w-8 h-8 flex items-center justify-center rounded-full
//               bg-white/80 dark:bg-white/5
//               border border-slate-200/60 dark:border-white/10
//               shadow-sm"
//             >
//               <ArrowLeft className="w-3.5 h-3.5" />
//             </span>
//             Back to Shop
//           </Link>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* LEFT */}
//             <div className="lg:sticky lg:top-8 flex flex-col gap-4">
//               {/* IMAGE CARD */}
//               <div
//                 className="relative aspect-square rounded-3xl overflow-hidden
//                 bg-white/80 dark:bg-white/5
//                 border border-slate-200/60 dark:border-white/10
//                 shadow-lg shadow-slate-200/60 dark:shadow-none
//                 backdrop-blur-2xl"
//               >
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-3/4 h-3/4 bg-emerald-400/10 blur-[90px]" />
//                 </div>

//                 {medicine.image ? (
//                   <img
//                     src={medicine.image}
//                     className="relative z-10 w-full h-full object-contain p-10"
//                   />
//                 ) : (
//                   <Package className="w-24 h-24 text-emerald-500" />
//                 )}

//                 <div className="absolute top-4 left-4">
//                   <span
//                     className="px-3 py-1 text-[10px] font-bold uppercase
//                     bg-white/80 dark:bg-white/10
//                     border border-slate-200/60 dark:border-white/10
//                     rounded-full
//                     text-emerald-600 dark:text-emerald-400
//                     backdrop-blur-xl flex items-center gap-1"
//                   >
//                     <ShieldCheck className="w-3 h-3" />
//                     Authentic
//                   </span>
//                 </div>

//                 {medicine.stock <= 0 && (
//                   <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
//                     <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-black">
//                       Out of Stock
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT */}
//             {/* RIGHT */}
// <div className="flex flex-col gap-7">
//   {/* NAME */}
//   <h1 className="text-4xl font-black text-slate-900 dark:text-white">
//     {medicine.name}
//   </h1>

//   {/* PRICE (moved here) */}
//   <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
//     ৳{medicine.price.toFixed(2)}
//   </p>

//   {/* DESCRIPTION */}
//   <div
//     className="rounded-2xl p-6
//     bg-white/80 dark:bg-white/5
//     border border-slate-200/60 dark:border-white/10
//     shadow-sm dark:shadow-none
//     backdrop-blur-2xl
//     text-slate-700 dark:text-slate-300"
//   >
//     {medicine.description}
//   </div>

//   {/* BUTTONS */}
//   <div className="flex gap-3">
//     <div className="flex-1 shadow-md shadow-slate-200/50 dark:shadow-none">
//       <AddToCartButton medicine={medicine} />
//     </div>

//     <Button
//       asChild
//       variant="outline"
//       className="h-12 rounded-xl flex-1
//       bg-white/80 dark:bg-white/5
//       border-slate-200/60 dark:border-white/10
//       shadow-sm hover:shadow-md shadow-slate-200/50 dark:shadow-none
//       backdrop-blur-xl
//       hover:bg-white dark:hover:bg-white/10"
//     >
//       <Link
//         href="/cart"
//         className="flex items-center justify-center gap-2"
//       >
//         <ShoppingBag className="w-4 h-4" />
//         Cart
//       </Link>
//     </Button>
//   </div>

//   {/* TRUST CARDS */}
//   <div className="grid grid-cols-3 gap-3 mt-2">
//     {[
//       { icon: Truck, label: "Fast", sub: "1–3 days" },
//       { icon: Clock, label: "24/7", sub: "Support" },
//       { icon: BadgeCheck, label: "Verified", sub: "Safe" },
//     ].map(({ icon: Icon, label, sub }) => (
//       <div
//         key={label}
//         className="group relative flex flex-col items-center py-5 rounded-2xl
//         bg-white/80 dark:bg-white/5
//         border border-slate-200/60 dark:border-white/10
//         shadow-sm hover:shadow-md shadow-slate-200/50 dark:shadow-none
//         backdrop-blur-2xl
//         transition-all duration-300
//         hover:-translate-y-1"
//       >
//         <Icon className="w-4 h-4 text-emerald-500" />
//         <p className="text-xs font-bold mt-2 text-slate-800 dark:text-white">
//           {label}
//         </p>
//         <p className="text-[10px] text-slate-500 dark:text-slate-400">
//           {sub}
//         </p>
//       </div>
//     ))}
//   </div>
// </div>
//           </div>

//           {/* REVIEWS */}
//           <div
//             className="mt-12 rounded-3xl p-6
//             bg-white/80 dark:bg-white/5
//             border border-slate-200/60 dark:border-white/10
//             shadow-sm dark:shadow-none
//             backdrop-blur-2xl"
//           >
//             <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
//               Customer Reviews
//             </h2>

//             <ReviewSection medicineId={id} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// ! stn update
import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
import { ImageGallery } from "@/components/module/shop/image-gallery";
import { MedicineImage } from "@/components/module/shop/medicine-image";
import ReviewSection from "@/components/module/shop/review-section";
import { BackgroundEffects } from "@/components/ui/background-effects";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/service/category.service";
import { medicineService } from "@/service/medicine.service";
import { MedicineWithRelations } from "@/types";
import {
  ArrowLeft,
  CalendarDays,
  Factory,
  Info,
  Layers,
  ShoppingBag,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MedicineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await medicineService.getMedicineById(id);
  if (error || !data?.data) return notFound();
  const medicine = data.data as MedicineWithRelations;

  // ── ADD THIS ──
  const categoriesRes = await categoryService.getCategories();
  const categories = categoriesRes.data?.data || [];
  const categoryName =
    categories.find((c) => c.id === medicine.categoryId)?.name || "General";
  // Fetch related medicines from same category
  const relatedRes = await medicineService.getMedicines(
    {
      categoryId: medicine.categoryId,
      limit: "5",
    },
    { cache: "no-store" },
  );

  const related = (
    (relatedRes.data?.data?.data as MedicineWithRelations[]) || []
  )
    .filter((m) => m.id !== medicine.id)
    .slice(0, 4);

  // Specs
  const specs = [
    { icon: Factory, label: "Manufacturer", value: medicine.manufacturer },
    { icon: Tag, label: "Category", value: categoryName },
    {
      icon: Layers,
      label: "Stock",
      value:
        medicine.stock > 0
          ? `${medicine.stock} units`
          : "Out of stock",
    },

    {
      icon: CalendarDays,
      label: "Listed",
      value: new Date(medicine.createdAt).toLocaleDateString("en-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <>
      <BackgroundEffects />

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-4 bg-white/80 dark:bg-black/60 backdrop-blur-2xl border-t border-slate-200/60 dark:border-white/10 shadow-lg">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Unit Price
            </span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              ৳{medicine.price.toFixed(2)}
            </span>
          </div>
          <div className="flex-1">
            <AddToCartButton medicine={medicine} />
          </div>
        </div>
      </div>

      <div className="min-h-screen py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-32">
          {/* Back */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 mb-10 transition-colors"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            Back to Shop
          </Link>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-10">
            {/* LEFT — Image + thumbnails */}
            <ImageGallery
              mainImage={medicine.image}
              extraImages={medicine.images ?? []}
              name={medicine.name}
              stock={medicine.stock}
            />

            {/* RIGHT — Info */}
            <div className="flex  flex-col gap-7">
              {/* Category pill + name */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 mb-3">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  {categoryName}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                  {medicine.name}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                  by {medicine.manufacturer}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                  ৳{medicine.price.toFixed(2)}
                </span>
                <span className="text-sm text-slate-400 dark:text-slate-500 mb-1 font-medium">
                  per unit
                </span>
              </div>

              {/* Description */}
              <div className="rounded-2xl p-5 bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                    Description
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {medicine.description}
                </p>
              </div>

              {/* ── Key Specifications ── */}
              <div className="rounded-2xl overflow-hidden bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-2xl">
                <div className="px-5 py-3.5 border-b border-slate-200/60 dark:border-white/[0.07] bg-slate-50/80 dark:bg-white/[0.03]">
                  <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                    Key Specifications
                  </h3>
                </div>
                <div className="divide-y grid grid-cols-2 gap-0 divide-slate-200/60 dark:divide-white/[0.06]">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 px-5 py-3.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-28 shrink-0 uppercase tracking-wide">
                        {label}
                      </span>
                      <span
                        className={`text-sm font-semibold truncate ${
                          label === "Stock" && medicine.stock <= 0
                            ? "text-red-500"
                            : label === "Stock"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3">
                <div className="flex-1 shadow-md shadow-slate-200/50 dark:shadow-none">
                  <AddToCartButton medicine={medicine} />
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-xl flex-1 bg-white/80 dark:bg-white/5 border-slate-200/60 dark:border-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/10"
                >
                  <Link
                    href="/cart"
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Cart
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* ── Reviews ── */}
          <div className="mt-14 rounded-3xl p-6 bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-2xl">
            <ReviewSection medicineId={id} />
          </div>

          {/* ── Related Medicines ── */}
          {related.length > 0 && (
            <div className="mt-14">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                      Same Category
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    Related Medicines
                  </h2>
                </div>
                <Link
                  href={`/shop?categoryId=${medicine.categoryId}`}
                  className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4 transition-all"
                >
                  View all →
                </Link>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    className="group flex flex-col bg-white/80 dark:bg-white/[0.04] rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/[0.08] shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-800/60 transition-all duration-300 backdrop-blur-md"
                  >
                    {/* Image */}
                    <Link
                      href={`/shop/${rel.id}`}
                      className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-800/60 dark:to-slate-800/20 overflow-hidden block"
                    >
                      <MedicineImage
                        src={rel.image || null}
                        alt={rel.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.07]"
                      />
                      {rel.stock <= 0 && (
                        <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-[3px] flex items-center justify-center">
                          <span className="bg-red-500 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-4 gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white truncate text-[14px] leading-snug">
                          {rel.name}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                          {rel.manufacturer}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                          ৳{rel.price.toFixed(2)}
                        </p>
                        {rel.stock > 0 && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 px-2 py-0.5 rounded-full">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            In Stock
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/shop/${rel.id}`}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
                        style={{
                          background: "linear-gradient(135deg,#059669,#10b981)",
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
