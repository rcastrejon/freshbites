import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Coins, Leaf, ShieldCheck, Utensils } from "lucide-react";

const recipes = [
  {
    title: "Spicy Lentil Curry",
    time: "30",
    cost: "$4",
    calories: "350",
    servings: "3",
    author: "Spice Master",
    image: "https://placehold.co/600",
    verified: true,
  },
  {
    title: "Banana Oatmeal",
    time: "10",
    cost: "$2",
    calories: undefined,
    servings: "2",
    author: "Breakfast King",
    image: "https://placehold.co/600",
    verified: false,
  },
  {
    title: "Veggie Bean Burrito",
    time: "15",
    cost: "$3",
    calories: "400",
    servings: "2",
    author: "Wrap Master",
    image: "https://placehold.co/600",
    verified: true,
  },
  {
    title: "Egg Fried Rice",
    time: "20",
    cost: "$4",
    calories: undefined,
    servings: "3",
    author: "Wok Star",
    image: "https://placehold.co/600",
    verified: false,
  },
  {
    title: "Mediterranean Chickpea Salad",
    time: "15",
    cost: "$3",
    calories: "300",
    servings: "2",
    author: "Salad Pro",
    image: "https://placehold.co/600",
    verified: true,
  },
  {
    title: "Avocado Toast",
    time: "5",
    cost: "$3",
    calories: undefined,
    servings: "1",
    author: "Toast Master",
    image: "https://placehold.co/600",
    verified: false,
  },
];

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
}

type Recipe = {
  title: string;
  author: string;
  image: string;
  time: string;
  cost: string;
  servings: string;
  calories?: string;
  verified: boolean;
};

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="overflow-hidden rounded-none border shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="aspect-square w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-950/80 to-transparent p-2">
          <h4 className="font-header text-base font-semibold leading-none text-card">
            {recipe.title}
          </h4>
          <p className="mt-1 text-xs italic text-muted">Por {recipe.author}</p>
        </div>
        <VerifiedBadge isVerified={recipe.verified} />
      </div>
      <CardContent className="p-2">
        <div className="grid grid-cols-2 gap-1 text-xs">
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
            {recipe.time} min
          </span>
          <span className="flex items-center">
            <Coins className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
            {recipe.cost}
          </span>
          <span className="flex items-center">
            <Utensils className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
            {recipe.servings}
          </span>
          {recipe.calories ? (
            <span className="flex items-center">
              <Leaf className="mr-1 h-3 w-3 text-muted-foreground" />{" "}
              {recipe.calories} kcal
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
