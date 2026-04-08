import { orderService } from "@/service/order.service";
import AdminOrdersClient from "./admin-orders-client";

export default async function AdminOrdersPage() {
  const { data, error } = await orderService.getAllOrders();
  console.log("data:", data);
console.log("error:", error?.message, error?.details);
  
  const orders = data?.data ?? [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Orders</h1>
        <p className="text-muted-foreground text-sm">
          Manage and update status for all customer orders
        </p>
      </div>
      <AdminOrdersClient orders={orders} />
    </div>
  );
}