import { Search, SearchSkeleton } from "./search";
import { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateRecipeForm } from "./create-recipe";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";

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
        <div className="hidden items-center space-x-2 sm:flex md:w-full md:justify-end">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <SignedIn>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4" />
                  Nueva receta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Crear receta</DialogTitle>
                  <DialogDescription className="sr-only">
                    Formulario para crear una nueva receta
                  </DialogDescription>
                </DialogHeader>
                <CreateRecipeForm />
              </DialogContent>
            </Dialog>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
