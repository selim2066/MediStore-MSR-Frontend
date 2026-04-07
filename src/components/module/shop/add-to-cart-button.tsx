"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { Medicine } from "@/types"
import { ShoppingCart, Check } from "lucide-react"
import { toast } from "sonner"

export function AddToCartButton({ medicine }: { medicine: Medicine }) {
  const { addToCart, isInCart } = useCart()
  const alreadyInCart = isInCart(medicine.id)

  const handleAddToCart = () => {
    if (medicine.stock <= 0) return
    addToCart(medicine, 1)
    toast.success(`${medicine.name} added to cart!`)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={medicine.stock <= 0 || alreadyInCart}
      size="sm"
      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      {alreadyInCart ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          Added
        </>
      ) : medicine.stock <= 0 ? (
        "Out of Stock"
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-1" />
          Add
        </>
      )}
    </Button>
  )
}