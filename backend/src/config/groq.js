import Groq from "groq-sdk";
import { CONFIG } from "./environment.js";

export const groqClient = new Groq({
    apiKey: CONFIG.GROQ_API_KEY,
});
