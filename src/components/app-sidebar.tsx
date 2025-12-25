/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarClient from "./SidebarClient";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

const menuItems = {
  user: [
    { title: "Dashboard", url: "/dashboard", icon: "LayoutDashboard" },
    {
      title: "Joined Events",
      url: "/dashboard/joined-events",
      icon: "CalendarCheck",
    },
    { title: "My Reviews", url: "/dashboard/reviews", icon: "Star" },
    { title: "Transactions", url: "/dashboard/payments", icon: "Ticket" },
    { title: "My Profile", url: "/profile", icon: "User" },
    { title: "Back to Home", url: "/", icon: "ArrowLeft" },
  ],
  host: [
    { title: "Host Stats", url: "/host/dashboard", icon: "BarChart3" },
    {
      title: "Create Event",
      url: "/host/dashboard/create-event",
      icon: "PlusSquare",
    },
    {
      title: "Managed Events",
      url: "/host/dashboard/hosted-events",
      icon: "Calendar",
    },
    {
      title: "Earnings",
      url: "/host/dashboard/earnings",
      icon: "CheckCircle",
    },
    { title: "My Profile", url: "/profile", icon: "User" },
    { title: "Back to Home", url: "/", icon: "ArrowLeft" },
  ],
  admin: [
    { title: "Analytics", url: "/admin/dashboard", icon: "ShieldAlert" },
    { title: "User Control", url: "/admin/dashboard/allusers", icon: "Users2" },
    { title: "All Events", url: "/admin/dashboard/allevents", icon: "Database" },
    { title: "My Profile", url: "/profile", icon: "User" },
    { title: "Back to Home", url: "/", icon: "ArrowLeft" },
  ],
};

export default async function AppSidebar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let role: keyof typeof menuItems = "user";

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      role = decoded.role || "user";
    } catch (e) {
      console.error("Auth failed", e);
    }
  }

  return (
    <Sidebar className="border-r-4 border-emerald-950 bg-white">
      <SidebarHeader className="p-6 border-b-2 border-emerald-950">
        <Link href={"/"} className="flex items-center gap-3">
          <div className="bg-emerald-950 p-2 text-amber-400">
            <CalendarDays size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-emerald-950 leading-none uppercase tracking-tighter">
              Lume Event
            </span>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
              {role} Panel
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950/30 mb-4 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarClient items={menuItems[role]} />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
