import { NextRequest, NextResponse } from "next/server"
import { userService } from "./service/user.service"

export async function proxy(request: NextRequest) {
  
  const pathname = request.nextUrl.pathname

  // Read cookies directly from request
  const cookieHeader = request.headers.get("cookie") || ""
   //console.log("COOKIES:", cookieHeader)

  // Fetch current session from backend
  const { data } = await userService.getSession(cookieHeader)
  //console.log("SESSION DATA:", JSON.stringify(data))

  const isAuthenticated = !!data?.session
  const role = data?.user?.role // "CUSTOMER" | "SELLER" | "ADMIN"

  // ── Not logged in → redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // ── Logged in but banned → redirect to login
  if (data?.user?.isBanned) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // ── Customer trying to access seller routes
  if (pathname.startsWith("/seller") && role !== "SELLER") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // ── Customer/Seller trying to access admin routes
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // ── Seller trying to access customer routes
  if (
    (pathname.startsWith("/cart") ||
      pathname.startsWith("/checkout") ||
      pathname.startsWith("/orders")) &&
    role === "SELLER"
  ) {
    return NextResponse.redirect(new URL("/seller/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Customer routes
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/profile",
    // Seller routes
    "/seller/:path*",
    // Admin routes
    "/admin/:path*",
  ],
}

// import { NextRequest, NextResponse } from "next/server"
// import { userService } from "./service/user.service"


// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname //User → clicks URL → request is created → comes here

//   // Fetch current session from backend
//   const { data } = await userService.getSession()

//   const isAuthenticated = !!data?.session
//   const role = data?.user?.role // "CUSTOMER" | "SELLER" | "ADMIN"

//   // ── Not logged in → redirect to login
//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   // ── Logged in but banned → redirect to login
//   if (data?.user?.isBanned) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   // ── Customer trying to access seller routes
//   if (pathname.startsWith("/seller") && role !== "SELLER") {
//     return NextResponse.redirect(new URL("/", request.url))
//   }

//   // ── Customer/Seller trying to access admin routes
//   if (pathname.startsWith("/admin") && role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/", request.url))
//   }

//   // ── Seller trying to access customer routes
//   if (
//     (pathname.startsWith("/cart") ||
//       pathname.startsWith("/checkout") ||
//       pathname.startsWith("/orders")) &&
//     role === "SELLER"
//   ) {
//     return NextResponse.redirect(new URL("/seller/dashboard", request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     // Customer routes
//     "/cart",
//     "/checkout",
//     "/orders/:path*",
//     "/profile",
//     // Seller routes
//     "/seller/:path*",
//     // Admin routes
//     "/admin/:path*",
//   ],
// }