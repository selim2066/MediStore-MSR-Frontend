// import { getMedicineReviews } from "@/service/review.service";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { userService } from "@/service/user.service";
// import { formatDistanceToNow } from "date-fns";
// import { MessageSquare, Star, TrendingUp } from "lucide-react";
// import { headers } from "next/headers";
// import ReviewForm from "./review-form";
// import { env } from "@/env";

// // ─── Star display (read-only) ───────────────────────────────────────────────
// function StarDisplay({
//   rating,
//   size = "sm",
// }: {
//   rating: number;
//   size?: "sm" | "lg";
// }) {
//   const sizeClass = size === "lg" ? "size-5" : "size-3.5";
//   return (
//     <div className="flex gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Star
//           key={star}
//           className={cn(
//             sizeClass,
//             star <= rating
//               ? "fill-amber-400 text-amber-400"
//               : "fill-muted text-muted-foreground",
//           )}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── Rating bar (distribution) ───────────────────────────────────────────────
// function RatingBar({
//   star,
//   count,
//   total,
// }: {
//   star: number;
//   count: number;
//   total: number;
// }) {
//   const pct = total === 0 ? 0 : Math.round((count / total) * 100);
//   return (
//     <div className="flex items-center gap-2 text-xs">
//       <span className="w-3 text-muted-foreground">{star}</span>
//       <Star className="size-3 fill-amber-400 text-amber-400 shrink-0" />
//       <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
//         <div
//           className="h-full rounded-full bg-amber-400 transition-all duration-500"
//           style={{ width: `${pct}%` }}
//         />
//       </div>
//       <span className="w-4 text-right text-muted-foreground">{count}</span>
//     </div>
//   );
// }

// // ─── Single review card ───────────────────────────────────────────────────────
// function ReviewCard({
//   review,
// }: {
//   review: Awaited<ReturnType<typeof getMedicineReviews>>[0];
// }) {
//   const initials = review.customer.name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);

//   return (
//     <div className="flex gap-3 py-4">
//       <Avatar className="size-9 shrink-0">
//         <AvatarImage src={review.customer.image} alt={review.customer.name} />
//         <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
//           {initials}
//         </AvatarFallback>
//       </Avatar>
//       <div className="flex-1 min-w-0">
//         <div className="flex items-start justify-between gap-2 flex-wrap">
//           <div>
//             <p className="text-sm font-semibold leading-none">
//               {review.customer.name}
//             </p>
//             <p className="text-xs text-muted-foreground mt-0.5">
//               {formatDistanceToNow(new Date(review.createdAt), {
//                 addSuffix: true,
//               })}
//             </p>
//           </div>
//           <StarDisplay rating={review.rating} />
//         </div>
//         {review.comment && (
//           <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
//             {review.comment}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Main section (server component) ─────────────────────────────────────────
// export default async function ReviewSection({
//   medicineId,
// }: {
//   medicineId: string;
// }) {
//   const [reviews, userRes] = await Promise.allSettled([
//     getMedicineReviews(medicineId),
//     userService.getCurrentUser((await headers()).get("cookie") ?? undefined),
//   ]);

//   // ? debug
//   // const userRes = await userService.getCurrentUser((await headers()).get("cookie") ?? undefined);
//   // console.log("userRes", userRes);
//   // console.log("cookie", (await headers()).get("cookie"));
//   // console.log("API_URL", env.API_URL);
//   // console.log("Fetching from review section:", `${env.API_URL}/users/me`);

//   const reviewList = reviews.status === "fulfilled" ? reviews.value : [];
//   const currentUser =
//     userRes.status === "fulfilled" && userRes.value?.data
//       ? userRes.value.data
//       : null;

//   const isLoggedIn = !!currentUser;
//   const existingReview = currentUser
//     ? (reviewList.find((r) => r.customerId === currentUser.id) ?? null)
//     : null;

//   const total = reviewList.length;
//   const avg = total
//     ? reviewList.reduce((sum, r) => sum + r.rating, 0) / total
//     : 0;

//   const dist = [5, 4, 3, 2, 1].map((star) => ({
//     star,
//     count: reviewList.filter((r) => r.rating === star).length,
//   }));

//   return (
//     <section className="mt-10 space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <MessageSquare className="size-5 text-primary" />
//         <h2 className="text-xl font-bold">Customer Reviews</h2>
//         {total > 0 && (
//           <Badge variant="secondary" className="ml-1">
//             {total} {total === 1 ? "review" : "reviews"}
//           </Badge>
//         )}
//       </div>

