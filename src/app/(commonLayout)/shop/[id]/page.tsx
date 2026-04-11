// // // import { Badge } from "@/components/ui/badge"
// // // import { Button } from "@/components/ui/button"
// // // import { Package, Star, ArrowLeft } from "lucide-react"
// // // import Link from "next/link"
// // // import { notFound } from "next/navigation"
// // // import { medicineService } from "@/service/medicine.service"
// // // import { AddToCartButton } from "@/components/module/shop/add-to-cart-button"

// // // export default async function MedicineDetailPage({
// // //   params,
// // // }: {
// // //   params: Promise<{ id: string }>
// // // }) {
// // //   const { id } = await params
// // //   const { data, error } = await medicineService.getMedicineById(id)

// // //   if (error || !data?.data) return notFound()

// // //   const medicine = data.data

// // //   return (
// // //     <div className="container mx-auto px-4 py-10">

// // //       {/* Back button */}
// // //       <Link
// // //         href="/shop"
// // //         className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
// // //       >
// // //         <ArrowLeft className="w-4 h-4" />
// // //         Back to Shop
// // //       </Link>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

// // //         {/* Image */}
// // //         <div className="h-80 md:h-full min-h-64 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center overflow-hidden">
// // //           {medicine.image ? (
// // //             <img
// // //               src={medicine.image}
// // //               alt={medicine.name}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <Package className="w-24 h-24 text-emerald-300 dark:text-emerald-700" />
// // //           )}
// // //         </div>

// // //         {/* Details */}
// // //         <div className="flex flex-col gap-4">
// // //           {/* Category badge */}
// // //           {medicine.category && (
// // //             <Badge
// // //               variant="secondary"
// // //               className="w-fit bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
// // //             >
// // //               {medicine.category.name}
// // //             </Badge>
// // //           )}

// // //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
// // //             {medicine.name}
// // //           </h1>

// // //           <p className="text-sm text-muted-foreground">
// // //             by{" "}
// // //             <span className="font-medium text-gray-700 dark:text-gray-300">
// // //               {medicine.manufacturer}
// // //             </span>
// // //           </p>

// // //           <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
// // //             {medicine.description}
// // //           </p>

// // //           {/* Price and stock */}
// // //           <div className="flex items-center gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
// // //             <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
// // //               ৳{medicine.price.toFixed(2)}
// // //             </span>
// // //             <Badge
// // //               variant={medicine.stock > 0 ? "secondary" : "destructive"}
// // //               className="text-sm"
// // //             >
// // //               {medicine.stock > 0 ? `${medicine.stock} in stock` : "Out of Stock"}
// // //             </Badge>
// // //           </div>

// // //           {/* Seller info */}
// // //           {medicine.seller && (
// // //             <p className="text-sm text-muted-foreground">
// // //               Sold by{" "}
// // //               <span className="font-medium text-gray-700 dark:text-gray-300">
// // //                 {medicine.seller.name}
// // //               </span>
// // //             </p>
// // //           )}

// // //           {/* Add to cart */}
// // //           <AddToCartButton medicine={medicine} />

// // //           {/* View cart */}
// // //           <Button
// // //             asChild
// // //             variant="outline"
// // //             className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
// // //           >
// // //             <Link href="/cart">View Cart</Link>
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       {/* Reviews section */}
// // //       <div>
// // //         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
// // //           Customer Reviews
// // //         </h2>

