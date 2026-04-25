import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
        <XCircle className="h-10 w-10 text-red-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Failed
        </h1>
        <p className="text-muted-foreground">
          Something went wrong. Your order has not been charged.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/checkout">Try Again</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    </div>
  );
}