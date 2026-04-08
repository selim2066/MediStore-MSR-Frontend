//import { CheckoutContent } from "@/components/module/checkout/checkout-content"

import { CheckoutContent } from "@/components/module/checkout/checkout-content";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Checkout
      </h1>
      <CheckoutContent />
    </div>
  )
}