import { createApp } from "./src/app.js";
import { CONFIG } from "./src/config/environment.js";

const app = createApp();

const startServer = async () => {
    try {
        app.listen(CONFIG.PORT, () => {
            console.log(`Servidor corriendo en puerto ${CONFIG.PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

startServer();
