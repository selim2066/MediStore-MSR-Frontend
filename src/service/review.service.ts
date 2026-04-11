import { env } from "@/env";
import { cookies } from "next/headers";

export type TReview = {
  id: string;
  rating: number;
  comment?: string;
  customerId: string;
  customer: { id: string; name: string; image?: string };
  medicineId: string;
  createdAt: string;
};

async function getHeaders() {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString(), "Content-Type": "application/json" };
}

// export async function getMedicineReviews(medicineId: string): Promise<TReview[]> {
//   const headers = await getHeaders();
//   const res = await fetch(
//     `${env.BACKEND_URL}/api/reviews/medicine/${medicineId}`,
//     { headers, next: { tags: [`reviews-${medicineId}`] } }
//   );
//   const data = await res.json();
//   return data.success ? data.data : [];
// }
export async function getMedicineReviews(medicineId: string): Promise<TReview[]> {
  const headers = await getHeaders();
  const res = await fetch(
    `${env.BACKEND_URL}/api/reviews/medicine/${medicineId}`,
    { headers, cache: "no-store" }
  );
  const data = await res.json();
  console.log("reviews response:..........", data); // check the shape
  const result = data.success ? data.data.reviews : [];
  return Array.isArray(result) ? result : [];
}

export async function createReview(body: {
  rating: number;
  comment?: string;
  medicineId: string;
}) {
  const headers = await getHeaders();
  const res = await fetch(`${env.BACKEND_URL}/api/reviews`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function deleteReview(reviewId: string) {
  const headers = await getHeaders();
  const res = await fetch(`${env.BACKEND_URL}/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}