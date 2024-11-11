import "../server/envConfig";

import { db } from ".";
import { recipeTable } from "./schema";
import { upsertMultipleVectors } from "../server/vector";

async function main() {
  await db.delete(recipeTable).all();
  const batchInsert = await db.batch([
    db
      .insert(recipeTable)
      .values({
        id: "rec_1",
        title: "Paella Valenciana",
        description:
          "Auténtica paella valenciana con arroz dorado y azafrán, combinando los sabores tradicionales de pollo y conejo con verduras frescas. Un plato emblemático de la cocina española.",
        timeInMinutes: 60,
        cost: 75.0,
        caloriesPerServing: 600,
        servings: 4,
        imageUrl: "https://placehold.co/600",
        verified: true,
        ingredients: ["Arroz", "Pollo", "Conejo", "Judías verdes"],
        instructions: [
          "Lava y corta la carne.",
          " Cocina el pollo y el conejo en una paellera.",
          "Añade las verduras y el arroz.",
          "Cubre con agua y cocina a fuego lento.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "25", unit: "g" },
          { key: "Carbohidratos", value: "45", unit: "g" },
          { key: "Grasas", value: "18", unit: "g" },
        ],
      })
      .returning(),
    // 2nd Recipe (Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_2",
        title: "Tortilla Española",
        description:
          "El clásico plato español por excelencia. Una deliciosa combinación de huevos, patatas y cebolla, cocinada a la perfección hasta lograr una textura suave y jugosa.",
        timeInMinutes: 30,
        cost: 40.0,
        caloriesPerServing: 200,
        servings: 3,
        imageUrl: "https://placehold.co/600",
        verified: true,
        ingredients: ["Patatas", "Huevos", "Cebolla", "Aceite"],
        instructions: [
          "Pela y corta las patatas.",
          "Fríelas junto con la cebolla en una sartén.",
          "Bate los huevos y mézclalos con las patatas cocidas.",
          "Cocinar todo junto hasta que cuaje el huevo.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "8", unit: "g" },
          { key: "Carbohidratos", value: "16", unit: "g" },
          { key: "Grasas", value: "9", unit: "g" },
        ],
      })
      .returning(),
    // 3rd Recipe (Not Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_3",
        title: "Pizza de Pepperoni",
        description:
          "Una irresistible pizza con masa crujiente, cubierta con salsa de tomate casera, queso mozzarella derretido y rodajas de pepperoni picante.",
        timeInMinutes: 20,
        cost: 50.0,
        servings: 4,
        imageUrl: "https://placehold.co/600",
        verified: false,
        ingredients: [
          "Masa para pizza",
          "Salsa de tomate",
          "Queso mozzarella",
          "Pepperoni",
        ],
        instructions: [
          "Extender la masa en una bandeja para horno.",
          "Cubrir con salsa de tomate y añadir el queso.",
          "Añadir pepperoni y hornear 15 minutos.",
        ],
      })
      .returning(),
    // 4th Recipe (Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_4",
        title: "Ceviche Peruano",
        description:
          "Fresco pescado blanco marinado en cítricos, mezclado con cebolla roja crujiente y ají amarillo. Un plato refrescante y lleno de sabor de la costa peruana.",
        timeInMinutes: 25,
        cost: 45.0,
        caloriesPerServing: 250,
        servings: 2,
        imageUrl: "https://placehold.co/600",
        verified: true,
        ingredients: [
          "Filete de pescado",
          "Cebolla roja",
          "Limón",
          "Ají amarillo",
        ],
        instructions: [
          "Cortar el pescado en dados pequeños.",
          "Escurrir el jugo de limón sobre el pescado.",
          "Agregar cebolla cortada y ají picado.",
          "Dejar reposar 10 minutos antes de servir.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "22", unit: "g" },
          { key: "Carbohidratos", value: "6", unit: "g" },
          { key: "Grasas", value: "7", unit: "g" },
        ],
      })
      .returning(),
    // 5th Recipe (Not Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_5",
        title: "Nachos con Queso",
        description:
          "Crujientes totopos cubiertos con queso cheddar derretido y jalapeños picantes. El snack perfecto para compartir.",
        timeInMinutes: 10,
        cost: 30.0,
        servings: 2,
        imageUrl: "https://placehold.co/600",
        verified: false,
        ingredients: ["Totopos", "Queso cheddar rallado", "Jalapeños"],
        instructions: [
          "Colocar los totopos en una bandeja.",
          "Cubrir con queso cheddar y cortar jalapeños por encima.",
          "Hornear hasta que el queso se derrita.",
        ],
      })
      .returning(),
    // 6th Recipe (Not Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_6",
        title: "Espaguetis Carbonara",
        description:
          "Una versión cremosa de la pasta italiana clásica, con panceta crujiente y abundante queso parmesano. Simple pero deliciosa.",
        timeInMinutes: 20,
        cost: 35.0,
        servings: 3,
        imageUrl: "https://placehold.co/600",
        verified: false,
        ingredients: [
          "Espaguetis",
          "Panceta",
          "Crema de leche",
          "Queso parmesano",
        ],
        instructions: [
          "Hervir los espaguetis hasta que estén al dente.",
          "Cocinar panceta en una sartén y mezclarlos con crema y queso.",
          "Añadir la mezcla a la pasta cocida.",
        ],
      })
      .returning(),
    // 7th Recipe (Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_7",
        title: "Tacos de Carne Asada",
        description:
          "Auténticos tacos mexicanos con carne de res marinada y asada, servidos en tortillas de maíz calientes con cebolla fresca y cilantro.",
        timeInMinutes: 15,
        cost: 25.0,
        caloriesPerServing: 350,
        servings: 3,
        imageUrl: "https://placehold.co/600",
        verified: true,
        ingredients: ["Tortillas", "Carne de res", "Cebolla", "Cilantro"],
        instructions: [
          "Cortar la carne de res y cocinarla en la parrilla.",
          "Servir la carne en tortillas con cebolla y cilantro picados.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "20", unit: "g" },
          { key: "Carbohidratos", value: "25", unit: "g" },
          { key: "Grasas", value: "18", unit: "g" },
        ],
      })
      .returning(),
    // 8th Recipe (Not Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_8",
        title: "Panqueques con Miel",
        description:
          "Esponjosos panqueques dorados, perfectamente apilados y bañados en miel dorada. Un desayuno clásico que nunca falla.",
        timeInMinutes: 10,
        cost: 20.0,
        servings: 2,
        imageUrl: "https://placehold.co/600",
        verified: false,
        ingredients: ["Harina", "Leche", "Huevos", "Miel"],
        instructions: [
          "Preparar la mezcla de panqueques con harina, leche y huevo.",
          "Cocinar en una sartén en porciones pequeñas.",
          "Servir con miel por encima.",
        ],
      })
      .returning(),
    // 9th Recipe (Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_9",
        title: "Enchiladas Verdes",
        description:
          "Tortillas de maíz rellenas de pollo jugoso, bañadas en salsa verde picante y gratinadas con queso. Un festín mexicano lleno de sabor.",
        timeInMinutes: 35,
        cost: 45.0,
        caloriesPerServing: 400,
        servings: 4,
        imageUrl: "https://placehold.co/600",
        verified: true,
        ingredients: [
          "Tortillas de maíz",
          "Pechuga de pollo desmenuzada",
          "Salsa verde",
          "Queso",
        ],
        instructions: [
          "Rellenar las tortillas con pollo desmenuzado y enrollar.",
          "Cubrir con salsa verde y queso rallado.",
          "Hornear 20 minutos.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "30", unit: "g" },
          { key: "Carbohidratos", value: "40", unit: "g" },
          { key: "Grasas", value: "10", unit: "g" },
        ],
      })
      .returning(),
    // 10th Recipe (Not Verified)
    db
      .insert(recipeTable)
      .values({
        id: "rec_10",
        title: "Batido de Fresas",
        description:
          "Refrescante batido preparado con fresas frescas y dulces, perfecto para los días calurosos o como postre ligero.",
        timeInMinutes: 5,
        cost: 15.0,
        servings: 2,
        imageUrl: "https://placehold.co/600",
        verified: false,
        ingredients: ["Fresas", "Leche", "Azúcar"],
        instructions: [
          "Mezclar las fresas con la leche y el azúcar en la licuadora.",
          "Servir frío en un vaso.",
        ],
      })
      .returning(),
  ]);
  const newRecipes = batchInsert
    .map((result) => {
      const [recipe] = result;
      if (!recipe) {
        console.error("Failed to insert recipe");
        return null;
      }
      return recipe;
    })
    .filter((recipe) => recipe !== null);
  await upsertMultipleVectors(newRecipes);
  console.log("Seeded recipes and vectors");
}

main();
