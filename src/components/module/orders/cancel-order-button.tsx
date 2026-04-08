"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cancelOrderAction } from "@/actions/order.action"
import { toast } from "sonner"

export default function CancelOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCancel() {
    setLoading(true)
    const { error } = await cancelOrderAction(orderId)
    setLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Order cancelled successfully")
    router.refresh()
  }

  return (
    <Button
      variant="destructive"
      onClick={handleCancel}
      disabled={loading}
    >
      {loading ? "Cancelling..." : "Cancel Order"}
    </Button>
  )
}