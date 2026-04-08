"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { OrderStatus } from "@/types"
import { updateOrderStatusAction } from "@/actions/order.action"
import { toast } from "sonner"

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  PLACED: "PROCESSING",
  PROCESSING: "SHIPPED",
  SHIPPED: "DELIVERED",
}

export default function UpdateOrderStatus({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: OrderStatus
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const next = nextStatus[currentStatus]

  if (!next) return null

  async function handleUpdate() {
    setLoading(true)
    const { error } = await updateOrderStatusAction(orderId, next!)
    setLoading(false)
    if (error) { toast.error(error.message); return }
    toast.success(`Order marked as ${next}`)
    router.refresh()
  }

  return (
    <Button size="sm" onClick={handleUpdate} disabled={loading}>
      {loading ? "Updating..." : `Mark as ${next}`}
    </Button>
  )
}