import { env } from "@/env"
import { ApiResponse, Category } from "@/types"
import { cookies } from "next/headers"

export const categoryService = {

  // GET all categories — public
  getCategories: async () => {
    try {
      const res = await fetch(`${env.API_URL}/categories`, {
        next: { tags: ["categories"] },
      })
      const data: ApiResponse<Category[]> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch categories", details: error } }
    }
  },

  // POST create category — admin only
  createCategory: async (categoryData: { name: string; description?: string }) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(categoryData),
      })
      const data: ApiResponse<Category> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to create category", details: error } }
    }
  },

  // DELETE category — admin only
  deleteCategory: async (id: string) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      })
      const data: ApiResponse<null> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to delete category", details: error } }
    }
  },
}

//? create category data flow: 
// [ UI Component ]
//       ↓
// calls service.createCategory(data)
//       ↓
// [ Service Layer ]
// - attach cookies (auth)
// - send POST request
//       ↓
// [ Backend API ]
// - verify user (auth)
// - check role (admin)
// - save to DB (Prisma)
//       ↓
// returns response JSON
//       ↓
// [ Service Layer ]
// - parse JSON
// - return structured result
//       ↓
// [ UI Component ]
// - update UI / show success