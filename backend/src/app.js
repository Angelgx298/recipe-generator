import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { CONFIG } from "./config/environment.js";

export const createApp = () => {
    const app = express();

    // Configuración de CORS
    const corsOptions = {
        origin: CONFIG.NODE_ENV === 'production' 
            ? [CONFIG.FRONTEND_URL]
            : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'],
        credentials: true,
        optionsSuccessStatus: 200
    };

    // Middleware globales
    app.use(cors(corsOptions));
    app.use(express.json());

    // Rutas
    app.use("/health", healthRoutes);
    app.use("/api/recipes", recipeRoutes);

    app.get("/", function (req, res) {
        res.send("Hola mundo");
    });

    // Manejo de errores
    app.use(errorHandler);

    return app;
};
