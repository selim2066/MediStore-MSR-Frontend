"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Info } from "lucide-react";
import { AddToCartButton } from "./add-to-cart-button";
import { MedicineImage } from "./medicine-image";
import { MedicineWithRelations } from "@/types";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export function MedicineGrid({
  medicines,
}: {
  medicines: MedicineWithRelations[];
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {medicines.map((medicine) => (
        <motion.div key={medicine.id} variants={item}>
          <div className="group relative flex flex-col 
          bg-white/70 dark:bg-slate-900/60 
          rounded-2xl overflow-hidden 
          border border-slate-200/60 dark:border-slate-700/50 
          shadow hover:shadow-xl 
          hover:-translate-y-1 transition-all duration-300">

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-emerald-500/5" />

            <Link href={`/shop/${medicine.id}`}>
              <div className="aspect-[4/3] p-6">
                <MedicineImage
                  src={medicine.image || null}
                  alt={medicine.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold truncate">
                {medicine.name}
              </h3>

              <p className="text-xs text-gray-400">
                {medicine.manufacturer}
              </p>

              <p className="text-lg font-bold text-emerald-600">
                ৳{medicine.price.toFixed(2)}
              </p>

              <div className="flex gap-2">
                <Link href={`/shop/${medicine.id}`}>
                  <Button size="icon" variant="outline">
                    <Info className="w-4 h-4" />
                  </Button>
                </Link>

                <AddToCartButton medicine={medicine} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}