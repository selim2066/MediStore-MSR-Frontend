import { orderService } from "@/service/order.service";
import { PaginationControls } from "@/components/ui/pagination-controls";
import AdminOrdersClient from "./admin-orders-client";

export const dynamic = "force-dynamic";

interface AdminOrdersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const { data } = await orderService.getAllOrders({
    page: String(currentPage),
    limit: "10",
  });

  const orders = data?.data?.data ?? [];
  const totalPages = data?.data?.meta?.totalPages ?? 1;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Orders</h1>
        <p className="text-muted-foreground text-sm">
          Manage and update status for all customer orders
        </p>
      </div>
      <AdminOrdersClient orders={orders} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/admin/orders"
      />
    </div>
  );
}