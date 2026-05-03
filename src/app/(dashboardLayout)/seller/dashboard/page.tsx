// import { medicineService } from "@/service/medicine.service"
// import { orderService } from "@/service/order.service"
// import { userService } from "@/service/user.service"
// import { redirect } from "next/navigation"
// import { Pill, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"

// export default async function SellerDashboardPage() {
//   const { data: session } = await userService.getSession()
//   if (!session?.user || session.user.role !== "SELLER") redirect("/login")

//   const [{ data: medRes }, { data: orderRes }] = await Promise.all([
//     medicineService.getSellerMedicines(),
//     orderService.getSellerOrders(),
//   ])
// //   console.log("medRes:", JSON.stringify(medRes))
// // console.log("orderRes:", JSON.stringify(orderRes))

//   const medicines = medRes?.data?.data ?? []
// const orders = orderRes?.data?.data ?? []

// const totalMedicines = medRes?.data?.meta?.total_medicine ?? medicines.length
// const totalOrders = orderRes?.data?.meta?.totalOrders ?? orders.length


//   const totalRevenue = orders
//     .filter((o) => o.status === "DELIVERED")
//     .reduce((sum, o) => sum + o.totalAmount, 0)

//   const pendingOrders = orders.filter((o) =>
//     ["PLACED", "PROCESSING", "SHIPPED"].includes(o.status)
//   ).length

//  const stats = [
//   { label: "Total Medicines", value: totalMedicines, icon: Pill },
//   { label: "Total Orders", value: totalOrders, icon: ShoppingBag },
//   { label: "Pending Orders", value: pendingOrders, icon: TrendingUp },
//   { label: "Revenue (Delivered)", value: `৳${totalRevenue.toFixed(2)}`, icon: DollarSign },
// ]

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Seller Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map(({ label, value, icon: Icon }) => (
//           <div key={label} className="rounded-lg border p-4 space-y-2">
//             <div className="flex items-center gap-2 text-muted-foreground">
//               <Icon className="w-4 h-4" />
//               <span className="text-sm">{label}</span>
//             </div>
//             <p className="text-2xl font-bold">{value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// ! stn update001

import { medicineService } from "@/service/medicine.service";
import { orderService } from "@/service/order.service";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";
import { Pill, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";
import SellerDashboardCharts from "@/components/module/dashboard/seller-dashboard-charts";
import type { OrderWithRelations } from "@/types";
import { format, subDays } from "date-fns";

function buildOrdersByStatus(orders: OrderWithRelations[]) {
  const counts: Record<string, number> = {
    PLACED: 0, PROCESSING: 0, SHIPPED: 0, DELIVERED: 0, CANCELLED: 0,
  };
  for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
}

function buildRevenueTrend(orders: OrderWithRelations[]) {
  // Last 7 calendar days, revenue from DELIVERED orders
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(today, 6 - i);
    return { date: format(d, "MMM d"), key: format(d, "yyyy-MM-dd"), revenue: 0 };
  });

  for (const o of orders) {
    if (o.status !== "DELIVERED") continue;
    const orderDay = format(new Date(o.createdAt), "yyyy-MM-dd");
    const slot = days.find((d) => d.key === orderDay);
    if (slot) slot.revenue += o.totalAmount;
  }

  return days.map(({ date, revenue }) => ({ date, revenue }));
}

export default async function SellerDashboardPage() {
  const { data: session } = await userService.getSession();
  if (!session?.user || session.user.role !== "SELLER") redirect("/login");

  const [{ data: medRes }, { data: orderRes }] = await Promise.all([
    medicineService.getSellerMedicines({ page: "1", limit: "1000" }),
    orderService.getSellerOrders({ page: "1", limit: "1000" }),
  ]);

  const medicines = medRes?.data?.data ?? [];
  const orders: OrderWithRelations[] = orderRes?.data?.data ?? [];

  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter((o) =>
    ["PLACED", "PROCESSING", "SHIPPED"].includes(o.status)
  ).length;

  const ordersByStatus = buildOrdersByStatus(orders);
  const revenueTrend = buildRevenueTrend(orders);

  const stats = [
    { label: "Total Medicines", value: medicines.length, icon: Pill, color: "text-emerald-500" },
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-blue-500" },
    { label: "Pending Orders", value: pendingOrders, icon: TrendingUp, color: "text-orange-500" },
    { label: "Revenue (Delivered)", value: `৳${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Seller Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your store at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-3"
          >
            <div className={`flex items-center gap-2 ${color}`}>
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <SellerDashboardCharts ordersByStatus={ordersByStatus} revenueTrend={revenueTrend} />
    </div>
  );
}