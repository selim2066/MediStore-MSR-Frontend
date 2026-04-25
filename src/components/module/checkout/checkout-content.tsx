// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { useCart } from "@/context/cart-context";

// import { createOrderAction } from "@/actions/order.action";
// import { useForm } from "@tanstack/react-form";
// import { Package, ShoppingBag } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   shippingAddress: z
//     .string()
//     .min(10, "Please enter a complete shipping address"),
// });

// export function CheckoutContent() {
//   const { items, totalItems, totalPrice, clearCart } = useCart();
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: { shippingAddress: "" },
//     validators: { onSubmit: checkoutSchema },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Placing your order...");
//       try {
//         const orderData = {
//           shippingAddress: value.shippingAddress,
//           items: items.map((item) => ({
//             medicineId: item.medicine.id,
//             quantity: item.quantity,
//           })),
//         };

//         //const { data, error } = await orderService.createOrder(orderData)
//         const { data, error } = await createOrderAction(orderData);

//         if (error || !data?.success) {
//           toast.error(data?.message || "Failed to place order", {
//             id: toastId,
//           });
//           return;
//         }

//         clearCart();
//         toast.success("Order placed successfully!", { id: toastId });
//         router.push("/orders");
//       } catch (_) {
//         toast.error("Failed to place order. Please try again.", {
//           id: toastId,
//         });
//       }
//     },
//   });

//   if (items.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 gap-4">
//         <ShoppingBag className="w-16 h-16 text-muted-foreground" />
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Your cart is empty
//         </h2>
//         <Button
//           asChild
//           className="bg-emerald-600 hover:bg-emerald-700 text-white"
//         >
//           <Link href="/shop">Browse Medicines</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* Shipping form */}
//       <div className="lg:col-span-2">
//         <Card className="border border-gray-100 dark:border-gray-800">
//           <CardContent className="p-6">
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
//               Shipping Information
//             </h2>

//             <form
//               id="checkout-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 form.handleSubmit();
//               }}
//             />

//             <FieldGroup>
//               <form.Field name="shippingAddress">
//                 {(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid;
//                   return (
//                     <Field data-invalid={isInvalid}>
//                       <FieldLabel htmlFor={field.name}>
//                         Full Shipping Address
//                       </FieldLabel>
//                       <Input
//                         id={field.name}
//                         name={field.name}
//                         value={field.state.value}
//                         onChange={(e) => field.handleChange(e.target.value)}
//                         placeholder="House no, Road, Area, City, District"
//                       />
//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   );
//                 }}
//               </form.Field>
//             </FieldGroup>

//             {/* Payment method */}
//             <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
//               <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
//                 💵 Payment Method: Cash on Delivery
//               </p>
//               <p className="text-xs text-muted-foreground mt-1">
//                 Pay when your order arrives at your doorstep
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Order summary */}
//       <div className="lg:col-span-1">
//         <Card className="border border-gray-100 dark:border-gray-800 sticky top-4">
//           <CardContent className="p-6 flex flex-col gap-4">
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//               Order Summary
//             </h2>

