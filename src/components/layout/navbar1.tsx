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
import { motion } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ModeToggle = dynamic(
  () => import("./modeToggle").then((m) => m.ModeToggle),
  { ssr: false },
);

/* ─── TYPES ───────────────────────── */
interface MenuItem {
  title: string;
  url: string;
  visibleFor?: Role[];
}

/* ─── LOGGED OUT ───────────────────── */
const LOGGED_OUT_LINKS: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "About", url: "/about" },
  { title: "Terms & Privacy", url: "/privacy" },
];

/* ─── NAV LINKS (ONLY ROUTE FIXED) ─── */
const getNavLinks = (role?: Role): MenuItem[] => [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },

  // ✅ only customer sees orders
  {
    title: "Orders",
    url: "/orders",
    visibleFor: ["CUSTOMER"],
  },

  {
    title:
      role === "SELLER"
        ? "Seller Dashboard"
        : role === "ADMIN"
          ? "Admin Panel"
          : "Become A Seller",
    url:
      role === "SELLER"
        ? "/seller/dashboard"
        : role === "ADMIN"
          ? "/admin"
          : "/become-a-seller",
  },

  { title: "About", url: "/about" },
  { title: "Terms & Privacy", url: "/privacy" },
  { title: "Contact", url: "/contact" },
];

/* ─── FILTER ───────────────────────── */
function filterByRole(items: MenuItem[], role?: Role) {
  return items.filter((item) => {
    if (!item.visibleFor) return true;
    return role ? item.visibleFor.includes(role) : false;
  });
}

/* ─── NAVBAR ───────────────────────── */
const Navbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const router = useRouter();
  const role = session?.user.role as Role | undefined;

  const navLinks = session
    ? filterByRole(getNavLinks(role), role)
    : LOGGED_OUT_LINKS;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <motion.header className={cn("fixed top-0 left-0 right-0 z-50", className)}>
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          {/* ─── LOGO (UNCHANGED) ─── */}
          <Link href="/" className="flex items-center gap-2">
            <motion.img
              src="/msr-logo-1.png"
              className="h-16 w-16 object-contain"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <span className="gradient-text text-2xl font-bold">MediStore</span>
          </Link>

          {/* ─── DESKTOP NAV ─── */}
          <nav className="hidden lg:flex gap-2">
            {navLinks.map((item) => (
              <NavLink key={item.title} item={item} />
            ))}
          </nav>

          {/* ─── RIGHT SIDE ─── */}
          <div className="hidden lg:flex items-center gap-3">
            <ModeToggle />

            <Button asChild variant="ghost" size="icon">
              <Link href="/cart">
                <ShoppingCart />
              </Link>
            </Button>

            {/* PROFILE DROPDOWN (UNCHANGED) */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2">
                    <img
                      src={session.user.image || "/avatar.png"}
                      className="h-10 w-10 rounded-full object-cover ring-3 ring-emerald-500/30"
                    />
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* ─── MOBILE ─── */}
          <div className="lg:hidden flex items-center gap-2">
            <ModeToggle />

            <Button asChild variant="ghost" size="icon">
              <Link href="/cart">
                <ShoppingCart />
              </Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>

              {/* ✅ YOUR ORIGINAL SIDEBAR */}
              <SheetContent side="right" className="w-72 p-0 flex flex-col">
                {/* Header */}
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="gradient-text text-2xl font-bold">
                    MediStore
                  </SheetTitle>
                </SheetHeader>

                {/* NAV LINKS */}
                {/* NAV LINKS */}
                <div className="p-4 flex flex-col gap-2">
                  {navLinks.map((item) => {
                    const isActive =
                      item.url === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.url);

                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "px-3 py-2 rounded-lg flex items-center gap-2 transition",
                          isActive
                            ? "bg-emerald-500/10 text-emerald-500 font-medium border-l-2 border-emerald-500"
                            : "hover:bg-accent text-muted-foreground",
                        )}
                      >
                        {/* small active dot */}
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isActive ? "bg-emerald-500" : "bg-transparent",
                          )}
                        />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>

                {/* ACTIONS */}

                <div className="mt-auto border-t p-4 flex flex-col gap-2">
                  {session && (
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 mb-3">
                      <img
                        src={session.user.image || "/avatar.png"}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                      />
                      <div>
                        <p className="font-semibold">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {role?.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  )}
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  {role === "SELLER" && (
                    <Link
                      href="/seller/dashboard"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Seller Dashboard
                    </Link>
                  )}

                  <Button
                    onClick={handleSignOut}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

/* ─── NAV LINK ─── */
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

export { Navbar };
