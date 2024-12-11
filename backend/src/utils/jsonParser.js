export const parseJSON = (content) => {
    try {
        return JSON.parse(content);
    } catch {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No se encontró un JSON válido en la respuesta");
        }
        return JSON.parse(jsonMatch[0]);
    }
};
