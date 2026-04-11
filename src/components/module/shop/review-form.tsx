"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReviewAction, deleteReviewAction } from "@/actions/review.action";
import { toast } from "sonner";
import { TReview } from "@/service/review.service";
import { cn } from "@/lib/utils";

type Props = {
  medicineId: string;
  existingReview: TReview | null;
  isLoggedIn: boolean;
};

export default function ReviewForm({ medicineId, existingReview, isLoggedIn }: Props) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        Please{" "}
        <a href="/login" className="font-medium text-primary underline underline-offset-4">
          sign in
        </a>{" "}
        to leave a review.
      </div>
    );
  }

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    startTransition(async () => {
      const result = await createReviewAction({ rating, comment, medicineId });
      if (result.success) {
        toast.success(existingReview ? "Review updated!" : "Review submitted!");
      } else {
        toast.error(result.message ?? "Something went wrong.");
      }
    });
  };

  const handleDelete = () => {
    if (!existingReview) return;
    startTransition(async () => {
      const result = await deleteReviewAction(existingReview.id, medicineId);
      if (result.success) {
        toast.success("Review deleted.");
        setRating(0);
        setComment("");
      } else {
        toast.error(result.message ?? "Could not delete review.");
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">
          {existingReview ? "Your review" : "Rate this medicine"}
        </p>
        {/* Star Picker */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={cn(
                  "size-7 transition-colors",
                  star <= (hovered || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this medicine... (optional)"
        className="min-h-[100px] resize-none"
        disabled={isPending}
      />

      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={isPending || rating === 0} className="flex-1">
          {isPending ? "Saving..." : existingReview ? "Update Review" : "Submit Review"}
        </Button>
        {existingReview && (
          <Button variant="outline" onClick={handleDelete} disabled={isPending} className="text-destructive hover:text-destructive">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}