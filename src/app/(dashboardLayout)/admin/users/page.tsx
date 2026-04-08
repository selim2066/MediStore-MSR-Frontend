import { userService } from "@/service/user.service";
import AdminUsersClient from "./admin-users-client";


export default async function AdminUsersPage() {
  const { data } = await userService.getAllUsers();
  const users = data?.data ?? [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Users</h1>
        <p className="text-muted-foreground text-sm">
          Manage user accounts and ban status
        </p>
      </div>
      <AdminUsersClient users={users} />
    </div>
  );
}