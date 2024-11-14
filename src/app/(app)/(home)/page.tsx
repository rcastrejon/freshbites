import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { recipeTable } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Clock, Coins, Leaf, Utensils } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <h3 className="mb-3 border-b-2 border-b-foreground pb-1 font-header text-2xl font-bold">
        Receta destacada
      </h3>
      <Suspense fallback={null}>
        <FeaturedRecipe />
      </Suspense>
    </div>
  );
}

async function FeaturedRecipe() {
  const recipe = await db.query.recipeTable.findFirst({
    with: {
      author: true,
    },
    orderBy: desc(recipeTable.verifiedAt),
  });

  if (!recipe) {
    return null;
  }

  return (
    <Card className="overflow-hidden rounded-none border-2 shadow-md">
      <div className="md:flex">
        <div className="relative aspect-square md:w-1/2">
          <img
            src={recipe?.imageUrl}
            alt={recipe?.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-2 top-2 -rotate-6 transform bg-orange-700 px-2 py-0.5 text-xs font-bold text-orange-100">
            Destacado
          </div>
        </div>
        <div className="p-3 md:w-1/2 md:p-4">
          <CardHeader className="mb-2 p-0">
            <CardTitle className="mb-1 font-header text-2xl">
              {recipe.title}
            </CardTitle>
            <CardDescription className="text-xs">
              {recipe.description}
              <span className="mt-1 block italic">
                Por{" "}
                {recipe.author
                  ? `${recipe.author.firstName} ${recipe.author.lastName}`
                  : "[ELIMINADO]"}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />{" "}
                {recipe.timeInMinutes} min
              </span>
              <span className="flex items-center">
                <Coins className="mr-1 h-4 w-4 text-muted-foreground" /> $
                {recipe.cost}
              </span>
              <span className="flex items-center">
                <Utensils className="mr-1 h-4 w-4 text-muted-foreground" />{" "}
                {recipe.servings} porcione(s)
              </span>
              <span className="flex items-center">
                <Leaf className="mr-1 h-4 w-4 text-muted-foreground" />{" "}
                {recipe.caloriesPerServing} kcal
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Button size="sm" className="w-full rounded-none" asChild>
              <Link href={`/recipes/${recipe.id}`}>Ver receta</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
