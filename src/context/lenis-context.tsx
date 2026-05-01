"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

// Module-level singleton — lives outside React's render cycle entirely.
// No useState, no useRef, no context needed. React 19 has no opinion about
// module-level variables. Any component can call getLenis() in an effect
// or event handler to get the instance.
let lenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

// ─── Provider ────────────────────────────────────────────────────────────────
// Only responsible for lifecycle: init on mount, destroy on unmount.
// Place this once in layout.tsx wrapping the whole app.

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisInstance = lenis

    lenis.on("scroll", ScrollTrigger.update)

    function onTick(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisInstance = null
      gsap.ticker.remove(onTick)
    }
  }, [])

  return <>{children}</>
}

// ─── Usage in any component ───────────────────────────────────────────────────
// Smooth scroll to a section from a button:
//
//   import { getLenis } from "@/context/lenis-context"
//
//   <button onClick={() => getLenis()?.scrollTo("#features", { offset: -80 })}>
//     Scroll down
//   </button>