"use server";

import { db } from "@/lib/db";
import { NutritionalFact, recipeTable } from "@/lib/db/schema";
import { deleteVector } from "@/lib/server/vector";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function deleteRecipe(recipeId: string) {
  const serverAuth = await auth();
  const guard =
    serverAuth.orgRole === "org:admin" || serverAuth.orgRole === "org:member";
  if (!guard) {
    throw new Error("Unauthorized");
  }
  const result = await db
    .delete(recipeTable)
    .where(eq(recipeTable.id, recipeId));
  if (result.rowsAffected === 0) {
    return notFound();
  }

  await deleteVector(recipeId);
}

export async function verifyRecipe(
  recipeId: string,
  facts: NutritionalFact[],
  calories: number,
) {
  const serverAuth = await auth();
  const guard =
    serverAuth.orgRole === "org:admin" || serverAuth.orgRole === "org:member";
  if (!guard) {
    throw new Error("Unauthorized");
  }
  const result = await db
    .update(recipeTable)
    .set({
      verifiedAt: new Date(),
      nutritionalFacts: facts,
      caloriesPerServing: calories,
    })
    .where(eq(recipeTable.id, recipeId));
  if (result.rowsAffected === 0) {
    return notFound();
  }
}
