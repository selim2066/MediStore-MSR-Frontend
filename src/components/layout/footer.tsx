// src/components/layout/footer.tsx

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
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

const trustBadges = [
  { icon: Shield, title: "100% Authentic", desc: "Verified medicines only" },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day in Dhaka" },
  { icon: Clock, title: "24/7 Support", desc: "Always here for you" },
  { icon: HeartPulse, title: "Licensed Pharmacy", desc: "DGDA registered" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      {/* Trust badges */}
      <div className="border-b bg-emerald-600/5">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-3 p-3 rounded-xl bg-background border"
              >
                <Icon className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="lg:col-span-4 space-y-5">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/gpt tomato.png" alt="MediStore" className="h-8" />
            <span className="text-2xl font-bold">MediStore</span>
          </Link>

          <p className="text-sm text-muted-foreground max-w-xs">
            {"Bangladesh's trusted online pharmacy"}
          </p>

          <div className="space-y-2.5">
            {/* FIXED HERE ✅ */}
            <a
              href="tel:+8801700000000"
              className="flex items-center gap-2 text-sm hover:text-emerald-600"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              +880 1580-912090
            </a>

            <a
              href="mailto:support@medistore.com.bd"
              className="flex items-center gap-2 text-sm hover:text-emerald-600"
            >
              <Mail className="w-4 h-4 text-emerald-600" />
              mdselimreza2066@gmail.com
            </a>

            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-emerald-600 mt-1" />
              Roroya, Sherpur, Bogura, Bangladesh
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline">DGDA Licensed</Badge>
            <Badge variant="outline">ISO Certified</Badge>
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-emerald-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="container mx-auto px-6 py-5 flex justify-between text-xs">
        <p>© 2026 MediStore~MSR</p>
        <p className="flex items-center gap-1">
          Made with <HeartPulse className="w-3 h-3 text-emerald-500" />{" "}
          Bangladesh
        </p>
      </div>
    </footer>
  );
}
