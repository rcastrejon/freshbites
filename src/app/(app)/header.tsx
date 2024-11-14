"use client";

import { Search, SearchSkeleton } from "./search";
import { Suspense } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
import { Building, PlusCircle, UserIcon } from "lucide-react";
import { SignedIn, UserButton, useOrganizationList } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="border-b-2 bg-white p-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger />
          <h2 className="font-header text-3xl font-bold">FreshBites</h2>
        </div>
        <div className="hidden items-center space-x-2 sm:flex sm:w-full sm:justify-end">
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
        <SignedIn>
          <div className="ml-2 flex items-center">
            <UserButtonWithOrgs />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}

function UserButtonWithOrgs() {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: true,
  });

  if (!isLoaded || userMemberships.data.length < 1) {
    return <UserButton />;
  }

  const len = userMemberships.data.length ?? 0;
  return (
    <UserButton key={len}>
      <UserButton.MenuItems>
        {userMemberships.data?.map((mem) => (
          <UserButton.Action
            key={mem.id}
            label={mem.organization.name}
            labelIcon={<Building className="h-4 w-4" />}
            onClick={() => setActive({ organization: mem.organization.id })}
          />
        ))}
        <UserButton.Action
          label="Perfil personal"
          labelIcon={<UserIcon className="h-4 w-4" />}
          onClick={() => setActive({ organization: null })}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
