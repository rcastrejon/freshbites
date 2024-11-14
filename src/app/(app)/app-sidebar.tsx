import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Book, ChefHat, Home, Shield } from "lucide-react";
import { SidebarLinkItem } from "./_components/sidebar/items";
import { Suspense } from "react";
import { Search, SearchSkeleton } from "./search";
import { Protect, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavPinned } from "./_components/sidebar/nav-pinned";
import { ClientOnly } from "@/components/client-only";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <ChefHat className="mr-2 h-8 w-8 text-yellow-300" />
          <h2 className="font-header text-3xl font-bold">FreshBites</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="sm:hidden">
          <SidebarGroupContent>
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLinkItem title="Inicio" path="/" icon={<Home />} />
              <SidebarLinkItem
                title="Recetas"
                path="/recipes"
                icon={<Book />}
              />
              <Protect
                condition={(has) =>
                  has({ role: "org:member" }) || has({ role: "org:admin" })
                }
              >
                <SidebarLinkItem
                  title="Admin"
                  path="/admin"
                  icon={<Shield />}
                />
              </Protect>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <ClientOnly>
          <NavPinned />
        </ClientOnly>
      </SidebarContent>
      <SidebarFooter>
        <SignedOut>
          <Button size="lg" asChild>
            <Link href="/sign-in">Iniciar sesión</Link>
          </Button>
        </SignedOut>
      </SidebarFooter>
    </Sidebar>
  );
}
