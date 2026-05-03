"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.9 }}
      className="
        relative h-9 w-9 flex items-center justify-center
        rounded-xl border border-emerald-400/20
        bg-gradient-to-br from-emerald-500/10 to-teal-500/10
        backdrop-blur-md
        transition-all duration-300
        hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]
      "
    >
      <span className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />

      <motion.div
        key={resolvedTheme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 text-emerald-600 dark:text-emerald-400"
      >
        {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </motion.button>
  );
}