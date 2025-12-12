"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { activateUser, deactivateUser } from "@/services/admin/user-management";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AllUserList = ({ initialData }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const usersData = initialData?.data || [];
  const meta = initialData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  const [users, setUsers] = useState(usersData);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const currentPage = meta.page;

  // === 1. HELPER FUNCTIONS (Completed) ===

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        Inactive
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return (
          <Badge className="bg-purple-600 text-white hover:bg-purple-700">
            Admin
          </Badge>
        );
      case "host":
        return (
          <Badge className="bg-orange-500 text-white hover:bg-orange-600">
            Host
          </Badge>
        );
      default:
        return <Badge variant="secondary">User</Badge>;
    }
  };

  // === 2. PAGINATION HANDLER (Completed) ===

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= meta.totalPages) {
      const current = new URLSearchParams(searchParams.toString());
      current.set("page", newPage.toString());

      router.push(`?${current.toString()}`);
    }
  };

  // === 3. ACTIVATE/DEACTIVATE HANDLER (Confirmed and Cleaned) ===

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    setLoadingUserId(userId);
    const action = currentStatus ? "deactivate" : "activate";
    toast.loading(`Attempting to ${action} user...`, { id: userId });

    try {
      let result;

      if (currentStatus) {
        result = await deactivateUser(userId);
      } else {
        result = await activateUser(userId);
      }

      if (result.success) {
        // Update local state immediately on success
        setUsers((prevUsers: any[]) =>
          prevUsers.map((user: any) =>
            user._id === userId ? { ...user, isActive: !currentStatus } : user
          )
        );

        toast.success(`User successfully ${action}d.`, { id: userId });
      } else {
        // Throw the error message returned by the server action
        throw new Error(result.message || "API call failed.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Failed to ${action} user: ${errorMessage}`, { id: userId });
      console.error(error);
    } finally {
      setLoadingUserId(null);
    }
  };
  // ===================================

  return (
    <div className="p-4 md:p-8     mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          👥 All Users ({meta.total})
        </h1>
        {/* <Input
          placeholder="Search by name or email..."
          className="w-[300px] border-gray-300"
          // Add onChange handler here to update router query for search
        /> */}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[50px] font-bold text-gray-700">
                #
              </TableHead>
              <TableHead className="font-bold text-gray-700">Name</TableHead>
              <TableHead className="font-bold text-gray-700">Email</TableHead>
              <TableHead className="font-bold text-gray-700">Role</TableHead>
              <TableHead className="font-bold text-gray-700">
                <Button
                  variant="ghost"
                  className="p-0 h-auto"
                  // onClick={() => handleSort('status')}
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-bold text-gray-700">
                Location
              </TableHead>
              <TableHead className="text-right font-bold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any, index: number) => {
              const serial = (currentPage - 1) * meta.limit + index + 1;
              const isActionLoading = loadingUserId === user._id;
              const userIsActive =
                user.isActive !== undefined ? user.isActive : true;

              return (
                <TableRow
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-600">
                    {serial}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-800">
                    {user.fullName}
                  </TableCell>
                  <TableCell className="text-sm text-blue-600">
                    {user.email}
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(userIsActive)}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.location?.city || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          disabled={isActionLoading}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleStatus(user._id, userIsActive)
                          }
                          disabled={isActionLoading}
                          className={
                            userIsActive
                              ? "text-red-600 hover:bg-red-50!"
                              : "text-green-600 hover:bg-green-50!"
                          }
                        >
                          {userIsActive ? "Deactivate User" : "Activate User"}
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${user.fullName}`)}>
                                                    View Details
                                                </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
        <p className="text-sm text-gray-600">
          Showing {users.length} of {meta.total} users.
        </p>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {meta.totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= meta.totalPages}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No users found matching the current filters.
        </div>
      )}
    </div>
  );
};

export default AllUserList;
