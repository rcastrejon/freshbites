import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { RecipeCard } from "./card";

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

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const pageSize = 8;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams.page as string) || 1;
  const totalCount = recipes.length;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  const hasNextPage = endIndex < totalCount;
  const hasPreviousPage = currentPage > 1;

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {currentRecipes.map((recipe, index) => (
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

export function PaginationButtons({
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
