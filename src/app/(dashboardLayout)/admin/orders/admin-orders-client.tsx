"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateAdminOrderStatusAction } from "@/actions/order.action";
import { OrderStatus } from "@/types";
import { OrderWithRelations } from "@/types";

const STATUS_BADGE: Record<OrderStatus, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const ALL_STATUSES: OrderStatus[] = [
  "PLACED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersClient({ orders }: { orders: OrderWithRelations[]  }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatusChange(orderId: string, status: string) {
    setLoadingId(orderId);
    const res = await updateAdminOrderStatusAction(orderId, status);
    if (res.error) toast.error(res.error);
    else toast.success(res.success);
    setLoadingId(null);
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No orders found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs">
                {order.id.slice(0, 8)}…
              </TableCell>
              <TableCell>{order.customer?.name ?? "—"}</TableCell>
              <TableCell>৳{order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge className={STATUS_BADGE[order.status]}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={order.status}
                  disabled={loadingId === order.id}
                  onValueChange={(val) => handleStatusChange(order.id, val)}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}