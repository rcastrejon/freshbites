import { Index } from "@upstash/vector";
import { type Recipe } from "../db/types";

type Metadata = {
  id: string;
};

const index = new Index<Metadata>();

function getNamespace() {
  const codename = "freshbites";
  const env = process.env.NODE_ENV ?? "development";
  return `${codename}-${env}`;
}

function getRecipeEmbeddingText(recipe: Recipe) {
  return [
    recipe.title,
    recipe.description,
    recipe.ingredients.join(", "),
    recipe.instructions.join(", "),
  ].join("\n\n");
}

export async function upsertSingleVector(id: string, recipe: Recipe) {
  return await index.upsert(
    {
      id,
      data: getRecipeEmbeddingText(recipe),
      metadata: { id },
    },
    {
      namespace: getNamespace(),
    },
  );
}

export async function upsertMultipleVectors(recipes: Recipe[]) {
  const toInsert = recipes.map((recipe) => ({
    id: recipe.id,
    data: getRecipeEmbeddingText(recipe),
    metadata: { id: recipe.id },
  }));
  return await index.upsert(toInsert, {
    namespace: getNamespace(),
  });
}

export async function queryVectors(query: string) {
  return await index.query(
    {
      data: query,
      includeVectors: false,
      includeMetadata: false,
      topK: 8,
    },
    {
      namespace: getNamespace(),
    },
  );
}