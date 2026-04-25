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