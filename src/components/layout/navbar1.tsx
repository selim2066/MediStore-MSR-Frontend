// components/navbar1.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./modeToggle";
import { useTheme } from "next-themes";
import { Role } from "@/types";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
}

const NAV_LINKS: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "Orders", url: "/orders" },
  { title: "About", url: "/about" },
];

 const getNavLinks = (role?: Role): MenuItem[] => [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  {
    title: "Orders",
    url:
      role === "ADMIN"
        ? "/admin/orders"
        : role === "SELLER"
        ? "/seller/orders"
        : "/orders",
  },
  { title: "About", url: "/about" },
];

/* ─── Progress Bar ─────────────────────────────────────────── */
export function RouteProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const prevPath = useRef(pathname);

 useEffect(() => {
  if (pathname === prevPath.current) return;
  prevPath.current = pathname;

  // Cancel any in-flight animations
  if (timerRef.current) clearTimeout(timerRef.current);
  if (rafRef.current) cancelAnimationFrame(rafRef.current);

  // ✅ State updates inside rAF — not synchronous in the effect body
  rafRef.current = requestAnimationFrame(() => {
    setProgress(0);
    setVisible(true);

    let p = 0;
    const climb = () => {
      p += p < 60 ? 8 : p < 80 ? 3 : 0.5;
      setProgress(Math.min(p, 80));
      if (p < 80) rafRef.current = requestAnimationFrame(climb);
    };
    rafRef.current = requestAnimationFrame(climb);
  });

  timerRef.current = setTimeout(() => {
    setProgress(100);
    setTimeout(() => setVisible(false), 400);
  }, 500);

  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, [pathname]);
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500"
        style={{ width: `${progress}%` }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full bg-gradient-to-r from-transparent to-white/30 blur-sm" />
      </motion.div>
    </div>
  );
}

function NavLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  // ← no useTheme here anymore
  const isActive =
    item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);

  return (
    <Link href={item.url} className="relative px-3 py-1.5 text-sm rounded-lg group">
      {isActive && (
        <motion.span
          layoutId="nav-active-shadow"
          className="absolute inset-0 rounded-lg bg-background"
          style={{ boxShadow: "var(--nav-active-shadow)" }}  // ← CSS var, same on server & client
          transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.8 }}
        />
      )}

      {!isActive && (
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-accent/40" />
      )}

      <span className={cn(
        "relative z-10 transition-colors duration-200",
        isActive ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {item.title}
      </span>
    </Link>
  );
}

export { NavLink };


