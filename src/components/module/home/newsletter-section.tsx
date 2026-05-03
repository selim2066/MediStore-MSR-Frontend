"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    // Replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="relative py-20 md:py-28 md:px-18 overflow-hidden bg-[#f0fdf8] dark:bg-[#020810]">

      {/* ── Background system ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light grid */}
        <div
          className="absolute inset-0 opacity-[0.5] dark:opacity-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.05) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        {/* Dark grid */}
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)`,
            backgroundSize: "77px 77px",
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute rounded-full"
          style={{
            top: "10%", left: "15%", width: 480, height: 320,
            background: "radial-gradient(ellipse,rgba(16,185,129,0.11),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "5%", right: "10%", width: 360, height: 280,
            background: "radial-gradient(ellipse,rgba(20,184,166,0.10),transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Section hairlines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/[0.06] dark:bg-white/[0.05]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl"
        >
          {/* ── Glass card ── */}
          <div className="relative group rounded-3xl overflow-hidden">

            {/* Outer hover glow */}
            <div
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(135deg,rgba(16,185,129,0.22),rgba(20,184,166,0.14),transparent 60%)",
              }}
            />

            {/* Card surface */}
            <div
              className="
                relative rounded-3xl
                border border-black/[0.08] dark:border-white/[0.08]
                bg-white/50 dark:bg-white/[0.03]
                backdrop-blur-xl
                px-8 py-12 md:px-14 md:py-16
                text-center
                shadow-xl shadow-emerald-900/5 dark:shadow-black/40
              "
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent rounded-t-3xl" />

              {/* Inner radial spotlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25"
                style={{
                  background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(16,185,129,0.15),transparent)",
                }}
              />

              {/* ── Badge ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                  Stay Updated
                </span>
              </motion.div>

              {/* ── Heading ── */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-3xl md:text-4xl font-black tracking-tight leading-[1.12] mb-4"
              >
                <span className="text-slate-900 dark:text-white">Get Health Tips &</span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg,#059669,#10b981 50%,#2dd4bf)" }}
                >
                  Exclusive Offers
                </span>
              </motion.h2>

              {/* ── Description ── */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto mb-8"
              >
                Join over{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  12,000 subscribers
                </span>{" "}
                who receive weekly health insights, new product alerts, and members-only discounts — straight to their inbox.
              </motion.p>

              {/* ── Form ── */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3 py-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      You&apos;re subscribed!
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Check your inbox for a welcome email from MediStore.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      Subscribe another email
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Input */}
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="Enter your email"
                        disabled={status === "loading"}
                        className="
                          w-full pl-11 pr-4 py-3.5 rounded-xl
                          bg-white/70 dark:bg-white/[0.05]
                          border border-black/[0.09] dark:border-white/[0.09]
                          backdrop-blur-sm
                          text-sm text-slate-800 dark:text-slate-100
                          placeholder:text-slate-400 dark:placeholder:text-slate-500
                          focus:outline-none focus:border-emerald-400/60 dark:focus:border-emerald-500/50
                          focus:ring-2 focus:ring-emerald-500/10
                          transition-all duration-200
                          disabled:opacity-60
                        "
                      />
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={status === "loading" || !email.trim()}
                      className="
                        group/btn relative inline-flex items-center justify-center gap-2
                        px-6 py-3.5 rounded-xl shrink-0
                        font-semibold text-sm text-white
                        transition-all duration-200
                        hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25
                        active:scale-[0.98]
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                        overflow-hidden
                      "
                      style={{ background: "linear-gradient(135deg,#059669,#10b981 60%,#2dd4bf)" }}
                    >
                      {/* Shimmer sweep */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />

                      {status === "loading" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Error */}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11.5px] text-rose-500 dark:text-rose-400 mt-2.5 text-left pl-1"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </motion.form>

              {/* Trust text */}
              {status !== "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mt-4 text-[11px] text-slate-400 dark:text-slate-500"
                >
                  🔒 No spam, ever. Unsubscribe anytime with one click.
                </motion.p>
              )}

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent rounded-b-3xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}