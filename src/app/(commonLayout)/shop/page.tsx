import { AddToCartButton } from "@/components/module/shop/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { categoryService } from "@/service/category.service";
import { medicineService } from "@/service/medicine.service";
import { Info } from "lucide-react";
import Link from "next/link";
// Import your relation type
import { MedicineImage } from "@/components/module/shop/medicine-image";
import { MedicineWithRelations } from "@/types";

export default async function ShopPage() {
  const [medicinesRes, categoriesRes] = await Promise.all([
    medicineService.getMedicines({}, { cache: "no-store" }),
    categoryService.getCategories(),
  ]);

  //* Cast the data to the relation type so .category works
  const medicines =
    (medicinesRes.data?.data?.data as MedicineWithRelations[]) || [];
  const categories = categoriesRes.data?.data || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pb-20 mx-10">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-none mb-3 px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
              Inventory
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              All Medicines
            </h1>
            <p className="text-slate-500 mt-2 font-medium italic">
              {medicines.length} products found
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 flex-wrap mb-12">
          <Button
            asChild
            variant="ghost"
            className="rounded-full px-6 font-bold bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-emerald-600 hover:text-white transition-all"
          >
            <Link href="/shop">All</Link>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              asChild
              variant="ghost"
              className="rounded-full px-6 font-bold bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-emerald-600 hover:text-white transition-all"
            >
              <Link href={`/shop?categoryId=${category.id}`}>
                {category.name}
              </Link>
            </Button>
          ))}
        </div>

        {/* Grid */}
        {medicines.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            No medicines available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {medicines.map((medicine: MedicineWithRelations) => (
              <Card
                key={medicine.id}
                className="group relative flex flex-col  bg-white dark:bg-slate-900 rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] rounded-[2rem] bg-slate-50 dark:bg-slate-950 overflow-hidden">
                  {/* <MedicineImage
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-full object-contain p-4"
                  /> */}
                  <MedicineImage
                    src={
                      medicine.image ? `/${medicine.image}` : "/Metformin.avif"
                    }
                    alt={medicine.name}
                    className="w-full h-full object-contain p-4"
                  />

                  {/* Floating Price */}
                  <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm">
                    <span className="text-sm font-bold text-emerald-600">
                      ৳{medicine.price.toFixed(2)}
                    </span>
                  </div>

                  {medicine.stock <= 0 && (
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                      <Badge className="bg-red-500 text-white px-3 py-1 rounded-full">
                        OUT OF STOCK
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 pt-2 flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 opacity-80 mb-1">
                    {/* Fixed property access by using MedicineWithRelations */}
                    {medicine.category?.name || "General"}
                  </p>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white truncate">
                    {medicine.name}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium truncate italic underline underline-offset-4 decoration-slate-100 dark:decoration-slate-800">
                    by {medicine.manufacturer}
                  </p>
                </CardContent>

                <CardFooter className="p-6  pt-5 flex gap-3">
                  {/* Semantic Button Pair: Details (Square) + Add to Cart (Wide) */}
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 w-12 p-0 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0 shadow-sm transition-all"
                  >
                    <Link href={`/shop/${medicine.id}`}>
                      <Info className="w-5 h-5 text-slate-500" />
                    </Link>
                  </Button>

                  <AddToCartButton
                    medicine={medicine}
                    className="h-12 rounded-2xl text-xs font-black tracking-tighter shadow-lg shadow-emerald-600/10"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
