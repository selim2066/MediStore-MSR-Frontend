import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
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