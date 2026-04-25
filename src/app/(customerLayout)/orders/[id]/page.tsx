// ! update with payment status and method

// import { notFound } from "next/navigation"
// import { orderService } from "@/service/order.service"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { ArrowLeft, MapPin, Package, CreditCard } from "lucide-react"
// import CancelOrderButton from "@/components/module/orders/cancel-order-button"
// import { OrderStatus, PaymentStatus } from "@/types"

// const statusStyles: Record<OrderStatus, string> = {
//   PLACED: "bg-blue-100 text-blue-700",
//   PROCESSING: "bg-yellow-100 text-yellow-700",
//   SHIPPED: "bg-purple-100 text-purple-700",
//   DELIVERED: "bg-green-100 text-green-700",
//   CANCELLED: "bg-red-100 text-red-700",
// }

// const paymentStatusStyles: Record<PaymentStatus, string> = {
//   PENDING: "bg-yellow-100 text-yellow-700",
//   PAID: "bg-emerald-100 text-emerald-700",
//   FAILED: "bg-red-100 text-red-700",
//   CANCELLED: "bg-gray-100 text-gray-700",
// }

// export default async function OrderDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const { data: response, error } = await orderService.getOrderById(id)

//   if (error || !response?.success || !response.data) notFound()

//   const order = response.data

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
//       {/* Back button */}
//       <Button variant="ghost" asChild className="pl-0">
//         <Link href="/orders">
//           <ArrowLeft className="w-4 h-4 mr-1" />
//           Back to Orders
//         </Link>
//       </Button>

//       {/* Header */}
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-2xl font-bold">Order Details</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             #{order.id.slice(0, 8).toUpperCase()}
//           </p>
//         </div>
//         {/* Order status + Payment status badges */}
//         <div className="flex items-center gap-2 flex-wrap">
//           <span
//             className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
//           >
//             {order.status}
//           </span>
//           {order.paymentStatus && ( // ← new
//             <span
//               className={`px-3 py-1 rounded-full text-sm font-medium ${paymentStatusStyles[order.paymentStatus] ?? "bg-gray-100 text-gray-700"}`}
//             >
//               {order.paymentStatus === "PAID"
//                 ? "✓ Paid"
//                 : order.paymentStatus === "PENDING"
//                   ? "Payment Pending"
//                   : order.paymentStatus === "FAILED"
//                     ? "Payment Failed"
//                     : order.paymentStatus}
//             </span>
//           )}
//         </div>
//       </div>

//       <Separator />

//       {/* Shipping Address */}
//       <div className="flex gap-2 items-start">
//         <MapPin className="w-4 h-4 mt-1 text-muted-foreground shrink-0" />
//         <div>
//           <p className="text-sm font-medium">Shipping Address</p>
//           <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
//         </div>
//       </div>

//       <Separator />

//       {/* Order Items */}
//       <div className="space-y-4">
//         <div className="flex gap-2 items-center">
//           <Package className="w-4 h-4 text-muted-foreground" />
//           <h2 className="font-semibold">Items</h2>
//         </div>

//         {order.items.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between gap-4 rounded-lg border p-4"
//           >
//             <div className="flex-1">
//               <p className="font-medium">{item.medicine.name}</p>
//               <p className="text-sm text-muted-foreground">
//                 {item.medicine.manufacturer}
//               </p>
//             </div>
//             <div className="text-sm text-muted-foreground text-right">
//               <p>Qty: {item.quantity}</p>
//               <p>৳{item.price.toFixed(2)} each</p>
//             </div>
//             <div className="text-sm font-semibold min-w-[70px] text-right">
//               ৳{(item.price * item.quantity).toFixed(2)}
//             </div>
//           </div>
//         ))}
//       </div>

//       <Separator />

//       {/* Total & Date */}
//       <div className="flex items-center justify-between">
//         <div className="space-y-1">
//           <div className="text-sm text-muted-foreground">
//             Placed on{" "}
//             {new Date(order.createdAt).toLocaleDateString("en-BD", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </div>
//           {/* Payment method */ }
//           {order.paymentMethod && ( // ← new
//             <div className="flex items-center gap-1 text-sm text-muted-foreground">
//               <CreditCard className="w-3.5 h-3.5" />
//               {order.paymentMethod === "ONLINE"
//                 ? "Online Payment"
//                 : "Cash on Delivery"}
//             </div>
//           )}
//         </div>
//         <div className="text-right">
//           <p className="text-sm text-muted-foreground">Total</p>
//           <p className="text-xl font-bold">৳{order.totalAmount.toFixed(2)}</p>
//         </div>
//       </div>

//       {/* Cancel button — only for PLACED orders */}
//       {order.status === "PLACED" && (
//         <div className="pt-2">
//           <CancelOrderButton orderId={order.id} />
//         </div>
//       )}
//     </div>
//   )
// }

