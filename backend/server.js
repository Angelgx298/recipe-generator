import express from "express";
import cors from "cors";
import LlamaRecipeService from "./llamaRecipeService.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Cambiar a ES Module
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/api/recipes", async (req, res) => {
    const { ingredients, dietPreference, maxPreparationTime } = req.body;

    try {
        const recipe = await LlamaRecipeService.generateRecipe(
            ingredients,
            dietPreference,
            maxPreparationTime
        );
        res.json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al generar la receta" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
