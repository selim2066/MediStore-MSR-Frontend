// components/layout/navbar1.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Role } from "@/types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

//import { ModeToggle } from "./modeToggle";
import dynamic from "next/dynamic";

const ModeToggle = dynamic(
  () => import("./modeToggle").then((m) => m.ModeToggle),
  { ssr: false },
);

/* ─── Types ──────────────────────────────────────────────────── */
interface MenuItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  className?: string;
}

/* ─── Route definitions ──────────────────────────────────────── */
// Update-1 requirement: 4 routes logged-out, 6 routes logged-in

const LOGGED_OUT_LINKS: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "Blog", url: "/blog" },
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
  { title: "Blog", url: "/blog" },
  { title: "About", url: "/about" },
  { title: "Privacy", url: "/privacy" },
];

/* ─── Progress Bar ───────────────────────────────────────────── */
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

    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

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

/* ─── NavAvatar ──────────────────────────────────────────────── */
// Gradient circle with user initials — shows image if available
// Used as the profile dropdown trigger

function NavAvatar({
  name,
  image,
  size = "sm",
}: {
  name: string;
  image?: string | null;
  size?: "sm" | "md";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dim = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        className={cn(
          dim,
          "rounded-full object-cover ring-2 ring-emerald-500/30",
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        dim,
        "rounded-full flex items-center justify-center font-semibold text-white",
        "bg-gradient-to-br from-emerald-500 to-teal-600",
        "ring-2 ring-emerald-500/30",
      )}
    >
      {initials}
    </div>
  );
}

/* ─── Desktop NavLink ────────────────────────────────────────── */
// Only showing UPDATED PARTS (full component logic unchanged)

/* ─── Desktop NavLink ────────────────────────────────────────── */
function NavLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const isActive =
    item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);

  return (
    <Link
      href={item.url}
      className="relative px-3 py-1.5 text-sm rounded-lg group"
    >
      {/* Active pill background */}
      {isActive && (
        <motion.span
          layoutId="nav-active-shadow"
          className="absolute inset-0 rounded-lg bg-emerald-500/10"
        />
      )}

      {/* Hover background */}
      {/* navbar text color */}
      {!isActive && (
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-100 dark:bg-accent/40" />
      )}

      <span
        className={cn(
          "relative z-10 transition-colors duration-200 font-semibold",
          isActive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-[#799EFF] dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white",
        )}
      >
        {item.title}
      </span>

      {/* Active dot */}
      {isActive && (
        <motion.span
          layoutId="nav-active-dot"
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
        />
      )}
    </Link>
  );
}

export { NavLink };

