"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, Package } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CartContent() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground">
          Add some medicines to get started
        </p>
        <Button
          asChild
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Link href="/shop">Browse Medicines</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Cart items */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {items.map((item) => (
          <Card
            key={item.medicine.id}
            className="border border-gray-100 dark:border-gray-800"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">

                {/* Medicine image */}
                <div className="w-20 h-20 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 overflow-hidden">
                  {item.medicine.image ? (
                    <img
                      src={item.medicine.image}
                      alt={item.medicine.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-8 h-8 text-emerald-300" />
                  )}
                </div>

                {/* Medicine info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {item.medicine.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.medicine.manufacturer}
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                    ৳{item.medicine.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity controls + remove */}
                <div className="flex flex-col items-end gap-3">
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.medicine.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                      disabled={item.quantity >= item.medicine.stock}
                      className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Item total */}
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ৳{(item.medicine.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Clear cart */}
        <button
          onClick={clearCart}
          className="text-sm text-destructive hover:underline self-start"
        >
          Clear entire cart
        </button>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <Card className="border border-gray-100 dark:border-gray-800 sticky top-4">
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Items ({totalItems})</span>
                <span>৳{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Payment</span>
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                ৳{totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={() => router.push("/checkout")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="lg"
            >
              Proceed to Checkout
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}