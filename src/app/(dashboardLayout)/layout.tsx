import Link from "next/link"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"
import { LayoutDashboard, Pill, ShoppingBag, Users, ListOrdered, Tags } from "lucide-react"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = await userService.getSession()
  if (!session?.user) redirect("/login")

  const role = session.user.role
  const isSeller = role === "SELLER"
  const isAdmin = role === "ADMIN"

  const sellerLinks = [
    { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/seller/medicines", label: "Medicines", icon: Pill },
    { href: "/seller/orders", label: "Orders", icon: ShoppingBag },
  ]

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: ListOrdered },
    { href: "/admin/categories", label: "Categories", icon: Tags },
  ]

  const links = isSeller ? sellerLinks : isAdmin ? adminLinks : []

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-background shrink-0 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase text-muted-foreground mb-4 tracking-wider">
          {isSeller ? "Seller Panel" : "Admin Panel"}
        </p>
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  )
}