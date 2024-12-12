import { DietOption } from "../types/recipe";

export const CONSTANTS = {
    MAX_INGREDIENTS: 20,
    MIN_PREP_TIME: 1,
    MAX_PREP_TIME: 480,
    API_URL: (import.meta as any).env.VITE_API_URL,
} as const;

export const dietOptions: DietOption[] = [
    { value: "", label: "Tipo de dieta" },
    { value: "vegetarian", label: "Vegetariana" },
    { value: "vegan", label: "Vegana" },
    { value: "gluten-free", label: "Sin Gluten" },
];
