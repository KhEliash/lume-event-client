/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";

export function UserRoleChart({ users }: any) {
  const usersData = users?.users?.data || [];

  const counts = {
    user: usersData.filter((u: any) => u.role === "user").length,
    host: usersData.filter((u: any) => u.role === "host").length,
    admin: usersData.filter((u: any) => u.role === "admin").length,
  };

  const chartData = [
    { role: "User", count: counts.user },
    { role: "Host", count: counts.host },
    { role: "Admin", count: counts.admin },
  ];

  return (
    <ChartContainer
      className="min-h-[300px] w-full"
      config={{
        count: { label: "Count", color: "#4F46E5" },
      }}
    >
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="role" axisLine={false} tickLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />

        <Bar dataKey="count" fill="#4F46E5" radius={6} />
      </BarChart>
    </ChartContainer>
  );
}
