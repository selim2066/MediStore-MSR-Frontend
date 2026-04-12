"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RotateCcw } from "lucide-react"; // Optional: lucide-react for icons

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Animated Icon Container */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 blur-2xl rounded-full"
          />
          <div className="relative bg-white dark:bg-slate-900 p-4 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
            <AlertCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Unexpected Error
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-[280px] leading-relaxed">
            We ran into a hiccup while loading this section. Please try refreshing.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={reset}
          className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-medium shadow-md shadow-emerald-500/20 hover:bg-emerald-700 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
          Try again
        </motion.button>
      </motion.div>
    </div>
  );
}