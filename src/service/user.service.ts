import { env } from "@/env";
import { ApiResponse, User } from "@/types";
import { cookies } from "next/headers";

export const userService = {
  // GET current session — used in middleware + server components
getSession: async (cookieHeader?: string) => {
  try {
    const cookieStore = cookieHeader 
      ? cookieHeader 
      : (await cookies()).getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch(`${env.AUTH_URL}/get-session`, {
      headers: { Cookie: cookieStore },
      cache: "no-store",
    });
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to fetch session", details: error },
    };
  }
},

  // GET all users — admin only
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/users`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["all-users"] },
      });
      const data: ApiResponse<User[]> = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch users", details: error },
      };
    }
  },

  // PATCH ban/unban user — admin only
  updateUserStatus: async (id: string, isBanned: boolean) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ isBanned }),
      });
      const data: ApiResponse<User> = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to update user status", details: error },
      };
    }
  },

  // getCurrentUser: async (cookieHeader?: string) => {
  //   try {
  //     const res = await fetch(`${env.API_URL}/api/users/me`, {
  //       headers: cookieHeader ? { Cookie: cookieHeader } : {},
  //       credentials: "include",
  //       cache: "no-store",
  //     });
  //     const json = await res.json();
  //     if (!json.success) return null;
  //     return json.data as {
  //       id: string;
  //       name: string;
  //       email: string;
  //       phone?: string;
  //       address?: string;
  //       image?: string;
  //       role: string;
  //     };
  //   } catch (error) {
  //     return {
  //       data: null,
  //       error: { message: "Failed to fetch current user", details: error },
  //     };
  //   }
  // },
  getCurrentUser: async (cookieHeader?: string) => {
  try {
    const res = await fetch(`${env.API_URL}/users/me`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      credentials: "include",
      cache: "no-store",
    });

    const json = await res.json();

    if (!json.success) {
      return { data: null, error: { message: json.message } };
    }

    return { data: json.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to fetch current user", details: error },
    };
  }
},

  updateUserProfile: async (
    data: { name?: string; phone?: string; address?: string; image?: string },
    cookieHeader?: string,
  ) => {
    try {
      const res = await fetch(`${env.API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data;
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to update user profile", details: error },
      };
    }
  },
};
