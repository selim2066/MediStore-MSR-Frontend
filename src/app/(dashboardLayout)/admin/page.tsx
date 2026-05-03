// import { userService } from "@/service/user.service"
// import { orderService } from "@/service/order.service"
// import { medicineService } from "@/service/medicine.service"
// import { categoryService } from "@/service/category.service"
// import { redirect } from "next/navigation"
// import { ShoppingBag, Pill, Users, Tag } from "lucide-react"

// export default async function AdminDashboardPage() {

//   const { data: session } = await userService.getSession()
//   if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

//   const [{ data: orderRes }, { data: medRes }, { data: catRes }] = await Promise.all([
//   orderService.getAllOrders({ page: "1", limit: "10" }), // ✅ add params
//   medicineService.getMedicines({ page: "1", limit: "10" }, { cache: "no-store" }), // already had params support
//   categoryService.getCategories(),
// ])

//  const orders = orderRes?.data?.data ?? []
// const medicines = medRes?.data?.data ?? []
// const categories = catRes?.data ?? []

// const totalOrders = orderRes?.data?.meta?.totalOrders ?? orders.length
// const totalMedicines = medRes?.data?.meta?.total_medicine ?? medicines.length

//  const stats = [
//   { label: "Total Orders", value: totalOrders, icon: ShoppingBag },
//   { label: "Total Medicines", value: totalMedicines, icon: Pill },
//   { label: "Total Categories", value: categories.length, icon: Tag },
// ]

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
import AdminDashboardCharts from "@/components/module/dashboard/admin-dashboard-charts";
import { categoryService } from "@/service/category.service";
import { medicineService } from "@/service/medicine.service";
import { orderService } from "@/service/order.service";
import { userService } from "@/service/user.service";
import type { Medicine, OrderWithRelations } from "@/types";
import { Pill, ShoppingBag, Tag, Users } from "lucide-react";
import { redirect } from "next/navigation";

// Helper: group orders by status
function buildOrdersByStatus(orders: OrderWithRelations[]) {
  const counts: Record<string, number> = {
    PLACED: 0,
    PROCESSING: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  };
  for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
}

// Helper: group medicines by category name
function buildMedicinesByCategory(
  medicines: Medicine[],
  catMap: Record<string, string>,
) {
  const counts: Record<string, number> = {};
  for (const m of medicines) {
    const name = catMap[m.categoryId] ?? "Other";
    counts[name] = (counts[name] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));
}

export default async function AdminDashboardPage() {
  const { data: session } = await userService.getSession();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  const [
    { data: orderRes },
    { data: medRes },
    { data: catRes },
    { data: userRes },
  ] = await Promise.all([
    orderService.getAllOrders({ page: "1", limit: "1000" }),
    medicineService.getMedicines(
      { page: "1", limit: "1000" },
      { cache: "no-store" },
    ),
    categoryService.getCategories(),
    userService.getAllUsers(),
  ]);

  const orders: OrderWithRelations[] = orderRes?.data?.data ?? [];
  const medicines: Medicine[] = medRes?.data?.data ?? [];
  const categories = catRes?.data ?? [];
  const users = userRes?.data?.data ?? [];

  // category id → name map
  const catMap: Record<string, string> = {};
  for (const c of categories) catMap[c.id] = c.name;

  const ordersByStatus = buildOrdersByStatus(orders);
  const medicinesByCategory = buildMedicinesByCategory(medicines, catMap);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-blue-500",
    },
    {
      label: "Total Medicines",
      value: medicines.length,
      icon: Pill,
      color: "text-emerald-500",
    },
    {
      label: "Total Categories",
      value: categories.length,
      icon: Tag,
      color: "text-purple-500",
    },
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Platform overview
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-3"
          >
            <div className={`flex items-center gap-2 ${color}`}>
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {label}
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AdminDashboardCharts
        ordersByStatus={ordersByStatus}
        medicinesByCategory={medicinesByCategory}
      />
    </div>
  );
}
