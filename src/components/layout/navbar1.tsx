// "use client";

// import { useState, useEffect } from "react";
// import { Menu, X, ShoppingCart, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ModeToggle } from "./modeToggle";
// import { useSession, signOut } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/cart-context";

// interface MenuItem {
//   title: string;
//   url: string;
// }

// interface NavbarProps {
//   className?: string;
// }

// const NAV_LINKS: MenuItem[] = [
//   { title: "Home", url: "/" },
//   { title: "Shop", url: "/shop" },
//   { title: "Categories", url: "/shop?view=categories" },
//   { title: "Orders", url: "/orders" },
//   { title: "About", url: "/about" },
// ];

// const Navbar = ({ className }: NavbarProps) => {
//   const { data: session } = useSession();
//   const { totalItems } = useCart();
//   const router = useRouter();
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // Track scroll to add blur/shadow once user scrolls
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 16);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleSignOut = async () => {
//     await signOut();
//     router.push("/login");
//   };

//   const getDashboardLink = () => {
//     if (session?.user.role === "SELLER") return { href: "/seller/dashboard", label: "Seller Dashboard" };
//     if (session?.user.role === "ADMIN") return { href: "/admin", label: "Admin Panel" };
//     return null;
//   };

//   const dashboardLink = getDashboardLink();

//   return (
//     <header
//       className={cn(
//         // Sticky + full-width
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         // Glassmorphism: transparent base, blur + border + shadow when scrolled
//         scrolled
//           ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
//           : "bg-transparent backdrop-blur-none border-b border-transparent",
//         className
//       )}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between gap-4">

//           {/* ── Logo ── */}
//           <Link
//             href="/"
//             className="flex items-center gap-2.5 shrink-0 group"
//           >
//             <img
//               src="/gpt tomato.png"
//               alt="MediStore logo"
//               className="h-7 w-auto dark:invert transition-transform duration-200 group-hover:scale-110"
//             />
//             <span className="text-base font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//               MediStore
//             </span>
//           </Link>

//           {/* ── Desktop Nav Links ── */}
//           <nav className="hidden lg:flex items-center gap-1">
//             {NAV_LINKS.map((item) => (
//               <Link
//                 key={item.title}
//                 href={item.url}
//                 className={cn(
//                   "relative px-3.5 py-1.5 text-sm font-medium rounded-lg",
//                   "text-muted-foreground hover:text-foreground",
//                   "transition-colors duration-150",
//                   // Subtle hover background
//                   "hover:bg-accent/60",
//                   // Animated underline
//                   "after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-px",
//                   "after:bg-emerald-500 after:scale-x-0 after:transition-transform after:duration-200",
//                   "hover:after:scale-x-100"
//                 )}
//               >
//                 {item.title}
//               </Link>
//             ))}
//           </nav>

//           {/* ── Desktop Right Side ── */}
//           <div className="hidden lg:flex items-center gap-2">
//             <ModeToggle />

//             {/* Cart */}
//             <Button asChild variant="ghost" size="icon" className="relative hover:bg-accent/60">
//               <Link href="/cart">
//                 <ShoppingCart className="h-4 w-4" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center leading-none">
//                     {totalItems > 9 ? "9+" : totalItems}
//                   </span>
//                 )}
//               </Link>
//             </Button>

//             {/* Auth */}
//             {session ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="gap-1.5 border-border/60 bg-background/60 hover:bg-accent/60 backdrop-blur-sm"
//                   >
//                     <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
//                       <User className="h-3 w-3" />
//                     </span>
//                     <span className="max-w-[80px] truncate text-sm">
//                       {session.user.name.split(" ")[0]}
//                     </span>
//                     <ChevronDown className="h-3 w-3 text-muted-foreground" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   align="end"
//                   className="w-48 bg-background/90 backdrop-blur-xl border-border/60"
//                 >
//                   <div className="px-2 py-1.5">
//                     <p className="text-xs font-medium text-foreground truncate">{session.user.name}</p>
//                     <p className="text-[11px] text-muted-foreground truncate">{session.user.email}</p>
//                   </div>
//                   <DropdownMenuSeparator />
//                   {session.user.role === "CUSTOMER" && (
//                     <>
//                       <DropdownMenuItem asChild>
//                         <Link href="/orders">My Orders</Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem asChild>
//                         <Link href="/profile">Profile</Link>
//                       </DropdownMenuItem>
//                     </>
//                   )}
//                   {dashboardLink && (
//                     <DropdownMenuItem asChild>
//                       <Link href={dashboardLink.href}>
//                         <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
//                         {dashboardLink.label}
//                       </Link>
//                     </DropdownMenuItem>
//                   )}
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     onClick={handleSignOut}
//                     className="text-destructive focus:text-destructive cursor-pointer"
//                   >
//                     <LogOut className="mr-2 h-3.5 w-3.5" />
//                     Sign Out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Button asChild variant="ghost" size="sm" className="text-sm hover:bg-accent/60">
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button
//                   asChild
//                   size="sm"
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm shadow-sm shadow-emerald-900/20"
//                 >
//                   <Link href="/register">Register</Link>
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* ── Mobile Right: Cart + Hamburger ── */}
//           <div className="flex lg:hidden items-center gap-2">
//             <ModeToggle />

