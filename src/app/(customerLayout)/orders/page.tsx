import { orderService } from "@/service/order.service"
import { OrderStatus } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

const statusStyles: Record<OrderStatus, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

export default async function OrdersPage() {
  const { data: response, error } = await orderService.getMyOrders()

  if (error || !response?.success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-destructive">Failed to load orders. Please try again.</p>
      </div>
    )
  }

  const orders = response.data

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
          <ShoppingBag className="w-12 h-12" />
          <p className="text-lg">No orders yet</p>
          <Link href="/shop" className="text-sm underline underline-offset-4">
            Browse medicines
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="font-medium">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">৳{order.totalAmount.toFixed(2)}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}