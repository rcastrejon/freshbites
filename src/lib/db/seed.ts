import "../server/envConfig";

import { db } from ".";
import { recipeTable } from "./schema";
import { upsertMultipleVectors } from "../server/vector";

async function main() {
  await db.delete(recipeTable).all();

  const insertResults = await db
    .insert(recipeTable)
    .values([
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Tacos de Frijoles Refritos",
        description:
          "Tacos rápidos y económicos con frijoles refritos, perfectos para una comida sencilla.",
        timeInMinutes: 15,
        cost: 20,
        caloriesPerServing: 350,
        servings: 2,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hKf7RXE5SGfqp7mk9ZCUj0crMX4QhYDEu1gNz",
        verifiedAt: new Date(),
        ingredients: [
          "Tortillas de maíz",
          "Frijoles refritos",
          "Queso fresco",
          "Salsa al gusto",
        ],
        instructions: [
          "Calentar las tortillas.",
          "Untar frijoles refritos en cada tortilla.",
          "Agregar queso fresco desmoronado.",
          "Añadir salsa al gusto.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "15", unit: "g" },
          { key: "Carbohidratos", value: "50", unit: "g" },
          { key: "Grasas", value: "10", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Sopa de Lentejas",
        description: "Una sopa nutritiva y económica, ideal para estudiantes.",
        timeInMinutes: 40,
        cost: 30,
        caloriesPerServing: 400,
        servings: 4,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hB2YgJ715KnyX6S1F0Dukzd9eWCgxHpAlwVhj",
        verifiedAt: new Date(),
        ingredients: [
          "Lentejas",
          "Zanahoria",
          "Cebolla",
          "Ajo",
          "Caldo de verduras",
        ],
        instructions: [
          "Picar la cebolla, zanahoria y ajo.",
          "Sofreír en una olla.",
          "Añadir las lentejas y el caldo.",
          "Cocinar hasta que las lentejas estén suaves.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "20", unit: "g" },
          { key: "Carbohidratos", value: "60", unit: "g" },
          { key: "Grasas", value: "5", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Quesadillas Simples",
        description: "Rápido y fácil, solo necesitas tortillas y queso.",
        timeInMinutes: 10,
        cost: 15,
        caloriesPerServing: 300,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0h6e0TDWJsIYigrHn50uWM87AxP14dVtNavZmE",
        verifiedAt: new Date(),
        ingredients: ["Tortillas de harina", "Queso Oaxaca"],
        instructions: [
          "Calentar una tortilla en un sartén.",
          "Añadir queso.",
          "Doblar la tortilla.",
          "Cocinar hasta que el queso se derrita.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "15", unit: "g" },
          { key: "Carbohidratos", value: "30", unit: "g" },
          { key: "Grasas", value: "15", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Pasta con Tomate",
        description: "Un clásico rápido y barato para cualquier estudiante.",
        timeInMinutes: 20,
        cost: 25,
        caloriesPerServing: 380,
        servings: 2,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hKf7RXE5SGfqp7mk9ZCUj0crMX4QhYDEu1gNz",
        verifiedAt: new Date(),
        ingredients: ["Pasta", "Salsa de tomate", "Ajo", "Aceite de oliva"],
        instructions: [
          "Hervir la pasta.",
          "Sofreír ajo en aceite.",
          "Añadir salsa de tomate.",
          "Mezclar con la pasta.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "12", unit: "g" },
          { key: "Carbohidratos", value: "70", unit: "g" },
          { key: "Grasas", value: "8", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Arroz con Huevo",
        description:
          "Comida sencilla y llenadora, perfecta para un almuerzo rápido.",
        timeInMinutes: 15,
        cost: 18,
        caloriesPerServing: 350,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hB2YgJ715KnyX6S1F0Dukzd9eWCgxHpAlwVhj",
        verifiedAt: new Date(),
        ingredients: ["Arroz", "Huevos", "Aceite", "Sal"],
        instructions: [
          "Cocinar el arroz.",
          "Freír huevos.",
          "Mezclar con el arroz.",
          "Sazonar con sal.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "18", unit: "g" },
          { key: "Carbohidratos", value: "45", unit: "g" },
          { key: "Grasas", value: "12", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Sándwich de Atún",
        description: "Fácil y rápido, ideal para una cena ligera.",
        timeInMinutes: 10,
        cost: 22,
        caloriesPerServing: 320,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0h6e0TDWJsIYigrHn50uWM87AxP14dVtNavZmE",
        verifiedAt: new Date(),
        ingredients: ["Pan integral", "Atún en lata", "Mayonesa", "Lechuga"],
        instructions: [
          "Mezclar atún con mayonesa.",
          "Untar en el pan.",
          "Añadir lechuga.",
          "Cerrar el sándwich.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "20", unit: "g" },
          { key: "Carbohidratos", value: "35", unit: "g" },
          { key: "Grasas", value: "15", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Ensalada de Nopales",
        description: "Una opción saludable y económica.",
        timeInMinutes: 20,
        cost: 28,
        caloriesPerServing: 200,
        servings: 2,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hKf7RXE5SGfqp7mk9ZCUj0crMX4QhYDEu1gNz",
        verifiedAt: new Date(),
        ingredients: ["Nopales", "Tomate", "Cebolla", "Cilantro", "Limón"],
        instructions: [
          "Cocer los nopales.",
          "Picar tomate, cebolla y cilantro.",
          "Mezclar todo.",
          "Aderezar con limón.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "8", unit: "g" },
          { key: "Carbohidratos", value: "25", unit: "g" },
          { key: "Grasas", value: "5", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Sincronizadas de Jamón y Queso",
        description:
          "Un desayuno o cena rápida y económica: sincronizadas de jamón y queso.",
        timeInMinutes: 10,
        cost: 25.0,
        caloriesPerServing: 250,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hKf7RXE5SGfqp7mk9ZCUj0crMX4QhYDEu1gNz",
        verifiedAt: new Date(),
        ingredients: ["Tortillas de harina", "Jamón", "Queso Oaxaca"],
        instructions: [
          "Coloca una tortilla en un sartén caliente. Agrega jamón y queso. Cubre con otra tortilla y cocina por ambos lados.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "15", unit: "g" },
          { key: "Carbohidratos", value: "20", unit: "g" },
          { key: "Grasas", value: "10", unit: "g" },
        ],
      },

      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Sándwich de Atún Saludable",
        description:
          "Un sándwich de atún nutritivo y económico, perfecto para el almuerzo o la cena.",
        timeInMinutes: 5,
        cost: 20.0,
        caloriesPerServing: 250,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hKf7RXE5SGfqp7mk9ZCUj0crMX4QhYDEu1gNz",
        verifiedAt: new Date(),
        ingredients: [
          "Pan integral",
          "Atún en agua",
          "Mayonesa baja en grasa",
          "Lechuga",
          "Tomate",
        ],
        instructions: [
          "Mezcla el atún con la mayonesa.",
          "Agrega lechuga y tomate.",
          "Coloca la mezcla en el pan integral.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "20", unit: "g" },
          { key: "Carbohidratos", value: "30", unit: "g" },
          { key: "Grasas", value: "5", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Ensalada de Garbanzos",
        description:
          "Una ensalada rica en proteínas y fibra, ideal para una comida completa.",
        timeInMinutes: 10,
        cost: 25.0,
        caloriesPerServing: 300,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hB2YgJ715KnyX6S1F0Dukzd9eWCgxHpAlwVhj",
        verifiedAt: new Date(),
        ingredients: [
          "Garbanzos cocidos",
          "Tomate",
          "Cebolla",
          "Pepino",
          "Limón",
          "Aceite de oliva",
        ],
        instructions: [
          "Combina los garbanzos, tomate, cebolla y pepino picados.",
          "Adereza con limón y aceite de oliva.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "15", unit: "g" },
          { key: "Carbohidratos", value: "40", unit: "g" },
          { key: "Grasas", value: "10", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Pasta con Verduras",
        description: "Una pasta sencilla y nutritiva con vegetales frescos.",
        timeInMinutes: 15,
        cost: 30.0,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0h6e0TDWJsIYigrHn50uWM87AxP14dVtNavZmE",
        ingredients: [
          "Pasta integral",
          "Brócoli",
          "Zanahoria",
          "Calabacín",
          "Salsa de tomate",
        ],
        instructions: [
          "Cocina la pasta.",
          "Saltea las verduras.",
          "Mezcla la pasta con las verduras y la salsa.",
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Huevos Revueltos con Espinacas",
        description: "Un desayuno rápido y saludable rico en proteínas.",
        timeInMinutes: 5,
        cost: 15.0,
        caloriesPerServing: 200,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hKf7RXE5SGfqp7mk9ZCUj0crMX4QhYDEu1gNz",
        verifiedAt: new Date(),
        ingredients: ["Huevos", "Espinacas", "Cebolla"],
        instructions: [
          "Bate los huevos.",
          "Saltea la cebolla y las espinacas.",
          "Agrega los huevos batidos y cocina hasta que cuajen.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "15", unit: "g" },
          { key: "Carbohidratos", value: "5", unit: "g" },
          { key: "Grasas", value: "10", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Tortitas de Avena",
        description: "Un desayuno o merienda saludable y fácil de preparar.",
        timeInMinutes: 10,
        cost: 20.0,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hB2YgJ715KnyX6S1F0Dukzd9eWCgxHpAlwVhj",
        ingredients: ["Avena", "Plátano", "Huevo", "Leche"],
        instructions: [
          "Mezcla todos los ingredientes.",
          "Cocina las tortitas en una sartén.",
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Sopa de Lentejas",
        description:
          "Una sopa nutritiva y económica, perfecta para los días fríos.",
        timeInMinutes: 20,
        cost: 35.0,
        caloriesPerServing: 350,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0h6e0TDWJsIYigrHn50uWM87AxP14dVtNavZmE",
        verifiedAt: new Date(),
        ingredients: ["Lentejas", "Zanahoria", "Papa", "Cebolla", "Ajo"],
        instructions: ["Cocina las lentejas con las verduras picadas."],
        nutritionalFacts: [
          { key: "Proteínas", value: "20", unit: "g" },
          { key: "Carbohidratos", value: "50", unit: "g" },
          { key: "Grasas", value: "5", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Arroz con Pollo y Verduras",
        description:
          "Un plato completo y equilibrado con arroz, pollo y verduras.",
        timeInMinutes: 25,
        cost: 40.0,
        caloriesPerServing: 400,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hKf7RXE5SGfqp7mk9ZCUj0crMX4QhYDEu1gNz",
        verifiedAt: new Date(),
        ingredients: [
          "Arroz integral",
          "Pollo",
          "Brócoli",
          "Pimiento",
          "Cebolla",
        ],
        instructions: [
          "Cocina el arroz.",
          "Saltea el pollo con las verduras.",
          "Mezcla el arroz con el pollo y las verduras.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "25", unit: "g" },
          { key: "Carbohidratos", value: "45", unit: "g" },
          { key: "Grasas", value: "10", unit: "g" },
        ],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Quesadillas de Frijoles",
        description: "Una opción rápida, económica y vegetariana.",
        timeInMinutes: 10,
        cost: 15.0,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0hB2YgJ715KnyX6S1F0Dukzd9eWCgxHpAlwVhj",
        ingredients: ["Tortillas de maíz", "Frijoles refritos", "Queso"],
        instructions: ["Calienta las tortillas con frijoles y queso."],
      },
      {
        authorId: "user_2orJqdrd3Tv8lPYPw95d78WMsgJ",
        title: "Papas al Horno con Especias",
        description: "Una guarnición o plato principal saludable y sabroso.",
        timeInMinutes: 20,
        cost: 25.0,
        caloriesPerServing: 250,
        servings: 1,
        imageUrl:
          "https://utfs.io/f/HGtLyXVKOm0h6e0TDWJsIYigrHn50uWM87AxP14dVtNavZmE",
        verifiedAt: new Date(),
        ingredients: ["Papas", "Aceite de oliva", "Especias"],
        instructions: [
          "Corta las papas en cubos.",
          "Mezcla con aceite y especias.",
          "Hornea hasta que estén doradas.",
        ],
        nutritionalFacts: [
          { key: "Proteínas", value: "5", unit: "g" },
          { key: "Carbohidratos", value: "40", unit: "g" },
          { key: "Grasas", value: "5", unit: "g" },
        ],
      },
    ])
    .returning();

  const newRecipes = insertResults
    .map((recipe) => {
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
