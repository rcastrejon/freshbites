"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarLinkItemProps = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

export function SidebarLinkItem({ title, path, icon }: SidebarLinkItemProps) {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={active} asChild>
        <Link href={path}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
