"use server"

import { orderService } from "@/service/order.service"
import { revalidatePath, revalidateTag } from "next/cache"

// export async function createOrderAction(orderData: {
//   shippingAddress: string
//   items: { medicineId: string; quantity: number }[]
// }) {
//   const { data, error } = await orderService.createOrder(orderData)

//   if (error) {
//     return { data: null, error: { message: "Failed to place order" } }
//   }

//   //revalidateTag("my-orders")
//   return { data, error: null }
// }

export async function createOrderAction(orderData: {
  shippingAddress: string
  items: { medicineId: string; quantity: number }[]
}) {
  const { data, error } = await orderService.createOrder(orderData)
  if (error) return { data: null, error: { message: "Failed to place order" } }
  return { data, error: null }
}

export async function cancelOrderAction(id: string) {
  const { data, error } = await orderService.cancelOrder(id)
  if (error) return { data: null, error: { message: "Failed to cancel order" } }
  revalidateTag("my-orders", "default") // ← and this
   revalidateTag(`order-${id}`, "default") // ← and this
  //  revalidatePath("/orders")           // ← instead of revalidateTag
  // revalidatePath(`/orders/${id}`)     // ← instead of revalidateTag
 
  return { data, error: null }
}

export async function updateOrderStatusAction(id: string, status: string) {
  const { data, error } = await orderService.updateOrderStatus(id, status)
  if (error || !data?.success) return { data: null, error: { message: "Failed to update status" } }
  //revalidatePath("/seller/orders")
    revalidateTag("seller-orders", "default") // ← and this
  return { data, error: null }
}

export async function updateAdminOrderStatusAction(id: string, status: string) {
  const { data, error } = await orderService.updateAdminOrderStatus(id, status);
  if (error) return { error: error.message };
  if (!data?.success) return { error: data?.message };
  revalidateTag("admin-orders", "default");
  return { success: data.message };
}