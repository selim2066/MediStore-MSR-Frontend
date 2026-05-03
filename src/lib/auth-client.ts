import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined"
    ? window.location.origin   // uses vercel.app in prod, localhost:3000 locally
    : process.env.NEXT_PUBLIC_FRONTEND_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false },
        isBanned: { type: "boolean", required: false },
        phone: { type: "string", required: false },
        address: { type: "string", required: false },
      },
    }),
  ],
})

export const { signIn, signUp, signOut, useSession } = authClient