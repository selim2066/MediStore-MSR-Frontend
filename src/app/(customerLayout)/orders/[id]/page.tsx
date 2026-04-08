import { notFound } from "next/navigation"
import { orderService } from "@/service/order.service"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MapPin, Package } from "lucide-react"
import CancelOrderButton from "@/components/module/orders/cancel-order-button"
import { OrderStatus } from "@/types"

const statusStyles: Record<OrderStatus, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: response, error } = await orderService.getOrderById(id)

  if (error || !response?.success || !response.data) notFound()

  const order = response.data

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Back button */}
      <Button variant="ghost" asChild className="pl-0">
        <Link href="/orders">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Orders
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-muted-foreground mt-1">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <Separator />

      {/* Shipping Address */}
      <div className="flex gap-2 items-start">
        <MapPin className="w-4 h-4 mt-1 text-muted-foreground shrink-0" />
        <div>
          <p className="text-sm font-medium">Shipping Address</p>
          <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
        </div>
      </div>

      <Separator />

      {/* Order Items */}
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <Package className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold">Items</h2>
        </div>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-lg border p-4"
          >
            <div className="flex-1">
              <p className="font-medium">{item.medicine.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.medicine.manufacturer}
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-right">
              <p>Qty: {item.quantity}</p>
              <p>৳{item.price.toFixed(2)} each</p>
            </div>
            <div className="text-sm font-semibold min-w-[70px] text-right">
              ৳{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Total & Date */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-xl font-bold">৳{order.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Cancel button — only for PLACED orders */}
      {order.status === "PLACED" && (
        <div className="pt-2">
          <CancelOrderButton orderId={order.id} />
        </div>
      )}
    </div>
  )
}