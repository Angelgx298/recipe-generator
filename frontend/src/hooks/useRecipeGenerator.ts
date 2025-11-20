import { useState, useCallback } from "react";
import { Recipe } from "../types/recipe";
import { CONSTANTS } from "../constants/recipe";
import { generateRecipe } from "../services/recipeApi";

export const useRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [dietPreference, setDietPreference] = useState("");
  const [maxPreparationTime, setMaxPreparationTime] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const addIngredient = useCallback(() => {
    const trimmedIngredient = currentIngredient.trim();
    if (trimmedIngredient && !ingredients.includes(trimmedIngredient)) {
      setIngredients((prev) => [...prev, trimmedIngredient]);
      setCurrentIngredient("");
    }
  }, [currentIngredient, ingredients]);

  const removeIngredient = useCallback((ingredientToRemove: string) => {
    setIngredients((prev) => prev.filter((ing) => ing !== ingredientToRemove));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (ingredients.length === 0) {
      setError("Por favor, ingrese al menos un ingrediente");
      return;
    }

    if (ingredients.length > CONSTANTS.MAX_INGREDIENTS) {
      setError(`No puede exceder ${CONSTANTS.MAX_INGREDIENTS} ingredientes`);
      return;
    }

    setIsLoading(true);
    setError("");
    setRecipe(null);

    try {
      const prepTime = maxPreparationTime ? parseInt(maxPreparationTime) : null;
      const recipeData = await generateRecipe({
        ingredients,
        dietPreference,
        maxPreparationTime: prepTime,
      });
      setRecipe(recipeData);
    } catch (error) {
      console.error("Error al obtener receta:", error);
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo generar la receta. Por favor, intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, dietPreference, maxPreparationTime]);

  return {
    ingredients,
    currentIngredient,
    setCurrentIngredient,
    dietPreference,
    setDietPreference,
    maxPreparationTime,
    setMaxPreparationTime,
    recipe,
    isLoading,
    error,
    addIngredient,
    removeIngredient,
    handleSubmit,
  };
};
