import Groq from "groq-sdk";

/**
 * Servicio para generar recetas de cocina usando Groq API
 */
class LlamaRecipeService {
    #groqAPI;

    constructor() {
        // API key de Groq
        this.#groqAPI = new Groq({
            apiKey: "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",
        });
    }

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
        return await this.#groqAPI.chat.completions.create({
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
            model: "mixtral-8x7b-32768",
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

    // Extrae y valida el JSON de la respuesta de la API
    #parseRecipeResponse(apiResponse) {
        try {
            const content = apiResponse.choices[0].message.content.trim();
            console.log("Contenido a parsear:", content);

            return this.#tryParseJSON(content);
        } catch (error) {
            console.error("Error completo al parsear:", error);
            throw new Error("No se pudo parsear la receta generada");
        }
    }

    // Intenta parsear el JSON, incluso si contiene texto adicional
    #tryParseJSON(content) {
        try {
            return JSON.parse(content);
        } catch {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error(
                    "No se encontró un JSON válido en la respuesta"
                );
            }
            return JSON.parse(jsonMatch[0]);
        }
    }
}

export default new LlamaRecipeService();
