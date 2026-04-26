import { medicineService } from "@/service/medicine.service"
import { categoryService } from "@/service/category.service"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"
import { PaginationControls } from "@/components/ui/pagination-controls"
import SellerMedicinesClient from "@/components/module/seller/seller-medicines-client"

interface SellerMedicinesPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function SellerMedicinesPage({ searchParams }: SellerMedicinesPageProps) {
  const { data: session } = await userService.getSession()
  if (!session?.user || session.user.role !== "SELLER") redirect("/login")

  const { page } = await searchParams
  const currentPage = Math.max(1, Number(page) || 1)

  const [{ data: medRes }, { data: catRes }] = await Promise.all([
    medicineService.getSellerMedicines({ page: String(currentPage), limit: "5" }),
    categoryService.getCategories(),
  ])

  const medicines = medRes?.data?.data ?? []
  const categories = catRes?.data ?? []
  const totalPages = medRes?.data?.meta?.totalPages ?? 1

  return (
    <div>
      <SellerMedicinesClient medicines={medicines} categories={categories} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/seller/medicines"
      />
    </div>
  )
}