//             {/* Items list */}
//             <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
//               {items.map((item) => (
//                 <div key={item.medicine.id} className="flex gap-3 items-center">
//                   <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
//                     {item.medicine.image ? (
//                       <img
//                         src={item.medicine.image}
//                         alt={item.medicine.name}
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     ) : (
//                       <Package className="w-5 h-5 text-emerald-300" />
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                       {item.medicine.name}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       x{item.quantity}
//                     </p>
//                   </div>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">
//                     ৳{(item.medicine.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-2 text-sm">
//               <div className="flex justify-between text-muted-foreground">
//                 <span>Items ({totalItems})</span>
//                 <span>৳{totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-muted-foreground">
//                 <span>Delivery</span>
//                 <span className="text-emerald-600">Free</span>
//               </div>
//               <div className="flex justify-between text-muted-foreground">
//                 <span>Payment</span>
//                 <span>Cash on Delivery</span>
//               </div>
//             </div>

//             <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between font-bold text-gray-900 dark:text-white">
//               <span>Total</span>
//               <span className="text-emerald-600 dark:text-emerald-400">
//                 ৳{totalPrice.toFixed(2)}
//               </span>
//             </div>

//             <Button
//               form="checkout-form"
//               type="submit"
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
//               size="lg"
//             >
//               Place Order
//             </Button>

//             <Button asChild variant="outline" className="w-full">
//               <Link href="/cart">Back to Cart</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// !updated payment integration with createOrderAction and initiatePaymentAction

// "use client";

// import {
//   createOrderAction,
// } from "@/actions/order.action";
// import { paymentService } from '@/service/payment.service'; // ← add
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { useCart } from "@/context/cart-context";
// import { cn } from "@/lib/utils";
// import { useForm } from "@tanstack/react-form";
// import { Loader2, Package, ShoppingBag } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   shippingAddress: z
//     .string()
//     .min(10, "Please enter a complete shipping address"),
// });

// type PaymentMethod = "CASH_ON_DELIVERY" | "ONLINE";

// export function CheckoutContent() {
//   const { items, totalItems, totalPrice, clearCart } = useCart();
//   const router = useRouter();
//   const [paymentMethod, setPaymentMethod] =
//     useState<PaymentMethod>("CASH_ON_DELIVERY");
//   const [isRedirecting, setIsRedirecting] = useState(false);

//   const form = useForm({
//     defaultValues: { shippingAddress: "" },
//     validators: { onSubmit: checkoutSchema },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Placing your order...");
//       try {
//         const orderData = {
//           shippingAddress: value.shippingAddress,
//           items: items.map((item) => ({
//             medicineId: item.medicine.id,
//             quantity: item.quantity,
//           })),
//           paymentMethod,
//         };

//         const { data, error } = await createOrderAction(orderData);

//         if (error || !data?.success) {
//           toast.error(data?.message || "Failed to place order", {
//             id: toastId,
//           });
//           return;
//         }

//         const orderId = data.data.id;

//         // Online payment — redirect to SSLCommerz
//         if (paymentMethod === "ONLINE") {
//           toast.loading("Redirecting to payment gateway...", { id: toastId });
//           setIsRedirecting(true);

//           const { data: payData, error: payError } =
//             await initiatePaymentAction(orderId);

//           if (payError || !payData?.success) {
//             toast.error("Failed to initiate payment. Try Cash on Delivery.", {
//               id: toastId,
//             });
//             setIsRedirecting(false);
//             return;
//           }
//           clearCart();
//           window.location.href = payData.data.gatewayUrl;
//           return;
//         }

//         // Cash on Delivery
//         clearCart();
//         toast.success("Order placed successfully!", { id: toastId });
//         router.push("/orders");
//       } catch (_) {
//         toast.error("Failed to place order. Please try again.", {
//           id: toastId,
//         });
//       }
//     },
//   });

//   if (items.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 gap-4">
//         <ShoppingBag className="w-16 h-16 text-muted-foreground" />
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Your cart is empty
//         </h2>
//         <Button
//           asChild
//           className="bg-emerald-600 hover:bg-emerald-700 text-white"
//         >
//           <Link href="/shop">Browse Medicines</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* Shipping form */}
//       <div className="lg:col-span-2">
//         <Card className="border border-gray-100 dark:border-gray-800">
//           <CardContent className="p-6">
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
//               Shipping Information
//             </h2>

//             <form
//               id="checkout-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 form.handleSubmit();
//               }}
//             />

//             <FieldGroup>
//               <form.Field name="shippingAddress">
//                 {(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid;
//                   return (
//                     <Field data-invalid={isInvalid}>
//                       <FieldLabel htmlFor={field.name}>
//                         Full Shipping Address
//                       </FieldLabel>
//                       <Input
//                         id={field.name}
//                         name={field.name}
//                         value={field.state.value}
//                         onChange={(e) => field.handleChange(e.target.value)}
//                         placeholder="House no, Road, Area, City, District"
//                       />
//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   );
//                 }}
//               </form.Field>
//             </FieldGroup>

//             {/* Payment method toggle */}
//             <div className="mt-6 space-y-3">
//               <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//                 Payment Method
//               </h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {(["CASH_ON_DELIVERY", "ONLINE"] as const).map((method) => (
//                   <button
//                     key={method}
//                     type="button"
//                     onClick={() => setPaymentMethod(method)}
//                     className={cn(
//                       "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
//                       paymentMethod === method
//                         ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-500"
//                         : "border-gray-200 dark:border-gray-700 hover:border-emerald-300",
//                     )}
//                   >
//                     <div
//                       className={cn(
//                         "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
//                         paymentMethod === method
//                           ? "border-emerald-500"
//                           : "border-gray-300 dark:border-gray-600",
//                       )}
//                     >
//                       {paymentMethod === method && (
//                         <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">
//                         {method === "CASH_ON_DELIVERY"
//                           ? "Cash on Delivery"
//                           : "Online Payment"}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {method === "CASH_ON_DELIVERY"
//                           ? "Pay when delivered"
//                           : "bKash, Card, Nagad"}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Redirecting indicator */}
//             {isRedirecting && (
//               <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Redirecting to payment gateway...
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Order summary */}
//       <div className="lg:col-span-1">
//         <Card className="border border-gray-100 dark:border-gray-800 sticky top-4">
//           <CardContent className="p-6 flex flex-col gap-4">
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//               Order Summary
//             </h2>

