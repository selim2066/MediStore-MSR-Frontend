"use server";

import { revalidateTag } from "next/cache";
import { createReview, deleteReview } from "@/service/review.service";

export async function createReviewAction(data: {
  rating: number;
  comment?: string;
  medicineId: string;
}) {
  const result = await createReview(data);
  if (result.success) {
    revalidateTag(`reviews-${data.medicineId}`, "default");
  }
  return result;
}

export async function deleteReviewAction(reviewId: string, medicineId: string) {
  const result = await deleteReview(reviewId);
  if (result.success) {
    revalidateTag(`reviews-${medicineId}`, "default");
  }
  return result;
}