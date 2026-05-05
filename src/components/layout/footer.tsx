"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

const footerLinks: Record<string, FooterSection> = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Medicines", href: "/shop" },
      { label: "Categories", href: "/shop/categories" },
      { label: "Best Sellers", href: "/shop?sort=popular" },
      { label: "Offers", href: "/shop?filter=deals" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/privacy" },
    ],
  },
};

const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mdselimreza2000/",
    label: "LinkedIn",
  },
  { icon: Youtube, href: "#", label: "YouTube" },
];

function SocialIcon({ link }: { link: SocialLink }) {
  const Icon = link.icon;
  return (
    <a
      href={link.href}
      aria-label={link.label}
      className="w-10 h-10 flex items-center justify-center rounded-full
      bg-white/5 dark:bg-white/10 backdrop-blur-md
      border border-white/10 hover:border-white/30
      text-muted-foreground hover:text-foreground
      transition-all duration-300"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function submit() {
    if (!valid) return;
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-500">
        <CheckCircle2 className="w-4 h-4" /> Subscribed successfully
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Newsletter</p>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="h-10 
bg-white/70 dark:bg-white/10 
backdrop-blur-md 
border border-gray-200 dark:border-white/10 
text-foreground 
placeholder:text-muted-foreground"
        />
        <Button
          onClick={submit}
          className="h-10 w-full sm:w-auto 
bg-emerald-500/90 hover:bg-emerald-500 
text-white 
shadow-md shadow-emerald-500/20 
backdrop-blur-md 
border border-emerald-400/30 
transition-all duration-300 "
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/5 to-white/10 dark:via-white/5 dark:to-black/40" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-400/10 blur-3xl rounded-full -z-10" />

      {/* Glass container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="backdrop-blur-xl bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="lg:col-span-4 space-y-4 text-center sm:text-left">
              <Link href="/" className="text-lg font-semibold">
                MediStore
              </Link>

              <p className="text-sm text-muted-foreground max-w-sm mx-auto sm:mx-0">
                Trusted online pharmacy in Bangladesh with secure delivery &
                verified medicines.
              </p>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone className="w-4 h-4" /> +880 1580-912090
                </p>
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4" /> support@medistore.com
                </p>
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <MapPin className="w-4 h-4" /> Bogura, Bangladesh
                </p>
              </div>

              <div className="flex justify-center sm:justify-start gap-2 pt-2">
                {socialLinks.map((s) => (
                  <SocialIcon key={s.label} link={s} />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-left">
              {Object.values(footerLinks).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-medium mb-3">{section.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {section.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="hover:text-foreground transition"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3 text-center sm:text-left">
              <Newsletter />
            </div>
          </div>

          {/* Bottom */}
          <Separator className="my-8 bg-white/10" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground text-center sm:text-left">
            <p>© 2026 MediStore. All rights reserved.</p>
            <p>Built with care by Md. Selim Reza</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
