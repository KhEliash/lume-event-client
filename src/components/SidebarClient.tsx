// /* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";  

interface SidebarClientProps {
  items: {
    title: string;
    url: string;
    icon: string;  
  }[];
}

export default function SidebarClient({ items }: SidebarClientProps) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        // ✅ Cast to Lucide component type
        const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as
          | React.ComponentType<LucideProps>
          | undefined;

        const isActive =
          pathname === item.url ||
          (pathname.startsWith(item.url) && item.url !== "/");

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-md transition",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Link href={item.url} className="flex items-center gap-2">
                {Icon && <Icon size={18} />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
