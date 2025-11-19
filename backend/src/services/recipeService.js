import { groqClient } from "../config/groq.js";
import { parseJSON } from "../utils/jsonParser.js";

export class RecipeService {
    async generateRecipe(ingredients, dietPreference, maxPreparationTime) {
        try {
            const prompt = this.#buildRecipePrompt(
                ingredients,
                dietPreference,
                maxPreparationTime
            );
            console.log("Prompt enviado:", prompt);

            const response = await this.#makeGroqRequest(prompt);
            console.log(
                "Respuesta recibida:",
                response.choices[0].message.content
            );

            return this.#parseRecipeResponse(response);
        } catch (error) {
            console.error("Error generando receta con Groq:", error);
            throw new Error("No se pudo generar la receta");
        }
    }

    async #makeGroqRequest(prompt) {
        return await groqClient.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "Eres un asistente experto en cocina que genera recetas creativas. Debes responder SOLO con un objeto JSON válido, sin texto adicional antes o después. El JSON debe estar bien formateado y ser parseable.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
        });
    }

    #buildRecipePrompt(ingredients, dietPreference, maxPreparationTime) {
        const basePrompt = `Genera una receta creativa utilizando estos ingredientes: ${ingredients.join(
            ", "
        )}.`;
        const dietPart = dietPreference
            ? ` La receta debe ser ${dietPreference}.`
            : "";
        const timePart = maxPreparationTime
            ? ` El tiempo de preparación no debe superar los ${maxPreparationTime} minutos.`
            : "";

        const jsonStructure = `
        IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido EN CASTELLANO, sin texto adicional.
        El JSON debe tener esta estructura:
        {
          "title": "Nombre de la receta",
          "ingredients": ["lista", "de", "ingredientes"],
          "instructions": ["Paso 1", "Paso 2", ...],
          "preparationTime": número de minutos,
          "difficulty": "nivel de dificultad"
        }`;

        return `${basePrompt}${dietPart}${timePart}${jsonStructure}`;
    }

    #parseRecipeResponse(apiResponse) {
        const content = apiResponse.choices[0].message.content.trim();
        return parseJSON(content);
    }
}
