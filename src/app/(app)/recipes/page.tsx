import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { RecipeCard, RecipeCardSkeleton } from "./card";
import { db } from "@/lib/db";
import { recipeTable } from "@/lib/db/schema";
import { count, inArray } from "drizzle-orm";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";
import { queryVectors } from "@/lib/server/vector";
import { type Recipe } from "@/lib/db/types";
import { desc } from "drizzle-orm";

export default function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <h3 className="mb-3 border-b-2 border-b-foreground pb-1 font-header text-2xl font-bold">
        Recetas
      </h3>
      <Suspense>
        <ChildrenWrapper>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <RecipeCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <RecipeList searchParams={props.searchParams} />
          </Suspense>
        </ChildrenWrapper>
      </Suspense>
    </div>
  );
}

async function RecipeList(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { page, q } = searchParams as { [key: string]: string };
  const currentPage = page ? parseInt(page) : 1;

  const pageSize = 8;
  const offset = (currentPage - 1) * pageSize;

  let totalCount: { value: number } | undefined;
  let recipes: Recipe[];

  if (q) {
    const vectors = await queryVectors(q);
    const scoreMap = Object.fromEntries(
      vectors
        .filter((vector) => vector.score > 0.72)
        .map((vector) => [vector.id as string, vector.score]),
    );
    const ids = Object.keys(scoreMap);

    [[totalCount], recipes] = await db.batch([
      db
        .select({ value: count() })
        .from(recipeTable)
        .where(inArray(recipeTable.id, ids)),
      db
        .select()
        .from(recipeTable)
        .where(inArray(recipeTable.id, ids))
        .limit(pageSize),
    ]);

    recipes.sort((a, b) => (scoreMap[b.id] ?? 0) - (scoreMap[a.id] ?? 0));
  } else {
    [[totalCount], recipes] = await db.batch([
      db.select({ value: count() }).from(recipeTable),
      db
        .select()
        .from(recipeTable)
        .orderBy(desc(recipeTable.createdAt))
        .limit(pageSize)
        .offset(offset),
    ]);
  }

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