// !update with payment status and method

// ! update with payment status and method

import { notFound } from "next/navigation"
import { orderService } from "@/service/order.service"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Package,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"
import CancelOrderButton from "@/components/module/orders/cancel-order-button"
import { OrderStatus, PaymentStatus } from "@/types"

const statusStyles: Record<OrderStatus, { classes: string; dot: string }> = {
  PLACED: {
    classes: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    dot: "bg-blue-400",
  },
  PROCESSING: {
    classes: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-400",
  },
  SHIPPED: {
    classes: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    dot: "bg-purple-400",
  },
  DELIVERED: {
    classes: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-400",
  },
  CANCELLED: {
    classes: "bg-red-50 text-red-700 ring-1 ring-red-200",
    dot: "bg-red-400",
  },
}

const paymentStatusConfig: Record<
  PaymentStatus,
  { classes: string; icon: React.ReactNode; label: string }
> = {
  PENDING: {
    classes: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    icon: <Clock className="w-3 h-3" />,
    label: "Payment Pending",
  },
  PAID: {
    classes: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    icon: <CheckCircle2 className="w-3 h-3" />,
    label: "Paid",
  },
  FAILED: {
    classes: "bg-red-50 text-red-700 ring-1 ring-red-200",
    icon: <XCircle className="w-3 h-3" />,
    label: "Payment Failed",
  },
  CANCELLED: {
    classes: "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200",
    icon: <AlertCircle className="w-3 h-3" />,
    label: "Cancelled",
  },
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

  const steps = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Back */}
        <Button
          variant="ghost"
          asChild
          className="pl-2 text-muted-foreground hover:text-foreground hover:-translate-x-1 transition-all duration-300 group"
        >
          <Link href="/orders">
            <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Orders
          </Link>
        </Button>

        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-white/90 to-white/60 dark:from-zinc-900/90 dark:to-zinc-900/60 backdrop-blur-xl shadow-xl px-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full" />

          <div className="relative flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
                Order Overview
              </h1>
              <p className="mt-2 text-xs font-mono tracking-[0.2em] text-muted-foreground">
                #{order.id.slice(0, 8).toUpperCase()}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-md ${statusStyles[order.status].classes}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusStyles[order.status].dot}`}
                />
                {order.status}
              </span>

              {order.paymentStatus && (() => {
                const cfg =
                  paymentStatusConfig[order.paymentStatus] ??
                  paymentStatusConfig.PENDING
                return (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-md ${cfg.classes}`}
                  >
                    {cfg.icon}
                    {cfg.label}
                  </span>
                )
              })()}
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="rounded-2xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-6 py-5 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:100ms]">
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, i) => {
              const isActive = steps.indexOf(order.status) >= i
              return (
                <div key={step} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-emerald-500 scale-110"
                          : "bg-zinc-300"
                      }`}
                    />
                    <p className="text-[10px] mt-2 text-muted-foreground">
                      {step}
                    </p>
                  </div>
                  {i !== steps.length - 1 && (
                    <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-700 mx-1" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ADDRESS */}
        <div className="rounded-2xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-6 py-5 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:200ms]">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition hover:scale-110">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Shipping Address
              </p>
              <p className="text-sm mt-1">{order.shippingAddress}</p>
            </div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="rounded-2xl border border-border/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-6 py-5 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:300ms]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Package className="w-4 h-4 text-muted-foreground" />
            </div>
            <h2 className="text-sm font-semibold">
              Items
              <span className="ml-2 text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
                {order.items.length}
              </span>
            </h2>
          </div>

          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-center justify-between gap-4 rounded-xl border border-border/40 bg-zinc-50/50 dark:bg-zinc-800/30 px-4 py-3.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.medicine.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.medicine.manufacturer}
                  </p>
                </div>

                <div className="text-xs text-muted-foreground text-right">
                  <p>Qty: {item.quantity}</p>
                  <p>৳{item.price.toFixed(2)}</p>
                </div>

                <div className="text-sm font-semibold min-w-[70px] text-right">
                  ৳{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="relative rounded-2xl border border-border/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:400ms]">

          <div className="absolute inset-0 blur-2xl opacity-20 bg-emerald-400 rounded-full" />

          <div className="relative flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-BD")}
              </p>
              {order.paymentMethod && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  {order.paymentMethod === "ONLINE"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </div>
              )}
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 bg-clip-text text-transparent">
                ৳{order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* CANCEL */}
        {order.status === "PLACED" && (
          <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50/70 to-white dark:from-red-950/20 dark:to-zinc-900 backdrop-blur-md px-6 py-4 transition hover:shadow-md">
            <CancelOrderButton orderId={order.id} />
          </div>
        )}
      </div>
    </div>
  )
}