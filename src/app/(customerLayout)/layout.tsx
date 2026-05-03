import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar1"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const cookieHeader = headersList.get("cookie") || ""

  const { data: session } = await userService.getSession(cookieHeader)
  if (!session?.user) redirect("/login")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}