"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Typewriter ── */
const MEDICINES = [
  "Paracetamol 500mg",
  "Amoxicillin 250mg",
  "Vitamin D3",
  "Omeprazole 20mg",
  "Metformin 500mg",
  "Cetirizine 10mg",
  "Azithromycin 500mg",
  "Ibuprofen 400mg",
];

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const indexRef = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = MEDICINES[indexRef.current];

      if (!isDeleting) {
        charRef.current++;
        setDisplay(word.slice(0, charRef.current));
        if (charRef.current === word.length) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
            tick();
          }, 1900);
          return;
        }
      } else {
        charRef.current--;
        setDisplay(word.slice(0, charRef.current));
        if (charRef.current === 0) {
          setIsDeleting(false);
          indexRef.current = (indexRef.current + 1) % MEDICINES.length;
          timeout = setTimeout(tick, 280);
          return;
        }
      }

      timeout = setTimeout(tick, isDeleting ? 40 : 68);
    };

    timeout = setTimeout(tick, isDeleting ? 40 : 68);
    return () => clearTimeout(timeout);
  }, [isDeleting]);

  return display;
}

/* ── Component ── */
interface ShopSearchBarProps {
  defaultValue?: string;
}

export function ShopSearchBar({ defaultValue = "" }: ShopSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const typed = useTypewriter();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/shop");
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push("/shop");
  };

  const showTypewriter = !query && !focused;

  return (
    <>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>

      <div
        className="flex items-center bg-white/90 dark:bg-white/[0.05] backdrop-blur-md rounded-[14px] overflow-hidden transition-all duration-300"
        style={{
          border: `1.5px solid ${focused ? "#10b981" : "rgba(0,0,0,0.10)"}`,
          boxShadow: focused
            ? "0 0 0 3px rgba(16,185,129,0.13), 0 4px 24px rgba(0,0,0,0.07)"
            : "0 2px 16px rgba(0,0,0,0.05)",
        }}
      >
        {/* Search icon */}
        <div className="pl-4 pr-2.5 flex items-center shrink-0">
          <Search
            className="w-4 h-4 transition-colors duration-200"
            style={{ stroke: focused ? "#10b981" : "#94a3b8" }}
          />
        </div>

        {/* Input area */}
        <div className="flex-1 h-[50px] relative">

          {/* Typewriter layer — visible only when empty + not focused */}
          {showTypewriter && (
            <div className="absolute inset-0 flex items-center gap-1.5 pointer-events-none select-none">
              <span className="text-slate-400 dark:text-slate-500 text-[13.5px]">
                Search
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-[13.5px] font-medium">
                {typed}
              </span>
              <span
                className="inline-block w-[1.5px] h-[15px] bg-emerald-500 rounded-sm"
                style={{ animation: "blink .9s step-end infinite" }}
              />
            </div>
          )}

          {/* Real input — sits on top, text only shows when focused/typed */}
          <input
            className="absolute inset-0 w-full h-full bg-transparent outline-none border-none text-[13.5px] text-slate-800 dark:text-white placeholder:text-transparent"
            placeholder="Search medicines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {/* Clear button */}
        {query && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleClear();
            }}
            className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-150 mr-2"
          >
            <X className="w-3 h-3 text-slate-400 dark:text-slate-300" />
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-7 bg-black/[0.08] dark:bg-white/[0.10] shrink-0 mx-1" />

        {/* Search button */}
        <Button
          onClick={handleSearch}
          className="shrink-0 rounded-[10px] font-bold text-[13px] text-white border-0 transition-all duration-200 hover:brightness-110 active:scale-95 mr-1.5"
          style={{
            height: 38,
            paddingLeft: 20,
            paddingRight: 20,
            background: "linear-gradient(135deg,#10b981,#0d9488)",
            boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
          }}
        >
          Search
        </Button>
      </div>
    </>
  );
}