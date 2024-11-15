import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Trash, ChevronRight } from "lucide-react";
import Link from "next/link";
import { VerifyModal } from "./verify-modal";
import { DeleteRecipeModal } from "./delete-recipe-modal";
import { db } from "@/lib/db";
import { sql, isNull, desc } from "drizzle-orm";
import { recipeTable } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

async function getMetrics() {
  const [unverifiedCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(recipeTable)
    .where(isNull(recipeTable.verifiedAt));

  const [totalCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(recipeTable);

  return {
    unverified: Number(unverifiedCount?.count),
    total: Number(totalCount?.count),
  };
}

async function getUnverifiedRecipes() {
  return db.query.recipeTable.findMany({
    with: {
      author: true,
    },
    where: isNull(recipeTable.verifiedAt),
    limit: 3,
    orderBy: desc(recipeTable.createdAt),
  });
}

async function getLatestRecipes() {
  return db.query.recipeTable.findMany({
    with: {
      author: true,
    },
    limit: 3,
    orderBy: desc(recipeTable.createdAt),
  });
}

export default async function Page() {
  const metrics = await getMetrics();
  const unverifiedRecipes = await getUnverifiedRecipes();
  const latestRecipes = await getLatestRecipes();

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 border-b-2 border-b-foreground pb-1 font-header text-2xl font-bold">
          Panel de Administración
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recetas sin verificar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.unverified}</div>
              <Button className="mt-4" variant="outline" asChild>
                <Link href="/admin/unverified">Ver recetas</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total de recetas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.total}</div>
              <Button className="mt-4" variant="outline" asChild>
                <Link href="/admin/recipes">Ver todas</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Recetas sin verificar</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unverifiedRecipes.map((recipe) => (
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
        <div className="mt-2 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/admin/unverified">
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Todas las recetas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestRecipes.map((recipe) => (
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
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
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
        <div className="mt-2 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/admin/recipes">
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
