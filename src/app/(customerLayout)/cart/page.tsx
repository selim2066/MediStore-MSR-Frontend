export const dynamic = "force-dynamic";
import { CartContent } from "./cart-content";


export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Your Cart
      </h1>
      <CartContent />
    </div>
  )
}