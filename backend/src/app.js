import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const createApp = () => {
    const app = express();

    // Middleware globales
    app.use(cors());
    app.use(express.json());

    // Rutas
    app.use("/api/recipes", recipeRoutes);

    app.get("/", function (req, res) {
        res.send("Hola mundo");
    });

    // Manejo de errores
    app.use(errorHandler);

    return app;
};
