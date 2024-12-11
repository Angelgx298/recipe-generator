import { RecipeService } from "../services/recipeService.js";

export class RecipeController {
    constructor() {
        this.recipeService = new RecipeService();
    }

    async generateRecipe(req, res, next) {
        try {
            const { ingredients, dietPreference, maxPreparationTime } =
                req.body;
            const recipe = await this.recipeService.generateRecipe(
                ingredients,
                dietPreference,
                maxPreparationTime
            );
            res.json(recipe);
        } catch (error) {
            next(error);
        }
    }
}

export default new RecipeController();
