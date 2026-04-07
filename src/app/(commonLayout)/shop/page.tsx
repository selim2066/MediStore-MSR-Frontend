import { medicineService } from "@/service/medicine.service"
import { categoryService } from "@/service/category.service"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Package } from "lucide-react"
import Link from "next/link"
import { AddToCartButton } from "@/components/module/shop/add-to-cart-button"

export default async function ShopPage() {
  const [medicinesRes, categoriesRes] = await Promise.all([
    medicineService.getMedicines({}, { cache: "no-store" }),
    categoryService.getCategories(),
  ])

  const medicines = medicinesRes.data?.data?.data || []
  const categories = categoriesRes.data?.data || []

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Medicines
        </h1>
        <p className="text-muted-foreground">
          {medicines.length} medicines available
        </p>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link href="/shop">All</Link>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            asChild
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <Link href={`/shop?categoryId=${category.id}`}>
              {category.name}
            </Link>
          </Button>
        ))}
      </div>

      {/* Medicines grid */}
      {medicines.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No medicines found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((medicine) => (
            <Card
              key={medicine.id}
              className="group overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-48 bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
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
                  <Badge variant="secondary" className="text-xs">
                    Stock: {medicine.stock}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  <Link href={`/shop/${medicine.id}`}>Details</Link>
                </Button>
                <AddToCartButton medicine={medicine} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}