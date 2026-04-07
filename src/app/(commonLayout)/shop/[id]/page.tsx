
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { medicineService } from "@/service/medicine.service"
import { AddToCartButton } from "@/components/module/shop/add-to-cart-button"

export default async function MedicineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data, error } = await medicineService.getMedicineById(id)

  if (error || !data?.data) return notFound()

  const medicine = data.data

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Back button */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* Image */}
        <div className="h-80 md:h-full min-h-64 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center overflow-hidden">
          {medicine.image ? (
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="w-24 h-24 text-emerald-300 dark:text-emerald-700" />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          {/* Category badge */}
          {medicine.category && (
            <Badge
              variant="secondary"
              className="w-fit bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
            >
              {medicine.category.name}
            </Badge>
          )}

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {medicine.name}
          </h1>

          <p className="text-sm text-muted-foreground">
            by{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {medicine.manufacturer}
            </span>
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {medicine.description}
          </p>

          {/* Price and stock */}
          <div className="flex items-center gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ৳{medicine.price.toFixed(2)}
            </span>
            <Badge
              variant={medicine.stock > 0 ? "secondary" : "destructive"}
              className="text-sm"
            >
              {medicine.stock > 0 ? `${medicine.stock} in stock` : "Out of Stock"}
            </Badge>
          </div>

          {/* Seller info */}
          {medicine.seller && (
            <p className="text-sm text-muted-foreground">
              Sold by{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {medicine.seller.name}
              </span>
            </p>
          )}

          {/* Add to cart */}
          <AddToCartButton medicine={medicine} />

          {/* View cart */}
          <Button
            asChild
            variant="outline"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
          >
            <Link href="/cart">View Cart</Link>
          </Button>
        </div>
      </div>

      {/* Reviews section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Customer Reviews
        </h2>

        {medicine.reviews?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            No reviews yet. Be the first to review this medicine!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {medicine.reviews?.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 dark:text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {review.rating}/5
                  </span>
                </div>
                {review.comment && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}