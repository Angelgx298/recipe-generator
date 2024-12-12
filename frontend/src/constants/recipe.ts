import { DietOption } from "../types/recipe";

export const CONSTANTS = {
    MAX_INGREDIENTS: 20,
    MIN_PREP_TIME: 1,
    MAX_PREP_TIME: 480,
    API_URL: await (async () => {
        const localUrl = 'http://localhost:5000/api/recipes/generate';
        try {
            // Solo verificamos si el servidor local responde
            const response = await fetch(localUrl, {
                method: 'HEAD', // Usamos HEAD para una verificación más ligera
                signal: AbortSignal.timeout(100) // 100ms timeout
            });
            console.log('Usando servidor local');
            return localUrl;
        } catch (error) {
            console.log('Servidor local no disponible, usando servidor deployado');
            return (import.meta as any).env.VITE_API_URL;
        }
    })(),
} as const;

export const dietOptions: DietOption[] = [
    { value: "", label: "Tipo de dieta" },
    { value: "vegetarian", label: "Vegetariana" },
    { value: "vegan", label: "Vegana" },
    { value: "gluten-free", label: "Sin Gluten" },
];