/* ─── Navbar ───────────────────────────────────────────────── */
const Navbar = ({ className }: NavbarProps) => {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(() => false);
  const shouldReduceMotion = useReducedMotion();

 const navLinks = getNavLinks(session?.user.role as Role);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const getDashboardLink = () => {
    if (session?.user.role === "SELLER")
      return { href: "/seller/dashboard", label: "Seller Dashboard" };
    if (session?.user.role === "ADMIN")
      return { href: "/admin", label: "Admin Panel" };
    return null;
  };

  const dashboardLink = getDashboardLink();

  return (
    <>
      <RouteProgressBar />

      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent border-b border-transparent",
          className
        )}
        animate={{
          boxShadow: scrolled
            ? "0 1px 40px 0 rgba(0,0,0,0.08)"
            : "0 0px 0px 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-2">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <motion.img
                src="/msr-logo-1.png"
                className="h-10"
                whileHover={shouldReduceMotion ? {} : { scale: 1.08, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
              <motion.span
                className="font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-xl text-transparent"
                whileHover={{ opacity: 0.85 }}
                transition={{ duration: 0.15 }}
              >
                MediStore
              </motion.span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((item) => (
                <NavLink key={item.title} item={item} />
              ))}
            </nav>

            {/* DESKTOP RIGHT */}
            <div className="hidden lg:flex items-center gap-2">
              <ModeToggle />

              <motion.div whileTap={{ scale: 0.93 }}>
                <Button asChild variant="ghost" size="icon" className="relative btn-press">
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4" />
                    <AnimatePresence>
                      {mounted && totalItems > 0 && (
                        <motion.span
                          key="badge"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                          className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center"
                        >
                          {totalItems > 9 ? "9+" : totalItems}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </Button>
              </motion.div>

              {/* AUTH */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileTap={{ scale: 0.96 }}>
                      <Button variant="outline" size="sm">
                        {session.user.name.split(" ")[0]}
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    {dashboardLink && (
                      <DropdownMenuItem asChild>
                        <Link href={dashboardLink.href}>
                          <LayoutDashboard className="h-3 w-3 mr-2" />
                          {dashboardLink.label}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-3 w-3 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Button asChild variant="ghost" className="btn-press">
                      <Link href="/login">Login</Link>
                    </Button>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Button asChild className="bg-emerald-600 text-white">
                      <Link href="/register">Register</Link>
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* MOBILE */}
            <div className="flex lg:hidden items-center gap-2">
              <ModeToggle />

              <motion.div whileTap={{ scale: 0.93 }}>
                <Button asChild variant="ghost" size="icon" className="relative btn-press">
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4" />
                    <AnimatePresence>
                      {mounted && totalItems > 0 && (
                        <motion.span
                          key="badge-mobile"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                          className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center"
                        >
                          {totalItems > 9 ? "9+" : totalItems}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </Button>
              </motion.div>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <AnimatePresence mode="wait" initial={false}>
                      {mobileOpen ? (
                        <motion.span
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <X />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <Menu />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-72 p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle>MediStore</SheetTitle>
                  </SheetHeader>

                  {/* NAV LINKS — staggered */}
                  <div className="p-3 space-y-1">
                    {navLinks.map((item, i) => (
                      <MobileNavLink
                        key={item.title}
                        item={item}
                        index={i}
                        onClose={() => setMobileOpen(false)}
                      />
                    ))}
                  </div>

                  {/* USER SECTION */}
                  <motion.div
                    className="border-t p-3 space-y-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.06 + 0.1, duration: 0.3 }}
                  >
                    {session ? (
                      <>
                        <Link
                          href="/profile"
                          className="block px-3 py-2 rounded-lg hover:bg-accent/60 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          Profile
                        </Link>
                        {session.user.role === "CUSTOMER" && (
                          <Link
                            href="/orders"
                            className="block px-3 py-2 rounded-lg hover:bg-accent/60 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            My Orders
                          </Link>
                        )}
                        {dashboardLink && (
                          <Link
                            href={dashboardLink.href}
                            className="block px-3 py-2 rounded-lg hover:bg-accent/60 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {dashboardLink.label}
                          </Link>
                        )}
                        <Button
                          onClick={() => { handleSignOut(); setMobileOpen(false); }}
                          className="w-full mt-2"
                          variant="destructive"
                        >
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild className="w-full">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="w-full bg-emerald-600 text-white btn-press-emerald">
                          <Link href="/register">Register</Link>
                        </Button>
                      </>
                    )}
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

/* ─── Mobile Nav Link (staggered) ─────────────────────────── */
function MobileNavLink({
  item,
  index,
  onClose,
}: {
  item: MenuItem;
  index: number;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.28, ease: "easeOut" }}
    >
      <Link
        href={item.url}
        onClick={onClose}
        className={cn(
          "block px-3 py-2 rounded-lg transition-colors relative",
          isActive
            ? "bg-accent text-foreground font-medium"
            : "hover:bg-accent/60 text-muted-foreground hover:text-foreground"
        )}
      >
        {item.title}
        {isActive && (
          <motion.span
            layoutId="mobile-active-indicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-emerald-500 rounded-full"
          />
        )}
      </Link>
    </motion.div>
  );
}

export { Navbar };
