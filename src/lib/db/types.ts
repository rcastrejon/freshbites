import { recipeTable } from "./schema";

export type Recipe = typeof recipeTable.$inferSelect;
