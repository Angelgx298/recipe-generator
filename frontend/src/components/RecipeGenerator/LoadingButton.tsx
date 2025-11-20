import React from "react";

interface LoadingButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  disabled,
  onClick,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full transform rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 py-4 font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-indigo-700 hover:to-indigo-800 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
);
