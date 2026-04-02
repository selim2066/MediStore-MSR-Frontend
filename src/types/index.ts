// ============================================
// ENUMS
// ============================================

export type Role = "CUSTOMER" | "SELLER" | "ADMIN"

export type OrderStatus =
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"

// ============================================
// USER
// ============================================

export interface User {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  role: Role
  isBanned: boolean
  emailVerified: boolean
  image: string | null
  createdAt: string
  updatedAt: string
}

// ============================================
// CATEGORY
// ============================================

export interface Category {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}

// ============================================
// MEDICINE
// ============================================

export interface Medicine {
  id: string
  name: string
  description: string
  price: number
  stock: number
  manufacturer: string
  image: string | null
  sellerId: string
  categoryId: string
  createdAt: string
  updatedAt: string
}

// Medicine with relations (for detail page)
export interface MedicineWithRelations extends Medicine {
  seller: User
  category: Category
  reviews: Review[]
}

// ============================================
// ORDER
// ============================================

export interface Order {
  id: string
  customerId: string
  status: OrderStatus
  shippingAddress: string
  totalAmount: number
  createdAt: string
  updatedAt: string
}

// Order with relations (for order detail page)
export interface OrderWithRelations extends Order {
  customer: User
  items: OrderItemWithRelations[]
}

// ============================================
// ORDER ITEM
// ============================================

export interface OrderItem {
  id: string
  orderId: string
  medicineId: string
  quantity: number
  price: number // snapshot price at purchase time
}

export interface OrderItemWithRelations extends OrderItem {
  medicine: Medicine
}

// ============================================
// REVIEW
// ============================================

export interface Review {
  id: string
  rating: number // 1-5
  comment: string | null
  customerId: string
  medicineId: string
  createdAt: string
  updatedAt: string
}

export interface ReviewWithRelations extends Review {
  customer: User
}

// ============================================
// API RESPONSE
// ============================================

// Standard response shape from your backend { success, message, data }
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}


// ?
// // What is this?
// TypeScript interfaces that mirror your Prisma schema on the frontend.
// Why do you need it?
// Your backend returns JSON — TypeScript has no idea what shape that data is. These types tell TypeScript exactly what to expect from every API response, giving you autocomplete and catching errors at compile time.
// How it works?

// Base interfaces (Medicine, Order) match the exact database columns
// WithRelations interfaces extend the base — used when your backend returns nested data (e.g. medicine detail page returns the medicine + its category + its reviews)
// ApiResponse<T> is a generic wrapper matching your backend's { success, message, data } format — T gets replaced with the actual data type e.g. ApiResponse<Medicine[]>

