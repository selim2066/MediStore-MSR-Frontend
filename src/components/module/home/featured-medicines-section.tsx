import { medicineService } from "@/service/medicine.service"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Package } from "lucide-react"
import Link from "next/link"

export async function FeaturedMedicinesSection() {
  const { data, error } = await medicineService.getMedicines(
    { limit: "8" },
    { revalidate: 60 }
  )

  if (error || !data?.data?.length) return null

  const medicines = data.data

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Medicines
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Top quality OTC medicines from verified sellers at great prices
          </p>
        </div>

        {/* Medicines grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((medicine) => (
            <Card
              key={medicine.id}
              className="group overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-200"
            >
              {/* Medicine image */}
              <div className="relative h-48 bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center overflow-hidden">
                {medicine.image ? (
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Package className="w-16 h-16 text-emerald-300 dark:text-emerald-700" />
                )}
                {medicine.stock <= 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-1">
                  {medicine.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate mb-3">
                  {medicine.manufacturer}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ৳{medicine.price.toFixed(2)}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    Stock: {medicine.stock}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                >
                  <Link href={`/shop/${medicine.id}`}>Details</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={medicine.stock <= 0}
                >
                  <Link href={`/shop/${medicine.id}`}>
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
          >
            <Link href="/shop">View All Medicines</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}