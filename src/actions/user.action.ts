"use server";

import { userService } from "@/service/user.service";
import { revalidateTag } from "next/cache";

export async function toggleBanUserAction(id: string, isBanned: boolean) {
  const { data, error } = await userService.updateUserStatus(id, isBanned);
  if (error) return { error: error.message };
  if (!data?.success) return { error: data?.message };
  revalidateTag("all-users", "default");
  return { success: data.message };
}