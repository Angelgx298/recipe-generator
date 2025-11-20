export const errorHandler = (err, req, res, _next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: {
            message: err.message || "Error interno del servidor",
            detalles: err.message,
        },
    });
};