/* ─── Navbar ─────────────────────────────────────────────────── */
const Navbar = ({ className }: NavbarProps) => {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(() => false);
  const shouldReduceMotion = useReducedMotion();

  const role = session?.user.role as Role | undefined;
  const navLinks = session ? getNavLinks(role) : LOGGED_OUT_LINKS;

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
    if (role === "SELLER")
      return { href: "/seller/dashboard", label: "Seller Dashboard" };
    if (role === "ADMIN") return { href: "/admin", label: "Admin Panel" };
    return null;
  };

  const dashboardLink = getDashboardLink();
  const ordersUrl =
    navLinks.find((l) => l.title === "Orders")?.url ?? "/orders";

  return (
    <>
      <RouteProgressBar />

      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-background/80 backdrop-blur-xl border-b border-slate-200 dark:border-border/60"
            : "bg-transparent border-b border-transparent",
          className,
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-0">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* ── Logo ─────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <motion.img
                src="/msr-logo-1.png"
                className="h-10"
                whileHover={
                  shouldReduceMotion ? {} : { scale: 1.08, rotate: -4 }
                }
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
              <motion.span
                className="
    font-bold text-2xl tracking-tight
    text-slate-900 dark:text-white
    hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500
    hover:bg-clip-text hover:text-transparent
    transition-all duration-300
  "
              >
                MediStore
              </motion.span>
            </Link>

            {/* ── Desktop nav ──────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((item) => (
                <NavLink key={item.title} item={item} />
              ))}
            </nav>

            {/* ── Desktop right ────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-2">
              <ModeToggle />

              {/* Cart */}
              <motion.div whileTap={{ scale: 0.93 }}>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-accent"
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4" />
                    <AnimatePresence>
                      {mounted && totalItems > 0 && (
                        <motion.span
                          key="badge"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 22,
                          }}
                          className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center font-semibold"
                        >
                          {totalItems > 9 ? "9+" : totalItems}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </Button>
              </motion.div>

              {/* Auth */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      className="flex items-center gap-2 px-2 py-1 rounded-xl
    hover:bg-slate-100 dark:hover:bg-accent/60
    transition-colors duration-200 outline-none"
                    >
                      <NavAvatar
                        name={session.user.name}
                        image={session.user.image}
                      />
                      <span className="text-sm font-medium max-w-[80px] truncate hidden xl:block">
                        {session.user.name.split(" ")[0]}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </motion.button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56 p-2">
                    {/* User info header */}
                    <DropdownMenuLabel className="p-0 mb-1">
                      <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10">
                        <NavAvatar
                          name={session.user.name}
                          image={session.user.image}
                          size="md"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <User className="h-3.5 w-3.5" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href={ordersUrl}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>

                    {dashboardLink && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={dashboardLink.href}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5" />
                          {dashboardLink.label}
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div>

                  <Button asChild size="lg" className="p-0 mx-2">
                    <Link href="/login">
                      <div
                        className="
        relative group px-5 py-2.5 rounded-xl
        bg-white/5 backdrop-blur-xl
        border border-white/20
        text-white text-sm font-semibold
        overflow-hidden
        transition-all duration-300
        hover:scale-[1.04]
      "
                      >
                        {/* ✨ animated glow */}
                        <div
                          className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition duration-300
        "
                          style={{
                            background:
                              "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.25), transparent 70%)",
                          }}
                        />

                        {/* 🔥 gradient border glow */}
                        <div
                          className="
          absolute inset-0 rounded-xl pointer-events-none
          opacity-0 group-hover:opacity-100 transition duration-300
        "
                          style={{
                            boxShadow: "0 0 20px rgba(16,185,129,0.4)",
                          }}
                        />

                        {/* 🧠 content */}
                        <span className="relative z-10 flex items-center gap-2">
                          Login / Register
                          {/* arrow animation */}
                          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </span>

                        {/* ⚡ bottom accent line */}
                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400 group-hover:w-full transition-all duration-300" />
                      </div>
                    </Link>
                  </Button>
                  {/* <Button asChild size="sm" className="btn-brand px-4">
                    <Link href="/register">Register</Link>
                  </Button> */}
                </div>
              )}
            </div>

            {/* ── Mobile right ─────────────────────────────────── */}
            <div className="flex lg:hidden items-center gap-1">
              <ModeToggle />

              <motion.div whileTap={{ scale: 0.93 }}>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative btn-press"
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4" />
                    <AnimatePresence>
                      {mounted && totalItems > 0 && (
                        <motion.span
                          key="badge-mobile"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 22,
                          }}
                          className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center font-semibold"
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

                <SheetContent side="right" className="w-72 p-0 flex flex-col">
                  {/* Sheet header */}
                  <SheetHeader className="p-4 border-b shrink-0">
                    <SheetTitle className="flex items-center gap-2">
                      <span className="gradient-text text-2xl font-bold">
                        MediStore
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Nav links */}
                  <div className="p-3 space-y-1 flex-1 overflow-y-auto">
                    {navLinks.map((item, i) => (
                      <MobileNavLink
                        key={item.title}
                        item={item}
                        index={i}
                        onClose={() => setMobileOpen(false)}
                      />
                    ))}
                  </div>

                  {/* Auth section */}
                  <motion.div
                    className="border-t p-3 space-y-2 shrink-0"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: navLinks.length * 0.06 + 0.1,
                      duration: 0.3,
                    }}
                  >
                    {session ? (
                      <>
                        {/* User info card */}
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 mb-3">
                          <NavAvatar
                            name={session.user.name}
                            image={session.user.image}
                            size="md"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">
                              {session.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {role?.toLowerCase()}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/60 transition-colors text-sm"
                          onClick={() => setMobileOpen(false)}
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          Profile
                        </Link>

                        {dashboardLink && (
                          <Link
                            href={dashboardLink.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/60 transition-colors text-sm"
                            onClick={() => setMobileOpen(false)}
                          >
                            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                            {dashboardLink.label}
                          </Link>
                        )}

                        <Button
                          onClick={() => {
                            handleSignOut();
                            setMobileOpen(false);
                          }}
                          className="w-full mt-1"
                          variant="destructive"
                          size="sm"
                        >
                          <LogOut className="h-3.5 w-3.5 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="w-full btn-brand">
                          <Link href="/register">Register</Link>
                        </Button>
                      </div>
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

/* ─── Mobile Nav Link ────────────────────────────────────────── */
const MOBILE_ICONS: Record<string, React.ReactNode> = {
  Blog: <BookOpen className="h-4 w-4" />,
  Privacy: <Shield className="h-4 w-4" />,
};

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
  const icon = MOBILE_ICONS[item.title];

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
    >
      <Link
        href={item.url}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative text-sm",
          isActive
            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-accent",
        )}
      >
        {/* Active left bar */}
        {isActive && (
          <motion.span
            layoutId="mobile-active-indicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-500 rounded-full"
          />
        )}
        {icon && (
          <span
            className={isActive ? "text-emerald-500" : "text-muted-foreground"}
          >
            {icon}
          </span>
        )}
        {item.title}
      </Link>
    </motion.div>
  );
}

export { Navbar };
