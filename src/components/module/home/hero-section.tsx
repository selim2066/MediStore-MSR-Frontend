// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Search, Shield, Truck, Clock } from "lucide-react"
// import Link from "next/link"

// export function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 py-20 md:py-32">

//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-200/30 dark:bg-emerald-800/20 blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-200/30 dark:bg-teal-800/20 blur-3xl" />
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="max-w-3xl mx-auto text-center">

//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
//             <Shield className="w-4 h-4" />
//             Trusted OTC Medicine Store
//           </div>

//           {/* Headline */}
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
//             Your Health,{" "}
//             <span className="text-emerald-600 dark:text-emerald-400">
//               Delivered Fast
//             </span>
//           </h1>

//           {/* Subheadline */}
//           <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
//             Browse thousands of over-the-counter medicines from trusted sellers.
//             Order from home, get it delivered to your door.
//           </p>

//           {/* Search bar */}
//           <div className="flex gap-2 max-w-xl mx-auto mb-10">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search medicines, brands..."
//                 className="pl-10 h-12 bg-white dark:bg-gray-900 border-emerald-200 dark:border-emerald-800"
//               />
//             </div>
//             <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-6">
//               <Link href="/shop">Search</Link>
//             </Button>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-wrap gap-4 justify-center mb-16">
//             <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
//               <Link href="/shop">Browse All Medicines</Link>
//             </Button>
//             <Button asChild size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950">
//               <Link href="/register">Become a Seller</Link>
//             </Button>
//           </div>

//           {/* Trust badges */}
//           <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
//             <div className="flex items-center gap-2">
//               <Truck className="w-4 h-4 text-emerald-600" />
//               Fast Delivery
//             </div>
//             <div className="flex items-center gap-2">
//               <Shield className="w-4 h-4 text-emerald-600" />
//               Verified Sellers
//             </div>
//             <div className="flex items-center gap-2">
//               <Clock className="w-4 h-4 text-emerald-600" />
//               24/7 Available
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Pill, PlusCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#f8fafc] dark:bg-gray-950 px-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Verified Pharmacy
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6">
              Your Health, <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Reimagined.
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
              Skip the queue. Access premium healthcare essentials and OTC
              medicines from certified sellers, delivered with care to your
              doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                {/* <Input
                  placeholder="Find your medicine..."
                  className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-xl focus:ring-emerald-500"
                /> */}
                <Input
                  placeholder="Find your medicine..."
                  className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-xl focus:ring-emerald-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              {/* <Button
                size="lg"
                className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
              >
                Search
              </Button> */}
              <Button
                size="lg"
                onClick={handleSearch}
                className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Right: Interactive Visual (Glassmorphism) */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative z-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-500 p-6 rounded-3xl text-white space-y-4 shadow-lg shadow-emerald-500/30">
                  <Activity className="w-10 h-10" />
                  <p className="font-bold text-xl leading-tight">
                    Health Tracking Enabled
                  </p>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4">
                  <Pill className="w-10 h-10 text-emerald-400" />
                  <p className="font-bold text-xl leading-tight">
                    12k+ Products
                  </p>
                </div>
                <div className="col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-slate-600">
                    Joined by 50k+ Happy Patients
                  </p>
                </div>
              </div>
            </div>
            {/* Floating Accents */}
            <div className="absolute -top-10 -right-10 animate-bounce delay-700">
              <PlusCircle className="w-20 h-20 text-emerald-500/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
