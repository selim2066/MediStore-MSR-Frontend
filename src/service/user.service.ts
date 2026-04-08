import { env } from "@/env"
import { ApiResponse, User } from "@/types"
import { cookies } from "next/headers"

export const userService = {

  // GET current session — used in middleware + server components
  getSession: async () => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store", // always fresh — never cache session
      })
      const data = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch session", details: error } }
    }
  },

  // GET all users — admin only
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/admin/users`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["all-users"] },
      })
      const data: ApiResponse<User[]> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch users", details: error } }
    }
  },

  // PATCH ban/unban user — admin only
  updateUserStatus: async (id: string, isBanned: boolean) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ isBanned }),
      })
      const data: ApiResponse<User> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to update user status", details: error } }
    }
  },

  
}