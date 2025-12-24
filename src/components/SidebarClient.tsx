"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <SidebarMenu className="gap-2">
      {items.map((item) => {
        const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as
          | React.ComponentType<LucideProps>
          | undefined;

        const isExactMatch = pathname === item.url;

        const isRootPath =
          item.url === "/dashboard" ||
          item.url === "/host/dashboard" ||
          item.url === "/admin/dashboard" ||
          item.url === "/";

        const isActive = isRootPath
          ? isExactMatch
          : pathname.startsWith(item.url);

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={`
                group relative flex items-center gap-3 px-4 py-6 rounded-none border-2 transition-all
                ${
                  isActive
                    ? "bg-emerald-950 border-emerald-950 text-amber-400 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] hover:bg-emerald-900 hover:text-amber-400"
                    : "bg-white border-transparent text-emerald-950 hover:border-emerald-950 hover:bg-emerald-50"
                }
              `}
            >
              <Link href={item.url}>
                {Icon && (
                  <Icon
                    size={20}
                    className={
                      isActive ? "text-amber-400" : "text-emerald-900/50"
                    }
                  />
                )}
                <span className="font-black uppercase tracking-tighter text-sm">
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
