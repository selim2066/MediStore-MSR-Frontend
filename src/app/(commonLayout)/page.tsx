import { CategoriesSection } from "@/components/module/home/categories-section"
import { FeaturedMedicinesSection } from "@/components/module/home/featured-medicines-section"
import { HeroSection } from "@/components/module/home/hero-section"
import { WhyUsSection } from "@/components/module/home/why-us-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedMedicinesSection />
      <WhyUsSection />
    </main>
  )
}