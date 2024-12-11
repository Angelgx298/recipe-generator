import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT || 5000,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    NODE_ENV: process.env.NODE_ENV || "development",
};
