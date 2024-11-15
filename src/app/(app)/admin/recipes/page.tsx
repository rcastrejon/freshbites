import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Trash, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { VerifyModal } from "../verify-modal";
import { DeleteRecipeModal } from "../delete-recipe-modal";
import { db } from "@/lib/db";
import { desc, sql } from "drizzle-orm";
import { recipeTable } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

async function getRecipes(page: number) {
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const [[totalCount], recipes] = await db.batch([
    db.select({ value: sql<number>`count(*)` }).from(recipeTable),
    db.query.recipeTable.findMany({
      with: {
        author: true,
      },
      orderBy: desc(recipeTable.createdAt),
      limit: pageSize,
      offset: offset,
    }),
  ]);

  return {
    recipes,
    totalPages: Math.ceil(Number(totalCount?.value) / pageSize),
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const { recipes, totalPages } = await getRecipes(currentPage);

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 border-b-2 border-b-foreground pb-1 font-header text-2xl font-bold">
          Todas las Recetas
        </h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Receta</TableHead>
                <TableHead>Estado</TableHead>
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
                    {recipe.verifiedAt ? (
                      <Badge variant="outline">Verificada</Badge>
                    ) : (
                      <Badge variant="outline">Sin verificar</Badge>
                    )}
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
                      {!recipe.verifiedAt && (
                        <VerifyModal recipeId={recipe.id}>
                          <Button variant="outline" size="icon">
                            <Check className="h-4 w-4" />
                          </Button>
                        </VerifyModal>
                      )}
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

        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            asChild={currentPage > 1}
          >
            <Link
              href={`/admin/recipes?page=${currentPage - 1}`}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Link>
          </Button>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            asChild={currentPage < totalPages}
          >
            <Link
              href={`/admin/recipes?page=${currentPage + 1}`}
              className="flex items-center gap-2"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
