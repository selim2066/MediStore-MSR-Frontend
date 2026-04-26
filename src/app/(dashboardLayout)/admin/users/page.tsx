import { userService } from "@/service/user.service";
import { PaginationControls } from "@/components/ui/pagination-controls";
import AdminUsersClient from "./admin-users-client";

interface AdminUsersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const { data } = await userService.getAllUsers({
    page: String(currentPage),
    limit: "10",
  });

  const users = data?.data?.data ?? [];
  const totalPages = data?.data?.meta?.totalPages ?? 1;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Users</h1>
        <p className="text-muted-foreground text-sm">
          Manage user accounts and ban status
        </p>
      </div>
      <AdminUsersClient users={users} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/admin/users"
      />
    </div>
  );
}