import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Book, ChefHat, Home } from "lucide-react";
import { SidebarLinkItem } from "./_components/sidebar/items";
import { Suspense } from "react";
import { Search, SearchSkeleton } from "./search";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavbarUser } from "./_components/sidebar/navbar-user";

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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignedIn>
          <NavbarUser />
        </SignedIn>
        <SignedOut>
          <Button size="lg" asChild>
            <Link href="/sign-in">Iniciar sesión</Link>
          </Button>
        </SignedOut>
      </SidebarFooter>
    </Sidebar>
  );
}
