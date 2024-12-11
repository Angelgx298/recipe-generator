import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import LlamaRecipeService from "./llamaRecipeService.js";

// Configuración de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post("/api/recipes", async (req, res) => {
    const { ingredients, dietPreference, maxPreparationTime } = req.body;

    try {
        const recipe = await LlamaRecipeService.generateRecipe(
            ingredients,
            dietPreference,
            maxPreparationTime
        );
        return res.json(recipe);
    } catch (error) {
        console.error("Error al generar receta:", error);
        return res.status(500).json({
            error: "Error al generar la receta",
            detalles: error.message,
        });
    }
});

app.use(router);

// Iniciar servidor
const iniciarServidor = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

iniciarServidor();
