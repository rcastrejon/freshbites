import { db } from "@/lib/db";
import { NutritionalFact, recipeTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { VerifiedBadge } from "../card";
import { Clock, Coins, Leaf, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const [recipe] = await db
    .select()
    .from(recipeTable)
    .where(eq(recipeTable.id, id));
  if (!recipe) {
    return notFound();
  }

  return (
    <article className="overflow-hidden rounded-sm border-2 bg-card shadow-md">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative aspect-square">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-end bg-gradient-to-t from-orange-950/80 to-transparent">
              <div className="p-3 text-card">
                <h1 className="leading-0 mb-1 mt-1 font-header text-2xl font-bold leading-none">
                  {recipe.title}
                </h1>
                <p className="text-xs text-muted">{recipe.description}</p>
              </div>
            </div>
            <VerifiedBadge isVerified={recipe.verifiedAt !== null} />
          </div>
        </div>
        <div className="p-3 md:w-1/2">
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="flex items-center rounded-sm bg-background px-4 py-3">
              <Clock className="mr-4 h-4 w-4" />
              <div>
                <span className="block text-xs font-medium leading-none">
                  Tiempo
                </span>
                <span className="mt-1 text-sm font-bold leading-none">
                  {recipe.timeInMinutes} min
                </span>
              </div>
            </div>
            <div className="flex items-center rounded-sm bg-background px-4 py-3">
              <Coins className="mr-4 h-4 w-4" />
              <div>
                <span className="block text-xs font-medium leading-none">
                  Precio
                </span>
                <span className="mt-1 text-sm font-bold leading-none">
                  ${recipe.cost} pesos
                </span>
              </div>
            </div>
            <div className="flex items-center rounded-sm bg-background px-4 py-3">
              <Utensils className="mr-4 h-4 w-4" />
              <div>
                <span className="block text-xs font-medium leading-none">
                  Porciones
                </span>
                <span className="mt-1 text-sm font-bold leading-none">
                  {recipe.servings}
                </span>
              </div>
            </div>
            <div className="flex items-center rounded-sm bg-background px-4 py-3">
              <Leaf className="mr-4 h-4 w-4" />
              <div>
                <span className="block text-xs font-medium leading-none">
                  Calorías por porción
                </span>
                <span className="mt-1 text-sm font-bold leading-none">
                  {recipe.caloriesPerServing} kcal
                </span>
              </div>
            </div>
          </div>
          <NutritionalFacts nutritionalFacts={recipe.nutritionalFacts} />
        </div>
      </div>
      <Separator className="my-3 bg-border" />
      <div className="p-3">
        <div className="md:flex md:space-x-4">
          <div className="mb-3 md:mb-0 md:w-1/2">
            <h2 className="mb-2 font-header text-xl font-bold">Ingredientes</h2>
            <ul className="list-disc space-y-1 pl-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-2 font-header text-xl font-bold">
              Instrucciones
            </h2>
            <ol className="list-decimal space-y-2 pl-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-sm">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </article>
  );
}

function NutritionalFacts({
  nutritionalFacts,
}: {
  nutritionalFacts: NutritionalFact[];
}) {
  if (nutritionalFacts.length === 0) {
    return null;
  }
  return (
    <Card className="mt-3 bg-white">
      <CardContent className="p-2">
        <h2 className="mb-1 text-sm font-bold">Información nutricional</h2>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {nutritionalFacts.map((value, index) => (
            <p key={index}>
              {value.key}: {value.value}
              {value.unit}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
