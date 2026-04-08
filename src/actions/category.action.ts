"use server"

import { categoryService } from "@/service/category.service"
import { revalidateTag } from "next/cache"

export async function createCategoryAction(data: { name: string; description?: string }) {
  const { data: res, error } = await categoryService.createCategory(data)
  if (error || !res?.success) return { data: null, error: { message: "Failed to create category" } }
  revalidateTag("categories", "default")
  return { data: res, error: null }
}

export async function deleteCategoryAction(id: string) {
  const { data: res, error } = await categoryService.deleteCategory(id)
  if (error || !res?.success) return { data: null, error: { message: "Failed to delete category" } }
  revalidateTag("categories", "default")
  return { data: res, error: null }
}