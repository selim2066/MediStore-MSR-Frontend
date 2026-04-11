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
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./modeToggle";

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

const Navbar = ({ className }: NavbarProps) => {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(() => false);

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/gpt tomato.png" className="h-7 dark:invert" />
            <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MediStore
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-lg"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* DESKTOP RIGHT */}
          <div className="hidden lg:flex items-center gap-2">
            <ModeToggle />

            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>

            {/* AUTH */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {session.user.name.split(" ")[0]}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
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
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-emerald-600 text-white">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* MOBILE */}
          <div className="flex lg:hidden items-center gap-2">
            <ModeToggle />

            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileOpen ? <X /> : <Menu />}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>MediStore</SheetTitle>
                </SheetHeader>

                {/* NAV LINKS */}
                <div className="p-3 space-y-1">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-accent/60"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* USER SECTION (FIXED - NO DUPLICATION) */}
                <div className="border-t p-3 space-y-2">
                  {session ? (
                    <>
                      <Link
                        href="/profile"
                        className="block px-3 py-2 rounded-lg hover:bg-accent/60"
                        onClick={() => setMobileOpen(false)}
                      >
                        Profile
                      </Link>

                      {session.user.role === "CUSTOMER" && (
                        <Link
                          href="/orders"
                          className="block px-3 py-2 rounded-lg hover:bg-accent/60"
                          onClick={() => setMobileOpen(false)}
                        >
                          My Orders
                        </Link>
                      )}

                      {dashboardLink && (
                        <Link
                          href={dashboardLink.href}
                          className="block px-3 py-2 rounded-lg hover:bg-accent/60"
                          onClick={() => setMobileOpen(false)}
                        >
                          {dashboardLink.label}
                        </Link>
                      )}

                      <Button
                        onClick={() => {
                          handleSignOut();
                          setMobileOpen(false);
                        }}
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
                      <Button asChild className="w-full bg-emerald-600 text-white">
                        <Link href="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };