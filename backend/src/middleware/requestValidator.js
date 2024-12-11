export const validateRecipeRequest = (req, res, next) => {
    const { ingredients, dietPreference, maxPreparationTime } = req.body;

    if (
        !ingredients ||
        !Array.isArray(ingredients) ||
        ingredients.length === 0
    ) {
        return res.status(400).json({
            error: "Se requiere una lista válida de ingredientes",
        });
    }

    if (maxPreparationTime && typeof maxPreparationTime !== "number") {
        return res.status(400).json({
            error: "El tiempo máximo de preparación debe ser un número",
        });
    }

    next();
};
