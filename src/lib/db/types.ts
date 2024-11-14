import { recipeTable, userTable } from "./schema";

export type Recipe = typeof recipeTable.$inferSelect;
export type User = typeof userTable.$inferSelect;

export type RecipeWithAuthor = Recipe & { author: User | null };
