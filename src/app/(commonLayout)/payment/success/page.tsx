import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
        <CheckCircle className="h-10 w-10 text-emerald-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground">
          Your order has been placed and payment confirmed.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {searchParams.orderId && (
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href={`/orders/${searchParams.orderId}`}>View Order</Link>
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}