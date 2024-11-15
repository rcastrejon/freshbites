import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Trash } from "lucide-react";
import { VerifyModal } from "../verify-modal";
import { DeleteRecipeModal } from "../delete-recipe-modal";
import { db } from "@/lib/db";
import { isNull, desc } from "drizzle-orm";
import { recipeTable } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

async function getUnverifiedRecipes() {
  return db.query.recipeTable.findMany({
    with: {
      author: true,
    },
    where: isNull(recipeTable.verifiedAt),
    orderBy: desc(recipeTable.createdAt),
  });
}

export default async function Page() {
  const recipes = await getUnverifiedRecipes();

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 border-b-2 border-b-foreground pb-1 font-header text-2xl font-bold">
          Recetas sin verificar
        </h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Receta</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={recipe.imageUrl}
                        alt=""
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <span>{recipe.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {recipe.author?.username ?? "[ELIMINADO]"}
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(recipe.createdAt, {
                      addSuffix: true,
                      locale: es,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <VerifyModal recipeId={recipe.id}>
                        <Button variant="outline" size="icon">
                          <Check className="h-4 w-4" />
                        </Button>
                      </VerifyModal>
                      <DeleteRecipeModal recipeId={recipe.id}>
                        <Button variant="destructive" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </DeleteRecipeModal>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
