export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r min-h-screen p-4">
        {/* Sidebar will go here later */}
        <p className="text-sm text-muted-foreground">Sidebar</p>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}