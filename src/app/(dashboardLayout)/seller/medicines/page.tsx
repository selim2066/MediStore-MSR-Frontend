import { medicineService } from "@/service/medicine.service"
import { categoryService } from "@/service/category.service"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"
import SellerMedicinesClient from "@/components/module/seller/seller-medicines-client"
// import SellerMedicinesClient from "@/components/module/seller/seller-medicines-client"

export default async function SellerMedicinesPage() {
  const { data: session } = await userService.getSession()
  if (!session?.user || session.user.role !== "SELLER") redirect("/login")

  const [{ data: medRes }, { data: catRes }] = await Promise.all([
    medicineService.getSellerMedicines(),
    categoryService.getCategories(),
  ])

  const medicines = medRes?.data ?? []
  const categories = catRes?.data ?? []

  return <SellerMedicinesClient medicines={medicines} categories={categories} />
}