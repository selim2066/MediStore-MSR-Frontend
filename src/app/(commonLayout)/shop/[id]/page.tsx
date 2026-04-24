// !updated 23 april
// !modern design with animated background blobs and gradient shift
// import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
// import ReviewSection from "@/components/module/shop/review-section";
// import { BackgroundEffects } from "@/components/ui/background-effects";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { medicineService } from "@/service/medicine.service";
// import {
//   ArrowLeft,
//   Package,
//   ShieldCheck,
//   ShoppingBag,
//   Star,
//   Truck,
//   Clock,
//   BadgeCheck,
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

//       {/* ── Sticky mobile CTA bar ── */}
//       <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-4 bg-white/90 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/20">
//         <div className="flex items-center gap-3 max-w-lg mx-auto">
//           <div className="flex flex-col min-w-0">
//             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
//               Unit Price
//             </span>
//             <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums leading-tight">
//               ৳{medicine.price.toFixed(2)}
//             </span>
//           </div>
//           <div className="flex-1">
//             <AddToCartButton medicine={medicine} />
//           </div>
//         </div>
//       </div>

//       <div className="relative min-h-screen">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-32 lg:pb-24">

//           {/* ── Back button ── */}
//           <Link
//             href="/shop"
//             className="group inline-flex items-center gap-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-10 transition-all duration-200"
//           >
//             <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm group-hover:border-emerald-300 dark:group-hover:border-emerald-700 group-hover:-translate-x-1 transition-all duration-200">
//               <ArrowLeft className="w-3.5 h-3.5" />
//             </span>
//             Back to Shop
//           </Link>

//           {/* ── Two-column layout ── */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

//             {/* ════ LEFT — Sticky image panel ════ */}
//             <div className="lg:sticky lg:top-8 flex flex-col gap-4">

//               {/* Primary image */}
//               <div className="group relative aspect-square rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-700/40 shadow-2xl shadow-slate-300/30 dark:shadow-slate-950/60 bg-gradient-to-br from-white via-emerald-50/30 to-slate-50 dark:from-slate-800 dark:via-slate-800/70 dark:to-slate-900 flex items-center justify-center">

//                 {/* Ambient glow */}
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <div className="w-3/4 h-3/4 rounded-full bg-emerald-400/[0.07] dark:bg-emerald-400/[0.05] blur-[70px]" />
//                 </div>

//                 {/* Dot-grid texture */}
//                 <div
//                   className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
//                   style={{
//                     backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
//                     backgroundSize: "24px 24px",
//                   }}
//                 />

//                 {medicine.image ? (
//                   <img
//                     src={medicine.image}
//                     alt={medicine.name}
//                     className="relative z-10 w-full h-full object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
//                   />
//                 ) : (
//                   <Package className="relative z-10 w-24 h-24 text-emerald-300 dark:text-emerald-700 transition-transform duration-500 group-hover:scale-110" />
//                 )}

//                 {/* Authentic badge */}
//                 <div className="absolute top-4 left-4 z-20">
//                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/96 dark:bg-slate-900/96 backdrop-blur-md border border-emerald-100 dark:border-emerald-900/60 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shadow-sm">
//                     <ShieldCheck className="w-3 h-3" />
//                     Authentic
//                   </span>
//                 </div>

//                 {/* Out-of-stock overlay */}
//                 {medicine.stock <= 0 && (
//                   <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-[4px] flex items-center justify-center">
//                     <span className="bg-red-500 text-white text-[11px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
//                       Out of Stock
//                     </span>
//                   </div>
//                 )}

//                 {/* Corner highlight */}
//                 <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/25 to-transparent dark:from-white/[0.04] rounded-full pointer-events-none -translate-x-10 -translate-y-10" />
//               </div>

//               {/* Trust tiles */}
//               <div className="grid grid-cols-3 gap-3">
//                 {[
//                   { icon: Truck, label: "Fast Delivery", sub: "1–3 days" },
//                   { icon: Clock, label: "24/7 Support", sub: "Always on" },
//                   { icon: BadgeCheck, label: "Certified", sub: "Verified" },
//                 ].map(({ icon: Icon, label, sub }) => (
//                   <div
//                     key={label}
//                     className="group/tile relative flex flex-col items-center gap-2 py-5 rounded-2xl bg-white/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/40 backdrop-blur-sm hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-default"
//                   >
//                     {/* Hover gradient wash */}
//                     <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 to-transparent dark:from-emerald-950/20 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200" />
//                     <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/60 group-hover/tile:scale-110 transition-transform duration-200">
//                       <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
//                     </div>
//                     <div className="relative z-10 text-center">
//                       <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">{label}</p>
//                       <p className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ════ RIGHT — Product info ════ */}
//             <div className="flex flex-col gap-7">

//               {/* Badges + title */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 flex-wrap">
//                   {medicine.category && (
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
//                       {medicine.category.name}
//                     </span>
//                   )}
//                   {medicine.stock > 0 ? (
//                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                       In Stock
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-[10px] font-bold uppercase tracking-wider text-red-500">
//                       <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
//                       Out of Stock
//                     </span>
//                   )}
//                 </div>

