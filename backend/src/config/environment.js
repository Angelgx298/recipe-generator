import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ['GROQ_API_KEY'];

function validateEnv() {
    const missing = requiredEnvVars.filter(key => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(
            `Faltan variables de entorno requeridas: ${missing.join(', ')}\n` +
            'Por favor configura el archivo .env según .env.example'
        );
    }
}

validateEnv();

export const CONFIG = {
    PORT: process.env.PORT || 5000,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
