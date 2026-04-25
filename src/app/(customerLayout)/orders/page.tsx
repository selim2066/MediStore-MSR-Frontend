import { orderService } from "@/service/order.service"
import { OrderStatus } from "@/types"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

const statusStyles: Record<OrderStatus, string> = {
  PLACED: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  PROCESSING: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  SHIPPED: "bg-purple-50 text-purple-700 ring-1 ring-purple-100",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  CANCELLED: "bg-red-50 text-red-700 ring-1 ring-red-100",
}

export default async function OrdersPage() {
  const { data: response, error } = await orderService.getMyOrders()

  if (error || !response?.success) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-red-100 bg-red-50/40 p-6">
          <p className="text-red-600 font-medium">
            Failed to load orders. Please try again.
          </p>
        </div>
      </div>
    )
  }

  const orders = response.data

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            My Orders
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your medicine purchases and delivery status
          </p>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-28 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md">
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-emerald-600" />
            </div>

            <div className="text-center space-y-1">
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                No orders yet
              </p>
              <p className="text-sm text-muted-foreground">
                Start exploring medicines and place your first order
              </p>
            </div>

            <Link
              href="/shop"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 active:scale-95 transition-all duration-200 shadow-md shadow-emerald-600/20"
            >
              Browse Medicines
            </Link>
          </div>
        ) : (
          /* ORDERS LIST */
          <div className="space-y-4">

            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md p-5 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                
                <div className="flex items-center justify-between gap-4 flex-wrap">

                  {/* LEFT */}
                  <div className="space-y-1">
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3">

                    {/* PRICE */}
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      ৳{order.totalAmount.toFixed(2)}
                    </p>

                    {/* STATUS */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 group-hover:scale-105 ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>

                    {/* ARROW */}
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/30 transition">
                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600" />
                    </div>

                  </div>
                </div>

                {/* subtle bottom glow line */}
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-zinc-200/60 dark:via-zinc-800 to-transparent" />

              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}