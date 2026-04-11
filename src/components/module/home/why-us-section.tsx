"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Truck, Clock3, Star, PackageCheck, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Sellers",
    description: "Every vendor is strictly vetted. We ensure medicine quality and source authenticity.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Fast dispatch with Cash on Delivery options. Reliable tracking straight to your doorstep.",
  },
  {
    icon: Clock3,
    title: "24/7 Ordering",
    description: "Browse and place orders anytime. Our platform never sleeps, prioritizing your health.",
  },
  {
    icon: Star,
    title: "Genuine Reviews",
    description: "Read honest, verified feedback from real customers to make informed healthcare decisions.",
  },
  {
    icon: PackageCheck,
    title: "Wide OTC Selection",
    description: "Thousands of non-prescription healthcare products across multiple categories.",
  },
  {
    icon: HeartPulse,
    title: "Your Health First",
    description: "Strictly adhering to safety standards. We only list permitted over-the-counter medicines.",
  },
];

export function WhyUsSection() {
  const [hasAppeared, setHasAppeared] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAppeared(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 bg-white dark:bg-slate-950 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Why MediStore?
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            A pharmacy experience <br className="hidden md:block" /> that actually cares.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            We&apos;ve redesigned the way you access healthcare essentials. 
            No more queues, just pure reliability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={cn(
                "group relative p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:border-emerald-500/50",
                // INLINE ANIMATION LOGIC:
                // If not appeared: invisible and moved right. 
                // If appeared: use CSS transition to slide in.
                hasAppeared 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-y-20"
              )}
              style={{
                // Staggered delay using standard CSS transition-delay
                transitionDelay: `${idx * 1050}ms`,
                transitionProperty: "all",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <feature.icon className="h-7 w-7" strokeWidth={2} />
              </div>

              {/* Text Content */}
              <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-tr-[2rem] -z-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// import { Button } from "@/components/ui/button"
// import { Shield, Truck, Clock, Star, Package, HeartPulse } from "lucide-react"

// const features = [
//   {
//     icon: Shield,
//     title: "Verified Sellers",
//     description:
//       "All sellers are verified and trusted. Every medicine listed meets our quality standards.",
//   },
//   {
//     icon: Truck,
//     title: "Fast Delivery",
//     description:
//       "Cash on delivery available. Get your medicines delivered straight to your doorstep.",
//   },
//   {
//     icon: Clock,
//     title: "24/7 Availability",
//     description:
//       "Browse and order anytime. Our platform is available around the clock for your convenience.",
//   },
//   {
//     icon: Star,
//     title: "Genuine Reviews",
//     description:
//       "Read honest reviews from real customers before making your purchase decision.",
//   },
//   {
//     icon: Package,
//     title: "Wide Selection",
//     description:
//       "Thousands of OTC medicines across multiple categories all in one place.",
//   },
//   {
//     icon: HeartPulse,
//     title: "Your Health First",
//     description:
//       "We prioritize your health and safety. Only over-the-counter medicines are listed.",
//   },
// ]

// export function WhyUsSection() {
//   return (
//     <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
//       <div className="container mx-auto px-4">

//         {/* Section header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Why Choose MediStore?
//           </h2>
//           <p className="text-muted-foreground max-w-xl mx-auto">
//             We make buying medicines online safe, simple, and reliable
//           </p>
//         </div>

//         {/* Features grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature) => (
//             <div
//               key={feature.title}
//               className="flex gap-4 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-200"
//             >
//               <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
//                 <feature.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                   {feature.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export function WhyUsSection() {
//   return (
//     <section className="py-24 bg-white dark:bg-gray-950">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
//           <div className="max-w-xl">
//             <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
//               A pharmacy experience <br/> that actually cares.
//             </h2>
//             <p className="text-slate-500 text-lg">
//               We've redesigned the way you access healthcare. No more queues, no more doubts. Just pure reliability.
//             </p>
//           </div>
//           <Button variant="outline" className="rounded-full border-slate-200 dark:border-slate-800 px-8">
//             Learn Our Process
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {features.map((feature, idx) => (
//             <div key={idx} className="group cursor-default">
//               <div className="mb-6 inline-block p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
//                 <feature.icon className="w-8 h-8" strokeWidth={1.5} />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
//               <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }