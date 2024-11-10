"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/recipes">
      <InputField
        key={searchParams.get("q")}
        name="q"
        defaultValue={searchParams.get("q") || ""}
      />
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="animate-pulse">
      <InputField disabled />
    </form>
  );
}

function InputField({
  ...props
}: React.ButtonHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative w-full">
      <Input
        className="peer bg-white pe-9 text-foreground"
        placeholder="Buscar recetas..."
        type="search"
        autoComplete="off"
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-foreground/80 peer-disabled:opacity-50">
        <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}
