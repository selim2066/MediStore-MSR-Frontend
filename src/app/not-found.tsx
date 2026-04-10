// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { MoveLeft, Home, ShoppingBag, Search } from "lucide-react";

// export default function NotFound() {
//   return (
//     <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
//       {/* Background Decorative Element */}
//       <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-5">
//         <h1 className="select-none text-[20rem] font-bold">404</h1>
//       </div>

//       {/* Interactive Medical Icon / Animation */}
//       <div className="relative mb-8">
//         <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/20 blur-xl" />
//         <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-background border-2 border-primary shadow-xl">
//           <Search className="h-12 w-12 text-primary animate-bounce" />
//         </div>
//       </div>

//       <div className="max-w-md space-y-6">
//         <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
//           Prescription Not Found
//         </h2>
//         <p className="text-muted-foreground text-lg">
//           Oops! The page you're looking for seems to have expired or never existed.
//           Let&apos;s get you back to recovery.
//         </p>

//         <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
//           <Link href="/">
//             <Button variant="default" size="lg" className="gap-2">
//               <Home className="h-4 w-4" />
//               Back to Home
//             </Button>
//           </Link>

//           <Link href="/shop">
//             <Button variant="outline" size="lg" className="gap-2">
//               <ShoppingBag className="h-4 w-4" />
//               Browse Shop
//             </Button>
//           </Link>
//         </div>

//         <div className="pt-8">
//           <p className="text-sm text-muted-foreground">
//             Think this is a mistake? <Link href="/contact" className="underline hover:text-primary">Contact Support</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/not-found.tsx
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

// Replace the pills array type
type FloatingPill = {
  label: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: string;
};

const floatingPills: FloatingPill[] = [
  { label: "Paracetamol", top: "14%", left: "6%", delay: "0s" },
  { label: "Amoxicillin", top: "18%", right: "8%", delay: "1.5s" },
  { label: "Ibuprofen", bottom: "22%", left: "8%", delay: "3s" },
  { label: "Vitamin D3", bottom: "18%", right: "9%", delay: "4.5s" },
];

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating medicine pills — decorative */}
      {floatingPills.map((p) => (
        <span
          key={p.label}
          className="pointer-events-none absolute hidden md:inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 opacity-60 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            animation: `float-drift 6s ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        >
          {p.label}
        </span>
      ))}

      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        Page not found
      </div>

      {/* Glitch 404 */}
      <div className="glitch-root group relative mb-2 cursor-default select-none">
        <span className="glitch-text text-[clamp(96px,18vw,160px)] font-extrabold leading-none tracking-tight text-transparent [-webkit-text-stroke:2px_theme(colors.emerald.500)]">
          404
        </span>
        <span
          aria-hidden
          className="absolute inset-0 text-[clamp(96px,18vw,160px)] font-extrabold leading-none tracking-tight text-transparent opacity-0 transition-opacity [-webkit-text-stroke:2px_#f43f5e] group-hover:opacity-60 group-hover:animate-[glitch-a_0.15s_steps(2)_infinite]"
        >
          404
        </span>
        <span
          aria-hidden
          className="absolute inset-0 text-[clamp(96px,18vw,160px)] font-extrabold leading-none tracking-tight text-transparent opacity-0 transition-opacity [-webkit-text-stroke:2px_#0ea5e9] group-hover:opacity-60 group-hover:animate-[glitch-b_0.15s_steps(2)_infinite]"
        >
          404
        </span>
      </div>

      {/* Copy */}
      <h1 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
        This page went missing
      </h1>
      <p className="mb-8 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
        The medicine you&apos;re looking for might have been moved, renamed, or
        is temporarily out of stock.
      </p>

      {/* CTA buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <Button
          asChild
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Browse shop
          </Link>
        </Button>
      </div>

      {/* Quick-link chips */}
      <p className="mb-3 text-xs text-muted-foreground">Or try one of these:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { label: "Categories", href: "/shop?view=categories" },
          { label: "My Orders", href: "/orders" },
          { label: "Profile", href: "/profile" },
          { label: "About", href: "/about" },
        ].map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