//             <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
//               {items.map((item) => (
//                 <div key={item.medicine.id} className="flex gap-3 items-center">
//                   <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
//                     {item.medicine.image ? (
//                       <img
//                         src={item.medicine.image}
//                         alt={item.medicine.name}
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     ) : (
//                       <Package className="w-5 h-5 text-emerald-300" />
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                       {item.medicine.name}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       x{item.quantity}
//                     </p>
//                   </div>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">
//                     ৳{(item.medicine.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-2 text-sm">
//               <div className="flex justify-between text-muted-foreground">
//                 <span>Items ({totalItems})</span>
//                 <span>৳{totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-muted-foreground">
//                 <span>Delivery</span>
//                 <span className="text-emerald-600">Free</span>
//               </div>
//               <div className="flex justify-between text-muted-foreground">
//                 <span>Payment</span>
//                 <span>
//                   {paymentMethod === "ONLINE"
//                     ? "Online Payment"
//                     : "Cash on Delivery"}
//                 </span>
//               </div>
//             </div>

//             <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between font-bold text-gray-900 dark:text-white">
//               <span>Total</span>
//               <span className="text-emerald-600 dark:text-emerald-400">
//                 ৳{totalPrice.toFixed(2)}
//               </span>
//             </div>

//             <Button
//               form="checkout-form"
//               type="submit"
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
//               size="lg"
//               disabled={isRedirecting}
//             >
//               {isRedirecting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                   Processing...
//                 </>
//               ) : paymentMethod === "ONLINE" ? (
//                 "Pay Now"
//               ) : (
//                 "Place Order"
//               )}
//             </Button>

//             <Button asChild variant="outline" className="w-full">
//               <Link href="/cart">Back to Cart</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


// ! updated payment integration with createOrderAction and initiatePaymentAction
"use client";

import { createOrderAction } from "@/actions/order.action";
import { paymentService } from "@/service/payment.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { Loader2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const checkoutSchema = z.object({
  shippingAddress: z
    .string()
    .min(10, "Please enter a complete shipping address"),
});

type PaymentMethod = "CASH_ON_DELIVERY" | "ONLINE";

export function CheckoutContent() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CASH_ON_DELIVERY");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm({
    defaultValues: { shippingAddress: "" },
    validators: { onSubmit: checkoutSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Placing your order...");
      try {
        const orderData = {
          shippingAddress: value.shippingAddress,
          items: items.map((item) => ({
            medicineId: item.medicine.id,
            quantity: item.quantity,
          })),
          paymentMethod,
        };

        const { data, error } = await createOrderAction(orderData);

        if (error || !data?.success) {
          toast.error(data?.message || "Failed to place order", {
            id: toastId,
          });
          return;
        }

        const orderId = data.data.id;

        // Online payment — call directly from client (cookies forwarded)
        if (paymentMethod === "ONLINE") {
          toast.loading("Redirecting to payment gateway...", { id: toastId });
          setIsRedirecting(true);

          const { data: payData, error: payError } =
            await paymentService.initiatePayment(orderId); // ← direct client call

          if (payError || !payData?.success) {
            toast.error("Failed to initiate payment. Try Cash on Delivery.", {
              id: toastId,
            });
            setIsRedirecting(false);
            return;
          }

          clearCart(); // ← only clear after gateway URL confirmed
          window.location.href = payData.data.gatewayUrl;
          return;
        }

        // Cash on Delivery
        clearCart();
        toast.success("Order placed successfully!", { id: toastId });
        router.push("/orders");
      } catch (_) {
        toast.error("Failed to place order. Please try again.", {
          id: toastId,
        });
      }
    },
  });

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <Button
          asChild
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Link href="/shop">Browse Medicines</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Shipping form */}
      <div className="lg:col-span-2">
        <Card className="border border-gray-100 dark:border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Shipping Information
            </h2>

            <form
              id="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            />

            <FieldGroup>
              <form.Field name="shippingAddress">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Full Shipping Address
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="House no, Road, Area, City, District"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>

            {/* Payment method toggle */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {(["CASH_ON_DELIVERY", "ONLINE"] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                      paymentMethod === method
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-500"
                        : "border-gray-200 dark:border-gray-700 hover:border-emerald-300",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        paymentMethod === method
                          ? "border-emerald-500"
                          : "border-gray-300 dark:border-gray-600",
                      )}
                    >
                      {paymentMethod === method && (
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {method === "CASH_ON_DELIVERY"
                          ? "Cash on Delivery"
                          : "Online Payment"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {method === "CASH_ON_DELIVERY"
                          ? "Pay when delivered"
                          : "bKash, Card, Nagad"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Redirecting indicator */}
            {isRedirecting && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to payment gateway...
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <Card className="border border-gray-100 dark:border-gray-800 sticky top-4">
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.medicine.id} className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                    {item.medicine.image ? (
                      <img
                        src={item.medicine.image}
                        alt={item.medicine.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Package className="w-5 h-5 text-emerald-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.medicine.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      x{item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">
                    ৳{(item.medicine.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Items ({totalItems})</span>
                <span>৳{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Payment</span>
                <span>
                  {paymentMethod === "ONLINE"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                ৳{totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              form="checkout-form"
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="lg"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : paymentMethod === "ONLINE" ? (
                "Pay Now"
              ) : (
                "Place Order"
              )}
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/cart">Back to Cart</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}