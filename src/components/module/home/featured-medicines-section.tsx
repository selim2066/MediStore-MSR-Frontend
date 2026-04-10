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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { medicineService } from "@/service/medicine.service";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export async function FeaturedMedicinesSection() {
  const { data, error } = await medicineService.getMedicines(
    { limit: "8" },
    { revalidate: 60 },
  );

  if (error || !data?.data?.data?.length) return null;

  const medicines = data.data.data;

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">

        {/* Section header — fades up first */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Medicines
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Top quality OTC medicines from verified sellers at great prices
          </p>
        </ScrollReveal>

        {/* Medicines grid — each card staggers in */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
          {medicines.map((medicine, index) => (
            <ScrollReveal
              key={medicine.id}
              // Each card delays by 80ms more than the previous
              delay={index * 80}
            >
              <Card className="group relative bg-white dark:bg-slate-900 border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden h-full">
                <Link href={`/shop/${medicine.id}`} className="block">
                  <div className="relative aspect-square bg-slate-50 dark:bg-slate-800 m-3 rounded-2xl overflow-hidden">
                    {medicine.image ? (
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src="/medicine01 blue.avif"
                        alt="Placeholder"
                        className="w-full h-full object-cover opacity-100 dark:opacity-80 grayscale"
                      />
                    )}
                    <Badge className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-slate-900 border-none shadow-sm">
                      OTC
                    </Badge>
                  </div>
                </Link>

                <CardContent className="px-5 pb-2">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">
                    {medicine.manufacturer}
                  </p>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {medicine.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      ৳{medicine.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ৳{medicine.price + 50}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 pt-3">
                  <Button
                    asChild
                    className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 font-bold transition-all cursor-pointer"
                    disabled={medicine.stock <= 0}
                  >
                    <Link href={`/shop/${medicine.id}`}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Quick Add
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* View all — rises up last */}
        <ScrollReveal delay={100} className="text-center mt-10">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
          >
            <Link href="/shop">View All Medicines</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
