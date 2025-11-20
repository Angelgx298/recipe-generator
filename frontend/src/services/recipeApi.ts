import { Recipe } from "../types/recipe";
import { CONSTANTS } from "../constants/recipe";

interface GenerateRecipeParams {
  ingredients: string[];
  dietPreference: string;
  maxPreparationTime: number | null;
}

export const generateRecipe = async ({
  ingredients,
  dietPreference,
  maxPreparationTime,
}: GenerateRecipeParams): Promise<Recipe> => {
  const response = await fetch(CONSTANTS.API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ingredients,
      dietPreference,
      maxPreparationTime,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message || "Error en la respuesta del servidor"
    );
  }

  const recipeData = await response.json();

  if (!recipeData || !recipeData.title) {
    throw new Error("Formato de receta inválido");
  }

  return recipeData;
};