//       <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
//         {/* ── Left: Summary + Form ── */}
//         <div className="space-y-5">
//           {/* Rating summary card */}
//           {total > 0 ? (
//             <div className="rounded-xl border bg-card p-4 space-y-3">
//               <div className="flex items-end gap-3">
//                 <span className="text-5xl font-bold tracking-tight">
//                   {avg.toFixed(1)}
//                 </span>
//                 <div className="pb-1 space-y-1">
//                   <StarDisplay rating={Math.round(avg)} size="lg" />
//                   <p className="text-xs text-muted-foreground">
//                     {total} {total === 1 ? "rating" : "ratings"}
//                   </p>
//                 </div>
//               </div>
//               <Separator />
//               <div className="space-y-1.5">
//                 {dist.map((d) => (
//                   <RatingBar key={d.star} {...d} total={total} />
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="rounded-xl border bg-card p-4 text-center space-y-1">
//               <TrendingUp className="size-7 text-muted-foreground mx-auto" />
//               <p className="text-sm font-medium">No reviews yet</p>
//               <p className="text-xs text-muted-foreground">
//                 Be the first to review!
//               </p>
//             </div>
//           )}

//           {/* Review form */}
//           <div className="rounded-xl border bg-card p-4 space-y-3">
//             <p className="text-sm font-semibold">
//               {existingReview ? "Edit Your Review" : "Write a Review"}
//             </p>
//             <ReviewForm
//               medicineId={medicineId}
//               existingReview={existingReview}
//               isLoggedIn={isLoggedIn}
//             />
//           </div>
//         </div>

//         {/* ── Right: Review list ── */}
//         <div className="rounded-xl border bg-card divide-y divide-border px-4">
//           {reviewList.length === 0 ? (
//             <div className="py-12 text-center text-sm text-muted-foreground">
//               No reviews to show yet.
//             </div>
//           ) : (
//             reviewList.map((review) => (
//               <ReviewCard key={review.id} review={review} />
//             ))
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


// !improved version with better styling and some refactoring

import { getMedicineReviews } from "@/service/review.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { userService } from "@/service/user.service";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Star, TrendingUp } from "lucide-react";
import { headers } from "next/headers";
import ReviewForm from "./review-form";
import ReviewCard from "./review-card";
import { env } from "@/env";

// ─── Star display (read-only) ───────────────────────────────────────────────
function StarDisplay({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  const sizeClass = size === "lg" ? "size-5" : "size-3.5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClass,
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}

// ─── Rating bar (distribution) ───────────────────────────────────────────────
function RatingBar({
  star,
  count,
  total,
}: {
  star: number;
  count: number;
  total: number;
}) {
  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-3 text-muted-foreground">{star}</span>
      <Star className="size-3 fill-amber-400 text-amber-400 shrink-0" />
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-4 text-right text-muted-foreground">{count}</span>
    </div>
  );
}

// ─── Main section (server component) ─────────────────────────────────────────
export default async function ReviewSection({
  medicineId,
}: {
  medicineId: string;
}) {
  const [reviews, userRes] = await Promise.allSettled([
    getMedicineReviews(medicineId),
    userService.getCurrentUser((await headers()).get("cookie") ?? undefined),
  ]);

  const reviewList = reviews.status === "fulfilled" ? reviews.value : [];
  const currentUser =
    userRes.status === "fulfilled" && userRes.value?.data
      ? userRes.value.data
      : null;

  const isLoggedIn = !!currentUser;
  const existingReview = currentUser
    ? (reviewList.find((r) => r.customerId === currentUser.id) ?? null)
    : null;

  const total = reviewList.length;
  const avg = total
    ? reviewList.reduce((sum, r) => sum + r.rating, 0) / total
    : 0;

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviewList.filter((r) => r.rating === star).length,
  }));

  return (
    <section className="mt-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="size-5 text-primary" />
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        {total > 0 && (
          <Badge variant="secondary" className="ml-1">
            {total} {total === 1 ? "review" : "reviews"}
          </Badge>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        {/* ── Left: Summary + Form ── */}
        <div className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          {/* Rating summary card */}
          {total > 0 ? (
            <div className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold tracking-tight">
                  {avg.toFixed(1)}
                </span>
                <div className="pb-1 space-y-1">
                  <StarDisplay rating={Math.round(avg)} size="lg" />
                  <p className="text-xs text-muted-foreground">
                    {total} {total === 1 ? "rating" : "ratings"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-1.5">
                {dist.map((d) => (
                  <RatingBar key={d.star} {...d} total={total} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border bg-card p-4 text-center space-y-1">
              <TrendingUp className="size-7 text-muted-foreground mx-auto" />
              <p className="text-sm font-medium">No reviews yet</p>
              <p className="text-xs text-muted-foreground">
                Be the first to review!
              </p>
            </div>
          )}

          {/* Review form */}
          <div className="rounded-xl border bg-card p-4 space-y-3">
            <p className="text-sm font-semibold">
              {existingReview ? "Edit Your Review" : "Write a Review"}
            </p>
            <ReviewForm
              medicineId={medicineId}
              existingReview={existingReview}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>

        {/* ── Right: Review list ── */}
        <div className="space-y-1">
          {reviewList.length === 0 ? (
            <div className="rounded-xl border bg-card py-12 text-center text-sm text-muted-foreground">
              No reviews to show yet.
            </div>
          ) : (
            reviewList.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}