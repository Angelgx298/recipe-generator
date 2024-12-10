import Groq from "groq-sdk";

class LlamaRecipeService {
    constructor() {
        // Inicializar cliente de Groq con API key
        const apiToken =
            "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";
        this.groqAPI = new Groq({ apiKey: apiToken });
    }

    async generateRecipe(ingredients, dietPreference, maxPreparationTime) {
        try {
            // Construir prompt para generación de receta
            const prompt = this._buildRecipePrompt(
                ingredients,
                dietPreference,
                maxPreparationTime
            );

            console.log("Prompt enviado:", prompt);

            const response = await this.groqAPI.chat.completions.create({
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

            console.log(
                "Respuesta recibida:",
                response.choices[0].message.content
            );

            // Procesar la respuesta
            return this._parseRecipeResponse(response);
        } catch (error) {
            console.error("Error generando receta con Groq:", error);
            throw new Error("No se pudo generar la receta");
        }
    }

    _buildRecipePrompt(ingredients, dietPreference, maxPreparationTime) {
        let prompt = `Genera una receta creativa utilizando estos ingredientes: ${ingredients.join(
            ", "
        )}.`;

        if (dietPreference) {
            prompt += ` La receta debe ser ${dietPreference}.`;
        }

        if (maxPreparationTime) {
            prompt += ` El tiempo de preparación no debe superar los ${maxPreparationTime} minutos.`;
        }

        prompt += ` 
    IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido EN CASTELLANO, sin texto adicional.
    El JSON debe tener esta estructura:
    {
      "title": "Nombre de la receta",
      "ingredients": ["lista", "de", "ingredientes"],
      "instructions": ["Paso 1", "Paso 2", ...],
      "preparationTime": número de minutos,
      "difficulty": "nivel de dificultad"
    }`;

        return prompt;
    }

    _parseRecipeResponse(apiResponse) {
        try {
            const content = apiResponse.choices[0].message.content.trim();
            console.log("Contenido a parsear:", content);

            // Intentar parsear directamente primero
            try {
                return JSON.parse(content);
            } catch {
                // Si falla, intentar extraer el JSON
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error(
                        "No se encontró un JSON válido en la respuesta"
                    );
                }

                const jsonStr = jsonMatch[0];
                console.log("JSON extraído:", jsonStr);
                return JSON.parse(jsonStr);
            }
        } catch (error) {
            console.error("Error completo al parsear:", error);
            throw new Error("No se pudo parsear la receta generada");
        }
    }
}

export default new LlamaRecipeService();
