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
        <div className="min-h-screen bg-gradient-to-br to-indigo-100 flex items-center justify-center">
            <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden m-4">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Generador de Recetas
                    </h1>

                    <div className="space-y-6">
                        <div className="flex space-x-3">
                            <input
                                type="text"
                                value={currentIngredient}
                                onChange={(e) =>
                                    setCurrentIngredient(e.target.value)
                                }
                                placeholder="Ingrediente (ej. pollo, arroz)"
                                className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                onKeyPress={(e) =>
                                    e.key === "Enter" && addIngredient()
                                }
                            />
                            <button
                                onClick={addIngredient}
                                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md"
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
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                            onChange={(e) =>
                                setMaxPreparationTime(e.target.value)
                            }
                            placeholder="Tiempo máximo de preparación (minutos)"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
            </div>
        </div>
    );
};

export default RecipeGenerator;