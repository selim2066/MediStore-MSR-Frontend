import { env } from "@/env"
import { ApiResponse, Order, OrderWithRelations } from "@/types"
import { cookies } from "next/headers"



// ? demo structure 
//* 
// async function actionName(input?) {
//   try {
   //* 1. Get cookies (auth)
//     const cookieStore = await cookies()

    //* 2. Call API (method + URL)
//     const res = await fetch(URL, {
//       method: "...",
//       headers: {
//         "Content-Type": "application/json", // only if needed
//         Cookie: cookieStore.toString(),
//       },
//       body: JSON.stringify(input), // only for POST/PATCH
//       next: { tags: ["tag-name"] }, // only for GET caching
//     })

    //* 3. Parse response
//     const data = await res.json()

    //* 4. Return success
//     return { data, error: null }

//   } catch (error) {
   //* 5. Return error
//     return { data: null, error: { message: "...", details: error } }
//   }
// } 



export const orderService = {
  //!cookies → fetch → method → headers → body? → json → return

  // POST create order — customer only
  createOrder: async (orderData: { shippingAddress: string; items: { medicineId: string; quantity: number }[] }) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      })
      const data: ApiResponse<Order> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to create order", details: error } }
    }
  },

  // GET customer's own orders — customer only
  getMyOrders: async () => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/orders`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["my-orders"] },
      })
      const data: ApiResponse<Order[]> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch orders", details: error } }
    }
  },

  // GET single order by id
  getOrderById: async (id: string) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/orders/${id}`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: [`order-${id}`] },
      })
      const data: ApiResponse<OrderWithRelations> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch order", details: error } }
    }
  },

  // GET all orders — admin only
  getAllOrders: async () => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/admin/orders`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["all-orders"] },
      })
      const data: ApiResponse<OrderWithRelations[]> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch all orders", details: error } }
    }
  },

  // GET seller's orders — seller only
  getSellerOrders: async () => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/orders/seller`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["seller-orders"] },
      })
      const data: ApiResponse<OrderWithRelations[]> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch seller orders", details: error } }
    }
  },

  // PATCH cancel order — customer only, PLACED orders only
  cancelOrder: async (id: string) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/orders/${id}/cancel`, {
        method: "PATCH",
        headers: { Cookie: cookieStore.toString() },
      })
      const data: ApiResponse<Order> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to cancel order", details: error } }
    }
  },

  // PATCH update order status — seller only
  updateOrderStatus: async (id: string, status: string) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${env.API_URL}/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      })
      const data: ApiResponse<Order> = await res.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Failed to update order status", details: error } }
    }
  },
}