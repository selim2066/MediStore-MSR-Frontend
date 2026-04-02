import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const urlSchema = z.string().pipe(z.url())

export const env = createEnv({
  server: {
    BACKEND_URL: urlSchema,
    API_URL: urlSchema,
    AUTH_URL: urlSchema,
    FRONTEND_URL: urlSchema,
  },
  client: {
    NEXT_PUBLIC_BACKEND_URL: urlSchema,
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
})

// ?
//  This code is basically a **safety system for your environment variables**. In a Next.js app, you usually store important values like API URLs in a `.env` file. But normally, if you use `process.env` directly, there is no guarantee those values actually exist or are correct—so your app can break later in unexpected ways. By using Zod with @t3-oss/env-nextjs, you are telling your app: “These variables must exist, and they must be valid URLs.” The line `z.string().pipe(z.url())` checks that each value is a proper URL. When the app starts, it reads your `.env`, validates everything, and if something is missing or wrong, it immediately throws an error and stops the app. This is useful because it prevents hidden bugs and gives you confidence that your configuration is always correct. After validation, you use the `env` object instead of `process.env`, which is safer, typed, and easier to work with.

// ? In summary, this code is a way to **safeguard your environment variables** by validating them at startup, ensuring that your app has the correct configuration before it runs.

// ! old ways:
// import { createEnv } from "@t3-oss/env-nextjs"
// import { z } from "zod"

// export const env = createEnv({
//   server: {
//     BACKEND_URL: z.string().url(),
//     API_URL: z.string().url(),
//     AUTH_URL: z.string().url(),
//     FRONTEND_URL: z.string().url(),
//   },
//   client: {},
//   runtimeEnv: {
//     BACKEND_URL: process.env.BACKEND_URL,
//     API_URL: process.env.API_URL,
//     AUTH_URL: process.env.AUTH_URL,
//     FRONTEND_URL: process.env.FRONTEND_URL,
//   },
// })