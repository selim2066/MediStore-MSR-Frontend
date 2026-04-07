import { env } from "@/env"
import { ApiResponse, Medicine, MedicineWithRelations, PaginatedResponse } from "@/types"
import { cookies } from "next/headers"

// Query params for filtering medicines
interface GetMedicinesParams {
  search?: string
  categoryId?: string
  manufacturer?: string
  minPrice?: string
  maxPrice?: string
  page?: string
  limit?: string
}

interface ServiceOptions {
  cache?: RequestCache
  revalidate?: number
}

export const medicineService = {

  // GET all medicines — public, used in /shop
  getMedicines: async (params?: GetMedicinesParams, options?: ServiceOptions) => {
    try {
      const url = new URL(`${env.API_URL}/medicine`)

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value))
          }
        })
      }

      const config: RequestInit = {}

      if (options?.revalidate !== undefined) {
        config.next = { revalidate: options.revalidate }
      }

      config.next = { ...config.next, tags: ["medicines"] }

      if (options?.cache) {
        config.cache = options.cache
      }

      const res = await fetch(url.toString(), config)
      const data: ApiResponse<PaginatedResponse<Medicine>> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch medicines", details: error } }
    }
  },

  // GET single medicine by id — public, used in /shop/:id
  getMedicineById: async (id: string) => {
    try {
      const res = await fetch(`${env.API_URL}/medicine/${id}`, {
        next: { tags: [`medicine-${id}`] },
      })
      const data: ApiResponse<MedicineWithRelations> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch medicine", details: error } }
    }
  },

  // GET seller's own medicines — private, used in /seller/medicines
  getSellerMedicines: async () => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/medicine/seller`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["seller-medicines"] },
      })
      const data: ApiResponse<Medicine[]> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch seller medicines", details: error } }
    }
  },

  // POST create medicine — seller only
  createMedicine: async (medicineData: FormData) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/medicine`, {
        method: "POST",
        headers: { Cookie: cookieStore.toString() },
        body: medicineData,
      })
      const data: ApiResponse<Medicine> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to create medicine", details: error } }
    }
  },

  // PUT update medicine — seller only
  updateMedicine: async (id: string, medicineData: FormData) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/medicine/${id}`, {
        method: "PUT",
        headers: { Cookie: cookieStore.toString() },
        body: medicineData,
      })
      const data: ApiResponse<Medicine> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to update medicine", details: error } }
    }
  },

  // DELETE medicine — seller only
  deleteMedicine: async (id: string) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/medicine/${id}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      })
      const data: ApiResponse<null> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to delete medicine", details: error } }
    }
  },
}