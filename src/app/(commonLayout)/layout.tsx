"use client"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar1"
import { BackgroundEffects } from "@/components/ui/background-effects"
import { CartProvider } from "@/context/cart-context"

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BackgroundEffects />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

// import { Navbar } from "@/components/layout/navbar1"


// export default function CommonLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         {children}
//       </main>
//       <footer className="border-t py-6 text-center text-sm text-muted-foreground">
//         © 2025 MediStore. All rights reserved.
//       </footer>
//     </div>
//   )
// }

