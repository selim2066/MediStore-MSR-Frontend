import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Shield, Truck, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 py-20 md:py-32">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-200/30 dark:bg-emerald-800/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-200/30 dark:bg-teal-800/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            Trusted OTC Medicine Store
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Your Health,{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Delivered Fast
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Browse thousands of over-the-counter medicines from trusted sellers.
            Order from home, get it delivered to your door.
          </p>

          {/* Search bar */}
          <div className="flex gap-2 max-w-xl mx-auto mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines, brands..."
                className="pl-10 h-12 bg-white dark:bg-gray-900 border-emerald-200 dark:border-emerald-800"
              />
            </div>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-6">
              <Link href="/shop">Search</Link>
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/shop">Browse All Medicines</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950">
              <Link href="/register">Become a Seller</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              Verified Sellers
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              24/7 Available
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}