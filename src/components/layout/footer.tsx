"use client";

// src/components/layout/footer.tsx
// Premium MediStore Footer — Stripe/Vercel-inspired, Framer Motion animated

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  Clock,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  ArrowUp,
  Send,
  CheckCircle2,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface TrustBadge {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const footerLinks: Readonly<Record<string, FooterSection>> = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Medicines", href: "/shop" },
      { label: "Categories", href: "/shop/categories" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=popular" },
      { label: "Offers & Deals", href: "/shop?filter=deals" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { label: "My Profile", href: "/profile" },
      { label: "My Orders", href: "/orders" },
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Seller Dashboard", href: "/seller/dashboard" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
};

const trustBadges: TrustBadge[] = [
  { icon: Shield, title: "100% Authentic", desc: "Verified medicines only" },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day in Dhaka" },
  { icon: Clock, title: "24/7 Support", desc: "Always here for you" },
  { icon: HeartPulse, title: "Licensed Pharmacy", desc: "DGDA registered" },
];

const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mdselimreza2000/", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function TrustBadgeCard({ badge, index }: { badge: TrustBadge; index: number }) {
  const Icon = badge.icon;
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex items-center gap-3 p-4 rounded-2xl bg-background border border-border/60 cursor-default overflow-hidden"
    >
      {/* Glow on hover */}
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-500/8 to-teal-500/8 pointer-events-none" />
      {/* Gradient border shimmer */}
      <span className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-emerald-500/25 transition-all duration-300 pointer-events-none" />

      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
        <Icon className="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{badge.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{badge.desc}</p>
      </div>
    </motion.div>
  );
}

function AnimatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-500 group-hover:w-full transition-all duration-300 ease-out" />
    </Link>
  );
}

function SocialIcon({ link }: { link: SocialLink }) {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.href}
      aria-label={link.label}
      whileHover={{ y: -3, scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="w-9 h-9 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-emerald-600 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-colors duration-200"
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && email.length > 0 && !isValid;

  function handleSubmit() {
    setTouched(true);
    if (!isValid) return;
    // Simulate async submit
    setStatus("success");
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">Stay in the loop</p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Get health tips, new arrivals, and exclusive deals.
      </p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 text-sm font-medium"
          >
            <CheckCircle2 className="w-4 h-4" />
            You&apos;re subscribed!
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  aria-label="Email for newsletter"
                  aria-invalid={showError}
                  className={`h-9 text-sm rounded-xl border transition-colors duration-200 bg-background/60 ${
                    showError
                      ? "border-red-400 focus-visible:ring-red-400/30"
                      : "focus-visible:ring-emerald-500/30 focus-visible:border-emerald-400"
                  }`}
                />
                {showError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    Enter a valid email address.
                  </motion.p>
                )}
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  className="h-9 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AppDownloadButtons() {
  return (
    <div className="space-y-2.5 pt-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Download App
      </p>
      <div className="flex gap-2">
        {/* App Store */}
        <motion.a
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Download on the App Store"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/70 bg-muted/40 hover:bg-muted/80 hover:border-emerald-500/30 transition-colors duration-200 group"
        >
          <Smartphone className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
          <div>
            <p className="text-[9px] text-muted-foreground leading-none">Download on</p>
            <p className="text-xs font-semibold leading-tight">App Store</p>
          </div>
        </motion.a>
        {/* Google Play */}
        <motion.a
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Get it on Google Play"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/70 bg-muted/40 hover:bg-muted/80 hover:border-emerald-500/30 transition-colors duration-200 group"
        >
          <Smartphone className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
          <div>
            <p className="text-[9px] text-muted-foreground leading-none">Get it on</p>
            <p className="text-xs font-semibold leading-tight">Google Play</p>
          </div>
        </motion.a>
      </div>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  if (typeof window !== "undefined") {
    // passive scroll listener — set visibility
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <motion.button
      onClick={scrollTop}
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Back to top"
      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-600 transition-colors duration-200 group"
    >
      <span className="w-7 h-7 rounded-lg border border-border/60 bg-muted/50 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors duration-200">
        <ArrowUp className="w-3.5 h-3.5" />
      </span>
      Back to top
    </motion.button>
  );
}

// ─── Main Footer ─────────────────────────────────────────────────────────────

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="relative border-t overflow-hidden lg:px-10"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/4 blur-[80px] rounded-full pointer-events-none" />

      {/* ── Trust Badges ── */}
      <div className="relative border-b border-border/50">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {trustBadges.map((badge, i) => (
              <TrustBadgeCard key={badge.title} badge={badge} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Main Body ── */}
      <div className="relative container mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Brand + Newsletter + App + Social */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-4 space-y-7"
          >
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <motion.img
                src="/gpt tomato.png"
                alt="MediStore logo"
                className="h-8"
                whileHover={{ rotate: -5, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <span className="text-2xl font-bold tracking-tight group-hover:text-emerald-600 transition-colors duration-200">
                MediStore
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {"Bangladesh's trusted online pharmacy — authentic medicines, delivered fast."}
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a
                href="tel:+8801580912090"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-emerald-600 transition-colors duration-200 group w-fit"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                +880 1580-912090
              </a>
              <a
                href="mailto:mdselimreza2066@gmail.com"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-emerald-600 transition-colors duration-200 w-fit"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                mdselimreza2066@gmail.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                Roroya, Sherpur, Bogura, Bangladesh
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="rounded-lg text-xs border-border/70">
                DGDA Licensed
              </Badge>
              <Badge variant="outline" className="rounded-lg text-xs border-border/70">
                ISO Certified
              </Badge>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((link) => (
                  <SocialIcon key={link.label} link={link} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Nav links grid */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {Object.values(footerLinks).map((section, si) => (
              <motion.div
                key={section.title}
                custom={si + 1}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <h3 className="text-sm font-semibold mb-4 text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <AnimatedLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter + App Download */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3 space-y-7"
          >
            <div className="p-5 rounded-2xl border border-border/60 bg-muted/30 backdrop-blur-sm space-y-4">
              <NewsletterForm />
            </div>
            <AppDownloadButtons />
          </motion.div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative">
        <Separator className="opacity-50" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      {/* ── Bottom Bar ── */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
      >
        <p>© 2026 MediStore~MSR. All rights reserved.</p>

        <BackToTop />

        <p className="flex items-center gap-1.5">
          Made with{" "}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <HeartPulse className="w-3.5 h-3.5 text-emerald-500" />
          </motion.span>{" "}
          in Bangladesh
        </p>
      </motion.div>
    </footer>
  );
}