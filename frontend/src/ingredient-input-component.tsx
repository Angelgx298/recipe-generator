import React, { useState, useCallback } from "react";

interface Recipe {
    title: string;
    ingredients: string[];
    instructions: string[];
    preparationTime: number;
    difficulty: string;
}

interface DietOption {
    value: string;
    label: string;
}

const dietOptions: DietOption[] = [
    { value: "", label: "Ninguna" },
    { value: "vegetarian", label: "Vegetariana" },
    { value: "vegan", label: "Vegana" },
    { value: "gluten-free", label: "Sin Gluten" },
];

const CONSTANTS = {
    MAX_INGREDIENTS: 20,
    MIN_PREP_TIME: 1,
    MAX_PREP_TIME: 480,
    API_URL: "http://localhost:5000/api/recipes",
} as const;

const IngredientInput: React.FC = () => {
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
        setIngredients((prev) =>
            prev.filter((ing) => ing !== ingredientToRemove)
        );
    }, []);

    const handleSubmit = useCallback(async () => {
        if (ingredients.length === 0) {
            setError("Por favor, ingrese al menos un ingrediente");
            return;
        }

        if (ingredients.length > CONSTANTS.MAX_INGREDIENTS) {
            setError(
                `No puede exceder ${CONSTANTS.MAX_INGREDIENTS} ingredientes`
            );
            return;
        }

        setIsLoading(true);
        setError("");
        setRecipe(null);

        try {
            const response = await fetch(CONSTANTS.API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ingredients,
                    dietPreference,
                    maxPreparationTime: maxPreparationTime
                        ? parseInt(maxPreparationTime)
                        : null,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Error en la respuesta del servidor"
                );
            }

            const recipeData = await response.json();
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

    const renderIngredientList = useCallback(
        () => (
            <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-lg">
                {ingredients.map((ing) => (
                    <div
                        key={ing}
                        className="bg-indigo-100 px-3 py-2 rounded-full flex items-center shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <span className="text-indigo-800">{ing}</span>
                        <button
                            onClick={() => removeIngredient(ing)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        ),
        [ingredients, removeIngredient]
    );

    const renderRecipeDetails = useCallback(() => {
        if (!recipe) return null;

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
                        <span className="text-gray-700">
                            {recipe.difficulty}
                        </span>
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
                                <p className="text-gray-700 pt-1">
                                    {instruction}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }, [recipe]);

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

                        {renderIngredientList()}

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

                        <button
                            onClick={handleSubmit}
                            disabled={ingredients.length === 0 || isLoading}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Generando...
                                </div>
                            ) : (
                                "Buscar Receta"
                            )}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-red-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {renderRecipeDetails()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientInput;
