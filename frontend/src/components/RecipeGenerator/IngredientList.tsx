import React from "react";

interface IngredientListProps {
  ingredients: string[];
  onRemove: (ingredient: string) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onRemove,
}) => (
  <div className="flex min-h-[60px] flex-wrap gap-2 rounded-lg bg-gray-50 p-4">
    {ingredients.map((ing) => (
      <div
        key={ing}
        className="flex items-center rounded-full bg-indigo-100 px-3 py-2 shadow-sm transition-shadow duration-200 hover:shadow-md"
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
