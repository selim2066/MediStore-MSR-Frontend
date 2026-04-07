import { Shield, Truck, Clock, Star, Package, HeartPulse } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Sellers",
    description:
      "All sellers are verified and trusted. Every medicine listed meets our quality standards.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Cash on delivery available. Get your medicines delivered straight to your doorstep.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Browse and order anytime. Our platform is available around the clock for your convenience.",
  },
  {
    icon: Star,
    title: "Genuine Reviews",
    description:
      "Read honest reviews from real customers before making your purchase decision.",
  },
  {
    icon: Package,
    title: "Wide Selection",
    description:
      "Thousands of OTC medicines across multiple categories all in one place.",
  },
  {
    icon: HeartPulse,
    title: "Your Health First",
    description:
      "We prioritize your health and safety. Only over-the-counter medicines are listed.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose MediStore?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We make buying medicines online safe, simple, and reliable
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all duration-200"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}