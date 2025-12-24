"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AllUserList = ({ initialData }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState(initialData?.data || []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const meta = initialData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };
  const currentPage = meta.page;

  useEffect(() => {
    setUsers(initialData?.data || []);
  }, [initialData]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > meta.totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    setLoadingUserId(userId);
    const action = currentStatus ? "REVOKE" : "AUTHORIZE";
    toast.loading(`Processing...`, { id: userId });

    try {
      const result = currentStatus
        ? await deactivateUser(userId)
        : await activateUser(userId);
      if (result.success) {
        setUsers((prev: any[]) =>
          prev.map((u: any) =>
            u._id === userId ? { ...u, isActive: !currentStatus } : u
          )
        );
        toast.success(`IDENTITY ${action}D`, { id: userId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("COMMUNICATION ERROR", { id: userId });
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-4 border-emerald-950 bg-white shadow-[10px_10px_0px_0px_rgba(6,78,59,1)] overflow-hidden">
        <Table>
          <TableHeader className="bg-emerald-950">
            <TableRow className="hover:bg-emerald-950 border-none">
              <TableHead className="w-[60px] font-black text-amber-400 uppercase text-[10px]">
                #
              </TableHead>
              <TableHead className="font-black text-amber-400 uppercase text-[10px]">
                Identity
              </TableHead>
              <TableHead className="font-black text-amber-400 uppercase text-[10px]">
                Registry Role
              </TableHead>
              <TableHead className="font-black text-amber-400 uppercase text-[10px]">
                Status
              </TableHead>
              <TableHead className="text-right font-black text-amber-400 uppercase text-[10px]">
                Ops
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any, index: number) => {
              const serial = (currentPage - 1) * meta.limit + index + 1;
              const userIsActive = user.isActive ?? true;

              return (
                <TableRow
                  key={user._id}
                  className="border-b-2 border-emerald-950/10 hover:bg-emerald-50/50"
                >
                  <TableCell className="font-black text-emerald-950/30 text-xs">
                    {serial.toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell className="font-black text-emerald-950 uppercase tracking-tighter">
                    {user.fullName}
                    <div className="text-[9px] text-emerald-950/40 lowercase tracking-normal font-bold">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 border border-emerald-950 text-[9px] font-black uppercase bg-emerald-50">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        userIsActive
                          ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                          : "bg-red-500"
                      }`}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-none border-2 border-transparent hover:border-emerald-950"
                        >
                          <MoreHorizontal size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-none border-2 border-emerald-950 bg-white shadow-[4px_4px_0px_0px_rgba(6,78,59,1)]"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleStatus(user._id, userIsActive)
                          }
                          className={`font-black uppercase text-[10px] tracking-widest cursor-pointer ${
                            userIsActive ? "text-red-600" : "text-emerald-600"
                          }`}
                        >
                          {userIsActive ? "Revoke Access" : "Grant Access"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ===== PAGINATION CONTROLS ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-emerald-950 p-4 border-2 border-emerald-950 shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]">
        <div className="text-[10px] font-black uppercase text-amber-400 tracking-widest">
          Entry {(currentPage - 1) * meta.limit + 1} —{" "}
          {Math.min(currentPage * meta.limit, meta.total)} of {meta.total}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            className="rounded-none text-white hover:bg-amber-400 hover:text-emerald-950 disabled:opacity-20"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft size={18} />
          </Button>

          {/* Simple Page Indicator Loop */}
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-none border-2 font-black text-xs ${
                  currentPage === pageNum
                    ? "bg-amber-400 border-amber-400 text-emerald-950"
                    : "bg-transparent border-white/20 text-white hover:border-amber-400"
                }`}
              >
                {pageNum}
              </Button>
            )
          )}

          <Button
            variant="ghost"
            className="rounded-none text-white hover:bg-amber-400 hover:text-emerald-950 disabled:opacity-20"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= meta.totalPages}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllUserList;
