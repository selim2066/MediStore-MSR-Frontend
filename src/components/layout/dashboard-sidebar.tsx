// "use client";

// import { authClient, useSession } from "@/lib/auth-client";
// import { cn } from "@/lib/utils";
// import {
//   ChevronLeft,
//   LayoutDashboard,
//   LogOut,
//   Package,
//   Pill,
//   ShoppingBag,
//   Tag,
//   Users,
//     Home,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";


// const sellerLinks = [
//   { href: "/", label: "Home", icon: Home },
//   { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/seller/medicines", label: "Medicines", icon: Pill },
//   { href: "/seller/orders", label: "Orders", icon: Package },
// ];

// const adminLinks = [
//   { href: "/", label: "Home", icon: Home },
//   { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/admin/users", label: "Users", icon: Users },
//   { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
//   { href: "/admin/categories", label: "Categories", icon: Tag },
// ];

// export function DashboardSidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const router = useRouter();

//   const role = session?.user?.role;
//   const links = role === "ADMIN" ? adminLinks : sellerLinks;
//   const brandLabel = role === "ADMIN" ? "Admin Panel" : "Seller Panel";

//   const handleSignOut = async () => {
//     await authClient.signOut();
//     router.push("/login");
//   };

//   return (
//     <aside
//       className={cn(
//         "relative flex flex-col h-screen bg-slate-900 text-white transition-all duration-300 ease-in-out shrink-0",
//         collapsed ? "w-16" : "w-60",
//       )}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={() => setCollapsed(!collapsed)}
//         className="absolute -right-3 top-6 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-colors"
//       >
//         <ChevronLeft
//           className={cn(
//             "w-3.5 h-3.5 transition-transform duration-300",
//             collapsed && "rotate-180",
//           )}
//         />
//       </button>

//       {/* Brand */}
//       <div
//         className={cn(
//           "flex items-center gap-3 px-4 py-5 border-b border-slate-700/60",
//           collapsed && "justify-center px-0",
//         )}
//       >
//         <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 shrink-0">
//           <Pill className="w-4 h-4 text-white" />
//         </div>
//         {!collapsed && (
//           <div className="overflow-hidden">
//             <p className="text-sm font-bold text-white leading-tight truncate">
//               MediStore
//             </p>
//             <p className="text-xs text-slate-400 truncate">{brandLabel}</p>
//           </div>
//         )}
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
//         {links.map(({ href, label, icon: Icon }) => {
//           const isActive = pathname === href;
//           return (
//             <Link
//               key={href}
//               href={href}
//               className={cn(
//                 "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
//                 isActive
//                   ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
//                   : "text-slate-400 hover:bg-slate-800 hover:text-white",
//                 collapsed && "justify-center px-0",
//               )}
//               title={collapsed ? label : undefined}
//             >
//               <Icon className="w-4 h-4 shrink-0" />
//               {!collapsed && <span className="truncate">{label}</span>}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User + Sign Out */}
//       <div className="border-t border-slate-700/60 p-3 space-y-1">
//         {/* User info */}
//         {!collapsed && session?.user && (
//           <div className="px-3 py-2 mb-1">
//             <p className="text-xs font-semibold text-white truncate">
//               {session.user.name}
//             </p>
//             <p className="text-xs text-slate-400 truncate">
//               {session.user.email}
//             </p>
//           </div>
//         )}
//         <button
//           onClick={handleSignOut}
//           className={cn(
//             "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all",
//             collapsed && "justify-center px-0",
//           )}
//           title={collapsed ? "Sign Out" : undefined}
//         >
//           <LogOut className="w-4 h-4 shrink-0" />
//           {!collapsed && <span>Sign Out</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }


// ! updated version for mobile responsiveness and better UX, but still a work in progress.

"use client";

import { authClient, useSession } from "@/lib/auth-client";
import type { Session, User } from "better-auth";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Pill,
  ShoppingBag,
  Tag,
  Users,
  Home,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const sellerLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/medicines", label: "Medicines", icon: Pill },
  { href: "/seller/orders", label: "Orders", icon: Package },
];

const adminLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

// ── Extracted outside to avoid "created during render" error ──
interface SidebarContentProps {
  mobile?: boolean;
  collapsed?: boolean;
  links: { href: string; label: string; icon: React.ElementType }[];
  brandLabel: string;
  pathname: string;
  session: { session: Session; user: User } | null;
  onLinkClick?: () => void;
  onClose?: () => void;
  onSignOut: () => void;
}

function SidebarContent({
  mobile = false,
  collapsed = false,
  links,
  brandLabel,
  pathname,
  session,
  onLinkClick,
  onClose,
  onSignOut,
}: SidebarContentProps) {
  const showLabels = mobile || !collapsed;

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-slate-700/60",
          !showLabels && "justify-center px-0",
        )}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 shrink-0">
          <Pill className="w-4 h-4 text-white" />
        </div>
        {showLabels && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white leading-tight truncate">MediStore</p>
            <p className="text-xs text-slate-400 truncate">{brandLabel}</p>
          </div>
        )}
        {mobile && (
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
                !showLabels && "justify-center px-0",
              )}
              title={!showLabels ? label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {showLabels && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User + Sign Out */}
      <div className="border-t border-slate-700/60 p-3 space-y-1">
        {showLabels && session?.user && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-semibold text-white truncate">{session.user.name}</p>
            <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
          </div>
        )}
        <button
          onClick={onSignOut}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all",
            !showLabels && "justify-center px-0",
          )}
          title={!showLabels ? "Sign Out" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {showLabels && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}

// ── Main component ──
export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const role = session?.user?.role;
  const links = role === "ADMIN" ? adminLinks : sellerLinks;
  const brandLabel = role === "ADMIN" ? "Admin Panel" : "Seller Panel";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const sharedProps = {
    links,
    brandLabel,
    pathname,
    session,
    onSignOut: handleSignOut,
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 text-white shadow-lg hover:bg-slate-700 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent
          {...sharedProps}
          mobile
          onClose={() => setMobileOpen(false)}
          onLinkClick={() => setMobileOpen(false)}
        />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col relative h-screen bg-slate-900 text-white shrink-0",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn("w-3.5 h-3.5 transition-transform duration-300", collapsed && "rotate-180")}
          />
        </button>
        <SidebarContent {...sharedProps} collapsed={collapsed} />
      </aside>
    </>
  );
}