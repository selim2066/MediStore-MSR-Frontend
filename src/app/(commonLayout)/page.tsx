import { BrandsSection } from "@/components/module/home/brands-section";
import { CategoriesSection } from "@/components/module/home/categories-section";
import { FAQSection } from "@/components/module/home/faq-section";
import { FeaturedMedicinesSection } from "@/components/module/home/featured-medicines-section";

import { HeroSection } from "@/components/module/home/hero-section";
import { HowItWorksSection } from "@/components/module/home/how-it-works-section";
import { NewsletterSection } from "@/components/module/home/newsletter-section";
import { StatsSection } from "@/components/module/home/stats-section";
import { TestimonialsSection } from "@/components/module/home/testimonials-section";
import { WhyUsSection } from "@/components/module/home/why-us-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />

      <FeaturedMedicinesSection />
      {/* <FeaturesAccordionSection /> */}
      <WhyUsSection />
      <BrandsSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
    </main>
  );
}
