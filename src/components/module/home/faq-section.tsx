"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

// ─── TYPES ───────────────────────────────────
type FAQ = {
  q: string;
  a: string;
};

// ─── DATA ────────────────────────────────────
const FAQS: FAQ[] = [
  {
    q: "Are all medicines on MediStore verified and authentic?",
    a: "Yes. Every seller on MediStore goes through a strict vetting process before listing any product. We only allow licensed pharmacies and authorized distributors. All medicines must comply with Bangladesh's DGDA regulations.",
  },
  {
    q: "Do I need a prescription to buy medicines here?",
    a: "MediStore primarily carries over-the-counter (OTC) medicines. For prescription medicines, you must upload a valid prescription issued by a registered physician.",
  },
  {
    q: "How fast is delivery?",
    a: "We deliver across Bangladesh within 2–4 business days. Express delivery is available in major cities like Dhaka.",
  },
  {
    q: "Can I return medicines?",
    a: "Returns are accepted within 48 hours if unopened and in original packaging. Cold-chain medicines are non-returnable.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Yes, COD is available nationwide. We also support bKash, Nagad, and card payments.",
  },
];

// ─── ITEM ────────────────────────────────────
type FAQItemProps = {
  item: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        border transition-all duration-300 ease-out
        ${
          isOpen
            ? "bg-white dark:bg-white/[0.05] border-emerald-400/40 shadow-lg shadow-emerald-500/10"
            : "bg-white/50 dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.07] hover:border-emerald-300/30 hover:bg-white/70 dark:hover:bg-white/[0.04]"
        }
      `}
    >
      {/* Top glow */}
      <div
        className={`
          absolute top-0 inset-x-0 h-[2px]
          bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-60"}
        `}
      />

      {/* HEADER */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        {/* LEFT */}
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={`
              shrink-0 w-7 h-7 rounded-full flex items-center justify-center
              text-[10px] font-bold mt-0.5 transition-all duration-300
              ${
                isOpen
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                  : "bg-black/[0.06] dark:bg-white/[0.08] text-slate-400"
              }
            `}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={`
              text-[14.5px] font-semibold leading-snug transition-colors duration-200
              ${
                isOpen
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-700 dark:text-slate-300"
              }
            `}
          >
            {item.q}
          </span>
        </div>

        {/* TOGGLE */}
        <span
          className={`
            shrink-0 w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-300
            ${
              isOpen
                ? "bg-emerald-500 text-white rotate-180 shadow-md shadow-emerald-500/30"
                : "bg-black/[0.05] dark:bg-white/[0.06] text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-500"
            }
          `}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>

      {/* CONTENT */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-6 pl-[64px]">
          <p className="text-[13.5px] text-slate-500 dark:text-slate-400 leading-[1.75]">
            {item.a}
          </p>

          {/* bottom subtle glow */}
          <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

// ─── SECTION ─────────────────────────────────
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-3 max-w-md mx-auto">
            Everything you need to know about MediStore
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}