//             <Button asChild variant="ghost" size="icon" className="relative">
//               <Link href="/cart">
//                 <ShoppingCart className="h-4 w-4" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center">
//                     {totalItems > 9 ? "9+" : totalItems}
//                   </span>
//                 )}
//               </Link>
//             </Button>

//             <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="right"
//                 className="w-72 bg-background/95 backdrop-blur-xl border-border/60 p-0"
//               >
//                 <SheetHeader className="px-5 py-4 border-b border-border/40">
//                   <SheetTitle asChild>
//                     <Link
//                       href="/"
//                       onClick={() => setMobileOpen(false)}
//                       className="flex items-center gap-2"
//                     >
//                       <img src="/gpt tomato.png" alt="MediStore" className="h-6 dark:invert" />
//                       <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//                         MediStore
//                       </span>
//                     </Link>
//                   </SheetTitle>
//                 </SheetHeader>

//                 <div className="flex flex-col gap-1 px-3 py-4">
//                   {/* Nav links */}
//                   {NAV_LINKS.map((item) => (
//                     <Link
//                       key={item.title}
//                       href={item.url}
//                       onClick={() => setMobileOpen(false)}
//                       className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
//                     >
//                       {item.title}
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="px-3 pt-2 pb-4 border-t border-border/40 mt-auto">
//                   {session ? (
//                     <div className="flex flex-col gap-2">
//                       {/* User info pill */}
//                       <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-muted/60 mb-1">
//                         <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
//                           <User className="h-3.5 w-3.5" />
//                         </span>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium truncate">{session.user.name}</p>
//                           <p className="text-[11px] text-muted-foreground truncate">{session.user.email}</p>
//                         </div>
//                       </div>
//                       {session.user.role === "CUSTOMER" && (
//                         <>
//                           <Button asChild variant="outline" size="sm" className="w-full justify-start">
//                             <Link href="/orders" onClick={() => setMobileOpen(false)}>My Orders</Link>
//                           </Button>
//                           <Button asChild variant="outline" size="sm" className="w-full justify-start">
//                             <Link href="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
//                           </Button>
//                         </>
//                       )}
//                       {dashboardLink && (
//                         <Button asChild variant="outline" size="sm" className="w-full justify-start">
//                           <Link href={dashboardLink.href} onClick={() => setMobileOpen(false)}>
//                             <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
//                             {dashboardLink.label}
//                           </Link>
//                         </Button>
//                       )}
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => { handleSignOut(); setMobileOpen(false); }}
//                         className="w-full mt-1"
//                       >
//                         <LogOut className="mr-2 h-3.5 w-3.5" />
//                         Sign Out
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-2 pt-2">
//                       <Button asChild variant="outline" className="w-full">
//                         <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
//                       </Button>
//                       <Button
//                         asChild
//                         className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
//                       >
//                         <Link href="/register" onClick={() => setMobileOpen(false)}>Register</Link>
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// };

// export { Navbar };

// ! updated for cloudinary image loading skeleton
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
  { title: "Categories", url: "/shop?view=categories" },
  { title: "Orders", url: "/orders" },
  { title: "About", url: "/about" },
];

