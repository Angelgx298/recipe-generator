import React from "react";

interface IngredientListProps {
    ingredients: string[];
    onRemove: (ingredient: string) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({
    ingredients,
    onRemove,
}) => (
    <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-lg">
        {ingredients.map((ing) => (
            <div
                key={ing}
                className="bg-indigo-100 px-3 py-2 rounded-full flex items-center shadow-sm hover:shadow-md transition-shadow duration-200"
            >
                <span className="text-indigo-800">{ing}</span>
                <button
                    onClick={() => onRemove(ing)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                >
                    ✕
                </button>
            </div>
        ))}
    </div>
);