// // //         {medicine.reviews?.length === 0 ? (
// // //           <div className="text-center py-12 text-muted-foreground border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
// // //             No reviews yet. Be the first to review this medicine!
// // //           </div>
// // //         ) : (
// // //           <div className="flex flex-col gap-4">
// // //             {medicine.reviews?.map((review) => (
// // //               <div
// // //                 key={review.id}
// // //                 className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
// // //               >
// // //                 <div className="flex items-center gap-3 mb-3">
// // //                   {/* Stars */}
// // //                   <div className="flex gap-0.5">
// // //                     {Array.from({ length: 5 }).map((_, i) => (
// // //                       <Star
// // //                         key={i}
// // //                         className={`w-4 h-4 ${
// // //                           i < review.rating
// // //                             ? "text-yellow-400 fill-yellow-400"
// // //                             : "text-gray-200 dark:text-gray-700"
// // //                         }`}
// // //                       />
// // //                     ))}
// // //                   </div>
// // //                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     {review.rating}/5
// // //                   </span>
// // //                 </div>
// // //                 {review.comment && (
// // //                   <p className="text-gray-600 dark:text-gray-400">
// // //                     {review.comment}
// // //                   </p>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // import { Badge } from "@/components/ui/badge"
// // import { Button } from "@/components/ui/button"
// // import { Package, Star, ArrowLeft, ShieldCheck, Truck, Clock, Info } from "lucide-react"
// // import Link from "next/link"
// // import { notFound } from "next/navigation"
// // import { medicineService } from "@/service/medicine.service"
// // import { AddToCartButton } from "@/components/module/shop/add-to-cart-button"

// // // High-quality medical placeholder
// // const DEFAULT_MEDICINE_IMG = "/medi02.avif"

// // export default async function MedicineDetailPage({
// //   params,
// // }: {
// //   params: Promise<{ id: string }>
// // }) {
// //   const { id } = await params
// //   const { data, error } = await medicineService.getMedicineById(id)

// //   if (error || !data?.data) return notFound()

// //   const medicine = data.data

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pb-20">
// //       <div className="container mx-auto px-4 py-10">

// //         {/* Back button */}
// //         <Link
// //           href="/shop"
// //           className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 mb-10 transition-all"
// //         >
// //           <div className="p-2 rounded-full bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-md group-hover:-translate-x-1 transition-all">
// //             <ArrowLeft className="w-4 h-4" />
// //           </div>
// //           Back to Shop
// //         </Link>

// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

// //           {/* Left Side: Image Gallery Style */}
// //           <div className="lg:col-span-5 space-y-4">
// //             <div className="relative aspect-square bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
// //               <img
// //                 src={medicine.image || DEFAULT_MEDICINE_IMG}
// //                 alt={medicine.name}
// //                 className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform hover:scale-105 transition-transform duration-500"
// //               />

// //               {/* Trust Badge overlay */}
// //               <div className="absolute top-6 left-6">
// //                 <Badge className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border-none px-4 py-1.5 backdrop-blur-md font-bold flex gap-2">
// //                   <ShieldCheck className="w-4 h-4" /> 100% Authentic
// //                 </Badge>
// //               </div>
// //             </div>

// //             {/* Quick trust info */}
// //             <div className="grid grid-cols-3 gap-4">
// //                {[
// //                  { icon: Truck, label: "Fast Delivery" },
// //                  { icon: Clock, label: "24/7 Support" },
// //                  { icon: Info, label: "Detailed Info" }
// //                ].map((item, i) => (
// //                  <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2 text-center">
// //                     <item.icon className="w-5 h-5 text-emerald-500" />
// //                     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
// //                  </div>
// //                ))}
// //             </div>
// //           </div>

// //           {/* Right Side: Product Information */}
// //           <div className="lg:col-span-7 flex flex-col gap-6">
// //             <div className="space-y-2">
// //               {medicine.category && (
// //                 <Badge variant="outline" className="px-4 py-1 rounded-full border-emerald-200 dark:border-emerald-800 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
// //                   {medicine.category.name}
// //                 </Badge>
// //               )}
// //               <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
// //                 {medicine.name}
// //               </h1>
// //               <div className="flex items-center gap-4">
// //                 <p className="text-lg text-slate-500 font-medium">
// //                   Manufactured by <span className="text-emerald-600 font-bold underline decoration-emerald-200 underline-offset-4">{medicine.manufacturer}</span>
// //                 </p>
// //                 <div className="h-4 w-[1px] bg-slate-200" />
// //                 <div className="flex items-center gap-1 text-amber-500">
// //                   <Star className="w-4 h-4 fill-amber-500" />
// //                   <span className="text-sm font-black">4.9</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
// //               <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
// //                 `{medicine.description}
// //               </p>
// //             </div>

