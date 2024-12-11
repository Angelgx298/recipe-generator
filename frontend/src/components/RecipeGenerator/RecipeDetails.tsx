import React from "react";
import { Recipe } from "../../types/recipe";

interface RecipeDetailsProps {
    recipe: Recipe;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
    return (
        <div className="mt-8 space-y-6 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">
                {recipe.title}
            </h2>

            <div className="flex space-x-6">
                <div className="flex items-center">
                    <svg
                        className="h-6 w-6 text-indigo-500 mr-2"
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
                        className="h-6 w-6 text-indigo-500 mr-2"
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

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Ingredientes
                </h3>
                <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li
                            key={index}
                            className="flex items-center text-gray-700"
                        >
                            <span className="h-2 w-2 bg-indigo-500 rounded-full mr-3"></span>
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Instrucciones
                </h3>
                <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-bold mr-3">
                                {index + 1}
                            </span>
                            <p className="text-gray-700 pt-1">{instruction}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};
