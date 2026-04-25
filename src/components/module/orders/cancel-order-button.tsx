"use client";

import { cancelOrderAction } from "@/actions/order.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CancelOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCancel() {
    setLoading(true);

    const { error } = await cancelOrderAction(orderId);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Order cancelled successfully");
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full sm:w-auto flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
          Cancel Order
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl backdrop-blur-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Cancel this order?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            This action cannot be undone. Your order will be permanently
            cancelled.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-5 sm:gap-5">
          <AlertDialogCancel className="transition-all duration-200 hover:scale-105">
            Keep Order
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500 flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Cancelling..." : "Yes, Cancel"}
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
