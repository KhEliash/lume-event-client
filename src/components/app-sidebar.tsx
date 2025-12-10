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
    { title: "Inbox", url: "/dashboard/inbox", icon: "Inbox" },
    { title: "Calendar", url: "/dashboard/calendar", icon: "Calendar" },
  ],
  host: [
    { title: "Home", url: "/", icon: "Home" },
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
    {
      title: "My Reviews",
      url: "/host/dashboard/reviews",
      icon: "Star",
    },
  ],
  admin: [
    { title: "Admin Home", url: "/", icon: "Home" },
    { title: "Analytics", url: "/admin/dashboard/analytics", icon: "Inbox" },
    { title: "Settings", url: "/admin/settings", icon: "Settings" },
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