// //             {/* Price Card */}
// //             <div className="p-8 bg-emerald-600 rounded-[2rem] text-white shadow-xl shadow-emerald-600/20 flex flex-col md:flex-row justify-between items-center gap-6">
// //               <div className="space-y-1 text-center md:text-left">
// //                 <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest">Current Price</p>
// //                 <div className="flex items-baseline gap-3">
// //                   <span className="text-5xl font-black leading-none">৳{medicine.price.toFixed(2)}</span>
// //                   <span className="text-emerald-300 line-through font-medium opacity-80">৳{(medicine.price + 45).toFixed(2)}</span>
// //                 </div>
// //               </div>

// //               <div className="flex flex-col items-center md:items-end gap-2">
// //                  <Badge className={`${medicine.stock > 0 ? "bg-white text-emerald-600" : "bg-red-100 text-red-600"} border-none px-6 py-2 rounded-full font-black uppercase text-xs shadow-lg`}>
// //                    {medicine.stock > 0 ? `${medicine.stock} UNITS AVAILABLE` : "Sold Out"}
// //                  </Badge>
// //                  {medicine.seller && (
// //                    <p className="text-[10px] text-emerald-100 font-medium uppercase tracking-tighter">
// //                      Verified Partner: {medicine.seller.name}
// //                    </p>
// //                  )}
// //               </div>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
// //               <AddToCartButton medicine={medicine} />
// //               <Button
// //                 asChild
// //                 variant="outline"
// //                 size="lg"
// //                 className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
// //               >
// //                 <Link href="/cart">Go to Checkout</Link>
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Reviews Section */}
// //         <div className="max-w-4xl mx-auto">
// //           <div className="flex justify-between items-center mb-10">
// //             <h2 className="text-3xl font-black text-slate-900 dark:text-white">
// //               Patient Reviews
// //             </h2>
// //             <Button variant="link" className="text-emerald-600 font-bold">Write a review</Button>
// //           </div>

// //           {medicine.reviews?.length === 0 ? (
// //             <div className="group text-center py-20 px-10 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] transition-all hover:border-emerald-300">
// //               <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
// //                 <Star className="w-8 h-8 text-slate-300" />
// //               </div>
// //               <p className="text-slate-500 font-medium">No reviews yet. Be the first to share your experience!</p>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 gap-6">
// //               {medicine.reviews?.map((review) => (
// //                 <div
// //                   key={review.id}
// //                   className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
// //                 >
// //                   <div className="flex items-center justify-between mb-4">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-emerald-600">
// //                         {review.customerId?.name?.[0] || "U"}
// //                       </div>
// //                       <div className="flex flex-col">
// //                         <div className="flex gap-0.5">
// //                           {Array.from({ length: 5 }).map((_, i) => (
// //                             <Star
// //                               key={i}
// //                               className={`w-3.5 h-3.5 ${
// //                                 i < review.rating
// //                                   ? "text-amber-400 fill-amber-400"
// //                                   : "text-slate-200 dark:text-slate-700"
// //                               }`}
// //                             />
// //                           ))}
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">
// //                       {review.rating}.0 RATING
// //                     </span>
// //                   </div>
// //                   {review.comment && (
// //                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
// //                       {review.comment}
// //                     </p>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { medicineService } from "@/service/medicine.service";
// import { ArrowLeft, Package, ShoppingBag, Star } from "lucide-react";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import ReviewSection from "@/components/module/shop/review-section";

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
//     <div className="container mx-auto px-4 py-20">
//       {/* Back button */}
//       <Link
//         href="/shop"
//         className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back to Shop
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 mx-10">
//         {/* Image */}
//         <div className="h-80 md:h-full min-h-64 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center overflow-hidden">
//           {medicine.image ? (
//             <img
//               src={medicine.image}
//               alt={medicine.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <Package className="w-24 h-24 text-emerald-300 dark:text-emerald-700" />
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex flex-col gap-4">
//           {/* Category badge */}
//           {medicine.category && (
//             <Badge
//               variant="secondary"
//               className="w-fit bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
//             >
//               {medicine.category.name}
//             </Badge>
//           )}

