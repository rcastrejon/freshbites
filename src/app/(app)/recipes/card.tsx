import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type Recipe } from "@/lib/db/types";
import { Clock, Coins, Leaf, ShieldCheck, Utensils } from "lucide-react";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="overflow-hidden rounded-none border shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="aspect-square w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-950/80 to-transparent p-2">
          <h4 className="font-header text-base font-semibold leading-none text-card">
            {recipe.title}
          </h4>
          <p className="mt-1 text-xs italic text-muted">Por John Doe</p>
        </div>
        <VerifiedBadge isVerified={recipe.verified} />
      </div>
      <CardContent className="p-2">
        <div className="grid grid-cols-2 gap-1 text-xs">
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
            {recipe.timeInMinutes} min
          </span>
          <span className="flex items-center">
            <Coins className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
            {recipe.cost}
          </span>
          <span className="flex items-center">
            <Utensils className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
            {recipe.servings}
          </span>
          {recipe.caloriesPerServing ? (
            <span className="flex items-center">
              <Leaf className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
              {recipe.caloriesPerServing} kcal
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              Calorías no disp.
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <Button variant="outline" className="w-full rounded-none text-xs">
          Ver receta
        </Button>
      </CardFooter>
    </Card>
  );
}

export function RecipeCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-none border shadow-sm">
      <div className="relative">
        <Skeleton className="aspect-square w-full" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-950/80 to-transparent p-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="mt-1 h-3 w-1/2" />
        </div>
      </div>
      <CardContent className="p-2">
        <div className="grid grid-cols-2 gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

function VerifiedBadge({ isVerified }: { isVerified: boolean }) {
  if (!isVerified) {
    return (
      <Badge className="absolute right-2 top-2 bg-orange-400 text-white">
        Comunidad
      </Badge>
    );
  }
  return (
    <Badge className="absolute right-2 top-2 bg-green-600 text-white">
      <ShieldCheck className="mr-1 inline h-3 w-3" />
      Verificado
    </Badge>
  );
}
