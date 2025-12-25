/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EventsTableClient({ initialEvents, meta }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(meta.total / meta.limit);
  const currentPage = meta.page;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-emerald-950 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-900/40 mb-2">
            <Database size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              System // Global // Manifest
            </span>
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-emerald-950 leading-none">
            Event{" "}
            <span className="text-amber-500 underline decoration-emerald-950">
              Registry
            </span>
          </h1>
        </div>
        <div className="bg-emerald-950 text-white px-4 py-2 font-black uppercase italic text-xs shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
          Total Records: {meta.total}
        </div>
      </div>

      {/* SHADCN TABLE */}
      <div className="border-4 border-emerald-950 shadow-[12px_12px_0px_0px_rgba(6,78,59,1)] bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-emerald-950">
            <TableRow className="hover:bg-emerald-950 border-b-4 border-emerald-950">
              <TableHead className="text-white font-black uppercase italic text-[10px] h-14">
                Mission Name
              </TableHead>
              <TableHead className="text-white font-black uppercase italic text-[10px]">
                Type
              </TableHead>
              <TableHead className="text-white font-black uppercase italic text-[10px]">
                Intel
              </TableHead>
              <TableHead className="text-white font-black uppercase italic text-[10px]">
                PAX Load
              </TableHead>
              <TableHead className="text-right text-white font-black uppercase italic text-[10px] pr-8">
                Fee
              </TableHead>
              <TableHead className="text-right text-white font-black uppercase italic text-[10px] pr-8">
                View
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialEvents.map((event: any) => (
              <TableRow
                key={event._id}
                className="border-b-2 border-emerald-950/10 hover:bg-emerald-50 transition-colors group"
              >
                <TableCell className="font-black text-emerald-950 uppercase italic p-4">
                  {event.name}
                </TableCell>
                <TableCell>
                  <Badge className="rounded-none border-2 border-emerald-950 bg-amber-400 text-emerald-950 font-black uppercase text-[8px] hover:bg-amber-500 transition-none">
                    {event.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-[10px] font-bold text-emerald-900/60 uppercase">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} className="text-emerald-950" />{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} className="text-emerald-950" />{" "}
                      {event.location.city}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono font-black text-xs text-emerald-950">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-amber-500" />
                    {event.currentParticipants} / {event.maxParticipants}
                  </div>
                </TableCell>
                <TableCell className="text-right font-black italic text-emerald-950 pr-8">
                  {event.joiningFee > 0
                    ? `$${event.joiningFee.toFixed(2)}`
                    : "FREE"}
                </TableCell>
                <TableCell className="text-right font-black italic text-emerald-950 pr-8">
                  <Link
                    href={`/event/${event._id}`}
                    className="flex items-center gap-2 bg-emerald-950 text-amber-400 px-4 py-2 border-2 border-emerald-950 font-black uppercase text-sm tracking-widest hover:bg-amber-50 transition-colors"
                  >
                    View
                    <ArrowRight size={16} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* FUNCTIONAL PAGINATION */}
      <div className="flex justify-center pt-4">
        <Pagination>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={`border-2 border-emerald-950 rounded-none font-black uppercase italic text-[10px] px-4 transition-all shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${
                  currentPage === 1
                    ? "opacity-30 pointer-events-none"
                    : "hover:bg-amber-400"
                }`}
              />
            </PaginationItem>

            {/* Simple page numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e: any) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  className={`border-2 border-emerald-950 rounded-none font-black text-[10px] w-10 h-10 transition-all ${
                    currentPage === i + 1
                      ? "bg-emerald-950 text-white shadow-none"
                      : "bg-white shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] hover:bg-amber-200"
                  }`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={`border-2 border-emerald-950 rounded-none font-black uppercase italic text-[10px] px-4 transition-all shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${
                  currentPage === totalPages
                    ? "opacity-30 pointer-events-none"
                    : "hover:bg-amber-400"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/20">
        Data Stream Integrity // Segment {currentPage} of {totalPages}
      </p>
    </div>
  );
}
