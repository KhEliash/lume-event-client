 
// AppSidebar.tsx
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // <-- using jsonwebtoken
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// Menu items by role
const menuItems = {
  user: [
    { title: "Home", url: "/", icon: Home },
    { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
    { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  ],
  host: [
    { title: "Home", url: "/", icon: Home },
    { title: "Search", url: "/host/dashboard/", icon: Search },
    { title: "Settings", url: "/host/settings", icon: Settings },
  ],
  admin: [
    { title: "Admin Home", url: "/", icon: Home },
    { title: "Users", url: "/admin/users", icon: Inbox },
    { title: "Settings", url: "/admin/settings", icon: Settings },
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
    } catch (err) {
      console.error("JWT verification failed:", err);
    }
  }

  const items = menuItems[role];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
