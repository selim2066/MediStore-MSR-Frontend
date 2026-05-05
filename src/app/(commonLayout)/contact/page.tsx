"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  Clock,
  HeadphonesIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Track your order", href: "/orders" },
  { label: "Browse medicines", href: "/shop" },
  { label: "View your profile", href: "/profile" },
  { label: "Privacy & Terms", href: "/privacy" },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
    scale: 0.98,
  },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const INFO_CARDS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1580-912090",
    sub: "Sat–Thu, 9AM–6PM BST",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-100 dark:border-emerald-800/40",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@medistore.com",
    sub: "We reply within 24 hours",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-100 dark:border-blue-800/40",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Dhaka, Bangladesh",
    sub: "Head Office",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-100 dark:border-rose-800/40",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Sat – Thu",
    sub: "9:00 AM – 6:00 PM BST",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-100 dark:border-amber-800/40",
  },
];

const TOPICS = [
  "Order Issue",
  "Payment Problem",
  "Medicine Query",
  "Account Help",
  "Seller Support",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    await new Promise((r) => setTimeout(r, 1500));

    setStatus("sent");
    setForm({ name: "", email: "", topic: "", message: "" });

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <main className="min-h-screen py-20 bg-[#f0fdf8] dark:bg-[#020810]">

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="relative max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 mb-6">
            <HeadphonesIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              We&apos;re here to help
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in <span className="text-emerald-500">Touch</span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Have a question about your order, a medicine, or your account?
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24">

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
          {INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className={`
                p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border
                ${card.border} ${card.bg}
                transition-all duration-300
                hover:scale-[1.03]
                hover:shadow-lg hover:shadow-emerald-500/10
                hover:border-emerald-400/40
              `}
            >
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <p className="text-sm font-semibold text-center">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-5 gap-8">

          {/* FORM */}
          <div className="md:col-span-3 relative">

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeUp}
              custom={1}
              className="relative backdrop-blur-xl bg-white/60 dark:bg-white/[0.04] border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs text-emerald-500 font-medium uppercase">
                    Contact Identity
                  </p>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tell us who you are
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              {/* INPUTS */}
              <div className="space-y-5">

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.03]
                  border border-white/20 dark:border-white/10
                  transition-all duration-300
                  hover:scale-[1.01] hover:border-emerald-300/40
                  focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none"
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.03]
                  border border-white/20 dark:border-white/10
                  transition-all duration-300
                  hover:scale-[1.01] hover:border-blue-300/40
                  focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none"
                />

                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.05]
                  border border-white/20 dark:border-white/10
                  transition-all duration-300
                  hover:scale-[1.01] hover:border-cyan-300/40
                  focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none"
                >
                  <option value="">Select topic</option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

              </div>

              {/* CTA */}
              <div className="mt-8 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Secure • Encrypted
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white
                  transition-all duration-300
                  hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/30
                  active:scale-[0.97]"
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send Message"}
                </button>
              </div>

            </motion.div>
          </div>

          {/* LINKS */}
          <div className="md:col-span-2 space-y-4">
            {links.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
              >
                <Link href={item.href} className="block">
                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5
                    border border-slate-200/70 dark:border-white/10
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:-translate-y-1
                    hover:shadow-lg hover:shadow-emerald-500/10
                    hover:border-emerald-400/40">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 dark:text-slate-200">
                        {item.label}
                      </span>
                      <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}