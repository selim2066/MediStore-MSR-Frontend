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
    },
    body: request.method !== "GET" && request.method !== "HEAD"
      ? request.body
      : undefined,
    // @ts-expect-error duplex required for streaming body in Node
    duplex: "half",
  })

  const body = await res.text()
  const response = new NextResponse(body, { status: res.status })

  // Only forward safe headers
  const allowedHeaders = ["content-type", "set-cookie"]
  res.headers.forEach((value, key) => {
    if (allowedHeaders.includes(key.toLowerCase())) {
      response.headers.append(key, value)
    }
  })

  console.log("SET-COOKIE:", res.headers.get("set-cookie"))

  return response
}

export { handler as GET, handler as POST }