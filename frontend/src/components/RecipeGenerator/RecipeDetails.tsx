import React from "react";
import { Recipe } from "../../types/recipe";

interface RecipeDetailsProps {
  recipe: Recipe;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <div className="mt-8 space-y-6 rounded-xl bg-gray-50 p-6">
      <h2 className="border-b pb-4 text-xl font-bold text-gray-800">
        {recipe.title}
      </h2>

      <div className="flex space-x-6">
        <div className="flex items-center">
          <svg
            className="mr-2 h-6 w-6 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-700">
            {recipe.preparationTime} minutos
          </span>
        </div>
        <div className="flex items-center">
          <svg
            className="mr-2 h-6 w-6 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-gray-700">{recipe.difficulty}</span>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Ingredientes
        </h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="mr-3 h-2 w-2 rounded-full bg-indigo-500"></span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Instrucciones
        </h3>
        <ol className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex">
              <span className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                {index + 1}
              </span>
              <p className="pt-1 text-gray-700">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
