import { CategoriesSection } from "@/components/module/home/categories-section"
import { FeaturedMedicinesSection } from "@/components/module/home/featured-medicines-section"
import FeatureSection from "@/components/module/home/FeatureSection"
import { HeroSection } from "@/components/module/home/hero-section"
import { TestimonialsSection } from "@/components/module/home/testimonials-section"
import { WhyUsSection } from "@/components/module/home/why-us-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* <FeatureSection /> */}
      <CategoriesSection />
      <FeaturedMedicinesSection />
      <WhyUsSection />
      <TestimonialsSection />
    </main>
  )
}