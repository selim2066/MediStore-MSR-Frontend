"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toggleBanUserAction } from "@/actions/user.action";
import { User } from "@/types";

const ROLE_BADGE: Record<string, string> = {
  CUSTOMER: "bg-blue-100 text-blue-700",
  SELLER: "bg-purple-100 text-purple-700",
  ADMIN: "bg-red-100 text-red-700",
};

export default function AdminUsersClient({ users }: { users: User[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleToggleBan(id: string, isBanned: boolean) {
    setLoadingId(id);
    const res = await toggleBanUserAction(id, !isBanned);
    if (res.error) toast.error(res.error);
    else toast.success(res.success);
    setLoadingId(null);
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No users found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge className={ROLE_BADGE[user.role]}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                {user.emailVerified ? (
                  <Badge className="bg-green-100 text-green-700">Verified</Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-700">Unverified</Badge>
                )}
              </TableCell>
              <TableCell>
                {user.isBanned ? (
                  <Badge className="bg-red-100 text-red-700">Banned</Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                )}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={user.isBanned ? "outline" : "destructive"}
                  disabled={loadingId === user.id}
                  onClick={() => handleToggleBan(user.id, user.isBanned)}
                >
                  {loadingId === user.id
                    ? "Updating..."
                    : user.isBanned
                    ? "Unban"
                    : "Ban"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}