import { userService } from "@/service/user.service"
import { orderService } from "@/service/order.service"
import { medicineService } from "@/service/medicine.service"
import { categoryService } from "@/service/category.service"
import { redirect } from "next/navigation"
import { ShoppingBag, Pill, Users, Tag } from "lucide-react"

export default async function AdminDashboardPage() {
  const { data: session } = await userService.getSession()
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

  const [{ data: orderRes }, { data: medRes }, { data: catRes }] = await Promise.all([
    orderService.getAllOrders(),
    medicineService.getMedicines(),
    categoryService.getCategories(),
  ])

  const orders = orderRes?.data ?? []
  const medicines = medRes?.data?.data ?? []
  const categories = catRes?.data ?? []

  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingBag },
    { label: "Total Medicines", value: medicines.length, icon: Pill },
    { label: "Total Categories", value: categories.length, icon: Tag },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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