// import { NextRequest, NextResponse } from "next/server"

// async function handler(request: NextRequest) {
//   const url = new URL(request.url)
//   const path = url.pathname.replace("/api/auth", "")
//   const backendUrl = `${process.env.AUTH_URL}${path}${url.search}`

//   console.log("AUTH PROXY →", backendUrl)

//   const res = await fetch(backendUrl, {
//     method: request.method,
//     headers: {
//       "content-type": request.headers.get("content-type") || "",
//       "cookie": request.headers.get("cookie") || "",
//       "origin": process.env.FRONTEND_URL || "",
//     },
//     body: request.method !== "GET" && request.method !== "HEAD"
//       ? request.body
//       : undefined,
//     // @ts-expect-error duplex required for streaming body in Node
//     duplex: "half",
//   })

//   const body = await res.text()
//   // console.log("AUTH PROXY status: from route : ...", res.status)
//   // console.log("AUTH PROXY body:", body)
//   // console.log("SET-COOKIE: from route", res.headers.get("set-cookie"))

//   const response = new NextResponse(body, { status: res.status })

//   const allowedHeaders = ["content-type", "set-cookie"]
//   res.headers.forEach((value, key) => {
//     if (allowedHeaders.includes(key.toLowerCase())) {
//       response.headers.append(key, value)
//     }
//   })

//   return response
// }

// export { handler as GET, handler as POST }

// ! stn
import { NextRequest, NextResponse } from "next/server"

async function handler(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname.replace("/api/auth", "")
  const backendUrl = `${process.env.AUTH_URL}${path}${url.search}`

  console.log("AUTH PROXY →", backendUrl)

  const res = await fetch(backendUrl, {
    method: request.method,
    headers: {
      "content-type": request.headers.get("content-type") || "",
      "cookie": request.headers.get("cookie") || "",
      "origin": process.env.FRONTEND_URL || "",
    },
    body: request.method !== "GET" && request.method !== "HEAD"
      ? request.body
      : undefined,
    redirect: "manual", // ← KEY: don't auto-follow redirects
    // @ts-expect-error duplex required for streaming body in Node
    duplex: "half",
  })

  // Handle redirects from OAuth callback
  if (res.status === 301 || res.status === 302 || res.status === 303 || res.status === 307 || res.status === 308) {
    const location = res.headers.get("location") || "/"
    
    // Replace backend URL with frontend URL in redirect location
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
    const backendOrigin = process.env.AUTH_URL?.replace("/api/auth", "") || ""
    const fixedLocation = location.replace(backendOrigin, frontendUrl)

    const redirectResponse = NextResponse.redirect(fixedLocation)

    // Forward cookies from backend to browser
    res.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        redirectResponse.headers.append("set-cookie", value)
      }
    })

    return redirectResponse
  }

  const body = await res.text()
  const response = new NextResponse(body, { status: res.status })

  const allowedHeaders = ["content-type", "set-cookie"]
  res.headers.forEach((value, key) => {
    if (allowedHeaders.includes(key.toLowerCase())) {
      response.headers.append(key, value)
    }
  })

  return response
}

export { handler as GET, handler as POST }