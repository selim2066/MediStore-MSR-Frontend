"use client";

import { useState } from "react";
import { LoginForm } from "./login";
import { RegisterForm } from "./registration";

export function AuthSlider() {
  const [isSignup, setIsSignup] = useState(false);

  const TRANSITION =
    "transition-transform duration-[650ms] ease-[cubic-bezier(0.77,0,0.18,1)] will-change-transform";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background my-10">

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block relative w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">

          {/* ===== FORMS TRACK ===== */}
          <div
            className={[
              "flex w-[200%] z-0",
              TRANSITION,
              isSignup ? "-translate-x-1/2" : "translate-x-0",
            ].join(" ")}
          >
            {/* LOGIN */}
            <div className="w-1/2 flex-shrink-0 flex items-center justify-start p-12 min-h-[600px]">
              <div className="w-full max-w-[340px]">
                <LoginForm onSwitchToRegister={() => setIsSignup(true)} />
              </div>
            </div>

            {/* REGISTER */}
            <div className="w-1/2 flex-shrink-0 flex items-center justify-end p-12 min-h-[600px]">
              <div className="w-full max-w-[340px]">
                <RegisterForm onSwitchToLogin={() => setIsSignup(false)} />
              </div>
            </div>
          </div>

          {/* ===== OVERLAY ===== */}
          <div
            aria-hidden="true"
            className={[
              "absolute top-0 left-1/2 h-full w-1/2 z-10",
              "flex flex-col items-center justify-center gap-6 p-10 text-center",
              "bg-gradient-to-br from-[#1e3a6e] via-[#166e5a] to-[#1D9E75]",
              TRANSITION,
              isSignup ? "-translate-x-full" : "translate-x-0",
            ].join(" ")}
          >
            {/* Decorative */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full border border-white/10" />
              <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full border border-white/[0.07]" />
              <div className="absolute -bottom-14 -left-14 h-48 w-48 rounded-full border border-white/[0.07]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-5">
              <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/50">
                {isSignup ? "Already with us?" : "New to MediStore?"}
              </p>

              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[30px] font-medium leading-tight text-white">
                  {isSignup ? "Good to" : "Assalamu Alaikum,"}
                </span>
                <span className="text-[30px] font-medium leading-tight text-white/40">
                  {isSignup ? "see you." : "Welcome Back!"}
                </span>
              </div>

              <div className="h-px w-8 rounded-full bg-white/25" />

              <p className="max-w-[200px] text-[13px] leading-relaxed text-white/60">
                {isSignup
                  ? "Log in with your personal details to access your orders, listings, and account settings."
                  : "Sign up and join thousands of customers and sellers on Bangladesh's most trusted medical platform."}
              </p>

              <button
                type="button"
                onClick={() => setIsSignup((v) => !v)}
                className="mt-1 rounded-full border border-white/50 px-7 py-2.5 text-[18px] font-medium text-white transition-all hover:border-white/80 hover:bg-white/10 active:scale-[0.97]"
              >
                {isSignup ? "Login" : "Registration"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden w-full max-w-sm">
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">

          <div className="grid grid-cols-2 border-b border-border">
            <button
              type="button"
              onClick={() => setIsSignup(false)}
              className={[
                "py-3.5 text-sm font-medium transition-colors",
                !isSignup
                  ? "border-b-2 border-[#1D9E75] text-[#1D9E75]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsSignup(true)}
              className={[
                "py-3.5 text-sm font-medium transition-colors",
                isSignup
                  ? "border-b-2 border-[#1D9E75] text-[#1D9E75]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            {!isSignup ? (
              <LoginForm onSwitchToRegister={() => setIsSignup(true)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsSignup(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}