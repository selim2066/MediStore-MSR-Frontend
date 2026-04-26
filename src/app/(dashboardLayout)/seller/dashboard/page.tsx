import { medicineService } from "@/service/medicine.service"
import { orderService } from "@/service/order.service"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"
import { Pill, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"

export default async function SellerDashboardPage() {
  const { data: session } = await userService.getSession()
  if (!session?.user || session.user.role !== "SELLER") redirect("/login")

  const [{ data: medRes }, { data: orderRes }] = await Promise.all([
    medicineService.getSellerMedicines(),
    orderService.getSellerOrders(),
  ])
//   console.log("medRes:", JSON.stringify(medRes))
// console.log("orderRes:", JSON.stringify(orderRes))

  const medicines = medRes?.data?.data ?? []
const orders = orderRes?.data?.data ?? []

const totalMedicines = medRes?.data?.meta?.total_medicine ?? medicines.length
const totalOrders = orderRes?.data?.meta?.totalOrders ?? orders.length


  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.totalAmount, 0)

  const pendingOrders = orders.filter((o) =>
    ["PLACED", "PROCESSING", "SHIPPED"].includes(o.status)
  ).length

 const stats = [
  { label: "Total Medicines", value: totalMedicines, icon: Pill },
  { label: "Total Orders", value: totalOrders, icon: ShoppingBag },
  { label: "Pending Orders", value: pendingOrders, icon: TrendingUp },
  { label: "Revenue (Delivered)", value: `৳${totalRevenue.toFixed(2)}`, icon: DollarSign },
]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}