import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">
        <AlertCircle className="h-10 w-10 text-yellow-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground">
          You cancelled the payment. No charges were made.
        </p>
      </div>
      <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
        <Link href="/cart">Return to Cart</Link>
      </Button>
    </div>
  );
}