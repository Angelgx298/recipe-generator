import React from "react";
import { useRecipeGenerator } from "../../hooks/useRecipeGenerator";
import { IngredientList } from "./IngredientList";
import { RecipeDetails } from "./RecipeDetails";
import { LoadingButton } from "./LoadingButton";
import { ErrorMessage } from "./ErrorMessage";
import { dietOptions } from "../../constants/recipe";

const RecipeGenerator: React.FC = () => {
  const {
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
  } = useRecipeGenerator();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br to-indigo-100">
      <div className="m-2 mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-2 shadow-xl sm:p-6 md:p-8 lg:m-8">
        <div className="p-2 sm:p-6 md:p-8">
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-800 sm:mb-6 sm:text-3xl md:mb-8">
            Generador de Recetas con IA
          </h1>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                placeholder="Ingrediente (ej. pollo, arroz)"
                className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:py-3"
                onKeyPress={(e) => e.key === "Enter" && addIngredient()}
              />
              <button
                onClick={addIngredient}
                className="w-full transform rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-indigo-700 sm:w-auto sm:px-6 sm:py-3"
              >
                Añadir
              </button>
            </div>

            <IngredientList
              ingredients={ingredients}
              onRemove={removeIngredient}
            />

            <select
              value={dietPreference}
              onChange={(e) => setDietPreference(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:py-3"
            >
              {dietOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={maxPreparationTime}
              onChange={(e) => setMaxPreparationTime(e.target.value)}
              placeholder="Tiempo máximo de preparación (minutos)"
              className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:py-3"
            />

            <LoadingButton
              isLoading={isLoading}
              disabled={ingredients.length === 0 || isLoading}
              onClick={handleSubmit}
            />

            {error && <ErrorMessage message={error} />}

            {recipe && <RecipeDetails recipe={recipe} />}
          </div>
        </div>
        <div className="py-2 text-center text-xs text-gray-400 sm:py-3">
          <a
            href="https://github.com/Angelgx298"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-600"
          >
            Desarrollado por Ángel Ruiz Nadal
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;
