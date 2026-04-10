"use server"

import { medicineService } from "@/service/medicine.service"
import { revalidatePath, revalidateTag } from "next/cache"

// export async function createMedicineAction(formData: FormData) {
//   const { data, error } = await medicineService.createMedicine(formData)
//    console.log("createMedicine result:", JSON.stringify(data), error)
//   if (error || !data?.success) return { data: null, error: { message: "Failed to create medicine" } }
//   revalidatePath("/seller/medicines")
//   revalidateTag("seller-medicines","default") // ← and this
//   return { data, error: null }
// }

// export async function updateMedicineAction(id: string, formData: FormData) {
//   const { data, error } = await medicineService.updateMedicine(id, formData)
//   if (error || !data?.success) return { data: null, error: { message: "Failed to update medicine" } }
//   revalidatePath("/seller/medicines")
//    revalidateTag("seller-medicines","default") // ← and this
//   return { data, error: null }
// }

// !cloudinary version
// medicine.action.ts

export async function createMedicineAction(formData: FormData) {
  const { data, error } = await medicineService.createMedicine(formData)
  if (error || !data?.success) return { data: null, error: { message: "Failed to create medicine" } }
  revalidateTag("seller-medicines", "default")
  revalidateTag("medicines", "default")   // ← clears the shop page cache too
  revalidatePath("/seller/medicines")
  return { data, error: null }
}

export async function updateMedicineAction(id: string, formData: FormData) {
  const { data, error } = await medicineService.updateMedicine(id, formData)
  if (error || !data?.success) return { data: null, error: { message: "Failed to update medicine" } }
  revalidateTag("seller-medicines", "default")
  revalidateTag("medicines", "default")   // ← same here
  revalidatePath("/seller/medicines")
  return { data, error: null }
}

export async function deleteMedicineAction(id: string) {
  const { data, error } = await medicineService.deleteMedicine(id)
  if (error || !data?.success) return { data: null, error: { message: "Failed to delete medicine" } }
  revalidatePath("/seller/medicines")
   revalidateTag("seller-medicines","default") // ← and this
  return { data, error: null }
}