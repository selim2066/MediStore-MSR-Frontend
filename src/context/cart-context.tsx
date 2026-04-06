"use client"

import { Medicine } from "@/types"
import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

// ── Shape of a single cart item
export interface CartItem {
  medicine: Medicine
  quantity: number
}

// ── Shape of the cart context
interface CartContextType {
  items: CartItem[]
  addToCart: (medicine: Medicine, quantity?: number) => void
  removeFromCart: (medicineId: string) => void
  updateQuantity: (medicineId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isInCart: (medicineId: string) => boolean
}

// ── Create context
const CartContext = createContext<CartContextType | null>(null)

// ── Cookie key
const CART_COOKIE_KEY = "medistore-cart"

// ── Provider
export function CartProvider({ children }: { children: React.ReactNode }) {

  // Load cart from cookie on mount
 const [items, setItems] = useState<CartItem[]>(() => {
  try {
    const stored = Cookies.get(CART_COOKIE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load cart from cookie", error)
    return []
  }
})

  // Save cart to cookie whenever items change
  useEffect(() => {
    try {
      Cookies.set(CART_COOKIE_KEY, JSON.stringify(items), {
        expires: 7, // 7 days
        sameSite: "strict",
      })
    } catch (error) {
      console.error("Failed to save cart to cookie", error)
    }
  }, [items])

  // ── Add to cart
  const addToCart = (medicine: Medicine, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id)

      if (existing) {
        // Already in cart → increase quantity
        return prev.map((item) =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      // New item → add to cart
      return [...prev, { medicine, quantity }]
    })
  }

  // ── Remove from cart
  const removeFromCart = (medicineId: string) => {
    setItems((prev) =>
      prev.filter((item) => item.medicine.id !== medicineId)
    )
  }

  // ── Update quantity
  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId)
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    )
  }

  // ── Clear entire cart
  const clearCart = () => {
    setItems([])
    Cookies.remove(CART_COOKIE_KEY)
  }

  // ── Derived values
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  )

  const isInCart = (medicineId: string) => {
    return items.some((item) => item.medicine.id === medicineId)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ── Custom hook to use cart
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}