import { Router } from "express";
import recipeController from "../controllers/recipeController.js";
import { validateRecipeRequest } from "../middleware/requestValidator.js";

const router = Router();

router.post(
    "/generate",
    validateRecipeRequest,
    recipeController.generateRecipe.bind(recipeController)
);

export default router;
