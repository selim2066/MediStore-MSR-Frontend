import { Navbar } from "@/components/layout/navbar1"


export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2025 MediStore. All rights reserved.
      </footer>
    </div>
  )
}