// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { medicineService } from "@/service/medicine.service";
// import { ShoppingCart } from "lucide-react";
// import Link from "next/link";

// export async function FeaturedMedicinesSection() {
//   const { data, error } = await medicineService.getMedicines(
//     { limit: "8" },
//     { revalidate: 60 },
//   );

//   if (error || !data?.data?.data?.length) return null;

//   const medicines = data.data.data;

//   return (
//     <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         {/* Section header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Featured Medicines
//           </h2>
//           <p className="text-muted-foreground max-w-xl mx-auto">
//             Top quality OTC medicines from verified sellers at great prices
//           </p>
//         </div>

//         {/* Medicines grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-around mx-10">
//           {medicines.map((medicine) => (
            
//             // Inside your medicines.map...
//             <Card
//               key={medicine.id}
//               className="group relative bg-white dark:bg-slate-900 border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden"
//             >
//               <Link href={`/shop/${medicine.id}`} className="block">
//                 <div className="relative aspect-square bg-slate-50 dark:bg-slate-800 m-3 rounded-2xl overflow-hidden">
//                   {medicine.image ? (
//                     <img
//                       src={medicine.image}
//                       alt={medicine.name}
//                       className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700"
//                     />
//                   ) : (
//                     /* Fallback using one of your existing public files */
//                     <img
//                       src="/medicine01 blue.avif"
//                       alt="Placeholder"
//                       className="w-full h-full object-cover opacity-100 dark:opacity-80 grayscale"
//                     />
//                   )}

//                   <Badge className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-slate-900 border-none shadow-sm">
//                     {"OTC"}
//                   </Badge>
//                 </div>
//               </Link>

//               <CardContent className="px-5 pb-2">
//                 <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">
//                   {medicine.manufacturer}
//                 </p>
//                 <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 transition-colors line-clamp-1">
//                   {medicine.name}
//                 </h3>
//                 <div className="flex items-baseline gap-2 mt-2">
//                   <span className="text-2xl font-black text-slate-900 dark:text-white">
//                     ৳{medicine.price}
//                   </span>
//                   <span className="text-xs text-slate-400 line-through">
//                     ৳{medicine.price + 50}
//                   </span>
//                 </div>
//               </CardContent>

//             <CardFooter className="px-5 pb-5 pt-3">
//   <Button
//     asChild // CRITICAL: This allows the Button to act as the Link
//     className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 font-bold transition-all cursor-pointer"
//     disabled={medicine.stock <= 0}
//   >
//     {/* This ensures clicking "Quick Add" actually navigates/actions like before */}
//     <Link href={`/shop/${medicine.id}`}>
//       <ShoppingCart className="w-4 h-4 mr-2" />
//       Quick Add
//     </Link>
//   </Button>
// </CardFooter>
//             </Card>
//           ))}
//         </div>

//         {/* View all */}
//         <div className="text-center mt-10">
//           <Button
//             asChild
//             size="lg"
//             variant="outline"
//             className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
//           >
//             <Link href="/shop">View All Medicines</Link>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { medicineService } from "@/service/medicine.service";
// import { ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import { ScrollReveal } from "@/components/animations/scroll-reveal";

// export async function FeaturedMedicinesSection() {
//   const { data, error } = await medicineService.getMedicines(
//     { limit: "8" },
//     { revalidate: 60 },
//   );

//   if (error || !data?.data?.data?.length) return null;

//   const medicines = data.data.data;

//   return (
//     <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4">

//         {/* Section header — fades up first */}
//         <ScrollReveal className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Featured Medicines
//           </h2>
//           <p className="text-muted-foreground max-w-xl mx-auto">
//             Top quality OTC medicines from verified sellers at great prices
//           </p>
//         </ScrollReveal>

//         {/* Medicines grid — each card staggers in */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
//           {medicines.map((medicine, index) => (
//             <ScrollReveal
//               key={medicine.id}
//               // Each card delays by 80ms more than the previous
//               delay={index * 80}
//             >
//               <Card className="group relative bg-white dark:bg-slate-900 border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden h-full">
//                 <Link href={`/shop/${medicine.id}`} className="block">
//                   <div className="relative aspect-square bg-slate-50 dark:bg-slate-800 m-3 rounded-2xl overflow-hidden">
//                     {medicine.image ? (
//                       <img
//                         src={medicine.image}
//                         alt={medicine.name}
//                         className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700"
//                       />
//                     ) : (
//                       <img
//                         src="/medicine01 blue.avif"
//                         alt="Placeholder"
//                         className="w-full h-full object-cover opacity-100 dark:opacity-80 grayscale"
//                       />
//                     )}
//                     <Badge className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-slate-900 border-none shadow-sm">
//                       OTC
//                     </Badge>
//                   </div>
//                 </Link>

//                 <CardContent className="px-5 pb-2">
//                   <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">
//                     {medicine.manufacturer}
//                   </p>
//                   <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 transition-colors line-clamp-1">
//                     {medicine.name}
//                   </h3>
//                   <div className="flex items-baseline gap-2 mt-2">
//                     <span className="text-2xl font-black text-slate-900 dark:text-white">
//                       ৳{medicine.price}
//                     </span>
//                     <span className="text-xs text-slate-400 line-through">
//                       ৳{medicine.price + 50}
//                     </span>
//                   </div>
//                 </CardContent>

