import { orderService } from "@/service/order.service"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"
import { OrderStatus } from "@/types"
import { PaginationControls } from "@/components/ui/pagination-controls"
import UpdateOrderStatus from "@/components/module/seller/update-order-status"

interface SellerOrdersPageProps {
  searchParams: Promise<{ page?: string }>
}

const statusStyles: Record<OrderStatus, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

export default async function SellerOrdersPage({ searchParams }: SellerOrdersPageProps) {
  const { data: session } = await userService.getSession()
  if (!session?.user || session.user.role !== "SELLER") redirect("/login")

  const { page } = await searchParams
  const currentPage = Math.max(1, Number(page) || 1)

  const { data: response } = await orderService.getSellerOrders({
    page: String(currentPage),
    limit: "5",
  })

  // PaginatedResponse wraps array under .data
  const orders = response?.data?.data ?? []
  const totalPages = response?.data?.meta?.totalPages ?? 1

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seller Orders</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="font-medium">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.medicine.name} × {item.quantity} — ৳{(item.price * item.quantity).toFixed(2)}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="font-semibold">Total: ৳{order.totalAmount.toFixed(2)}</p>
                {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                  <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/seller/orders"
      />
    </div>
  )
}