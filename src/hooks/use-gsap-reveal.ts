"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface UseGsapRevealOptions {
  // Which child elements to animate (CSS selector relative to the container)
  // Default: direct children
  selector?: string

  // Animation presets
  preset?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up"

  // Stagger delay between each element (seconds)
  stagger?: number

  // Duration of each animation (seconds)
  duration?: number

  // ScrollTrigger: how far into the viewport before triggering (0–1)
  start?: string

  // Extra gsap vars to merge (override or extend)
  vars?: gsap.TweenVars
}

const PRESETS: Record<string, { from: gsap.TweenVars }> = {
  "fade-up": { from: { opacity: 0, y: 48 } },
  "fade-in": { from: { opacity: 0 } },
  "slide-left": { from: { opacity: 0, x: -60 } },
  "slide-right": { from: { opacity: 0, x: 60 } },
  "scale-up": { from: { opacity: 0, scale: 0.9 } },
}

// ─── useGsapReveal ───────────────────────────────────────────────────────────
// Attach to any section container ref. Automatically animates child elements
// into view as the user scrolls. Uses gsap.context() for proper cleanup
// (prevents animation leaks between React re-renders / route changes).
//
// Usage:
//   const ref = useGsapReveal<HTMLElement>({ preset: "fade-up", stagger: 0.1 })
//   return <section ref={ref}>...</section>

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapRevealOptions = {}
) {
  const {
    selector = ":scope > *",
    preset = "fade-up",
    stagger = 0.08,
    duration = 0.8,
    start = "top 85%",
    vars = {},
  } = options

  const containerRef = useRef<T>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // gsap.context() scopes all animations to this container —
    // when the component unmounts, all tweens and ScrollTriggers inside
    // are automatically killed. No manual cleanup needed.
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(selector)
      if (!targets.length) return

      const { from } = PRESETS[preset]

      gsap.fromTo(
        targets,
        { ...from },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          stagger,
          ease: "power3.out",
          ...vars,
          scrollTrigger: {
            trigger: el,
            start,
            once: true, // Only animate once — not on scroll-back
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [selector, preset, stagger, duration, start, vars])

  return containerRef
}

// ─── useGsapTimeline ─────────────────────────────────────────────────────────
// For more complex, sequenced animations on a single element.
// Returns the container ref + a callback to build the timeline.
//
// Usage:
//   const ref = useGsapTimeline<HTMLDivElement>((tl, el) => {
//     tl.from(el.querySelector(".title"), { opacity: 0, y: 30 })
//     tl.from(el.querySelector(".subtitle"), { opacity: 0, y: 20 }, "-=0.4")
//   })

export function useGsapTimeline<T extends HTMLElement = HTMLDivElement>(
  build: (tl: gsap.core.Timeline, el: T) => void,
  start = "top 80%"
) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
      build(tl, el)
    }, el)

    return () => ctx.revert()
  }, [build, start])

  return containerRef
}