//                 <CardFooter className="px-5 pb-5 pt-3">
//                   <Button
//                     asChild
//                     className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 font-bold transition-all cursor-pointer"
//                     disabled={medicine.stock <= 0}
//                   >
//                     <Link href={`/shop/${medicine.id}`}>
//                       <ShoppingCart className="w-4 h-4 mr-2" />
//                       Quick Add
//                     </Link>
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </ScrollReveal>
//           ))}
//         </div>

//         {/* View all — rises up last */}
//         <ScrollReveal delay={100} className="text-center mt-10">
//           <Button
//             asChild
//             size="lg"
//             variant="outline"
//             className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
//           >
//             <Link href="/shop">View All Medicines</Link>
//           </Button>
//         </ScrollReveal>
//       </div>
//     </section>
//   );
// }

// ! improved version with better animations and code structure
// src/components/home/featured-medicines-section.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { medicineService } from "@/service/medicine.service";
import { ArrowRight, ShoppingCart, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

// Deterministic "brand color" per manufacturer (cycles through palette)
const BRAND_COLORS = [
  { bg: "bg-emerald-500", light: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  { bg: "bg-sky-500",     light: "bg-sky-50 dark:bg-sky-950",         text: "text-sky-600 dark:text-sky-400",         border: "border-sky-200 dark:border-sky-800"         },
  { bg: "bg-violet-500",  light: "bg-violet-50 dark:bg-violet-950",   text: "text-violet-600 dark:text-violet-400",   border: "border-violet-200 dark:border-violet-800"   },
  { bg: "bg-amber-500",   light: "bg-amber-50 dark:bg-amber-950",     text: "text-amber-600 dark:text-amber-400",     border: "border-amber-200 dark:border-amber-800"     },
  { bg: "bg-rose-500",    light: "bg-rose-50 dark:bg-rose-950",       text: "text-rose-600 dark:text-rose-400",       border: "border-rose-200 dark:border-rose-800"       },
  { bg: "bg-teal-500",    light: "bg-teal-50 dark:bg-teal-950",       text: "text-teal-600 dark:text-teal-400",       border: "border-teal-200 dark:border-teal-800"       },
];

function getBrandColor(index: number) {
  return BRAND_COLORS[index % BRAND_COLORS.length];
}

export async function FeaturedMedicinesSection() {
  const { data, error } = await medicineService.getMedicines(
    { limit: "8" },
    { revalidate: 60 },
  );

  if (error || !data?.data?.data?.length) return null;

  const medicines = data.data.data;

  return (
    <section className="py-20 md:py-8 mx-10 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16 185 129) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Section Header ── */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            {/* Pill label */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Handpicked for You
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Medicines
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 sm:mb-1"
          >
            Browse all of our offers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </ScrollReveal>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-15 gap-y-5">
          {medicines.map((medicine, index) => {
            const color = getBrandColor(index);
            return (
              <ScrollReveal key={medicine.id} delay={index * 170}>
                <Link href={`/shop/${medicine.id}`} className="block group">
                  <div
                    className={`
                      relative flex gap-5 p-5 rounded-2xl border bg-white dark:bg-slate-900
                      border-slate-100 dark:border-slate-800
                      shadow-sm hover:shadow-xl hover:-translate-y-1
                      transition-all duration-300 ease-out
                      overflow-hidden cursor-pointer
                    `}
                  >
                    {/* Hover tint overlay */}
                    <div
                      className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100
                        transition-opacity duration-3000
                        ${color.light}
                      `}
                    />

                    {/* ── Image block ── */}
                    <div
                      className={`
                        relative shrink-0 w-38 h-38 sm:w-32 sm:h-32
                        rounded-xl overflow-hidden
                        ${color.light} border ${color.border}
                        flex items-center justify-center
                        transition-transform duration-300 group-hover:scale-115
                        z-10
                      `}
                    >
                      {medicine.image ? (
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="w-full h-full object-contain p-2 mix-blend-multiply dark:mix-blend-normal"
                        />
                      ) : (
                        <img
                          src="/medicine01 blue.avif"
                          alt="Placeholder"
                          className="w-full h-full object-cover opacity-60 grayscale"
                        />
                      )}
                    </div>

                    {/* ── Content ── */}
                    <div className="flex flex-col justify-between flex-1 min-w-0 relative z-10">
                      <div>
                        {/* Trending badge on some cards */}
                        {index % 3 === 0 && (
                          <Badge className="mb-2 inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-none text-[10px] font-bold">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </Badge>
                        )}

                        <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-1">
                          {medicine.name}
                        </h3>

                        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {medicine.description ||
                            "High quality medicine from verified sellers. Trusted by thousands of customers across the country."}
                        </p>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Manufacturer chip */}
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${color.bg} shrink-0`} />
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[100px]">
                            {medicine.manufacturer}
                          </span>
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">
                              ৳{medicine.price}
                            </p>
                            <p className="text-[11px] text-slate-400 line-through">
                              ৳{medicine.price + 50}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className={`
                              shrink-0 rounded-xl h-9 px-3 font-semibold text-white
                              bg-slate-900 dark:bg-emerald-600
                              group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500
                              transition-colors duration-200 pointer-events-none
                            `}
                            disabled={medicine.stock <= 0}
                          >
                            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                            {medicine.stock <= 0 ? "Out of Stock" : "Add"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Footer CTA ── */}
        <ScrollReveal delay={120} className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-emerald-200 dark:shadow-emerald-950 transition-all hover:scale-105 duration-200"
          >
            <Link href="/shop">
              View All Medicines
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
