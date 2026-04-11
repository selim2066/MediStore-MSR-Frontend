import { getMedicineReviews } from "@/service/review.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

type Review = Awaited<ReturnType<typeof getMedicineReviews>>[0];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "size-3.5",
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const initials = review.customer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="flex gap-4 p-5 rounded-xl hover:bg-muted/30 transition-colors duration-150">
      <Avatar className="size-10 shrink-0">
        <AvatarImage src={review.customer.image} alt={review.customer.name} />
        <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <p className="text-sm font-semibold leading-none">
              {review.customer.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <StarDisplay rating={review.rating} />
            <span className="text-xs font-bold text-amber-500">
              {review.rating}.0
            </span>
          </div>
        </div>

        {review.comment ? (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {review.comment}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            No written review.
          </p>
        )}
      </div>
    </article>
  );
}