const Navbar = ({ className }: NavbarProps) => {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ FIX: prevents hydration mismatch on the cart badge.
  // The server renders totalItems as 0 (no cart context), but the client
  // hydrates from the cookie and may have items. Without this guard, React
  // sees a server/client mismatch and throws. mounted stays false during
  // SSR and the first client render (they match), then flips true after
  // hydration — safe to show the real count.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
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
          : "bg-transparent backdrop-blur-none border-b border-transparent",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/gpt tomato.png"
              alt="MediStore logo"
              className="h-7 w-auto dark:invert transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-base font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MediStore
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "relative px-3.5 py-1.5 text-sm font-medium rounded-lg",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-150",
                  "hover:bg-accent/60",
                  "after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-px",
                  "after:bg-emerald-500 after:scale-x-0 after:transition-transform after:duration-200",
                  "hover:after:scale-x-100",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Right Side ── */}
          <div className="hidden lg:flex items-center gap-2">
            <ModeToggle />

            {/* Cart — badge only renders after mount to avoid hydration mismatch */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent/60"
            >
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>

            {/* Auth */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-border/60 bg-background/60 hover:bg-accent/60 backdrop-blur-sm"
                  >
                    {/* Avatar: image → initials → icon */}
                    <NavAvatar
                      image={session.user.image ?? undefined}
                      name={session.user.name}
                    />
                    <span className="max-w-[80px] truncate text-sm">
                      {session.user.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-background/90 backdrop-blur-xl border-border/60"
                >
                  {/* User info header */}
                  <div className="px-2 py-1.5 flex items-center gap-2">
                    <NavAvatar
                      image={session.user.image ?? undefined}
                      name={session.user.name}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {session.user.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />

                  {/* Profile — available for ALL roles */}
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>

                  {session.user.role === "CUSTOMER" && (
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                  )}
                  {dashboardLink && (
                    <DropdownMenuItem asChild>
                      <Link href={dashboardLink.href}>
                        <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
                        {dashboardLink.label}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-3.5 w-3.5" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-sm hover:bg-accent/60"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm shadow-sm shadow-emerald-900/20"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* ── Mobile Right: Cart + Hamburger ── */}
          <div className="flex lg:hidden items-center gap-2">
            <ModeToggle />

            {/* Cart — same mounted guard for mobile */}
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-background/95 backdrop-blur-xl border-border/60 p-0"
              >
                <SheetHeader className="px-5 py-4 border-b border-border/40">
                  <SheetTitle asChild>
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <img
                        src="/gpt tomato.png"
                        alt="MediStore"
                        className="h-6 dark:invert"
                      />
                      <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        MediStore
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-1 px-3 py-4">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="px-3 pt-2 pb-4 border-t border-border/40 mt-auto">
                  {session ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-muted/60 mb-1">
                        <NavAvatar
                          image={session.user.image ?? undefined}
                          name={session.user.name}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {session.user.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </div>

                      {/* Profile — all roles */}
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Link
                          href="/profile"
                          onClick={() => setMobileOpen(false)}
                        >
                          Profile
                        </Link>
                      </Button>

                      {session.user.role === "CUSTOMER" && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Link
                            href="/orders"
                            onClick={() => setMobileOpen(false)}
                          >
                            My Orders
                          </Link>
                        </Button>
                      )}
                      {session.user.role === "CUSTOMER" && (
                        <>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Link
                              href="/orders"
                              onClick={() => setMobileOpen(false)}
                            >
                              My Orders
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Link
                              href="/profile"
                              onClick={() => setMobileOpen(false)}
                            >
                              Profile
                            </Link>
                          </Button>
                        </>
                      )}
                      {dashboardLink && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Link
                            href={dashboardLink.href}
                            onClick={() => setMobileOpen(false)}
                          >
                            <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
                            {dashboardLink.label}
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          handleSignOut();
                          setMobileOpen(false);
                        }}
                        className="w-full mt-1"
                      >
                        <LogOut className="mr-2 h-3.5 w-3.5" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 pt-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link
                          href="/login"
                          onClick={() => setMobileOpen(false)}
                        >
                          Login
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Link
                          href="/register"
                          onClick={() => setMobileOpen(false)}
                        >
                          Register
                        </Link>
                      </Button>
                    </div>
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
function NavAvatar({
  image,
  name,
  size = "sm",
}: {
  image?: string;
  name: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-5 w-5 text-[10px]" : "h-7 w-7 text-xs";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`${dim} rounded-full object-cover shrink-0`}
      />
    );
  }

  return (
    <span
      className={`${dim} rounded-full bg-emerald-500/15 text-emerald-600 font-semibold flex items-center justify-center shrink-0`}
    >
      {initials}
    </span>
  );
}

export { Navbar };
