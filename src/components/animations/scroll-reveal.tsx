"use client"

// Replaces the old CSS-based scroll-reveal.tsx
// Now powered by GSAP + the useGsapReveal hook
// Drop-in replacement — same props API, better animation quality

import { useGsapReveal } from "@/hooks/use-gsap-reveal"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  preset?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up"
  stagger?: number
  duration?: number
  start?: string
  // If true, animates the wrapper itself instead of its children
  self?: boolean
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  preset = "fade-up",
  stagger = 0.08,
  duration = 0.8,
  start = "top 85%",
  self = false,
}: ScrollRevealProps) {
  const ref = useGsapReveal<HTMLDivElement>({
    // If self=true, animate the div itself; otherwise animate its children
    selector: self ? undefined : ":scope > *",
    preset,
    stagger,
    duration,
    start,
  })

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {children}
    </div>
  )
}