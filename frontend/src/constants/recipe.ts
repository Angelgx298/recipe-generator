import { DietOption } from "../types/recipe";

export const CONSTANTS = {
    MAX_INGREDIENTS: 20,
    MIN_PREP_TIME: 1,
    MAX_PREP_TIME: 480,
    API_URL: "https://recipe-generator-sc52.onrender.com/api/recipes/generate" ,
} as const;

export const dietOptions: DietOption[] = [
    { value: "", label: "Tipo de dieta" },
    { value: "vegetarian", label: "Vegetariana" },
    { value: "vegan", label: "Vegana" },
    { value: "gluten-free", label: "Sin Gluten" },
];
