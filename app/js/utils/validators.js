// Validar que el texto tenga una longitud mínima
export const validarLongitud = (texto, minLength = 5) => {
    return texto && texto.trim().length >= minLength;
};

// Regla de negocio: Prioridad es obligatoria y debe ser un valor válido
export const validarPrioridad = (prioridad) => {
    const validas = ["Alta", "Media", "Baja"];
    return validas.includes(prioridad);
};