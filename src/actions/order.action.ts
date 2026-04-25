"use server"

import { orderService } from "@/service/order.service"
//import { paymentService } from "@/service/payment.service"
import { revalidatePath, revalidateTag } from "next/cache"
//import { paymentService } from "@/service/payment.service"
import { paymentService } from '@/service/payment.service'; // ← add

export async function createOrderAction(orderData: {
  shippingAddress: string
  items: { medicineId: string; quantity: number }[]
  paymentMethod?: 'CASH_ON_DELIVERY' | 'ONLINE' // ← new
}) {
  const { data, error } = await orderService.createOrder(orderData)
  if (error) return { data: null, error: { message: "Failed to place order" } }
  return { data, error: null }
}

// export async function initiatePaymentAction(orderId: string) { // ← new
//   const { data, error } = await paymentService.initiatePayment(orderId)
//   if (error) return { data: null, error: { message: "Failed to initiate payment" } }
//   return { data, error: null }
// }

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