import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register plugins once globally — re-registering causes ScrollTrigger conflicts
// This file is imported by the Lenis provider, so it runs exactly once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export { gsap, ScrollTrigger, ScrollToPlugin }