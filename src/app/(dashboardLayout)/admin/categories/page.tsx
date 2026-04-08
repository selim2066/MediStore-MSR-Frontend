import AdminCategoriesClient from "@/components/module/admin/admin-categories-client"
import { categoryService } from "@/service/category.service"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"


export default async function AdminCategoriesPage() {
  const { data: session } = await userService.getSession()
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

  const { data: catRes } = await categoryService.getCategories()
  const categories = catRes?.data ?? []

  return <AdminCategoriesClient categories={categories} />
}