//                 <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.03]">
//                   {medicine.name}
//                 </h1>

//                 {/* Manufacturer + stars */}
//                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
//                   <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
//                     by{" "}
//                     <span className="font-bold text-slate-800 dark:text-slate-200">
//                       {medicine.manufacturer}
//                     </span>
//                   </p>
//                   <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700" />
//                   <div className="flex items-center gap-1.5">
//                     <div className="flex gap-0.5">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-3.5 h-3.5 ${
//                             i < 4
//                               ? "text-amber-400 fill-amber-400"
//                               : "text-slate-200 dark:text-slate-700"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
//                       {medicine.reviews?.length ?? 0} reviews
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Divider */}
//               <div className="h-px bg-gradient-to-r from-emerald-200/70 via-slate-200/50 to-transparent dark:from-emerald-800/40 dark:via-slate-700/30" />

//               {/* Description */}
//              <div className="relative rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 p-6 backdrop-blur-sm overflow-hidden">{/* Left accent bar */}
//                 <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-500 rounded-l-2xl" />
//                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] pl-3">
//                   {medicine.description}
//                 </p>
//               </div>

//               {/* ── Price card ── */}
//               <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-emerald-700/20 dark:shadow-emerald-900/40">
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700" />
//                 {/* Glow orbs */}
//                 <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 blur-3xl translate-x-16 -translate-y-16 pointer-events-none" />
//                 <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-teal-300/10 blur-2xl -translate-x-8 translate-y-8 pointer-events-none" />

//                 <div className="relative px-7 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
//                   <div className="space-y-1">
//                     <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200/80">
//                       Unit Price
//                     </p>
//                     <span className="text-5xl font-black text-white leading-none tabular-nums block">
//                       ৳{medicine.price.toFixed(2)}
//                     </span>
//                     <p className="text-[11px] text-emerald-200/60 font-medium">
//                       Cash on Delivery
//                     </p>
//                   </div>

//                   <div className="flex flex-col items-start sm:items-end gap-2.5">
//                     <span
//                       className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-md ${
//                         medicine.stock > 0
//                           ? "bg-white text-emerald-700"
//                           : "bg-red-100/90 text-red-600"
//                       }`}
//                     >
//                       {medicine.stock > 0 ? (
//                         <>
//                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                           {medicine.stock} units left
//                         </>
//                       ) : (
//                         "Out of Stock"
//                       )}
//                     </span>
//                     {medicine.seller && (
//                       <p className="text-[10px] text-emerald-200/60 font-semibold uppercase tracking-wide">
//                         Sold by {medicine.seller.name}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* ── Action buttons — desktop only ── */}
//               <div className="hidden lg:flex flex-col sm:flex-row gap-3">
//                 <div className="flex-1">
//                   <AddToCartButton medicine={medicine} />
//                 </div>

//                 <Button
//                   asChild
//                   size="lg"
//                   variant="outline"
//                   className="flex-1 h-12 rounded-xl font-bold text-sm tracking-wide border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm text-slate-800 dark:text-white hover:border-emerald-400 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
//                 >
//                   <Link href="/cart" className="flex items-center justify-center gap-2">
//                     <ShoppingBag className="w-4 h-4" />
//                     View Cart
//                   </Link>
//                 </Button>
//               </div>

//               {/* Reassurance strip */}
//               <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
//                 {[
//                   { icon: ShieldCheck, text: "Secure checkout" },
//                   { icon: Truck, text: "Free delivery over ৳500" },
//                   { icon: BadgeCheck, text: "Certified products" },
//                 ].map(({ icon: Icon, text }) => (
//                   <div key={text} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
//                     <Icon className="w-3.5 h-3.5 text-emerald-500" />
//                     {text}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── Reviews section ── */}
//           <div className="mt-12 relative rounded-3xl border border-slate-200/60 dark:border-slate-700/40 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl shadow-slate-200/30 dark:shadow-slate-950/40 overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

//             <div className="p-6 sm:p-10">

//               {/* Reviews header */}
//               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
//                 <div className="space-y-2">
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
//                     <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
//                     Verified Reviews
//                   </div>
//                   <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
//                     Customer Reviews
//                   </h2>
//                   <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
//                     Real experiences from verified buyers
//                   </p>
//                 </div>

//                 {medicine.reviews && medicine.reviews.length > 0 && (
//                   <div className="flex-shrink-0 flex items-center gap-5 px-5 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 shadow-sm backdrop-blur-sm">
//                     <div className="text-center">
//                       <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums leading-none">
//                         {medicine.reviews.length}
//                       </p>
//                       <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">
//                         {medicine.reviews.length === 1 ? "Review" : "Reviews"}
//                       </p>
//                     </div>
//                     <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />
//                     {/* Star breakdown */}
//                     <div className="flex flex-col gap-1">
//                       {[5, 4, 3, 2, 1].map((star) => {
//                         const count = medicine.reviews.filter(
//                           (r: { rating: number }) => r.rating === star
//                         ).length;
//                         const pct = medicine.reviews.length
//                           ? (count / medicine.reviews.length) * 100
//                           : 0;
//                         return (
//                           <div key={star} className="flex items-center gap-1.5">
//                             <span className="text-[9px] font-bold text-slate-400 w-2 tabular-nums">{star}</span>
//                             <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
//                               <div
//                                 className="h-full rounded-full bg-amber-400 transition-all duration-500"
//                                 style={{ width: `${pct}%` }}
//                               />
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="h-px mb-8 bg-gradient-to-r from-amber-200/60 via-slate-200/50 to-transparent dark:from-amber-800/30 dark:via-slate-700/30" />

