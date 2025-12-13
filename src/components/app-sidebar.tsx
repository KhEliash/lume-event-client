/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import SidebarClient from "./SidebarClient";

// Menu items by role — IMPORTANT: icons replaced with string keys
const menuItems = {
  user: [
    { title: "Home", url: "/", icon: "Home" },
    { title: "Analytics", url: "/dashboard", icon: "Inbox" },
    { title: "My Profile", url: "/profile", icon: "User" },
    {
      title: "Joined event",
      url: "/dashboard/joined-events",
      icon: "Calendar",
    },
    { title: "Reviews", url: "/dashboard/reviews", icon: "Star" },
    { title: "Payments", url: "/dashboard/payments", icon: "Banknote" },
  ],
  host: [
    { title: "Home", url: "/", icon: "Home" },
    { title: "Analytics", url: "/host/dashboard", icon: "Inbox" },
    { title: "My Profile", url: "/profile", icon: "User" },

    {
      title: "Create Event",
      url: "/host/dashboard/create-event",
      icon: "BadgePlus",
    },
    {
      title: "My Events",
      url: "/host/dashboard/hosted-events",
      icon: "Calendars",
    },
  ],
  admin: [
    { title: "Admin Home", url: "/", icon: "Home" },
    { title: "My Profile", url: "/profile", icon: "User" },
    { title: "Analytics", url: "/admin/dashboard", icon: "Inbox" },
    {
      title: "Users Management",
      url: "/admin/dashboard/allusers",
      icon: "Settings",
    },
  ],
};

export default async function AppSidebar() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  let role: keyof typeof menuItems = "user";

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      role = decoded.role || "user";
    } catch (e) {
      console.error("JWT verify failed", e);
    }
  }

  const items = menuItems[role];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* Passing SAFE JSON-serializable data */}
            <SidebarClient items={items} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
