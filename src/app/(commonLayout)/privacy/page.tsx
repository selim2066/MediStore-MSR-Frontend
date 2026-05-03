"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Eye, Database, Bell, Lock, Share2, Cookie, UserCheck,
  FileText, AlertTriangle, Gavel, RefreshCw, Mail, ChevronRight,
  ShoppingBag, CreditCard, Truck, Star, Users, Settings,
} from "lucide-react";

// ─── Background system (exact match to homepage) ──────────────────────────────
function PageBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0 opacity-[0.635] dark:opacity-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)`,
          backgroundSize: "77px 77px",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
          backgroundSize: "77px 77px",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "5%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 500,
          background: "radial-gradient(ellipse,rgba(16,185,129,0.10),transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "20%", left: "-5%", width: 400, height: 400,
          background: "radial-gradient(circle,rgba(20,184,166,0.08),transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

// ─── Reading progress bar ─────────────────────────────────────────────────────
function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-black/[0.06] dark:bg-white/[0.06]">
      <motion.div
        className="h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg,#059669,#10b981,#34d399)",
        }}
        transition={{ ease: "linear", duration: 0 }}
      />
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

// ─── PRIVACY POLICY SECTIONS ──────────────────────────────────────────────────
const PRIVACY_SECTIONS: Section[] = [
  {
    id: "collection",
    title: "Information We Collect",
    icon: Database,
    content: (
      <div className="space-y-4">
        <p>When you use MediStore, we collect the following categories of information to provide and improve our services:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {[
            { label: "Account Info", detail: "Name, email address, phone number, and password (hashed, never stored in plain text).", icon: UserCheck },
            { label: "Order Data", detail: "Medicines ordered, quantities, delivery addresses, and prescription uploads.", icon: ShoppingBag },
            { label: "Payment Details", detail: "Transaction IDs via SSLCommerz. We never store full card numbers on our servers.", icon: CreditCard },
            { label: "Delivery Info", detail: "Recipient name, address, and contact number provided at checkout.", icon: Truck },
            { label: "Usage Data", detail: "Pages visited, search queries, session duration, and device/browser information.", icon: Eye },
            { label: "Review Content", detail: "Ratings and written reviews you submit for products you have purchased.", icon: Star },
          ].map(({ label, detail, icon: Icon }) => (
            <div key={label} className="flex gap-3 p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05]">
              <div className="shrink-0 w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center mt-0.5">
                <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "use",
    title: "How We Use Your Information",
    icon: Settings,
    content: (
      <div className="space-y-3">
        <p>Your data is used exclusively to operate, maintain, and improve MediStore. Specifically:</p>
        {[
          "Process and fulfil your orders, including coordinating with verified pharmacy sellers.",
          "Send order confirmations, shipping updates, and delivery notifications via email and SMS.",
          "Verify your identity and maintain the security of your account.",
          "Personalise your shopping experience including medicine recommendations.",
          "Respond to customer support inquiries and resolve disputes.",
          "Comply with legal obligations under Bangladesh law, including DGDA pharmaceutical regulations.",
          "Detect and prevent fraud, abuse, and unauthorised access.",
          "Improve our platform through aggregate, anonymised analytics.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center mt-0.5">
              <ChevronRight className="w-3 h-3 text-emerald-500" />
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "sharing",
    title: "Data Sharing & Disclosure",
    icon: Share2,
    content: (
      <div className="space-y-4">
        <p>We do not sell your personal data. Ever. We may share limited information only in these circumstances:</p>
        <div className="space-y-3 mt-2">
          {[
            { party: "Verified Pharmacy Sellers", reason: "Order fulfilment — they receive your name, delivery address, and medicines ordered. They are contractually bound by our seller data policy.", color: "border-emerald-400/30 bg-emerald-500/[0.04]" },
            { party: "Payment Processors (SSLCommerz)", reason: "To process online payments securely. They operate under PCI DSS compliance and their own privacy policy.", color: "border-sky-400/30 bg-sky-500/[0.04]" },
            { party: "Logistics Partners", reason: "Delivery name, address, and contact number for shipment. No medical information is shared.", color: "border-violet-400/30 bg-violet-500/[0.04]" },
            { party: "Legal Authorities", reason: "When required by Bangladeshi law, court order, or to protect the safety of our users and the public.", color: "border-amber-400/30 bg-amber-500/[0.04]" },
          ].map(({ party, reason, color }) => (
            <div key={party} className={`p-4 rounded-xl border ${color}`}>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{party}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: Cookie,
    content: (
      <div className="space-y-4">
        <p>MediStore uses cookies and similar technologies to keep you signed in, remember your cart, and understand how people use our platform.</p>
        <div className="overflow-hidden rounded-xl border border-black/[0.07] dark:border-white/[0.07]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-black/[0.04] dark:bg-white/[0.04] border-b border-black/[0.06] dark:border-white/[0.06]">
                <th className="text-left px-4 py-3 font-bold text-slate-700 dark:text-slate-300">Type</th>
                <th className="text-left px-4 py-3 font-bold text-slate-700 dark:text-slate-300">Purpose</th>
                <th className="text-left px-4 py-3 font-bold text-slate-700 dark:text-slate-300">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {[
                { type: "Session", purpose: "Keeps you logged in securely (HTTP-only, Secure, SameSite)", duration: "Session" },
                { type: "Cart", purpose: "Persists your cart items across browser sessions", duration: "7 days" },
                { type: "Preference", purpose: "Stores theme (dark/light) and display settings", duration: "1 year" },
                { type: "Analytics", purpose: "Aggregate usage data to improve the platform (anonymised)", duration: "90 days" },
              ].map(({ type, purpose, duration }) => (
                <tr key={type} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">{type}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{purpose}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">You can disable cookies in your browser settings, though some features (e.g. staying logged in, cart persistence) may not function correctly.</p>
      </div>
    ),
  },
  {
    id: "security",
    title: "Security",
    icon: Lock,
    content: (
      <div className="space-y-4">
        <p>We implement industry-standard security practices to protect your data:</p>
        {[
          "Passwords are hashed using bcrypt — we cannot recover your password in plain text.",
          "Sessions are managed via HTTP-only, Secure, SameSite cookies — inaccessible to JavaScript.",
          "All data in transit is encrypted via TLS 1.3.",
          "Payment data is handled entirely by SSLCommerz. We store only the transaction ID.",
          "Our backend runs on isolated infrastructure with strict firewall rules.",
          "Regular security audits and dependency vulnerability scans are performed.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center mt-0.5">
              <ChevronRight className="w-3 h-3 text-emerald-500" />
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item}</p>
          </div>
        ))}
        <div className="mt-2 p-4 rounded-xl bg-amber-500/[0.06] border border-amber-400/30">
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            <strong>Important:</strong> No system is 100% secure. If you suspect unauthorised access to your account, change your password immediately and contact us at <span className="font-mono">security@medistore.com.bd</span>.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: UserCheck,
    content: (
      <div className="space-y-3">
        <p>As a MediStore user, you have the following rights over your personal data:</p>
        {[
          { right: "Access", desc: "Request a copy of all personal data we hold about you." },
          { right: "Correction", desc: "Update incorrect or outdated information via your Profile page at any time." },
          { right: "Deletion", desc: "Request deletion of your account and associated data (subject to legal retention requirements)." },
          { right: "Portability", desc: "Request your order history and account data in a machine-readable format." },
          { right: "Objection", desc: "Opt out of marketing emails at any time via the unsubscribe link in any email we send." },
        ].map(({ right, desc }) => (
          <div key={right} className="flex gap-3 p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05]">
            <div className="shrink-0 w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center mt-0.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">{right}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">To exercise any of these rights, email us at <span className="text-emerald-600 dark:text-emerald-400 font-medium">privacy@medistore.com.bd</span> and we will respond within 14 working days.</p>
      </div>
    ),
  },
  {
    id: "updates",
    title: "Policy Updates",
    icon: RefreshCw,
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or best practices. When we make material changes, we will notify you by email and display a prominent notice on the platform at least 14 days before the change takes effect.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Continued use of MediStore after the effective date constitutes your acceptance of the updated policy. If you do not agree, you may close your account before the effective date.
        </p>
        <div className="mt-3 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-400/30">
          <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p className="text-xs text-emerald-700 dark:text-emerald-400">Last updated: 4 May 2025. Previous version archived and available upon request.</p>
        </div>
      </div>
    ),
  },
];

// ─── TERMS SECTIONS ───────────────────────────────────────────────────────────
const TERMS_SECTIONS: Section[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: Gavel,
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          By accessing or using MediStore (the&ldquo;Platform), you agree to be bound by these Terms of Service and all applicable laws and regulations of the People&apos;s Republic of Bangladesh. If you do not agree with any part of these terms, you must not use this platform.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          These Terms apply to all users including customers, sellers, and administrators. Use of the Platform by anyone under 18 years of age requires consent from a parent or legal guardian.
        </p>
      </div>
    ),
  },
  {
    id: "accounts",
    title: "User Accounts",
    icon: Users,
    content: (
      <div className="space-y-3">
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</p>
        {[
          "You must provide accurate, current, and complete information during registration.",
          "You must not share your account credentials with any other person.",
          "You must notify us immediately at support@medistore.com.bd if you suspect unauthorised access.",
          "We reserve the right to suspend or terminate accounts that violate these Terms.",
          "One person may not maintain multiple active customer accounts.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center mt-0.5">
              <ChevronRight className="w-3 h-3 text-emerald-500" />
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "orders",
    title: "Orders & Payments",
    icon: ShoppingBag,
    content: (
      <div className="space-y-4">
        <p>By placing an order on MediStore, you are making an offer to purchase a product subject to these Terms.</p>
        <div className="space-y-3">
          {[
            { title: "Order Confirmation", desc: "An order is confirmed only when you receive a confirmation email. Displaying a product on our platform does not constitute a guarantee of availability.", color: "border-emerald-400/30 bg-emerald-500/[0.04]" },
            { title: "Pricing", desc: "Prices are displayed in Bangladeshi Taka (BDT) and are set by individual verified sellers. MediStore does not guarantee the lowest price.", color: "border-sky-400/30 bg-sky-500/[0.04]" },
            { title: "Payment", desc: "We accept Cash on Delivery (COD), bKash, Nagad, and card payments via SSLCommerz. Payment must be completed in full before dispatch for online payment orders.", color: "border-violet-400/30 bg-violet-500/[0.04]" },
            { title: "Cancellation", desc: "You may cancel an order only while it is in PLACED status. Once moved to PROCESSING, cancellation is at the seller's discretion.", color: "border-amber-400/30 bg-amber-500/[0.04]" },
          ].map(({ title, desc, color }) => (
            <div key={title} className={`p-4 rounded-xl border ${color}`}>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "medicine",
    title: "Medicine & Health Disclaimer",
    icon: AlertTriangle,
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-red-500/[0.06] border border-red-400/30">
          <div className="flex gap-2 items-center mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-sm font-bold text-red-700 dark:text-red-400">Medical Disclaimer</p>
          </div>
          <p className="text-xs text-red-600/80 dark:text-red-400/80 leading-relaxed">
            MediStore is a marketplace platform — not a healthcare provider, pharmacy, or medical advisor. Nothing on this platform constitutes medical advice. Always consult a qualified physician before purchasing or consuming any medicine.
          </p>
        </div>
        {[
          "Prescription medicines require a valid prescription uploaded at checkout. Uploading a fraudulent prescription is a criminal offence under Bangladeshi law.",
          "Sellers are responsible for the authenticity, storage conditions, and expiry of products they list.",
          "MediStore verifies seller credentials but cannot guarantee the outcome of any medical treatment.",
          "Do not use this platform in medical emergencies. Call 999 or go to your nearest hospital.",
          "Cold-chain medicines are shipped under controlled conditions. Returns are not accepted for these products.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center mt-0.5">
              <ChevronRight className="w-3 h-3 text-red-500" />
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "sellers",
    title: "Seller Obligations",
    icon: FileText,
    content: (
      <div className="space-y-3">
        <p>If you register as a seller on MediStore, you agree to the following additional obligations:</p>
        {[
          "You must hold a valid pharmacy or distributor licence issued by DGDA (Directorate General of Drug Administration) of Bangladesh.",
          "All medicines listed must be genuine, unexpired, and stored per the manufacturer's specifications.",
          "You must fulfil confirmed orders within the stated dispatch window. Repeated failures will result in account suspension.",
          "Pricing must be transparent. Hidden charges added after order placement are prohibited.",
          "You are responsible for maintaining accurate stock levels. Overselling is a violation of these Terms.",
          "Seller commissions and fees are governed by the Seller Agreement you sign at onboarding.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center mt-0.5">
              <ChevronRight className="w-3 h-3 text-emerald-500" />
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Shield,
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          To the fullest extent permitted by applicable law, MediStore and its affiliates, officers, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Our total liability for any claim arising out of or relating to these Terms or your use of the platform shall not exceed the total amount you paid to MediStore in the 3 months preceding the event giving rise to the claim.
        </p>
        <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05]">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            These limitations apply whether the claim is based on warranty, contract, tort, or any other legal theory, and whether or not MediStore has been informed of the possibility of such damage.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "governing",
    title: "Governing Law",
    icon: Gavel,
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          These Terms of Service are governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Bangladesh.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Before initiating legal proceedings, both parties agree to attempt resolution through good-faith negotiation for a period of at least 30 days.
        </p>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-400/30">
          <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            Legal notices must be sent to: <span className="font-mono font-semibold">legal@medistore.com.bd</span>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── TOC Sidebar ──────────────────────────────────────────────────────────────
function TOC({ sections, activeId }: { sections: Section[]; activeId: string }) {
  return (
    <nav className="space-y-1">
      {sections.map(({ id, title, icon: Icon }) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              isActive
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-400/30"
                : "text-slate-500 dark:text-slate-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-slate-800 dark:hover:text-white border border-transparent"
            }`}
          >
            <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
              isActive ? "bg-emerald-500/20" : "bg-black/[0.05] dark:bg-white/[0.05] group-hover:bg-emerald-500/10"
            }`}>
              <Icon className={`w-3 h-3 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 group-hover:text-emerald-500"}`} />
            </span>
            <span className="leading-snug">{title}</span>
            {isActive && (
              <motion.span
                layoutId="toc-indicator"
                className="ml-auto w-1 h-4 rounded-full bg-emerald-500"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ section, index }: { section: Section; index: number }) {
  const Icon = section.icon;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm hover:border-emerald-400/30 transition-all duration-300 scroll-mt-24"
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-black/[0.05] dark:border-white/[0.05]">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
            {section.title}
          </h2>
        </div>
        <span className="shrink-0 text-[10px] font-black text-slate-300 dark:text-slate-600 font-mono tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400 leading-[1.8]">
        {section.content}
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
type Tab = "privacy" | "terms";

export default function PrivacyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("privacy");
  const [activeId, setActiveId] = useState("");

  const sections = activeTab === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;

  // Scroll-spy
  useEffect(() => {
  const currentSections = activeTab === "privacy"
    ? PRIVACY_SECTIONS
    : TERMS_SECTIONS;

  const observers: IntersectionObserver[] = [];

  currentSections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActiveId(id);
    });

    obs.observe(el);
    observers.push(obs);
  });

  return () => observers.forEach((o) => o.disconnect());
}, [activeTab]);

  // Reset active id on tab change
 useEffect(() => {
  window.scrollTo({ top: 0 });
}, [activeTab]);

  return (
    <div className="min-h-screen bg-[#f0fdf8] dark:bg-[#020810] relative">
      <PageBg />
      <ProgressBar />

      {/* ── Hero header ── */}
      <div className="relative z-10 pt-20 pb-12 px-4 text-center border-b border-black/[0.06] dark:border-white/[0.05]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            <span className="text-slate-900 dark:text-white">Transparency &</span>{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#059669,#10b981 50%,#34d399)" }}
            >
              Trust
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            We believe in being fully transparent about how we handle your data and what you can
            expect from us. Read carefully — we wrote this to be understood, not to confuse.
          </p>

          {/* Tab switcher */}
          <div className="inline-flex mt-8 p-1 rounded-2xl bg-black/[0.05] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.06]">
            {(["privacy", "terms"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-white/[0.08] shadow-sm border border-black/[0.06] dark:border-white/[0.08]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === "privacy" ? <Eye className="w-3.5 h-3.5" /> : <Gavel className="w-3.5 h-3.5" />}
                  {tab === "privacy" ? "Privacy Policy" : "Terms of Service"}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex gap-8 max-w-6xl mx-auto">

          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-3 px-1">
                  {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"}
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TOC sections={sections} activeId={activeId} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Last updated */}
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-2">Last Updated</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">4 May 2025</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-snug">
                  Material changes will be communicated via email 14 days in advance.
                </p>
              </div>

              {/* Contact */}
              <a
                href="mailto:privacy@medistore.com.bd"
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-400/30 hover:bg-emerald-500/[0.10] transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-400">Questions?</p>
                  <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 font-mono mt-0.5">privacy@medistore.com.bd</p>
                </div>
              </a>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {sections.map((section, i) => (
                  <SectionCard key={section.id} section={section} index={i} />
                ))}

                {/* Footer note */}
                <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] backdrop-blur-sm text-center">
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-lg mx-auto">
                    By using MediStore, you acknowledge that you have read, understood, and agree to both our Privacy Policy and Terms of Service. If you have any questions, reach out to us at{" "}
                    <a href="mailto:support@medistore.com.bd" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                      support@medistore.com.bd
                    </a>
                    .
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}