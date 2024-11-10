import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { RecipeCard } from "./card";
import { db } from "@/lib/db";
import { recipeTable } from "@/lib/db/schema";
import { count } from "drizzle-orm";

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { page } = searchParams as { [key: string]: string };
  const currentPage = page ? parseInt(page) : 1;

  const pageSize = 8;
  const offset = (currentPage - 1) * pageSize;

  const [[totalCount], recipes] = await db.batch([
    db.select({ value: count() }).from(recipeTable),
    db.select().from(recipeTable).limit(pageSize).offset(offset),
  ]);

  const totalPages = Math.ceil((totalCount?.value ?? 0) / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <PaginationButtons
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        currentPage={currentPage}
      />
    </div>
  );
}

function PaginationButtons({
  hasNextPage,
  hasPreviousPage,
  currentPage,
}: {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
}) {
  const PrevTag = hasPreviousPage ? Link : "button";
  const NextTag = hasNextPage ? Link : "button";

  return (
    <div className="mt-6 flex justify-center gap-2">
      <Button variant="outline" disabled={!hasPreviousPage} asChild>
        <PrevTag href={`?page=${currentPage - 1}`}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Anterior
        </PrevTag>
      </Button>

      <Button variant="outline" disabled={!hasNextPage} asChild>
        <NextTag href={`?page=${currentPage + 1}`}>
          Siguiente
          <ChevronRight className="ml-1 h-4 w-4" />
        </NextTag>
      </Button>
    </div>
  );
}