//               <ReviewSection medicineId={id} />
//             </div>

//             <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-600/30 to-transparent" />
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// ! UI ONLY UPDATE (Apple-style dark mode consistency)

import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
import ReviewSection from "@/components/module/shop/review-section";
import { BackgroundEffects } from "@/components/ui/background-effects";
import { Button } from "@/components/ui/button";
import { medicineService } from "@/service/medicine.service";
import {
  ArrowLeft,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Clock,
  BadgeCheck,
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

  const medicine = data.data;

  return (
    <>
      <BackgroundEffects />

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-4
        bg-white/80 dark:bg-black/60
        backdrop-blur-2xl
        border-t border-slate-200/60 dark:border-white/10
        shadow-lg shadow-slate-200/60 dark:shadow-none">

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

      <div className="min-h-screen relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-32">

          {/* Back */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold
            text-slate-600 dark:text-slate-400
            hover:text-emerald-500 dark:hover:text-emerald-400 mb-10"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full
              bg-white/80 dark:bg-white/5
              border border-slate-200/60 dark:border-white/10
              shadow-sm">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT */}
            <div className="lg:sticky lg:top-8 flex flex-col gap-4">

              {/* IMAGE CARD */}
              <div className="relative aspect-square rounded-3xl overflow-hidden
                bg-white/80 dark:bg-white/5
                border border-slate-200/60 dark:border-white/10
                shadow-lg shadow-slate-200/60 dark:shadow-none
                backdrop-blur-2xl">

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-emerald-400/10 blur-[90px]" />
                </div>

                {medicine.image ? (
                  <img
                    src={medicine.image}
                    className="relative z-10 w-full h-full object-contain p-10"
                  />
                ) : (
                  <Package className="w-24 h-24 text-emerald-500" />
                )}

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase
                    bg-white/80 dark:bg-white/10
                    border border-slate-200/60 dark:border-white/10
                    rounded-full
                    text-emerald-600 dark:text-emerald-400
                    backdrop-blur-xl flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Authentic
                  </span>
                </div>

                {medicine.stock <= 0 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-black">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* TRUST CARDS */}
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { icon: Truck, label: "Fast", sub: "1–3 days" },
                  { icon: Clock, label: "24/7", sub: "Support" },
                  { icon: BadgeCheck, label: "Verified", sub: "Safe" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="group relative flex flex-col items-center py-5 rounded-2xl
                    bg-white/80 dark:bg-white/5
                    border border-slate-200/60 dark:border-white/10
                    shadow-sm hover:shadow-md shadow-slate-200/50 dark:shadow-none
                    backdrop-blur-2xl
                    transition-all duration-300
                    hover:-translate-y-1"
                  >
                    <Icon className="w-4 h-4 text-emerald-500" />
                    <p className="text-xs font-bold mt-2 text-slate-800 dark:text-white">
                      {label}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-7">

              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                {medicine.name}
              </h1>

              {/* DESCRIPTION */}
              <div className="rounded-2xl p-6
                bg-white/80 dark:bg-white/5
                border border-slate-200/60 dark:border-white/10
                shadow-sm dark:shadow-none
                backdrop-blur-2xl
                text-slate-700 dark:text-slate-300">
                {medicine.description}
              </div>

              {/* PRICE */}
              <div className="rounded-2xl p-6 bg-emerald-600 text-white shadow-md text-center">
                <p className="text-sm uppercase opacity-80">Price</p>
                <p className="text-4xl font-black">
                  ৳{medicine.price.toFixed(2)}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">

                <div className="flex-1 shadow-md shadow-slate-200/50 dark:shadow-none">
                  <AddToCartButton medicine={medicine} />
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-xl flex-1
                  bg-white/80 dark:bg-white/5
                  border-slate-200/60 dark:border-white/10
                  shadow-sm hover:shadow-md shadow-slate-200/50 dark:shadow-none
                  backdrop-blur-xl
                  hover:bg-white dark:hover:bg-white/10"
                >
                  <Link href="/cart" className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Cart
                  </Link>
                </Button>

              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-12 rounded-3xl p-6
            bg-white/80 dark:bg-white/5
            border border-slate-200/60 dark:border-white/10
            shadow-sm dark:shadow-none
            backdrop-blur-2xl">

            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Customer Reviews
            </h2>

            <ReviewSection medicineId={id} />
          </div>

        </div>
      </div>
    </>
  );
}