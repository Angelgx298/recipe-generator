import { createApp } from "./src/app.js";
import { CONFIG } from "./src/config/environment.js";

const app = createApp();

const startServer = async () => {
    try {
        app.listen(CONFIG.PORT, () => {
            console.log(`Server running on port ${CONFIG.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
