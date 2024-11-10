import { Search, SearchSkeleton } from "./search";
import { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 overflow-y-auto p-2 md:p-4">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Navbar() {
  return (
    <header className="border-b-2 bg-white p-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger />
          <h2 className="font-header text-3xl font-bold">FreshBites</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
      </div>
    </header>
  );
}