//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             {medicine.name}
//           </h1>

//           <p className="text-sm text-muted-foreground">
//             by{" "}
//             <span className="font-medium text-gray-700 dark:text-gray-300">
//               {medicine.manufacturer}
//             </span>
//           </p>

//           <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//             {medicine.description}
//           </p>

//           {/* Price and stock */}
//           <div className="flex items-center gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
//             <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
//               ৳{medicine.price.toFixed(2)}
//             </span>
//             <Badge
//               variant={medicine.stock > 0 ? "secondary" : "destructive"}
//               className="text-sm"
//             >
//               {medicine.stock > 0
//                 ? `${medicine.stock} in stock`
//                 : "Out of Stock"}
//             </Badge>
//           </div>

//           {/* Seller info */}
//           {medicine.seller && (
//             <p className="text-sm text-muted-foreground">
//               Sold by{" "}
//               <span className="font-medium text-gray-700 dark:text-gray-300">
//                 {medicine.seller.name}
//               </span>
//             </p>
//           )}

//           {/* Add to cart */}
//           <AddToCartButton medicine={medicine} />

//           {/* View cart */}
//           <Button
//             asChild
//             size="lg"
//             variant="outline"
//             className="
//     h-12 w-full rounded-xl font-semibold text-sm tracking-wide
//     border-2 border-emerald-600 dark:border-emerald-500
//     text-emerald-700 dark:text-emerald-400
//     hover:bg-emerald-50 dark:hover:bg-emerald-950/50
//     active:scale-[0.98] transition-all duration-150
//     shadow-sm
//   "
//           >
//             <Link href="/cart">
//               <ShoppingBag className="w-4 h-4" />
//               View Cart
//             </Link>
//           </Button>
//         </div>
//       </div>

//       {/* Reviews section */}
      
//       <ReviewSection medicineId={id} />
//     </div>
//   );
// }


