// "use client";

// import { Button } from "@/components/ui/button";
// import { useCart } from "@/context/cart-context";
// import { cn } from "@/lib/utils"; // Ensure you have this utility for class merging
// import { Medicine } from "@/types";
// import { Check, ShoppingCart } from "lucide-react";
// import { toast } from "sonner";

// export function AddToCartButton({
//   medicine,
//   className,
// }: {
//   medicine: Medicine;
//   className?: string;
// }) {
//   const { addToCart, isInCart } = useCart();
//   const alreadyInCart = isInCart(medicine.id);

//   const handleAddToCart = () => {
//     if (medicine.stock <= 0) return;
//     addToCart(medicine, 1);
//     toast.success(`${medicine.name} added to cart!`);
//     router.refresh(); 
//   };

//   return (
//     <Button
//       onClick={handleAddToCart}
//       disabled={medicine.stock <= 0 || alreadyInCart}
//       // Added h-14, rounded-2xl, and font-bold to match the checkout button
//       className={cn(
//         "h-14 flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95",
//         className,
//       )}
//     >
//       {alreadyInCart ? (
//         <>
//           <Check className="w-5 h-12 mr-2" />
//           Added to Cart
//         </>
//       ) : medicine.stock <= 0 ? (
//         "Out of Stock"
//       ) : (
//         <>
//           <ShoppingCart className="w-5 h-28 mr-2" />
//           Add to Cart
//         </>
//       )}
//     </Button>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Medicine } from "@/types";
import { Check, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AddToCartButton({
  medicine,
  className,
}: {
  medicine: Medicine;
  className?: string;
}) {
  const { addToCart, isInCart } = useCart();
  const router = useRouter();
  const alreadyInCart = isInCart(medicine.id);

  const handleAddToCart = () => {
    if (medicine.stock <= 0) return;
    addToCart(medicine, 1);
    toast.success(`${medicine.name} added to cart!`);
    router.refresh();
  };

  return (
   <Button
  onClick={handleAddToCart}
  disabled={medicine.stock <= 0 || alreadyInCart}
  className={cn(
    "h-12 w-full rounded-xl font-semibold text-sm tracking-wide",
    "bg-emerald-600 hover:bg-emerald-700 text-white",
    "shadow-sm hover:shadow-md shadow-emerald-200 dark:shadow-emerald-900/30",
    "active:scale-[0.98] transition-all duration-150",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100",
    className,
  )}
>
      {alreadyInCart ? (
        <>
          <Check className="w-5 h-12 mr-2" />
          Added to Cart
        </>
      ) : medicine.stock <= 0 ? (
        "Out of Stock"
      ) : (
        <>
          <ShoppingCart className="w-5 h-28 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
