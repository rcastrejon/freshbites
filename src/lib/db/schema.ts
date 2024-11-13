import { sql } from "drizzle-orm";
import { text, sqliteTable, real, integer } from "drizzle-orm/sqlite-core";
import { newId } from "../server/ids";

export const userTable = sqliteTable("users", {
  id: text().primaryKey(),
  username: text().notNull().unique(),
  firstName: text(),
  lastName: text(),
  imageUrl: text().notNull(),
  createdAt: real().notNull(),
});

export type NutritionalFact = {
  key: string;
  value: string;
  unit: string;
};

export const recipeTable = sqliteTable("recipes", {
  id: text()
    .primaryKey()
    .$defaultFn(() => newId("recipe")),
  title: text().notNull(),
  description: text().notNull(),
  timeInMinutes: integer().notNull(),
  cost: real().notNull(),
  caloriesPerServing: integer(),
  servings: integer().notNull(),
  imageUrl: text().notNull(),
  verified: integer({ mode: "boolean" }).notNull().default(false),
  ingredients: text({ mode: "json" }).$type<string[]>().default([]).notNull(),
  instructions: text({ mode: "json" }).$type<string[]>().default([]).notNull(),
  nutritionalFacts: text({ mode: "json" })
    .$type<NutritionalFact[]>()
    .default([])
    .notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
});
