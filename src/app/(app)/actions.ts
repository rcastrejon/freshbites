"use server";

import { db } from "@/lib/db";
import { recipeTable } from "@/lib/db/schema";
import { upsertSingleVector } from "@/lib/server/vector";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

const currencySchema = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, "Formato inválido")
  .refine((val) => parseFloat(val) > 0, "Debe ser mayor a 0")
  .transform((val) => parseFloat(val));

const createRecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  timeInMinutes: z.number().positive(),
  cost: currencySchema,
  servings: z.number().positive(),
  ingredients: z.array(z.string()).min(1),
  instructions: z.array(z.string()).min(1),
});

const utApi = new UTApi();

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

function validateImage(file: File) {
  if (!file.type.startsWith("image/jpeg")) {
    return "La imagen debe ser en formato JPEG";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "La imagen no debe exceder 4MB";
  }
  return null;
}

export async function createRecipe(formData: FormData) {
  const result = createRecipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    timeInMinutes: Number(formData.get("timeInMinutes")),
    cost: formData.get("cost"),
    servings: Number(formData.get("servings")),
    ingredients: formData.getAll("ingredients"),
    instructions: formData.getAll("instructions"),
  });

  if (!result.success) {
    return {
      error: "Error en los datos",
    };
  }

  const image = formData.get("image") as File;
  const imageError = validateImage(image);
  if (imageError) {
    return {
      error: imageError,
    };
  }

  const uploadResult = await utApi.uploadFiles(image);

  if (uploadResult.error) {
    return {
      error: "Error al subir la imagen",
    };
  }

  const [newRecipe] = await db
    .insert(recipeTable)
    .values({ ...result.data, imageUrl: uploadResult.data.url })
    .returning({
      id: recipeTable.id,
      title: recipeTable.title,
      description: recipeTable.description,
      ingredients: recipeTable.ingredients,
      instructions: recipeTable.instructions,
    });

  if (!newRecipe) {
    throw new Error("Failed to create recipe");
  }

  await upsertSingleVector(newRecipe.id, newRecipe);

  return redirect(`/recipes/${newRecipe.id}`);
}