// !modern design with animated background blobs and gradient shift
import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
import ReviewSection from "@/components/module/shop/review-section";
import { BackgroundEffects } from "@/components/ui/background-effects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { medicineService } from "@/service/medicine.service";
import {
  ArrowLeft,
  Package,
  ShieldCheck,
  ShoppingBag,
  Star,
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

      <div className="relative min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">

          {/* ── Back button ── */}
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-10 transition-all duration-200"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm group-hover:border-emerald-300 dark:group-hover:border-emerald-700 group-hover:-translate-x-1 transition-all duration-200">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            Back to Shop
          </Link>

          {/* ── Main glass card ── */}
          <div className="relative rounded-3xl border border-white/60 dark:border-slate-700/40 bg-white/55 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-slate-200/40 dark:shadow-slate-950/60 overflow-hidden">
            {/* Top edge highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                {/* ════ LEFT — Image panel ════ */}
                <div className="flex flex-col gap-5">
                  {/* Main image */}
                  <div className="group relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/40 to-blue-50/30 dark:from-slate-800 dark:via-slate-800/60 dark:to-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center">
                    {/* Glow behind product */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2/3 h-2/3 rounded-full bg-emerald-400/10 dark:bg-emerald-400/5 blur-3xl" />
                    </div>

                    {medicine.image ? (
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="relative z-10 w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <Package className="relative z-10 w-24 h-24 text-emerald-300 dark:text-emerald-700 transition-transform duration-500 group-hover:scale-110" />
                    )}

                    {/* Authenticity badge overlay */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-100 dark:border-emerald-900/60 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shadow-sm">
                        <ShieldCheck className="w-3 h-3" />
                        100% Authentic
                      </span>
                    </div>
                  </div>

                  {/* Trust tiles */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Truck, label: "Fast Delivery" },
                      { icon: Clock, label: "24/7 Support" },
                      { icon: BadgeCheck, label: "Certified" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40 backdrop-blur-sm hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-sm transition-all duration-200"
                      >
                        <Icon className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ════ RIGHT — Product info ════ */}
                <div className="flex flex-col gap-6">

                  {/* Category + title */}
                  <div className="space-y-3">
                    {medicine.category && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                        {medicine.category.name}
                      </span>
                    )}

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                      {medicine.name}
                    </h1>

                    {/* Manufacturer + stars row */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        by{" "}
                        <span className="font-bold text-slate-700 dark:text-slate-300 underline underline-offset-4 decoration-emerald-300 dark:decoration-emerald-700">
                          {medicine.manufacturer}
                        </span>
                      </p>

                      <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700" />

                      {/* Static stars UI — display only */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < 4
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-200 dark:text-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                          {medicine.reviews?.length ?? 0} reviews
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-emerald-200/60 via-slate-200/60 to-transparent dark:from-emerald-800/40 dark:via-slate-700/40" />

                  {/* Description */}
                  <div className="rounded-2xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 p-5 backdrop-blur-sm">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                      {medicine.description}
                    </p>
                  </div>

                  {/* ── Price card ── */}
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Gradient bg */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 dark:from-emerald-700 dark:via-emerald-700 dark:to-teal-700" />
                    {/* Subtle inner glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-2xl translate-x-10 -translate-y-10 pointer-events-none" />

                    <div className="relative px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-200">
                          Unit Price
                        </p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-black text-white leading-none tabular-nums">
                            ৳{medicine.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end gap-2">
                        <span
                          className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm ${
                            medicine.stock > 0
                              ? "bg-white text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {medicine.stock > 0
                            ? `${medicine.stock} units in stock`
                            : "Out of Stock"}
                        </span>
                        {medicine.seller && (
                          <p className="text-[10px] text-emerald-200 font-semibold uppercase tracking-wide">
                            Sold by {medicine.seller.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                 {/* ── Action buttons ── */}
<div className="flex flex-col sm:flex-row gap-3 mt-1">

  {/* Add to cart */}
  <div className="flex-1">
    <AddToCartButton medicine={medicine} />
  </div>

  {/* View cart */}
  <Button
    asChild
    size="lg"
    variant="outline"
    className="
      flex-1 h-12 rounded-xl font-bold text-sm tracking-wide
      border-2 border-slate-200 dark:border-slate-700
      bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm
      text-slate-800 dark:text-white
      hover:border-emerald-400 hover:text-emerald-600
      hover:shadow-md
      hover:-translate-y-0.5
      active:translate-y-0
      transition-all duration-200
    "
  >
    <Link href="/cart" className="flex items-center justify-center gap-2">
      <ShoppingBag className="w-4 h-4" />
      View Cart
    </Link>
  </Button>

</div>
                </div>
              </div>
            </div>

            {/* Bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-600/30 to-transparent" />
          </div>

          {/* ── Reviews wrapper ── */}
          <div className="mt-8 relative rounded-3xl border border-white/60 dark:border-slate-700/40 bg-white/55 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl shadow-slate-200/30 dark:shadow-slate-950/40 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

            <div className="p-6 sm:p-10">
              {/* Reviews header */}
              <div className="flex items-end justify-between gap-4 mb-8">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    Verified Reviews
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Customer Reviews
                  </h2>
                </div>

                {medicine.reviews && medicine.reviews.length > 0 && (
                  <div className="flex-shrink-0 flex items-baseline gap-1.5 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 shadow-sm backdrop-blur-sm">
                    <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                      {medicine.reviews.length}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {medicine.reviews.length === 1 ? "review" : "reviews"}
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px mb-8 bg-gradient-to-r from-emerald-200/60 via-slate-200/60 to-transparent dark:from-emerald-800/40 dark:via-slate-700/40" />

              {/* ReviewSection is untouched — just rendered in context */}
              <ReviewSection medicineId={id} />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-600/30 to-transparent" />
          </div>

        </div>
      </div>
    </>
  );
}